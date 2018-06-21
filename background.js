/** @var {boolean} Is the content script always executed. */
let isExecuted = false;

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  if (!isExecuted) {
      chrome.tabs.executeScript(null, { file: "main.js"} );
    }

  isExecuted = true;
});
