export function contentDisplay() {
    const navStatsEl = document.querySelector('.navigation li:nth-child(2)');
    const navInfoEl = document.querySelector('.navigation li:nth-child(3)');
    const navMontyMayhemEl = document.querySelector('.navigation li:nth-child(4)');

    const navItemsEl = document.querySelectorAll('.nav-sub-text');

    const statsTextEl = document.getElementById('stats-text');
    const infoTextEl = document.getElementById('info-text');
    const montyMayhemTextEl = document.getElementById('montyMayhem');

    for (const item of navItemsEl) {
        item.addEventListener('click', e => {
            item.classList.toggle('active');

            if (navStatsEl.classList.contains('active')) {
                statsTextEl.style.maxHeight = statsTextEl.scrollHeight + 'px';
            } else {
                statsTextEl.style.maxHeight = 0;
            }

            if (navInfoEl.classList.contains('active')) {
                infoTextEl.style.maxHeight = infoTextEl.scrollHeight + 'px';
            }
            else {
                infoTextEl.style.maxHeight = 0;
            }

            if (navMontyMayhemEl.classList.contains('active')) {
                montyMayhemTextEl.style.maxHeight = montyMayhemTextEl.scrollHeight + 'px';
            } else {
                montyMayhemTextEl.style.maxHeight = 0;
            }
        });
    }
}