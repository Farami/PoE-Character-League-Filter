// ==UserScript==
// @name         Character League Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Filter PoE characters by league
// @author       Farami
// @match        https://www.pathofexile.com/account/view-profile/*/characters
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    waitForElement(".infoLine3", () => {
        let leagues = ["All", ...new Set($(".infoLine3").map((i, e) => e.innerHTML).toArray())],
            characters = $(".character");

        let $select = $("<select>", {
            "style": "float: right;"
        });
        $select.html($.map(leagues, e => $('<option/>', {
            value: e,
            text: e
        })));

        $select.change(e => {
            characters.show();

            let selectedVal = e.target.value;
            if (selectedVal !== "All") $(characters.find(".infoLine3").filter((i, e) => e.innerHTML !== selectedVal)).parent().hide();
        });

        $("h2").append($select);
    });

    function waitForElement(elementPath, callBack) {
        window.setTimeout(() => {
            if ($(elementPath).length) callBack(elementPath, $(elementPath));
            else waitForElement(elementPath, callBack);
        }, 500);
    }
})();