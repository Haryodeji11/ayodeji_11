const sectionAll = document.querySelectorAll('section');
const logo = document.querySelector('.header-pg');
const nav = document.querySelector('.nav-bar');
const header = document.querySelector('.header');
const btnclose = document.querySelector('.btn-close');
const btnShow = document.querySelector('.btn-show');
const navcontent = document.querySelector('.nav-content');
const section1 = document.querySelector('.section--1')

///Shwoing and showing of navbar
const showbtn = function (){
    btnShow.classList.add('hidden');
 btnclose.classList.remove('hidden');
 navcontent.classList.remove('hidden');
}
const closebtn = function(){
    btnclose.classList.add('hidden');
    btnShow.classList.remove('hidden');
    navcontent.classList.add('hidden');
};
btnShow.addEventListener('click', showbtn);
btnclose.addEventListener('click', closebtn);



////using observe API method
// sticky navbar

 const StickyHead = function(entry, observe){
   const [entries] = entry;
   console.log(entries);

   if(!entry.isIntersecting) header.classList.add('sticky')
   else header.classList.remove('sticky')

//    observe.unobserve(entry.target);
 };
const ObsHead = new IntersectionObserver(StickyHead,{
    root: null,
    threshold: 0,
    rootMargin: '900px',
});

ObsHead.observe(header);
// sectionAll.forEach(section => {
// });



////using getboundingclientrect method
// const stickynav = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//     if(window.scrollY > stickynav.height){
//         header.classList.add('sticky')
//     }else header.classList.remove('sticky');
// });

// Observsticky.observe(header);


////recvealing section on slide
const sectionslide = function(entries,observe){
const [entry] = entries;

 if(!entry.isIntersecting) return;
 entry.target.classList.remove('section--hidden');

 observe.unobserve(entry.target);
};
const sectionobs = new IntersectionObserver(sectionslide,{
    root: null,
    threshold: 0.15,
});

sectionAll.forEach(function(sections){
 sectionobs.observe(sections);

 sections.classList.add('section--hidden');
});

class cfc{
    constructor(){

    }

    btnShow(){

    }
    btnclose(){

    }
}