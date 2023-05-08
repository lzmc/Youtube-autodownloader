// ==UserScript==
// @name         Youtube Auto Downloader
// @namespace    none
// @version      1
// @description  Youtube Auto Downloader for the youtube downloader server
// @match           https://www.youtube.com/*
// @match           https://m.youtube.com/*
// @match           https://www.youtube-nocookie.com/*
// @grant        none
// ==/UserScript==
(function() {
    //yes ik that this is a bad way to do this but i dont care
    'use strict';
    console.log("Youtube Auto Downloader is running");
    var oldHref = document.location.href;
    setInterval(function() {
        var newHref = document.location.href;
        if (newHref !== oldHref) {
            if (newHref.indexOf("youtube.com/watch?v=") > -1) {
                var videoId = newHref.split("youtube.com/watch?v=")[1].split("&")[0];
                console.log("Youtube Auto Downloader: Downloading video " + videoId);
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "http://localhost:3000/download?vid=" + videoId, true);
                xhttp.send();
            }
            oldHref = newHref;
        }
    }, 100);
})();
