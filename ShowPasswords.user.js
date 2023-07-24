// ==UserScript==
// @name         Show Passwords
// @description  Show passwords on mouseover
// @version      1.0
// @author       @block0987
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hA
// ==/UserScript==

var passFields = document.querySelectorAll("input[type='password']");
passFields.forEach(function (passField) {
    passField.addEventListener("mouseover", function () {
        this.type = "text";
    });
    passField.addEventListener("mouseout", function () {
        this.type = "password";
    });
});
