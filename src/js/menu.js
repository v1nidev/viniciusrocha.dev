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