import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
});

jQuery(document).ready(function(){
    jQuery('.scrollbar-inner').scrollbar();
});

$(document).ready(function(){

	let toggle_sidebar = false;
	let toggle_topbar = false;
	let nav_open = 0;
	let topbar_open = 0;

	if(!toggle_sidebar) {
		const $toggle = $('.sidenav-toggler');

		$toggle.click(function() {
			if (nav_open == 1){
				$('html').removeClass('nav_open');
				$toggle.removeClass('toggled');
				nav_open = 0;
			}  else {
				$('html').addClass('nav_open');
				$toggle.addClass('toggled');
				nav_open = 1;
			}
		});
		toggle_sidebar = true;
	}
	// 상단 우측 ... 누르면 나오는 검색창
	if(!toggle_topbar) {
		const $topbar = $('.topbar-toggler');

		$topbar.click(function(){
			if (topbar_open == 1) {
				$('html').removeClass('topbar_open');
				$topbar.removeClass('toggled');
				topbar_open = 0;
			} else {
				$('html').addClass('topbar_open');
				$topbar.addClass('toggled');
				topbar_open = 1;
			}
		});
		toggle_topbar = true;
	}

//select all
$('[data-select="checkbox"]').change(function(){
	const $target = $(this).attr('data-target');
	$($target).prop('checked', $(this).prop("checked"));
})

});