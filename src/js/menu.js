export function getMenuToggler() {
  const menuUnderlay = document.getElementById('menu-underlay')
  const menu = document.getElementById('menu')
  let isMenuOpen = false
  
  return function toggleMenu(event) {
    const icons = Array.prototype.slice.call(event.currentTarget.children)

    isMenuOpen = !isMenuOpen
    icons.forEach(function (icon) {
      icon.classList.toggle('hidden')
    })
    event.currentTarget.ariaLabel = isMenuOpen ? 'Close menu' : 'Open menu'
    menuUnderlay.classList.toggle('scale-x-225')
    menu.classList.toggle('opacity-0')
    menu.classList.toggle('pointer-events-none')
  }
}

export function watchActiveMenuLink() {
  if (!window.matchMedia('(min-width: 1024px)').matches || !window.IntersectionObserver)
    return

  const classList = ['-mx-3', 'px-3', 'text-gray-800', 'lg:bg-green-200']
  const navLinkList = document.getElementById('nav-link-list')
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

