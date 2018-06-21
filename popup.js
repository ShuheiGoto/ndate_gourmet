function sendFromToBackground(submittedForm){
    msg = {
        setValues: true,
        time: submittedForm['time'].value,
        location: submittedForm['location'].value,
        genre: submittedForm['genre'].value
    }
    chrome.runtime.sendMessage(msg, function(response){

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
