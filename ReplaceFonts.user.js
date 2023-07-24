// ==UserScript==
// @name Replace Fonts
// @description Replace fonts on the web page with your favorite fonts.
// @version 1.0
// @author @block0987
// @match *://*/*
// ==/UserScript==

(function () {
    'use strict';

    const targetFonts = ["Inter medium", "Inter", "LINE Seed JP_OTF", "Hiragino Kaku Gothic ProN", "Noto Sans CJK JP"];

    const excludeFonts = [
        "AMC Icons", "FabricMDL2Icons", "FabricMDL2Icons-0", "FabricMDL2Icons-1", "FabricMDL2Icons-2",
        "FabricMDL2Icons-3", "FabricMDL2Icons-4", "FabricMDL2Icons-5", "FabricMDL2Icons-8",
        "FontAwesome", "Font Awesome 5 Brands", "Font Awesome 5 Free", "Font Awesome 5 Pro", "Font Awesome 6 Free",
        "FontAwesomeBrands", "FontAwesomeExtra", "FontAwesomeSolid", "FluentSystemIcons", "FluentSystemIconsFilled",
        "FluentSystemIconsRegular", "Google Symbols", "Glyphicons Halflings", "MWF-MDL2", "Material Design Iconic Font",
        "Material Icons", "ShellFabricMDL2Icons", "VideoJS", "bitly icon", "controlIcons", "dashicons", "docons",
        "eg-footer-icomoon", "icomoon", "mathworks", "office365icons", "stsvg", "trellicons", "wundercon", "fa-brands",
        "fa-regular", "fa-solid", "material-design-icons", "mdi", "simple-line-icons", "typicons", "feather",
        "foundation-icons", "iconoir", "ionicons", "linearicons", "material-design-icons", "octicons", "pe-icon-7-stroke",
        "remixicon", "simple-line-icons", "themify-icons", "typicons", "weather-icons"
    ];

    const targetFontFamily = targetFonts.join(', ');

    // フォント置換を行う関数
    function replaceFont(element) {
        const computedStyle = window.getComputedStyle(element);
        let font = computedStyle.fontFamily;

        // フォントが設定されていない場合は、規定のフォントを設定する
        if (!font || font.toLowerCase() === 'none') {
            element.style.fontFamily = targetFontFamily;
        } else if (!excludeFonts.some(excludeFont => font.includes(excludeFont))) {
            const fontWeight = parseInt(computedStyle.fontWeight, 10);
            const newFont = fontWeight <= 600 ? targetFonts[0] : targetFonts[1];

            if (newFont && font !== newFont) {
                element.style.fontFamily = targetFontFamily;
            }
        }
    }

    // フォント置換を行う関数を全ての要素に対して実行
    function processAllElements(root = document) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null, false);
        let node = walker.nextNode();
        while (node) {
            replaceFont(node);
            node = walker.nextNode();
        }
    }

    // ページ読み込み時に実行
    processAllElements();

    // DOMツリーの変更を監視して、新たな要素が追加された場合にもフォントを置き換える
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        processAllElements(node);
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();