"use strict";!function(){function y(e){new Inputmask("+7 (999) 999-99-99").mask(e)}function i(e){e.preventDefault();var t,o=document.querySelector(e.currentTarget.href.replace(/[^#]*(.*)/,"$1")),n=navigator.userAgent,a=-1<n.indexOf("MSIE ")||-1<n.indexOf("Trident/");t=a?o.getBoundingClientRect().top:o.getBoundingClientRect().y;var r,l,c=window.pageYOffset;r={duration:2e3,timing:function(e){return e},draw:function(e){window.scrollTo(0,c+e*t)}},l=performance.now(),requestAnimationFrame(function e(t){var o=(t-l)/r.duration;1<o&&(o=1);var n=r.timing(o);r.draw(n),o<1&&requestAnimationFrame(e)})}function s(e,t){e.classList.add("footer__nav_hide"),t.classList.remove("footer__nav-btn_close"),t.classList.add("footer__nav-btn_open")}window.addEventListener("load",function(){var e=document.querySelector(".header__contact-button");e&&e.addEventListener("click",function(e){e.preventDefault();var t,o,n,a,r,l=document.querySelector(".overlay"),c=document.querySelector(".modal");if(l&&l.classList.remove("overlay_hide"),c){document.body.style.overflow="hidden",c.classList.remove("modal_hide"),a=(n=c).querySelector(".modal__close"),r=function(e){e.preventDefault(),document.body.style.overflow="scroll",n.classList.add("modal_hide"),l.classList.add("overlay_hide"),a.removeEventListener("click",r),l.removeEventListener("click",r)},a.addEventListener("click",r),l.addEventListener("click",r),t=c,o=function(e){27===e.keyCode&&(e.preventDefault(),document.body.style.overflow="scroll",t.classList.contains("modal_hide")||t.classList.add("modal_hide"),l.classList.contains("overlay_hide")||l.classList.add("overlay_hide"),window.removeEventListener("keydown",o))},window.addEventListener("keydown",o);var i=c.querySelector("#modal-phone");y(i);var s=c.querySelector("#modal-name"),d=c.querySelector("#modal-phone"),u=c.querySelector("#modal-message");s.focus();var v=!0,f="",_="",m="";try{f=localStorage.getItem("name"),_=localStorage.getItem("phone"),m=localStorage.getItem("mesg")}catch(e){v=!1}v&&(f&&(s.value=f),_&&(d.value=_),m&&(u.innerText=m));c.querySelector(".modal__form-btn").addEventListener("click",function(e){s.value?s.value&&!d.value?(e.preventDefault(),d.focus()):s.value&&d.value&&!u.value?(e.preventDefault(),u.focus()):(localStorage.setItem("name",s.value),localStorage.setItem("phone",d.value),localStorage.setItem("mesg",u.value)):(e.preventDefault(),s.focus())})}});var t=document.querySelector(".contacts__form");if(t){var o=t.querySelector("#contact-phone");y(o)}for(var n=document.querySelectorAll(".intro__link, .intro__scroll"),a=0;a<n.length;a++)n[a].addEventListener("click",i);function r(e){e.preventDefault();var t,o=e.target,n=e.currentTarget.parentNode;o.classList.contains("footer__nav-btn")&&(o.classList.contains("footer__nav-btn_close")?s(n,o):o.classList.contains("footer__nav-btn_open")&&(c(l,"closeall"),t=o,n.classList.remove("footer__nav_hide"),t.classList.remove("footer__nav-btn_open"),t.classList.add("footer__nav-btn_close")))}var l=document.querySelectorAll(".footer__nav-site, .footer__contact"),c=function(e,t){for(var o=0;o<e.length;o++){var n=e[o];if("initial"===t)n.querySelector(".footer__nav-title").addEventListener("click",r);"closeall"===t&&s(n,n.querySelector(".footer__nav-btn"))}};c(l,"initial")})}();