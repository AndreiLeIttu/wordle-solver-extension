chrome.action.onClicked.addListener((tab) => {
    //to add url check for tab and condition that wordle "start" button was pressed
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content-script.js"]
    });
  });