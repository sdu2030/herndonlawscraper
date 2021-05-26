var username = "";
var password = "";

function getLoginInfo() {
    try {

        chrome.storage.sync.get(['username'],
            function (result) {
                username = result.key;
            });

        password = chrome.storage.sync.get(
            function (result) {
                password = result.key;
            });

        return true;

    }
    catch (error) {
        return false;
    }

}

function postArticle() {
    getLoginInfo();
    var input = {
        username: username,
        password: password,
    }
    fetch("https://elatest.herokuapp.com/postarticle", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(input),
    }).then((response) => response.json())
        .catch(function (error) {
            console.log("Article was unable")
        })

    setMessage("Article posted!");
}

function checkDay() {
    // Gets the day of the week
    var date = new Date();
    var dayOfWeek = date.getUTCDay();
    var posted = null;

    //Get posted boolean
    chrome.storage.sync.get(['posted'],
        function (result) {
            posted = result.key;
        }
    );

    //If it's monday and the article isn't posted, post the article and set posted to true
    if (dayOfWeek === 1 && !posted) {
        postArticle();
        chrome.storage.sync.set({ "posted": true }, function () {
            if (chrome.runtime.error) {
                console.log("Runtime error");
            }
        })
    }
    else if (dayOfWeek !== 1 && posted) {
        //If it is not Monday and posted is true, set posted to false
        chrome.storage.sync.set({ "posted": false }, function () {
            if (chrome.runtime.error) {
                console.log("Runtime error");
            }
        })

    }
}


function setMessage(message) {
    var options = {
        type: "basic",
        iconUrl: "icon.png",
        title: "Article Finder",
        message: message,

    }
    chrome.notifications.create("article-finder-notify", options);
}

chrome.alarms.onAlarm.addListener(function (alarm) {
    checkDay();
})