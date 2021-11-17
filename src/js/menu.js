const menuButton = document.getElementById('menu-button')
const pageOverlay = document.getElementById('overlay')
const menuUnderlay = document.getElementById('menu-underlay')
const menu = document.getElementById('menu')
let isMenuOpen = false

pageOverlay.addEventListener('click', function(event) {
  toggleMenu()
})

function toggleMenu() {
  const icons = Array.prototype.slice.call(menuButton.children)

  isMenuOpen = !isMenuOpen
  icons.forEach(function (icon) {
    icon.classList.toggle('hidden')
  })
  menuButton.ariaLabel = isMenuOpen ? 'Close menu' : 'Open menu'
  menuUnderlay.classList.toggle('scale-x-225')
  pageOverlay.classList.toggle('opacity-40')
  pageOverlay.classList.toggle('pointer-events-none')
  menu.classList.toggle('opacity-0')
  menu.classList.toggle('pointer-events-none')
}

export function watchMenuButtonClick() {
  document.getElementById('menu-button').addEventListener('click', toggleMenu)
}

const navLinkList = document.getElementById('nav-link-list')

export function watchActiveMenuLink() {
  if (!window.matchMedia('(min-width: 1024px)').matches || !window.IntersectionObserver)
    return

  const classList = ['-mx-3', 'px-3', 'text-gray-800', 'lg:bg-green-200']
  const targetSections = Array.prototype.slice
    .call(navLinkList.children)
    .map(li => document.querySelector(li.firstElementChild.hash))
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.75
  })

  function observerCallback(entries, observer) {
    entries.forEach(function (entry) {
      const li = navLinkList.querySelector(`[href="#${entry.target.id}"]`).parentElement

      if (entry.isIntersecting) {
        classList.forEach(clss => li.classList.add(clss))
      } else {
        classList.forEach(clss => li.classList.remove(clss))
      }
    })
  }

  targetSections.forEach(section => observer.observe(section))
}

export function closeOnLinkClick() {
  navLinkList.addEventListener('click', function(event) {
    if (window.matchMedia('(max-width: 1023px)').matches && event.target.tagName === 'A') {
      toggleMenu()
    }
  })
}