export function navAnimation() {
    const arrowEl = document.querySelector('.arrow');
    const navItemsEl = document.querySelectorAll('.nav-sub-text');

    arrowEl.addEventListener('click', e => {
        arrowEl.classList.toggle('arrow-active');
        arrowEl.classList.toggle('active');
        for (const item of navItemsEl) {
            item.classList.toggle('nav-collapse-active');
        }
    });
}
