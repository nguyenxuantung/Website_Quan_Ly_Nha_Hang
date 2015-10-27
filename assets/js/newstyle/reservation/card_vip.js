   

var vtr_input_discount = jQuery("body");


function  card_vip(button_popup,type_idm){
    // this.vtr_input_discount = vtr_input_discount;
    // this.type_id       = type_id;
    // console.log(button_popup);
    button_popup.click(function(){
        var url = "<iframe  style='width: 100%;height: 100%;'  src='?page=popup&type_id="+type_idm+"'></iframe>";
        jQuery('#popup_card_vip').css("width",window.innerWidth);
        jQuery('#popup_card_vip').css("height",window.innerHeight-5);
        jQuery('#popup_card_vip').html(url);
        jQuery('#popup_card_vip').bPopup({
             fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
             followSpeed: 500, //can be a string ('slow'/'fast') or int
             modalClose: false,
             modalColor: '#000000',
             opacity: 0.7
         });
    });     
}
 

function close_popup_card_vip(){
    jQuery('#popup_card_vip').bPopup().close(); 
} 
jQuery("document").ready(function(){
    jQuery(".delete_card").click(function(){
		reset_discount_by_food();
        try{
            jQuery("#room_id").removeAttr("disabled").removeClass("NONE");
        }catch(err){

        }
        /*jQuery(this).addClass("hide");
        jQuery("input[name=card_id]").val(0);
        jQuery("input[name=card_level]").val(0);
        jQuery("#if_cus").html("");
        jQuery("#if_card").html("");*/
		resettraveller();
    });
});
	function set_card(card_id,birthdate,callback){ 
        // reset_card();
        if(card_id!= 0 && card_id!= '' && card_id!= null){
            jQuery(".show_vip").show(400);
            jQuery("#icon_card").html(card_id);
            jQuery("#card_id").val(card_id);
            jQuery("#pay-note").val('Giảm giá thẻ vip');
            jQuery("#discount_vip").addClass("disable").attr("readonly","");
            get_if_card( card_id ,birthdate,callback);
   // console.log( birthdate);
        } 
    }

    function reset_card(){
        jQuery(".show_vip").hide(300);
        jQuery("#icon_card").html('');
        jQuery("#card_id").val(0);
        jQuery("#money_spend_card_vip").html('').hide();
        jQuery("#is_spend_card").val(0);
        jQuery("#discount_money_vip").val( 0 ).removeAttr("readonly");
        jQuery("#discount_vip").removeClass("disable").removeAttr("readonly").val(0);
        try{  
            updateTotalPayment();
        }catch(err){

        }
		try{ 
            calculate(); 
        }catch(err){

        }
    } 
function get_discount(discount,customer,callback){ 
    if(discount == null || discount == 0){
        // vtr_input_discount.val(discount).attr("readonly","").addClass("disable");
    }else{
		 
        vtr_input_discount.val(discount).attr("readonly","").addClass("disable");

    } 
	//set_card(customer.card_id,customer.birthdate,callback);
	
	if( customer.urlava == null ){
		jQuery("#avatarcmnd").attr("src",'assets/img/ava.jpg');
	}else{
		jQuery("#avatarcmnd").attr("src",customer.urlava);jQuery(".img-rounded").attr("src",customer.urlava);
	}
    jQuery(".delete_card").removeClass("hide");
    jQuery("#if_cus").html(""+customer.first_name+" "+customer.last_name);
    jQuery("#if_card").html("card id: "+customer.card_id+" <br>Type: "+LIST_CARD_TYPE[customer.card_type_vip].name );
    jQuery("input[name='card_level_name']").val(LIST_CARD_TYPE[customer.card_type_vip].name);
	jQuery("input[name='fullname_vip']").val(customer.first_name+" "+customer.last_name);
	jQuery("input[name=card_id]").val(customer.card_id);jQuery("#icon_card").html( customer.card_id );
    jQuery("input[name=card_level]").val(customer.card_type_vip);
    
		try{  
            updateTotalPayment();
            if( jQuery("#room_id").val() == 0 ){
                jQuery("#room_id").attr("disabled","").addClass("NONE");
            }
        }catch(err){

        }
        try{ 
             calculate(); 
             if( jQuery("#room_id").val() == 0 ){
                jQuery("#room_id").attr("disabled","").addClass("NONE");
            }
        }catch(err){

        }
    if(discount != null){    
         jQuery('#popup_card_vip').bPopup().close();
    }
    if(callback)callback;
}


function resettraveller(){ 
    vtr_input_discount.val(0).removeAttr("readonly","").removeClass("disable");  
	jQuery("#avatarcmnd").attr("src",'assets/img/ava.jpg'); 
	jQuery(".img-rounded").attr("src",'assets/img/ava.jpg'); 
    jQuery(".delete_card").addClass("hide");jQuery("#discount_all").val(0);
    jQuery("#if_cus").html("");
    jQuery("#if_card").html("");
	jQuery(".show_vip").hide();
	jQuery("#discount_money_vip").val(0);
    jQuery("input[name=card_id]").val('');
    jQuery("input[name=card_level],input[name=card_level_name],input[name=fullname_vip]").val(''); 
     try{ 
            calculate(); 
        }catch(err){

        } 
        try{  
			jQuery("#hotel_reservation_room_id").val(0);
			jQuery("#full_name").html('');
            updateTotalPayment();
        }catch(err){

        } 
}
