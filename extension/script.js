
var username = "";
var password = "";

function setLoginInfo() {
    // Gets form information
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    try {
        // Stores login information into chrome storage
        chrome.storage.sync.set({ "username": username }, function () {
            if (chrome.runtime.error) {
                console.log("Runtime error");
            }
        })

        chrome.storage.sync.set({ "password": password }, function () {
            if (chrome.runtime.error) {
                console.log("Runtime error");
            }
        })
        setMessage("Login information stored successfully");
        createAlarm();
    }
    catch (error) {
        setMessage("Warning: unable to store login!");
    }
    return false;
}

function setMessage(message) {
    // Creates a notification based on parameter message
    var options = {
        type: "basic",
        iconUrl: "icon.png",
        title: "Article Finder",
        message: message,

    }
    chrome.notifications.create("article-finder-notify", options);
}

function getLoginInfo() {
    try {
        // Gets username and password data from chrome storage
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

    // Sends post request to API
    fetch("https://elatest.herokuapp.com/postarticle", {
        method: "POST",
        mode: 'no-cors',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(input),
    }).then((response) => response.json());

    setMessage("Article posted!");
}

window.onload = function () {
    // Listener for submit button
    document.getElementById("submit").addEventListener("click", function () {
        setLoginInfo();
    });

    // Listener for post button
    document.getElementById("post").addEventListener("click", function () {
        postArticle();
    })

}


function createAlarm() {
    // Checks every two hours to see if it is Monday
    var settings = {
        periodInMinutes: 120,
    }
    chrome.alarms.create("alarm", settings);
}

