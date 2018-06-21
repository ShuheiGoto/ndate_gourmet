function sendFromToBackground(submittedForm){
    msg = {
        setValues: true,
        time: submittedForm['time'].value,
        location: submittedForm['location'].value,
        genre: submittedForm['genre'].value
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log(tabs);
        console.log(tabs[0].url);
        chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
            if (response.error == undefined) {
                document.getElementById("resultText").style.color='#00EE18';
                document.getElementById("resultText").innerHTML='Alarm Set';
            } else {
                document.getElementById("resultText").style.color='#E02000';
                document.getElementById("resultText").innerHTML='Alarm Not Set: ' + response.error;
            }
        });
    });
    /*chrome.runtime.sendMessage(msg, function(response){
        if (response.error == undefined) {
            document.getElementById("resultText").style.color='#00EE18';
            document.getElementById("resultText").innerHTML='Alarm Set';
        } else {
            document.getElementById("resultText").style.color='#E02000';
            document.getElementById("resultText").innerHTML='Alarm Not Set: ' + response.error;
        }
    });
    */
}

function getCurrentAlarm(formToSubmit) {
    chrome.runtime.sendMessage({ setValues: false}, function (response) {
        formToSubmit['time'].value = response.time;
        formToSubmit['location'].value = response.location;
        formToSubmit['genre'].value = response.genre;
    });
}

document.addEventListener('DOMContentLoaded', function(){
    form = document.getElementById("alarmForm");
    getCurrentAlarm(form);
    if(form.addEventListener){
        form.addEventListener("submit", function(event){
            event.preventDefault();
            sendFromToBackground(form);
        }, true);
    }else {
        form.attachEvent('onsubmit', function(event){
            event.preventDefault();
            sendFromToBackground(form)
        });
    }
});
