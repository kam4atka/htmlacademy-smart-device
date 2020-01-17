'use strict';

(function () {

  var validatePhone = function (element) {
    var imPhone = new Inputmask('+7 (999) 999-99-99');
    imPhone.mask(element);
  };

  function animating(object) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / object.duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }
      var progress = object.timing(timeFraction);
      object.draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  var scrollHandler = function (sEvt) {
    sEvt.preventDefault();
    var targetElement = document.querySelector(sEvt.currentTarget.href.replace(/[^#]*(.*)/, '$1'));
    var targetY = targetElement.getBoundingClientRect().y;

    var params = {
      duration: 2000,
      timing: function (timeFraction) {
        return timeFraction;
      },
      draw: function (progress) {
        window.scrollTo(0, progress * targetY);
      }
    };

    animating(params);
  };

  var initialPage = function () {

    function modalHandler(evt) {
      evt.preventDefault();

      var overlay = document.querySelector('.overlay');
      var modal = document.querySelector('.modal');

      function setCloseEvent(root) {
        var modalClose = root.querySelector('.modal__close');
        var clickHandler = function (cEvt) {
          cEvt.preventDefault();
          root.classList.add('modal_hide');
          overlay.classList.add('overlay_hide');
          modalClose.removeEventListener('click', clickHandler);
          overlay.removeEventListener('click', clickHandler);
        };
        modalClose.addEventListener('click', clickHandler);
        overlay.addEventListener('click', clickHandler);
      }

      function setCloseEsc(root) {
        var escHandler = function (escEvt) {
          if (escEvt.keyCode === 27) {
            escEvt.preventDefault();
            if (!root.classList.contains('modal_hide')) {
              root.classList.add('modal_hide');
            }
            if (!overlay.classList.contains('overlay_hide')) {
              overlay.classList.add('overlay_hide');
            }
            window.removeEventListener('keydown', escHandler);
          }
        };
        window.addEventListener('keydown', escHandler);
      }

      if (overlay) {
        overlay.classList.remove('overlay_hide');
      }

      if (modal) {
        modal.classList.remove('modal_hide');
        setCloseEvent(modal);
        setCloseEsc(modal);

        var modalPhoneItem = modal.querySelector('#modal-phone');
        validatePhone(modalPhoneItem);
      }
    }

    var contactsForm = document.querySelector('.contacts__form');
    if (contactsForm) {
      var phoneItem = contactsForm.querySelector('#contact-phone');
      validatePhone(phoneItem);
    }

    var modalInput = document.querySelector('.header__contact-button');
    if (modalInput) {
      modalInput.addEventListener('click', modalHandler);
    }

    var linkList = document.querySelectorAll('.intro__link, .intro__scroll');
    for (var i = 0; i < linkList.length; i++) {
      linkList[i].addEventListener('click', scrollHandler);
    }
  };
  window.addEventListener('load', initialPage);
})();
