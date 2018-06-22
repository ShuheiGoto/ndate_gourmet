/** @var {boolean} Is the content script always executed. */
/*
let isExecuted = false;

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  if (!isExecuted) {
      chrome.tabs.executeScript(null, { file: "main.js"} );
    }

  isExecuted = true;
});
*/

console.log("background page");

var desiredHour = "0";
var desireMinute = "0";
var desireLocation = "";
var desireGenre = "";

chrome.alarms.onAlarm.addListener(function(alarm){
    console.log("Alarm fired!");
    console.log(alarm);
    tabProperties = { url: "https://www.google.com/" };
    chrome.tabs.create(tabProperties, function(tab){
        chrome.tabs.executeScript(tab.id, { file: "main.js"} );
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if (request.setValues == false) {
        sendResponse({
            hour: desiredHour,
            minite: desireMinute,
        });
        return;
    }

    dateToFire = new Date();
    desireLocation = request.location;
    desireGenre = request.genre;

    chrome.alarms.clearAll();
    timeArray = request.time.split(":");
    if(timeArray.length != 2) {
        sendResponse({ error: "Invalid Time"});
        return;
    }

    desiredHour = timeArray[0];
    desireMinute = timeArray[1];
    dateToFire.setHours((desiredHour));
    dateToFire.setMinutes(desireMinute);
    dateToFire.setSeconds(0);

    timeToFire = dateToFire.getTime();
    if(timeToFire < Date.now()) {
        // 現在より前の自国の場合には明日向けにセットする
        console.log("setting time for today...");
        timeToFire += 1000 * 60 * 60 * 24;
    } else {
        console.log("Setting time for today...");
    }
    console.log("Time to fire: " + timeToFire);

    alarmPeriod = 60 * 24;
    alarmInfo = { when: timeToFire, periodInMinutes: alarmPeriod };
    alarmA = chrome.alarms.create("alarm", alarmInfo);

    sendResponse({});
});
