let galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 30,
    slidesPerView: 4,
    direction: 'vertical',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    breakpoints: {
        1025: {
            direction: 'horizontal',
            spaceBetween: 60,
        }
    }
});
let galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    },
});

let mySwiper = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },


})
wow = new WOW({
    animateClass: 'animate__animated',
    offset: 0,
})
wow.init();
let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__menu');
let tabs = document.querySelectorAll('.tab');
let content = document.querySelectorAll('.tab-content');
let tabsContent = document.querySelector('.process__items');
let header = document.querySelector('.header');
let links = document.querySelectorAll('.header__link');
const logo = document.querySelector('.header__logo');

for (let i = 0; i < links.length; i++) {

    links[i].addEventListener('click', function (e) {
        e.preventDefault();


        const id = links[i].getAttribute('href');
        if (!links[i].classList.contains('active')) {
            smoothScroll(id);
        }

        clearLinks();
        links[i].classList.add('active');

        if (links[i].classList.contains('mobile'))
            toggleMenu();
    });
}

logo.addEventListener('click', (e) => {
    e.preventDefault();
    
    const id = logo.getAttribute('href');

    smoothScroll(id);
});






burger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
});

function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
    document.querySelector('html').classList.toggle('lock');
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
document.addEventListener('click', function (e) {
    const target = e.target;
    const its_menu = target == menu || menu.contains(target);
    const menu_is_active = menu.classList.contains('active');

    if (!its_menu && menu_is_active) {
        toggleMenu();
    }
});

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    isMobile();
    checkMobileLinks();
});

isMobile();
checkMobileLinks();

for (let i = 0; i < tabs.length; i++) {
    (function (i) {
        let link = tabs[i];
        link.onclick = function () {
            for (let index = 0; index < tabs.length; index++) {
                if (tabs[index].classList.contains('active'))
                    tabs[index].classList.remove('active');
            }
            this.classList.add('active');

            for (let j = 0; j < content.length; j++) {
                let opacity = window.getComputedStyle(content[j]).opacity;
                if (opacity == "1") {
                    content[j].style.opacity = "0";
                    content[j].style.height = "0";                  
                }
            }
            // console.log(initialHeight);         
            content[i].style.opacity = "1";
            content[i].style.height = "auto";
            if (tabs[i].classList.contains('mobile')) {
                window.scroll({
                    top: getCoords(tabsContent) - header.offsetHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    })(i);
}

let rangeSlider = new JSR(['#range'], {
    sliders: 1,
    step: 1,
    min: 1,
    max: 5,
    values: [2],
    grid: false
})

const dropdown = document.querySelector('.price__more-title');

dropdown.addEventListener('click', function () {
    slideToggle();
});

let slideOpen = false;
let initHeight = document.querySelector('.price__list').offsetHeight;
let intval = null;

function slideToggle() {
    window.clearInterval(intval);
    let mdiv = document.querySelector('.price__dropdown');

    if (slideOpen) {
        slideOpen = false;
        mdiv.style.height = '0px';
        document.querySelector('.price__more').classList.toggle('active');
    } else {
        slideOpen = true;
        mdiv.style.height = initHeight + 'px';
        document.querySelector('.price__more').classList.toggle('active');
    }
}


function isMobile() {
    if (window.innerWidth < 500) {
        for (let i = 0; i < tabs.length; i++) {
            if (!tabs[i].classList.contains('mobile'))
                tabs[i].classList.add('mobile')
        }
    } else {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].classList.contains('mobile'))
                tabs[i].classList.remove('mobile')
        }
    }
}

function checkMobileLinks() {
    if (window.innerWidth < 940) {
        for (let i = 0; i < links.length; i++) {
            if (!links[i].classList.contains('mobile'))
                links[i].classList.add('mobile')
        }
    } else {
        for (let i = 0; i < links.length; i++) {
            if (links[i].classList.contains('mobile'))
                links[i].classList.remove('mobile')
        }
    }
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

    let clientTop = docEl.clientTop || body.clientTop || 0;

    let top = box.top + scrollTop - clientTop;

    return top;
}

let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
    if (isScrolling == false) {
        window.requestAnimationFrame(function () {
            dealWithScrolling(e);
            isScrolling = false;
        });
    }
    isScrolling = true;
}

function isPartiallyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top - 90;
    let bottom = elementBoundary.bottom;
    let height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

function isFullyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}

let worksSection = document.getElementById('works');
let typesSection = document.getElementById('types');
let processSection = document.getElementById('process');
let priceSection = document.getElementById('price');



function dealWithScrolling(e) {
    if (isPartiallyVisible(priceSection) || isFullyVisible(priceSection)) {
        changeLink('#price');
    }

    if (isPartiallyVisible(processSection) || isFullyVisible(processSection)) {
        changeLink('#process');
    }
    if (isPartiallyVisible(typesSection) || isFullyVisible(typesSection)) {
        changeLink('#types');
    }
    if (isPartiallyVisible(worksSection) || isFullyVisible(worksSection)) {
        changeLink('#works');
    }

    if (!(isPartiallyVisible(worksSection) || isFullyVisible(worksSection)) &&
        !(isPartiallyVisible(typesSection) || isFullyVisible(typesSection)) &&
        !(isPartiallyVisible(processSection) || isFullyVisible(processSection)) &&
        !(isPartiallyVisible(priceSection) || isFullyVisible(priceSection))) {
        clearLinks();
    }
}

function changeLink(id) {
    clearLinks();
    for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href') == id)
            links[i].classList.add('active');
    }
}

function clearLinks() {
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }
}




function currentYPosition() {
    if (self.pageYOffset) return self.pageYOffset;

    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;

    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    let elm = document.getElementById(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}


function smoothScroll(eID) {
    const section = document.querySelector(eId);
    window.scroll({
        top: getCoords(section),
        left: 0,
        behavior: 'smooth'
    });
}