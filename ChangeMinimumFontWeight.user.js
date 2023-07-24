// ==UserScript==
// @name Change Minimum Font Weight
// @description  Overrides the minimum font weight value.
// @version      2.0
// @author       @block0987
// @match       *://*/*
// ==/UserScript==

const applyStylesToTextElements = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const fontWeight = parseInt(getComputedStyle(node).fontWeight);
                    if (fontWeight < 400) {
                        node.style.fontWeight = 400;
                    }
                }
            }
        }
    }
};

const observer = new MutationObserver(applyStylesToTextElements);
observer.observe(document.body, { childList: true, subtree: true });