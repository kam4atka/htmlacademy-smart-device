'use strict';

(function () {
  var initialPage = function () {

    var validatePhone = function (element) {
      var imPhone = new Inputmask('+7 (999) 999-99-99');
      imPhone.mask(element);
    };

    var contactsForm = document.querySelector('.contacts__form');
    if (contactsForm) {
      var phoneItem = contactsForm.querySelector('#contact-phone');
      validatePhone(phoneItem);
    }

    var modalInput = document.querySelector('.header__contact-button');
    var overlay = document.querySelector('.overlay');
    var modal = document.querySelector('.modal');
    if (modal) {
      var userName = modal.querySelector('#modal-name');
      var userPhone = modal.querySelector('#modal-phone');
      var userMess = modal.querySelector('#modal-message');
    }

    function setCloseEvent(root) {
      var modalClose = root.querySelector('.modal__close');
      var clickHandler = function(evt) {
        evt.preventDefault();
        root.classList.add('modal_hide');
        overlay.classList.add('overlay_hide');
        modalClose.removeEventListener('click', clickHandler);
        overlay.removeEventListener('click', clickHandler);
      }
      modalClose.addEventListener('click', clickHandler);
      overlay.addEventListener('click', clickHandler);
    };

    function setCloseEsc(root) {
      var escHandler = function(evt) {
        if (evt.keyCode === 27) {
          evt.preventDefault();
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
    };

    function modalHandler(evt) {
      evt.preventDefault();
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

    if (modalInput) {
      modalInput.addEventListener('click', modalHandler);
    }
  };
  window.addEventListener('load', initialPage);
})();
