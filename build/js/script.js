'use strict';

(function () {

  var validatePhone = function (element) {
    var imPhone = new Inputmask('+7 (999) 999-99-99');
    imPhone.mask(element);
  };

  var animating = function (object) {
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
  };

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

  var hideList = function (item, btn) {
    item.classList.add('footer__nav_hide');
    btn.classList.remove('footer__nav-btn_close');
    btn.classList.add('footer__nav-btn_open');
  };

  var showList = function (item, btn) {
    item.classList.remove('footer__nav_hide');
    btn.classList.remove('footer__nav-btn_open');
    btn.classList.add('footer__nav-btn_close');
  };

  var initialPage = function () {

    function modalHandler(mhEvt) {
      mhEvt.preventDefault();

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

        var name = modal.querySelector('#modal-name');
        var phone = modal.querySelector('#modal-phone');
        var mesg = modal.querySelector('#modal-message');

        var isStorageSupport = true;
        var storageName = '';
        var storagePhone = '';
        var storageMesg = '';

        try {
          storageName = localStorage.getItem('name');
          storagePhone = localStorage.getItem('phone');
          storageMesg = localStorage.getItem('mesg');
        } catch (err) {
          isStorageSupport = false;
        }

        if (isStorageSupport) {
          if (storageName) {
            name.value = storageName;
          }
          if (storagePhone) {
            phone.value = storagePhone;
          }
          if (storageMesg) {
            mesg.innerText = storageMesg;
          }
        }

        var sendHandler = function (shEvt) {
          if (!name.value) {
            shEvt.preventDefault();
            name.focus();
          } else if (name.value && !phone.value) {
            shEvt.preventDefault();
            phone.focus();
          } else if (name.value && phone.value && !mesg.value) {
            shEvt.preventDefault();
            mesg.focus();
          } else {
            localStorage.setItem('name', name.value);
            localStorage.setItem('phone', phone.value);
            localStorage.setItem('mesg', mesg.value);
          }
        };

        var btnForm = modal.querySelector('.modal__form-btn');
        btnForm.addEventListener('click', sendHandler);
      }
    }

    var modalInput = document.querySelector('.header__contact-button');
    if (modalInput) {
      modalInput.addEventListener('click', modalHandler);
    }

    var contactsForm = document.querySelector('.contacts__form');
    if (contactsForm) {
      var phoneItem = contactsForm.querySelector('#contact-phone');
      validatePhone(phoneItem);
    }

    var linkList = document.querySelectorAll('.intro__link, .intro__scroll');
    for (var i = 0; i < linkList.length; i++) {
      linkList[i].addEventListener('click', scrollHandler);
    }

    var btnItemHandler = function (bEvt) {
      bEvt.preventDefault();
      var element = bEvt.target;
      var parent = bEvt.currentTarget.parentNode;

      if (element.classList.contains('footer__nav-btn')) {
        if (element.classList.contains('footer__nav-btn_close')) {
          hideList(parent, element);
        } else if (element.classList.contains('footer__nav-btn_open')) {
          passageList(listAccordion, 'closeall');
          showList(parent, element);
        }
      }
    };

    var listAccordion = document.querySelectorAll('.footer__nav-site, .footer__contact');
    var passageList = function (array, status) {
      for (var j = 0; j < array.length; j++) {
        var itemList = array[j];
        if (status === 'initial') {
          var headItem = itemList.querySelector('.footer__nav-title');
          headItem.addEventListener('click', btnItemHandler);
        }
        if (status === 'closeall') {
          hideList(itemList, itemList.querySelector('.footer__nav-btn'));
        }
      }
    };
    passageList(listAccordion, 'initial');
  };
  window.addEventListener('load', initialPage);
})();
