function solve() {
    //finding first empty row
    let words = []
    for (let i=1;i<=6;i++) {
        let str = "#board > game-row:nth-child(" + i + ")"
        let cur_child = document.querySelector("body > game-app").shadowRoot.querySelector(str)
        if (cur_child.getAttribute("letters").length === 0) {
            console.log(i)
            field = cur_child
            field_num = i
            break
        }
    }

    //go through previous rows and mark wrong letters, as well as correct and misplaced letters.
    for (let i=1;i<field_num;i++) {
        let row_str = "#board > game-row:nth-child(" + i + ")"
        for (let j=1;j<=5;j++) {
            let column_str = "div > game-tile:nth-child(" + j + ")"
            let elem = document.querySelector("body > game-app").shadowRoot.querySelector(row_str).shadowRoot.querySelector(column_str)
            let letter_status = elem.getAttribute("evaluation")
            if (letter_status === "correct") {
                //column j is correct
            }
            else if (letter_status === "present") {
                //letter on column j is yellow, so misplaced
            }
            else {
                //letter should not be used in future tries
            }
        }
    }

}

solve()

//Envisioned process: 
//Script finds first game-row whose "letters" attribute is empty - this is the row to be completed by the script
//Looks through previously completed(if any) rows, marking green and yellow slots, and marking letters used.
//Filter list of words, and choose any of them that maximizes the amount of letters not previously used, while 
//satisfying the previous yellow/green slots. 