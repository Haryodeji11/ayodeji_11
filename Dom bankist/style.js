'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabcontainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabscontent = document.querySelectorAll('.operations__content');

const slide = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const dotsContainer = document.querySelector('.dots');



const nav = document.querySelector('.nav');

//////////////////////////////////////////////////////////
////IMPLEMENTATION

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


btnscrollto.addEventListener('click', function(e){
  // const s1coord = section1.getBoundingClientRect();
  // console.log(s1coord);
  section1.scrollIntoView({behavior: 'smooth'})
});

//////////////////////////////////////////
///Event Delegation

document.querySelector('.nav__links').addEventListener('click', function(e){
 e.preventDefault();

 if(e.target.classList.contains('nav__link')){
 const id = e.target.getAttribute('href');
 
 document.querySelector(id).scrollIntoView({behavior: 'smooth'});

 }
});
tabcontainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  ////Guard clause
  if (!clicked) return;

  ///Removing Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabscontent.forEach(c => c.classList.remove('operations__content--active'));
  ///adding Active tab
  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

const HandleOver = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo =  link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity; 
    }) ;
    logo.style.opacity = opacity; 
}
  };

nav.addEventListener('mouseover', function(e){
  HandleOver(e, 0.5);
});

nav.addEventListener('mouseout', function(e){
  HandleOver(e, 1);
});

// const initialcoord = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){

//   if(window.scrollY > initialcoord.top )
//   { nav.classList.add('sticky');
// } else   nav.classList.remove('sticky');

// });

const header = document.querySelector('.header');

const Stickynav = function(entries){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
};

const navHeight = nav.getBoundingClientRect().height;
const headerobserv = new IntersectionObserver(Stickynav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerobserv.observe(header);


///REVEALLING SECTION

const obscroll = function(entries,observe){
  const [entry] = entries;
  // console.log(entry);

if(!entry.isIntersecting) return;

entry.target.classList.remove('section--hidden');
observe.unobserve(entry.target);
}

const allsection = document.querySelectorAll('.section');

const sectionObserv = new IntersectionObserver(obscroll,{
  root: null,
  threshold: 0.15,
});

allsection.forEach(function(section){
  sectionObserv.observe(section);
 
  section.classList.add('section--hidden');
});

////lazy loading image

const lazyimg = document.querySelectorAll('img[data-src]');

const scrolImg = function(entries, observe){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;
 
   //replacing src with data src
   entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
 observe.unobserve(entry.target);
}
const lazyimgobs = new IntersectionObserver(scrolImg,{
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyimg.forEach(img => lazyimgobs.observe(img));

/////Carousel()slider


let curslide = 0;
let maxslide = slide.length;

////Creating dots for slider
const createDots = function(){
  slide.forEach(function(_,i) {
    dotsContainer.insertAdjacentHTML('beforeend', `<button class='dots__dot' data-slide='${i}'></button>`);
  });
};
createDots();

const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(s => s.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active');
};
activateDots(0);

const goToSlide = function(slides){
  slide.forEach((slide,i) => slide.style.transform = `translateX(${100 * (i - slides)}%)`);
};
goToSlide(0);

const nextSlide = function(){
  if (curslide === maxslide  -1){
    curslide = 0;
  }else{
    curslide++;
  };
////-100,0,100,200

goToSlide(curslide);
activateDots(curslide);
};

const prevSlide = function(){
  if (curslide === 0){
    curslide = maxslide -1;
  }else{
    curslide--;
  };

  goToSlide(curslide);
  activateDots(curslide);
};

////0,100,200,300

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

///keyboard functioning on next and prevslide

document.addEventListener('keydown', function(e){
  console.log(e);
  if(e.key === 'ArrowRight') nextSlide;
  if(e.key === 'ArrowLeft') prevSlide
});

dotsContainer.addEventListener('click', function(e){
if (e.target.classList.contains('dots__dot')){
 const {slide} = e.target.dataset;
goToSlide(slide);
activateDots(curslide);
}
});


document.addEventListener('DOMContentLoaded',function(e){
  console.log('HTML loaded and Dom tree built', e);
});
document.addEventListener('load',function(e){
  console.log('HTML loaded', e);
})

///////////////////////////////////////////////////////////
////////////practice

// const h1 = document.querySelector('h1')
// const h1alert =function(e){
//   alert('html alert');
//   };
// h1.addEventListener('mouseenter', h1alert);

// setTimeout(() => h1.removeEventListener('mouseenter', h1alert), 3000)
