"use strict";

$(document).ready(function () {
  $('.sidenav').sidenav({
    edge: 'right',
    onOpenEnd: function onOpenEnd() {
      $('nav').addClass('open-mobile-menu');
    }
  });
  $('.sidenav-close').on('click', function (e) {
    e.preventDefault();
    $('nav').removeClass('open-mobile-menu');
    $('.sidenav').sidenav('close');
  });
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  $('.card-account').on('mouseenter', function (e) {
    e.stopPropagation();
    $(this).find('.card-content').slideDown(500);
    $(this).addClass('hover');
  });
  $('.card-account').on('mouseleave', function (e) {
    e.stopPropagation();
    var elem = $(this);
    elem.find('.card-content').slideUp(500);

    var func = function func() {
      $(this).removeClass('hover');
    };

    setTimeout(func.bind(elem), 500);
  });
});