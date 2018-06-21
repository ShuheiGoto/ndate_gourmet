console.log("background page");

var desiredHour = "0";
var desireMinute = "0";

chrome.alarms.onAlarm.addListener(function(alarm){
    console.log("Alarm fired!");
    console.log(alarm);

    tabProperties = { url: "https://www.youtube.com" };
    chrome.tabs.create(tabProperties);
});

