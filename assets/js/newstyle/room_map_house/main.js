/*
NAME    : MAIN
AUTHOR  : MEMBELL
VERSION : 1.0
TIME    : 18/04/2015   

*/
var now = new Date(); 
now     = now.getDate()+'/'+(now.getMonth()+1)+'/'+now.getFullYear();
var MAPHOUSE                = {};
MAPHOUSE.type_view          = "loai_phong"; // Type view in content; option = [loai_phong,so_phong,tang,list] 
MAPHOUSE.page               = "room_map_house"; // page get iframe
MAPHOUSE.cat_report         = "VacantRoom"; // Type Report in left menu; option = [VacantRoom,DirtyVacantRoom,OccipiedRoom,ExpectedArrivals,DirtyExpectedArrivals,DueOutRoom,CheckoutInToday]
MAPHOUSE.in_date            = now;
MAPHOUSE.select_rooms       = {}; 


var op_type_view            = null; 
var op_iframe_view          = null;
var op_catreports           = null;
var op_refresh              = null;  
var op_change_indate        = null;  
var op_select_mul           = null;  
var op_select_status_house  = null; 
var op_endate               = null;
MAPHOUSE.listenTypeView = function(){ 
	(op_type_view).change(function(){
    MAPHOUSE.setConfig( MAPHOUSE.cat_report, MAPHOUSE.in_date , jQuery(this).val() );
		MAPHOUSE.loadView( jQuery(this).val(), 1);
	});
}
MAPHOUSE.convertcat  = function( txt ){
  switch ( txt ){
    case 'VacantRoom':
      return 'NOTINHOUSE';
    case 'DirtyVacantRoom':
      return 'DIRTYNOTINHOUSE';
    case 'OccipiedRoom':
      return 'INHOUSE';  
    case 'ExpectedArrivals':
      return 'WILL_CHECKIN'; 
    case 'DirtyExpectedArrivals':
      return 'DIRTYWILL_CHECKIN';
    case 'DueOutRooms':
      return 'WILL_CHECKOUT';
    case 'CheckoutInToday':
      return 'CHECKOUT';
    case 'All':
      return 'All';          
  }
}
MAPHOUSE.loadView = function( type, run ){
  if( typeof(MAPHOUSE[MAPHOUSE.cat_report]) == 'undefined' ) {
    MAPHOUSE.setConfig( MAPHOUSE.cat_report, MAPHOUSE.in_date , type );
  }else{
    MAPHOUSE.getConfig( MAPHOUSE.cat_report );
  }
  
	MAPHOUSE.type_view       = type;
	localStorage.type_view   = type; 
	var link           		   = "?page=" + MAPHOUSE.page 
                           + "&sort=" + type 
                           + "&view=simple&status="+MAPHOUSE.convertcat(MAPHOUSE.cat_report)
                           + "&in_date="+MAPHOUSE.in_date; 
	// var check = op_iframe_view.attr("src");
  // if( check == '' || run){
    op_iframe_view.attr( "src",link );

  // } 
}
MAPHOUSE.setCatReportDefault = function( op ){ 
	MAPHOUSE.cat_report     = op.attr("CatReport");
	localStorage.catreport  = MAPHOUSE.cat_report;
	// Menu
    // if (!op.data("target")) return;
    // if (op.is(".active")) return;
    jQuery(".menu li").not(op).removeClass("active");
    jQuery(".page").not(page).removeClass("active");//.hide();
    window.page           = op.data("target");
    var page              = jQuery(window.page);
    window.location.hash  = window.page;
    op.addClass("active");
    page.show();
    var totop             = setInterval(function() {
      jQuery(".pages").animate({scrollTop:0}, 0);
    }, 1);

    setTimeout(function() {
      page.addClass("active");
      setTimeout(function() {
        clearInterval(totop);
      }, 1000);
    }, 100);
}
MAPHOUSE.setCatReport = function( op ){ 
	op_catreports.click(function() {
    MAPHOUSE.cat_report      = jQuery(this).attr("CatReport");
  	localStorage.catreport   = MAPHOUSE.cat_report; 
  	// op_iframe_view 			     = jQuery("#iframe_view"); 
     
  	// Menu
    if (!jQuery(this).data("target")) return;
    if (jQuery(this).is(".active")) return;
    jQuery(".menu li").not(jQuery(this)).removeClass("active");
    // jQuery(".page").not(page).removeClass("active").hide();
    // window.page 			       = jQuery(this).data("target");
    // var page 				         = jQuery(window.page);
    // window.location.hash 	   = window.page;
    jQuery(this).addClass("active");
    // page.show();
    // var totop 				       = setInterval(function() {
      // jQuery(".pages").animate({scrollTop:0}, 0);
    // }, 1);

    // setTimeout(function() {
      // page.addClass("active");
      // setTimeout(function() {
        // clearInterval(totop);
      // }, 1000);
    // }, 100);
    
    MAPHOUSE.loadView( MAPHOUSE.type_view );
  }); 
}
MAPHOUSE.refresh = function(){
  op_refresh.click(function(){
    op_refresh.addClass("clicked");
    MAPHOUSE.loadView(MAPHOUSE.type_view, 1);
    setTimeout(function() {
      op_refresh.removeClass("clicked")
    }, 500);
  });  
}
MAPHOUSE.change_indate = function(){
  op_change_indate.change(function(){ 
    if( MAPHOUSE.in_date !=  op_change_indate.val() ){
      localStorage.MAPHOUSE_in_date  = op_change_indate.val();
      MAPHOUSE.in_date               = op_change_indate.val();
      MAPHOUSE.setConfig( MAPHOUSE.cat_report, MAPHOUSE.in_date , MAPHOUSE.type_view );
      MAPHOUSE.loadView( MAPHOUSE.type_view , 1 );
    } 
  }); 
}
MAPHOUSE.setConfig = function( catreport, in_date, type_view ){
  MAPHOUSE[catreport] = {};
  MAPHOUSE[catreport].indate         = in_date;
  MAPHOUSE[catreport].type_view      = type_view;
  MAPHOUSE[catreport].OD             = localStorage.OD;
  MAPHOUSE[catreport].OC             = localStorage.OC;
  MAPHOUSE[catreport].VC             = localStorage.VC;
  MAPHOUSE[catreport].VCI            = localStorage.VCI;
  MAPHOUSE[catreport].VD             = localStorage.VD;
  MAPHOUSE[catreport].OOS            = localStorage.OOS;
}
MAPHOUSE.getConfig = function( catreport ){
  MAPHOUSE.in_date                   = MAPHOUSE[catreport].indate;
  MAPHOUSE.type_view                 = MAPHOUSE[catreport].type_view;
  localStorage.OD                    = MAPHOUSE[catreport].OD;
  localStorage.OC                    = MAPHOUSE[catreport].OC;
  localStorage.VC                    = MAPHOUSE[catreport].VC;
  localStorage.VCI                   = MAPHOUSE[catreport].VCI;
  localStorage.VD                    = MAPHOUSE[catreport].VD;
  localStorage.OOS                   = MAPHOUSE[catreport].OOS;

  op_change_indate.val( MAPHOUSE[catreport].indate );
  op_type_view.val( MAPHOUSE[catreport].type_view );
  MAPHOUSE.show_count();
}
MAPHOUSE.select_mul = function(){
  // sessionStorage.select_mul = 0;
  /*op_select_mul.click(function(){
    if( op_select_mul.find("i").hasClass("mdi-content-reply") ){
      op_select_mul.find("i").removeClass("mdi-content-reply").addClass("mdi-content-reply-all");
      jQuery(".select_status_house").show();
      sessionStorage.select_mul = 1;
    }else{
      op_select_mul.find("i").removeClass("mdi-content-reply-all").addClass("mdi-content-reply");
      jQuery(".select_status_house").hide();
      sessionStorage.select_mul = 0;
    }
  })*/
  op_select_mul.click(function(){
    ez_confirm({
      mgs: "Bạn có chắc chắn?",
      ok : function(){
        document.getElementById('iframe_view').contentWindow.submitfrom( 
            MAPHOUSE.select_rooms, 
            op_select_status_house.val(), 
            op_note.val(), 
            op_endate.val() 
          );
        MAPHOUSE.change_housetau_disabled(); 
        MAPHOUSE.select_rooms = {};
        MAPHOUSE.reset_housetau();
      }
    });
  });
}
MAPHOUSE.show_count  = function(){
  jQuery("#number_status_OD").html( localStorage.OD );
  jQuery("#number_status_OC").html( localStorage.OC );
  jQuery("#number_status_VC").html( localStorage.VC ); 
  jQuery("#number_status_VCI").html( localStorage.VCI );
  jQuery("#number_status_VD").html( localStorage.VD );
  jQuery("#number_status_OOS").html( localStorage.OOS );
  MAPHOUSE.resize_text(); 
}
MAPHOUSE.resize_text = function(){
  jQuery("span.number_status").each(function(){
    var width = jQuery(this).width(); 
    jQuery(this).css("left",-10-width+4*(width/8-1)+"px");
    jQuery(this).css("top",-5+"px");
  }); 
}
MAPHOUSE.select_room = function( room_name ){
  if( typeof(MAPHOUSE.select_rooms[room_name]) == 'undefined' ){
    MAPHOUSE.select_rooms[room_name] = 1; 
  }else{
    MAPHOUSE.select_rooms[room_name] = null;
  } 
  var check = 0;
  jQuery.each(MAPHOUSE.select_rooms,function(i,status){
    if( status == 1 ) check =1;
  });
  if( check == 1 ){
     MAPHOUSE.change_housetau_available();
   }else{
     MAPHOUSE.change_housetau_disabled();
     MAPHOUSE.select_rooms = {};
   }
}
MAPHOUSE.change_status_house = function(){
  op_select_status_house.change(function(){ 
      switch ( jQuery(this).val() ){
        case  "REPAIR":
          op_endate.show();break;
        case "DIRTY" :
        case "HOUSEUSE" :
        case "CONFIRM" : 
        case "0" :
          op_endate.hide();break;
      }
  });
}

MAPHOUSE.change_housetau_disabled = function(){
  op_endate.attr("disabled","");
  op_note.attr("disabled","");
  op_select_status_house.attr("disabled","");
  op_select_mul.attr("disabled","");
  op_form_changehoustatus.addClass("disabled");
}
MAPHOUSE.change_housetau_available = function(){
  op_endate.removeAttr("disabled","");
  op_note.removeAttr("disabled","");
  op_select_status_house.removeAttr("disabled","");
  op_select_mul.removeAttr("disabled","");
  op_form_changehoustatus.removeClass("disabled");
}
MAPHOUSE.reset_housetau = function(){
  op_endate.val('').hide();
  op_note.val('');
  op_select_status_house.val("0");
}
MAPHOUSE.run = function(){
	op_type_view               = jQuery("#select_type_view"); 
	op_refresh                 = jQuery("#refresh");
	op_catreports              = jQuery("#catreports li");
  op_change_indate           = jQuery("#change_date");
  op_select_mul              = jQuery("#select_mul");
  op_select_status_house     = jQuery("#select_status_house"); 
  op_endate                  = jQuery("#endate");  
  op_note                    = jQuery("#note"); 
  op_form_changehoustatus    = jQuery("#form_change_housestatus");   
	// get type_view if exit type before view 
	MAPHOUSE.type_view         = ( ( localStorage.type_view != null && localStorage.type_view != 'undefined')?localStorage.type_view:MAPHOUSE.type_view );   
	// get cat_report if exit catreport before view
	MAPHOUSE.cat_report        = ( ( localStorage.catreport != null && localStorage.catreport != 'undefined' )?localStorage.catreport:MAPHOUSE.cat_report );
  // get in_date if exit catreport before view
  MAPHOUSE.in_date           = NIGHTDAY;//( ( localStorage.MAPHOUSE_in_date != null )?localStorage.MAPHOUSE_in_date:MAPHOUSE.in_date );  
  op_change_indate.val( MAPHOUSE.in_date ).attr("disabled",""); 
	op_iframe_view             = jQuery("#iframe_view"); 
	// set value type_view
	op_type_view.val(MAPHOUSE.type_view); 
	// load first view
	MAPHOUSE.loadView( MAPHOUSE.type_view );
	// listen event change type_view and load data
	MAPHOUSE.listenTypeView(); 
	// set default catReport
	MAPHOUSE.setCatReportDefault( jQuery("#catreports li[data-target='#"+MAPHOUSE.cat_report+"']") );
	// listent event change category report
	MAPHOUSE.setCatReport( jQuery("#catreports li#"+MAPHOUSE.cat_report) );
  // listen event click refresh 
  MAPHOUSE.refresh();
  // listen event change in_date
  MAPHOUSE.change_indate();
  MAPHOUSE.select_mul();
  MAPHOUSE.show_count(); 
  MAPHOUSE.change_status_house();
  // disable form change status house 
  MAPHOUSE.change_housetau_disabled();
} 

jQuery('document').ready(function(){
	MAPHOUSE.run();
 
	// AFTER EFFECT
	window.page = window.location.hash || "#All";
   // jQuery(document).ready(function() {
      if (window.page != "#All") {
        jQuery(".menu").find("li[data-target=" + window.page + "]").trigger("click");
      }
   // }); 
      jQuery("#change_date, #endate").datepicker({} );

});

function show_count(op){
  /*localStorage.OD   = COUNT_STATUS.OD;
  localStorage.OC   = COUNT_STATUS.OC;
  localStorage.VC   = COUNT_STATUS.VC;
  localStorage.VCI  = COUNT_STATUS.VCI;
  localStorage.VD   = COUNT_STATUS.VD;
  localStorage.OOS  = COUNT_STATUS.OOS;*/
  MAPHOUSE.show_count(); 
}

jQuery(window).on("resize", function() {
    jQuery("html, body").height(jQuery(window).height());
    // console.log( jQuery(window).height() +"    "+jQuery("#ribbon").outerHeight())
    jQuery(".main, .menu").height( jQuery(window).height() - jQuery("#ribbon").outerHeight()-7 );
    jQuery(".pages").height(jQuery(window).height() - jQuery("#ribbon").outerHeight() - 7);
}).trigger("resize");