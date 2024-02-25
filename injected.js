/** @param {string} selector  */
function waitForElementToBeAdded(selector) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector)
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  })
}

waitForElementToBeAdded('button:has(> div)').then(() => {
  // Select all button elements on the page
  /** @type {NodeListOf<HTMLButtonElement>} */
  var buttons = document.querySelectorAll("button:has(> div)")

  if (buttons.length > 0) {
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dices"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>'
    var container = buttons[0].parentElement

    var temp = document.createElement('div');
    temp.innerHTML = svgString;

    var svg = temp.firstChild;

    var randomBtn = document.createElement('button')
    randomBtn.classList.add('btn-random-response')
    randomBtn.appendChild(svg)

    randomBtn.addEventListener('click', () => {
      var random = Math.floor(Math.random() * buttons.length);
      var chosenBtn = buttons[random] || buttons[0]

      chosenBtn.click()
    })

    container.appendChild(randomBtn);
  }
})