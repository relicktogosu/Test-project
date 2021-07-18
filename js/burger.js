$(document).ready(function() {
    $('.header__burger').click(function() {
        $('.header__burger').toggleClass('open-menu');
        $('.header-section-nav').toggleClass('open-menu');
        $('.header-aside__logo-bonum').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
        $('.main-section-content-vword').toggleClass('open-menu');
    });
});