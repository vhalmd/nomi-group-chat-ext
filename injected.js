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

/** @param {HTMLDivElement} element  */
/** @returns {HTMLDivElement | null} */
function findDivWithBackgroundUrl(element) {
  const backgroundImage = window.getComputedStyle(element).backgroundImage;
  if (backgroundImage.includes('url')) {
      return element;
  }

  for (let i = 0; i < element.children.length; i++) {
      const result = findDivWithBackgroundUrl(element.children[i]);
      if (result) {
          return result;
      }
  }

  return null;
}

waitForElementToBeAdded('div.css-1r0bmfq.e148mco75') .then(() => {
  waitForElementToBeAdded('button:has(> div)').then(() => {
    // Select all button elements on the page
    /** @type {NodeListOf<HTMLButtonElement>} */
    var buttons = document.querySelectorAll("button:not([aria-haspopup]):has(> div)")
  
    if (buttons.length > 0) {
  
      const messages = Array.from(document.querySelectorAll('div.css-1r0bmfq.e148mco75')).reverse()
      const avatarDiv = findDivWithBackgroundUrl(messages[0])
      let lastMsgIndex = undefined;
      if (avatarDiv) {
        const lastMsgAvatar = window.getComputedStyle(avatarDiv).background
  
        buttons.forEach((btn, i) => {
          const div = btn.querySelector('div')
          const currentAvatar = window.getComputedStyle(div).background
          if (currentAvatar === lastMsgAvatar) {
            lastMsgIndex = i
          }
        })
      }
  
      var diceSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dices"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>'
      var playSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
      var pauseSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>'
      var container = buttons[0].parentElement
  
      var randomBtn = document.createElement('button')
      randomBtn.classList.add('btn-random-response')
      randomBtn.innerHTML = diceSvgStr
      lastMsgIndex && randomBtn.setAttribute('data-last-clicked', lastMsgIndex)
  
      randomBtn.addEventListener('click', () => {
        var disabled = Array.from(buttons).filter(btn => btn.disabled)
        if (!disabled.length) {
          var lastClicked = randomBtn.getAttribute('data-last-clicked')
          var random = 0
          do {
            random = Math.floor(Math.random() * buttons.length)
          } while(random.toString() === lastClicked)
          var chosenBtn = buttons[random]
          
          chosenBtn.click()
          randomBtn.setAttribute('data-last-clicked', random)
        }
      })
  
      var autoBtn = document.createElement('button')
      autoBtn.classList.add('btn-auto-toggle')
      autoBtn.innerHTML = playSvgStr
  
      autoBtn.addEventListener('click', () => {
        var isToggled = !!autoBtn.getAttribute('data-toggled')
  
        if (isToggled) {
          autoBtn.removeAttribute('data-toggled')
          autoBtn.innerHTML = playSvgStr
        } else {
          autoBtn.setAttribute('data-toggled', true)
          autoBtn.innerHTML = pauseSvgStr
          var interval = setInterval(() => {
            var toggle = document.querySelector('.btn-auto-toggle[data-toggled]')
            if (toggle) randomBtn.click()
            else clearInterval(interval)
          }, 1000);
        }
      })
  
      container.appendChild(randomBtn);
      container.appendChild(autoBtn);
    }
  })
})