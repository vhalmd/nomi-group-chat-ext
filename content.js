/**
 * @type {import('@types/chrome').Chrome}
 */
var chrome = chrome || {};

const log = (...args) => {
  console.log('{V}', ...args);
}

/** @param {string} url  */
function injectScript(url) {
  const target = document.head || document.documentElement;
  const script = document.createElement('script')
  script.type = 'module'
  script.src = chrome.runtime.getURL(url)

  log(chrome.runtime.getURL(url))

  target.appendChild(script)
}

injectScript('injected.js')