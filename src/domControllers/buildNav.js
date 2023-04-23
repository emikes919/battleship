const buildNav = (root) => {
    const nav = document.createElement('nav');
    nav.setAttribute('id', 'nav-bar');
    nav.innerHTML = 'BATTLESHIP'
    root.appendChild(nav);
}

export default buildNav;