'use strict';

(function () {
  var initialPage = function () {
    var contactsForm = document.querySelector('.contacts__form');
    var phoneItem = contactsForm.querySelector('#contact-phone');
    var imPhone = new Inputmask('+7 (999) 999-99-99');
    imPhone.mask(phoneItem);
  };

  window.addEventListener('load', initialPage);
})();

