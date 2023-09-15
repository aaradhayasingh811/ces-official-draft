
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });


  /**
   * Buy tickets select the ticket type on click
   */
  on('show.bs.modal', '#buy-ticket-modal', function(event) {
    select('#buy-ticket-modal #ticket-type').value = event.relatedTarget.getAttribute('data-ticket-type')
  })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


function display_1_in(){
  t=document.querySelector('.bi-house-door');
   t.style.display ="none";
   document.querySelectorAll('.nav_content')[0].style.display ="inline-block";
  // t.innerHTML = "HOME";

}

function display_1_out(){
  document.querySelectorAll('.nav_content')[0].style.display ="none";
  t=document.querySelector('.bi-house-door');

   t.style.display ="inline";
   
  //t[0].innerHTML = "<i class='bi bi-house-door ' style='font-size: 2rem;'></i>" ;

}

  class parallaxTiltEffect {

constructor({element, tiltEffect}) {

this.element = element;
this.container = this.element.querySelector(".container");
this.size = [300, 360];
[this.w, this.h] = this.size;

this.tiltEffect = tiltEffect;

this.mouseOnComponent = false;

this.handleMouseMove = this.handleMouseMove.bind(this);
this.handleMouseEnter = this.handleMouseEnter.bind(this);
this.handleMouseLeave = this.handleMouseLeave.bind(this);
this.defaultStates = this.defaultStates.bind(this);
this.setProperty = this.setProperty.bind(this);
this.init = this.init.bind(this);

this.init();
}

handleMouseMove(event) {
const {offsetX, offsetY} = event;

let X;
let Y;

if (this.tiltEffect === "reverse") {
  X = ((offsetX - (this.w/2)) / 3) / 3;
  Y = (-(offsetY - (this.h/2)) / 3) / 3;
}

else if (this.tiltEffect === "normal") {
  X = (-(offsetX - (this.w/2)) / 3) / 3;
  Y = ((offsetY - (this.h/2)) / 3) / 3;
}

this.setProperty('--rY', X.toFixed(2));
this.setProperty('--rX', Y.toFixed(2));

this.setProperty('--bY', (80 - (X/4).toFixed(2)) + '%');
this.setProperty('--bX', (50 - (Y/4).toFixed(2)) + '%');
}

handleMouseEnter() {
this.mouseOnComponent = true;
this.container.classList.add("container--active");
}

handleMouseLeave() {
this.mouseOnComponent = false;
this.defaultStates();
}

defaultStates() {
this.container.classList.remove("container--active");
this.setProperty('--rY', 0);
this.setProperty('--rX', 0);
this.setProperty('--bY', '80%');
this.setProperty('--bX', '50%');
}

setProperty(p, v) {
return this.container.style.setProperty(p, v);
}

init() {
this.element.addEventListener('mousemove', this.handleMouseMove);
this.element.addEventListener('mouseenter', this.handleMouseEnter);
this.element.addEventListener('mouseleave', this.handleMouseLeave);
}

}

const $ = e => document.querySelector(e);

const wrap1 = new parallaxTiltEffect({
element: $('.wrap--1'),
tiltEffect: 'reverse'
});

const wrap2 = new parallaxTiltEffect({
element: $('.wrap--2'),
tiltEffect: 'normal'
});

const wrap3 = new parallaxTiltEffect({
element: $('.wrap--3'),
tiltEffect: 'reverse'
});
