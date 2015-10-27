///<reference path="jquery-1.3.2-vsdoc2.js" />
///<reference path="jquery.ribbon.js" 

jQuery().ready(function() {
    jQuery().Ribbon({ theme: 'windows7',activeId:activeId });
    jQuery('ul.ribbon-theme li').click(function() { jQuery().Ribbon({ theme: jQuery(this).attr('class').substring(7) }); });
	showSubmenu(activeId);
	jQuery("#main-menu").show();
});
function showSubmenu(activeId) {
		jQuery(jQuery('.ribbonmenu>li>a')[activeId]).addClass('ribbonactive');
		ShowSubMenu(jQuery('.ribbonmenu>li>a')[activeId]);
		jQuery(jQuery('.ribbonmenu > li > a')[activeId]).parent().children('ul:first').show();
}
function ResetSubMenu() {
		jQuery('.ribbonmenu li a').removeClass('ribbonactive');
		jQuery('.ribbonmenu ul').removeClass('submenu');
		jQuery('.ribbonmenu li ul').hide();
}
function ShowSubMenu(e) {
	var isActive = jQuery(e).next().css('display') == 'block';
	ResetSubMenu();

	jQuery(e).addClass('ribbonactive');
	jQuery(e).parent().children('ul:first').addClass('submenu');

	jQuery(e).parent().children('ul:first').show();
	//jQuery('body').css('padding-top', '0px');

	isClosed = false;
}