import { getMenuToggler, watchActiveMenuLink } from "./menu";

document.getElementById('menu-button').addEventListener('click', getMenuToggler())
watchActiveMenuLink()