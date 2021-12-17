const header = document.querySelector('.header');
const sections = document.querySelectorAll("section[id]");
const arrowDown = document.querySelector('.welcome__arrow');
document.addEventListener('DOMContentLoaded', init)
function init() {
    const buttonToggleItems = document.getElementsByClassName('tours__showmore')
    if (buttonToggleItems.length === 0) {
        throw new Error('Кнопка не найдена в document');
    }

    const listItemsContainer = document.getElementsByClassName('tours-item--hidden')

    buttonToggleItems[0].addEventListener(
        'click',
        (event) =>
            handleToggleItemsButtonClick(listItemsContainer, event)
    )
}
/*Кнопка больше туров */
function handleToggleItemsButtonClick(listItemsContainer, pointerEvent) {
    const classForVisibleHiddenItems = 'tours-item--hidden-visible'

    if (pointerEvent.currentTarget.innerText === 'Больше туров') {
        pointerEvent.currentTarget.innerText = 'Скрыть'
        for (i = 0; i < listItemsContainer.length; i++) listItemsContainer[i].classList.add(classForVisibleHiddenItems)
    } else {
        pointerEvent.currentTarget.innerText = 'Больше туров'
        for (i = 0; i < listItemsContainer.length; i++) listItemsContainer[i].classList.remove(classForVisibleHiddenItems)
    }
}
/*Темный header при скроллинге */
window.addEventListener('scroll', headerScroll);
function headerScroll() {
    if (window.pageYOffset > 10) { header.classList.add('header__scroll'); }
    else { header.classList.remove('header__scroll'); }
}
/*Плавный скроллинг по стрелке вниз */
arrowDown.onclick = function () {
    const ss = document.querySelector('.sightseens');
    ss.scrollIntoView({
        behavior: 'smooth'
    });
}
/*Бургер-меню */
document.querySelector('.header__button').addEventListener('click', function () {
    if (header.classList.contains('header__scroll')) {
        header.classList.remove('header__scroll')
    };
    const body = document.querySelector('body');
    const headerb = document.querySelector('.header__button span');
    const headerm = document.querySelector('.header__menu');
    headerb.classList.toggle('active');
    headerm.classList.toggle('active');
   body.classList.toggle('stop-scrolling');
})

/*Плавный переход по якорям */
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}
/* Подсветка меню при скроллинге */
window.addEventListener("scroll", menuHighlighter);
function menuHighlighter() {

    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");
        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            document.querySelector(".header__menu a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document.querySelector(".header__menu a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
}