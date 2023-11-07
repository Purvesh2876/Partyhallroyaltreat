(function($){"use strict";$(window).on('elementor/frontend/init',()=>{elementorFrontend.hooks.addAction('frontend/element_ready/babe-item-content.default',($scope)=>{let $desc=$scope.find('.desc-p .link-holder a');let $desctext=$scope.find('.desc-p .link-holder a span');let $class=$scope.find('.desc-p');$desc.on('click',function(e){e.preventDefault();$(this).toggleClass('active');$class.toggleClass('active');if($(this).hasClass('active'))
$desctext.text(zourneyAjax.viewless)
else
$desctext.text(zourneyAjax.viewmore)});});});})(jQuery);