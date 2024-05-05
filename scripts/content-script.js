function solve() {
    //finding first empty row
    let field_num = 0
    for (let i=1;i<=6;i++) {
        let str = "#board > game-row:nth-child(" + i + ")"
        let cur_child = document.querySelector("body > game-app").shadowRoot.querySelector(str)
        if (cur_child.getAttribute("letters").length === 0) {
            console.log("Empty row num: " + i)
            field = cur_child
            field_num = i
            break
        }
    }
    let available = [];
    let mustBePresent = {}
    for (let i = 0; i < 5; i++) {
        available.push(new Set("abcdefghijklmnopqrstuvwxyz"));
    }
    let yellow_count = new Array(26).fill(0);

    //go through previous rows and mark wrong letters, as well as correct and misplaced letters.
    for (let i=1;i<field_num;i++) {
        let row_str = "#board > game-row:nth-child(" + i + ")"
        let cur_yellow_count = new Array(26).fill(0);
        for (let j=1;j<=5;j++) {
            let column_str = "div > game-tile:nth-child(" + j + ")"
            let elem = document.querySelector("body > game-app").shadowRoot.querySelector(row_str).shadowRoot.querySelector(column_str)
            let letter_status = elem.getAttribute("evaluation")
            let letter = elem.shadowRoot.querySelector("div").innerText.toLowerCase()
            if (letter_status === "correct") {
                //column j is correct
                available[j-1].clear()
                available[j-1].add(letter)
                cur_yellow_count[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++
            }
            else if (letter_status === "present") {
                //letter on column j is yellow, so misplaced
                available[j-1].delete(letter)
                console.log(letter.charCodeAt(0) - 'a'.charCodeAt(0))
                cur_yellow_count[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++
            }
            else {
                //letter should not be used in future tries
                for (let k=0;k<5;k++)
                    available[k].delete(letter)
            }
        }
        for (let j=0;j<26;j++)
            yellow_count[j]=Math.max(yellow_count[j], cur_yellow_count[j])
    }
    console.log(available)
    console.log(yellow_count)

    //look through the whole list of words and choose word with max 'score' that also satisfies the constraints.

    const fileUrl = chrome.runtime.getURL("word-list-sorted.txt")
    fetch(fileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch file');
        }
        return response.text();
    })
    .then(text => {
        const lines = text.split('\n');
        let trimmedLines = lines.map(line => line.trim())
        trimmedLines.pop()
        for (let i=0; i<trimmedLines.length;i++) {
            let word = trimmedLines[i]
            let valid = true
            let cur_yellow_count = new Array(26).fill(0);
            for (let j=0;j<26;j++)
                cur_yellow_count[j]=yellow_count[j]
            for (let j=0;j<5;j++) {
                if (!available[j].has(word[j])) {
                    valid = false 
                    break
                }
                cur_yellow_count[word[j].charCodeAt(0) - 'a'.charCodeAt(0)]--
            }
            if (valid) {
                for (let j=0;j<26;j++) {
                    if (cur_yellow_count[j]>0) {
                        valid = false 
                        break
                    }
                }
                if (valid) {
                    let finStr = "#board > game-row:nth-child(" + field_num + ")"
                    let elem = document.querySelector("body > game-app").shadowRoot.querySelector(finStr)
                    elem.setAttribute("letters", word)
                    const enterEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        keyCode: 13,
                        bubbles: true, // Allow event to bubble up through the DOM
                        cancelable: true, // Allow event to be canceled
                      });
                      
                      elem.dispatchEvent(enterEvent);
                    break
                }
                else {
                    continue
                }
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

solve()

//Envisioned process: 
//Script finds first game-row whose "letters" attribute is empty - this is the row to be completed by the script
//Looks through previously completed(if any) rows, marking green and yellow slots, and marking letters used.
//Filter list of words, and choose any of them that maximizes the amount of letters not previously used, while 
//satisfying the previous yellow/green slots. 