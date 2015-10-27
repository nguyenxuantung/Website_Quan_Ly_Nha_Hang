
/******************************************************************
 COPY RIGHT BY EZ Cloud Joint Stock Company
 
 WRITTEN BY MEMBELL
 *******************************************************************/
 
var total = {};
/*create bien*/
//var folio_id = 0;
//var reservation_traveller_id 		= 0;
var reservation_room_id = 0;
var data_room_checkin_old = {};
var data_traveller_old = {}; 
var tax_amoun = 0;
var service_amount = 0;
var customer_id = 0;
var draf = {};
var draf_cat = '';
var price_focus = 0;
var r_r_idok = 0;
var status_in = 1;
var room_id_a = null;
var check_payment = 0;
var data_room_checkin = {};
var arr_serviceed = {};
function close_popup() {
    jQuery("#popup_paid").bPopup().close();
    window.location.reload();
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
function number_format(nStr, dec)
{ 
    var val = parseFloat((""+nStr).replace(/\,/g,""));
    if (dec)
        return val.formatMoney(dec);
    else 
        return val.formatMoney(0); 

    //nStr = format_number(nStr,2);
    /*nStr += '';
    
    x = nStr.split(',');
    x1 = x[0];
    //x2 = x.length > 1 ? '.' + x[1] : '';

    //duc them
    var decimals = dec;
    if (x.length > 1) {
        var x2 = new String(x[1]);
        x2 = String(Math.round(parseFloat(x[1]) / Math.pow(10, (x2.length - decimals))));
        while (x2.length < decimals) {
            x2 = '0' + x2;
        }
        x2 = ',' + x2;
    } else {
        var x2 = '';

        if (dec > 0)
        {
            x2 += ',';
            while (x2.length <= decimals) {
                x2 += '0';
            }
        }
    }
    //end edit

    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;*/
}


function get_remaining() {
    // alert(jQuery("#total_popup").val());
    return jQuery("#total_popup").val().replace(/\,/g, ""); 
}


function list_serviced(idm,callback) {
    //console.log("fid", idm);
    list_total_service_hide();
    tmpurl = 'process_folio.php?get_folio_by_Id=1&folio_id=' + idm + '#' + Math.random();
    jQuery.ajax({
        type: 'POST',
        url: tmpurl,
        dataType: 'json',
        success: function(data) {
            console.log("------");
            console.log(data);
            arr_serviceed = data;
            if (data['ok'] != -1  ) { 
                jQuery.each(data['data_service'], function(key, value) {
					jQuery("#tab_"+key).show();
                    jQuery.each(value, function(key1, value1) {
                        var op = jQuery("tr#sp_" + key + key1).find("button");
                        draf = value1;
                        draf_cat = key; 
                        if( !jQuery("tr#sp_" + key + key1).hasClass("hided") ){
                            select_service(op, 3,value1.percent);  //console.log(3);
                        }else{
                            select_service(op, 1   );//console.log(1);
                        } 
                    });
                });

                
                jQuery("#right_content div div.main_arcor table tr").each(function() {
                    var op = jQuery(this);
                    var cat = data['data_service'][op.find("button").attr("typetr")];
                    if (typeof (cat) != 'undefined') {
                        var idmm = cat[op.attr("key")];
                        if (typeof (idmm) != 'undefined') {
                            if (idmm['type'] != 'DEPOSIT') {
                                op.attr("count", idmm['id']);
                            } else {
                                op.attr("count", idmm['id']);
                                // op.attr("dcount",idmm['id']);
                            }

                            //price_focus = op.find(".price_service input").val();
                            //price_focus = price_focus.replace(/\./g, "").replace(/\,/g, "");
                           
                            op.find("input.percent").val(idmm['percent']); 
                            var price =   idmm['amount'].replace(/\,/g, "");
                            //var tax_amount =   idmm['tax_amount'].replace(/\,/g, "");
                            //var service_amount =   idmm['service_amount'].replace(/\,/g, ""); //console.log("price"+price);
                            op.find(".price_service input").val(number_format(price, 0));
							//op.find(".price_service input").attr("net_amount",idmm['total_amount']);

                            /*Lay gia tri lon nhat co the thanh toan cua serrvice do*/
                            try {
                                //console.log(parseFloat(jQuery("#sp_" + op.find("button").attr("typetr") + op.attr("key") + " td strong.rem").html().replace(/\,/g, "")));
                                var remaining = parseFloat(price) + parseFloat(jQuery("#sp_" + op.find("button").attr("typetr") + op.attr("key") + " td strong.rem").html().replace(/\,/g, ""));
                            } catch (error) {
                                var remaining = parseFloat(price);
                            } 
                            price_focus = parseFloat(price);
                            //console.log('-------------');
                                                                                    
                           // console.log(parseFloat(service_amount)+parseFloat(tax_amount));
                            //price_focus1 = price-service_amount-tax_amount;                                                                                                                
                            remaining_serveice(op.find("button").attr("typetr"), idmm['invoice_id'], price );
                            
                            check_max_value(op.find(".price_service input"),0);
                        }
                    }
                });
                
                reservation_traveller_id = data['reservation_traveller_id'];
                reservation_room_id = data['reservation_room_id'];
                room_id_a = reservation_traveller_id;
                // list_room_right(reservation_room_id);
                if(callback)callback();
                check_paid();

            }
            //list_total_service_hide();
        },
        error: function() {
            //message('error','auto_list_ourdor_sale Lỗi kết nối database',jQuery("#cuc-error"));
        }
    });
}






function view_invoice() {
   jQuery.post(
         'process_folio.php?check_delete_folio=1&folio_id='+folio_id, 
         {
         }).done(function(data) 
          {  
            console.log(data);
            if(data == 0){
                    message('warning', 'Folio đã bị hủy, hãy kiểm tra lại', jQuery("#cuc-error"));
                    setTimeout((function() {
                        window.parent.location.reload();
                        //location.parent().replace("?page=reservation&cmd=edit&id=" + id + "&r_r_id=" + r_r_id);                        
                            //window.location.reload();   
                    }), 3000);
                    }
                    else{
                        window.open("?page=reservation&cmd=show_invoice_new&id=" + id + "&r_r_id=" + r_r_id + "&folio_id=" + folio_id);
                    }
                   
          })
         .fail(function(data) { 
           
          })
         .always(function () { 
          });
}

function remaining_serveice(type, idm, remaining) { /*
 var op = jQuery("#hide_"+type+idm+" td button");
 var index      = op.attr("index");
 // jQuery("#hide_"+index).removeClass("active_service").addClass("hide_service");
 jQuery("tr#sp_"+index).css("background","none");
 jQuery("tr#sp_"+index).find("button").removeClass("selected").css("display","block");
 jQuery("#SP_"+type+idm+" td.remaining_service").html(number_format(remaining,0));
 jQuery("#SP_"+type+idm+" td button").attr("price",number_format(remaining,0));*/
 //console.log(type, idm, remaining);
    var op = jQuery("#hide_"+type+idm+" td button");
    var index      = op.attr("index");
    var t = jQuery("#SP_" + type + idm + " td button").attr("price");
    
    if (t != 0 && t != "") {
        //console.log("TDN","tr#sp_" + index, t);
        jQuery("tr#sp_" + index).css("background", "none");
        jQuery("tr#sp_" + index).find("button").removeClass("selected").css("display", "block");
    }

    jQuery("#hide_" + type + idm + " td.price_service input").attr("maxvalue", remaining);

}
/*----------------------------NHAN BAN------------------------*/
// Name:        list_room_right
// Author:      Membell
// Time:        00:40 01/07/2014
// Parameter:   
// Description: load list room right
function list_room_right(idm) {
	 //console.log(data_room_checkin);
    jQuery("#room_change_right").html('');
    jQuery("#room_change_right").append("<option>" + "change room" + "</option>");
    try{
       
    jQuery.each(data_room_checkin, function(key, value) {
        //console.log("key: " + key + " r_r_id:" + r_r_id);
if( value.reservation_id == jQuery("#reservation_id").val() ){
        if ( key == r_r_id ) {
            var tmp = '<option value="[XX_VALUE_XX]" selected>[XX_ROOM_XX]</option>';
        } else {
            var tmp = '<option value="[XX_VALUE_XX]">[XX_ROOM_XX]</option>';
        }

        if (value.name != null) {
            tmp = tmp.replace("[XX_ROOM_XX]", value.name);
            tmp = tmp.replace("[XX_VALUE_XX]", key);
        } else {
            tmp = tmp.replace("[XX_ROOM_XX]", "No room/" + key);
            tmp = tmp.replace("[XX_VALUE_XX]", key);
        }

        jQuery("#room_change_right").append(tmp);
    }
        //jQuery("#room_change_right").val(r_r_id);
        //list_traveller(r_r_id,room_id_a);
    });
    }catch(err){

    }
    //if(idm!=null){
        // jQuery("#room_change_right").val(idm);
    //list_traveller(r_r_id,room_id_a);
    //} 

}

// Name:        list_traveller
// Author:      Membell
// Time:        00:47 01/07/2014
// Parameter:   
// Description: load list traveller in room
function list_traveller(room, idm) {
    //console.log(data_traveller[room] );
    jQuery("#traveller_option").html("");
    if (room != null && typeof (data_traveller[room]) != 'undefined') {
        jQuery.each(data_traveller[room], function(key, value) {
            if( value.traveller_id == traveller_id ){
                var tmp = '<option value="[XX_VALUE_XX]" selected>[XX_TRAVELLER_XX]</option>';
            }else{
                var tmp = '<option value="[XX_VALUE_XX]">[XX_TRAVELLER_XX]</option>';
            }
            
            tmp = tmp.replace("[XX_TRAVELLER_XX]", value.first_name + ' ' + value.last_name);
            tmp = tmp.replace("[XX_VALUE_XX]", value.traveller_id);
            jQuery("#traveller_option").append(tmp);
        });
        jQuery("#traveller_option").val(traveller_id);
        get_reservation_traveller_id();
    } else {
        // this.reservation_traveller_id 	= '0'; 
        // jQuery("#traveller_option").append("<option value='0' >No customer</option>");
    }
    if (idm != null) {
        jQuery("#traveller_option").val(idm);
    }
}

function get_reservation_traveller_id() {
    reservation_traveller_id = jQuery("#traveller_option").val();
    jQuery("#traveller_option").change(function() {
        reservation_traveller_id = jQuery("#traveller_option").val();
    });
}

/*--------------------------END NHAN BAN---------------------------*/



function create_row_serviced(item, key1) {
	//alert('bo may');
	console.log('test');
    console.log(item);
    // console.log(key1);*/
    //console.log(item);
    var price = 0;
    var total_vat = 0;
    try {
        price = item.amount.replace(/\,/g, "");
    }
    catch (err) {
        price = 0;
    }
    price = parseInt(price)  ;
    // console.log(price);
    //add_total(price, jQuery("#total_print"));
    //add_total(item.service_amount, jQuery("#total_service_amount"));
    //add_total(item.tax_amount, jQuery("#total_tax_amount"));
    total_vat += parseInt(price) + parseInt(item.tax_amount) + parseInt(item.service_amount);
    //console.log("bill: "+jQuery("#price_" + key1 + "_all").html());
    var tmp_p = jQuery("#price_" + key1 + "_all").html().replace(/\,/g, "");
    //jQuery("#price_" + key1 + "_all").html(number_format(parseInt(price) + parseInt(tmp_p), 0));

    //add_total(total_vat, jQuery("#total_vat"));
   
    //alert(price);
    //console.log( price);
    //add_total( price, jQuery("#total_print") );
    //add_total( item.service_amount, jQuery("#total_service_amount") );
    //add_total( item.tax_amount, jQuery("#total_tax_amount") );
    //add_total( parseInt(price), jQuery("#total_vat") );
    //add_total( parseInt(price), jQuery("#total_remaining") );
    jQuery.each(item.folio_id, function(i, va) {
        price -= va;
    });
    //alert(price);
      price = number_format(price, 0);
   
    var t = item.description.split('_');
    var tmp = '<tr r_r_id="'+t[0]+'" id="hide_' + key1 + item.invoice_id + '" key="' + item.invoice_id + '" class="active_service">'
            + '<td width="10%" class="date_use">' + item.date + '</td>'
            + '<td width="40%" class="room_name">' + t[1] + '</td>'
            + '<td width="15%">'
            + '<input class="percent" type="text" style="width: 30px; float:left; margin-right:10px;"  typetr="' + key1 + '"   index="' + key1 + item.invoice_id + '" net_amount="'+item.net_amount+'"  svalue="' + price + '" maxlength="3" onkeyup="keyup_price(jQuery(this));" value="' + item.percent + '"><span>%</span>'
            + '</td>'
            + '<td width="17%" align="right" class="price_service" service_amount="' + item.service_amount + '" tax_amount="' + item.tax_amount + '"><input class="price_fomat" type="text" style="width: 90px;  margin-right:10px;text-align: right;" onkeyup="check_max_value(jQuery(this),0)"  value="' + price + '" maxvalue="' + price + '"/></td>'
            + '<td width="8%"><button index="' + key1 + item.invoice_id + '" typetr1="' + item.invoice_id + '" typetr="' + key1 + '" onclick="delete_service1('+item.folio_id+',jQuery(this));" class="next_folio  ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-trash"></span><span class="ui-button-text"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"></span></span></button></td>'
            + '</tr>';
    jQuery("#hide_" + key1).append(tmp);

    
    jQuery("#hide_" + key1 + item.invoice_id + " input.price_fomat").focus(function() {
         price_focus = jQuery(this).val().replace(/\,/g,""); 
    });
    
    jQuery("#hide_" + key1 + item.invoice_id + " input.price_fomat").keyup(function() {
         price_focus = jQuery(this).val().replace(/\,/g,""); 
    }); 
}
function unformat_number(value) {
    return value.replace(/\,/g, "");
}

function check_max_value(op,status) {
    //console.log(op, status);
    status_in = status;
    var max = unformat_number(op.attr("maxvalue"));
    var va = unformat_number(op.val());
    max = parseFloat(max);
    va = parseFloat(va);
    // console.log(va+'=='+max);
    if (va > max) {
        op.val(number_format(price_focus, 0));
        message('warning', 'Số tiền đang lớn hơn tiền dịch vụ', jQuery("#cuc-error"));
    } else {
        op.attr('value',number_format( va,0));
        var op2 = op.parent().parent().find("input.percent");
		
        op2.attr("svalue", number_format(va, 0));
       //membell
        // console.log("â",op2.attr("typetr"),price_focus);
        
        keyup_price1(op2, price_focus);
        price_focus = op.val();
        //console.log("focus",price_focus);
		
    } 
}
function convert_pervent(op){
	var op2 = op.parent().parent().find("input.percent");
	var va  = parseFloat(op.val().replace(/\,/g, ""));
	var net = parseFloat(op2.attr("net_amount").replace(/\,/g, ""));
	//console.log("va "+va+" net:"+net+" kq:"+Math.round(va/net)*100);
	op2.val( (va/net) *100);
}

function keyup_price(op) {
    // console.log(1);
    var index = op.attr("index");
    var percent = op.val();
	//if( op.attr("svalue") )
    var money = op.attr("svalue");
    money = money.replace(/\,/g, "");

    var op2 = jQuery("tr #hide_" + index).find(".price_service input");
    var tmp_price = op2.val();
    tmp_price = tmp_price.replace(/\,/g, "");

    percent = (percent == '') ? 0 : percent;
    percent = parseFloat(percent);
    money = parseFloat(money);
    var type = op.attr("typetr");
    op2.val( number_format( parseFloat( percent * 0.01 * money ), 0 ) );
    // console.log('tmp_price: '+tmp_price+ ' money: '+money+' total:'+number_format(parseInt(percent*0.01*money))+' type:'+type );
    //console.log("update_total",parseInt(percent * 0.01 * money), tmp_price, type,0);
    update_total(parseFloat(percent * 0.01 * money), tmp_price, type,0);
}

function keyup_price1(op, pricel_old) {
    //console.log(pricel_old);
    var index = op.attr("index");
    var percent = op.val();
    var money = op.attr("svalue");
    money = money.replace(/\,/g, "");

    var op2 = jQuery("tr #hide_" + index).find(".price_service input");
    // var tmp_price 	= op2.val();
    try {
        pricel_old = pricel_old.replace(/\,/g, "");
    } catch (err) {
        //console.log(err.message);
        pricel_old = 0;
    } 
    percent = (percent == '') ? 0 : percent;
    percent = parseFloat(percent);
     
    money = (money=='')?0:parseFloat(money);
    var type = op.attr("typetr");
    op2.val(number_format(parseFloat( money), 0));
    //console.log('pricel_old: ' + pricel_old + ' money: ' + money + ' total:' + number_format(parseInt(percent * 0.01 * money)) + ' type:' + type);
    update_total(parseFloat(  money), pricel_old, type,status_in);
}

function add_total(money, op) {  
    var tmp = op.html();
    //console.log(money,tmp,op.attr("id"));
    tmp = (tmp=='')?0:tmp.replace(/\,/g, "");
    if ( $.isNumeric(tmp) && $.isNumeric(money) ) { 
         
            tmp = parseFloat(tmp);
            op.html( number_format( tmp + money,0 ) );   
            
        
    }

    
}

function update_total_de( money, old, total_service, total_tax, type,status) { 
    // console.log(total_tax);
    if (type == 'DISCOUNT' || type == 'DEPOSIT') {
        add_total(-(money - old), jQuery("#total_print"));
        //console.log(money, old, type, status);
        add_total( -(money - old), jQuery("#price_" + type + "_all") );
        add_total( -(money - old), jQuery("#total_vat") );
        add_total( -(money-old),jQuery("#total_remaining") );
        /*if( parseFloat(jQuery("#total_remaining").html().replace(/\,/g, "")) < un_money   ){
            jQuery("#total_remaining").html(0);
        }*/
    } else { 
        add_total(money - old + total_service + total_tax, jQuery("#total_print"));
        add_total(money - old, jQuery("#price_" + type + "_all"));
        add_total(money - old, jQuery("#total_vat"));
        add_total(-total_service,jQuery("#total_service_amount"));
        add_total(-total_tax,jQuery("#total_tax_amount"));
        add_total(money - old, jQuery("#total_remaining"));
        /*if( parseFloat(jQuery("#total_remaining").html().replace(/\,/g, "")) < un_money   ){
            jQuery("#total_remaining").html(0);
        }*/
    }
}

function update_total(money, old, type,status) { 
    if (type == 'DISCOUNT' || type == 'DEPOSIT') {
        //add_total(-(money - old), jQuery("#total_print"));
        //console.log(money, old, type, status,jQuery("#price_" + type + "_all").html());
        add_total(-(money - old), jQuery("#total_print"));
        add_total( -(money - old), jQuery("#price_" + type + "_all") );
        add_total( -(money - old), jQuery("#total_vat") );
        add_total( -(money-old),jQuery("#total_remaining") );
    } else {
        if(status == 0){
            add_total(money - old, jQuery("#total_print"));
            add_total(money - old, jQuery("#price_" + type + "_all"));
            add_total(money - old, jQuery("#total_vat"));
            add_total(money - old, jQuery("#total_remaining"));
        }else{ 
            if (money - old > 0){
                add_total(money - old, jQuery("#total_print"));
                add_total(money - old, jQuery("#price_" + type + "_all"));
                add_total(money - old, jQuery("#total_vat"));
                add_total(money - old, jQuery("#total_remaining"));
            }
        }
    }
}
 
 

function check_paid() {
    tmpurl = 'process_folio.php?check_paid=1&folio_id=' + folio_id + '#' + Math.random();
    jQuery.ajax({
        type: 'POST',
        url: tmpurl,
        dataType: 'json',
        success: function(data) {
            var tmp = data.total; 
            var total_vat = parseFloat(jQuery("#total_vat").html().replace(/\,/g, ""),0); 
            var total = (( Math.abs( total_vat - (tmp.total_amout) ) <un_money )?0:(total_vat - (tmp.total_amout)) );
            if (tmp.total_amout != null) { 
                jQuery("#total_remaining").html( number_format(total,0) ); 
            }
// console.log(tmp.total_amout);
            if( Math.abs( parseInt(jQuery("#total_remaining").html(  ).replace(/\,/g, "")) )  < un_money ){
                jQuery("#total_remaining").html(  0 );
                // console.log("bo qua");
            }
        },
        error: function() {
            //message('error','auto_list_ourdor_sale Lỗi kết nối database',jQuery("#cuc-error"));
        }
    });
}


function delete_service(op) {
    
    
    var index = op.attr("index");
    jQuery("#hide_" + index).removeClass("active_service").addClass("hide_service");
    jQuery("tr#sp_" + index).css("background", "none");
    jQuery("tr#sp_" + index).find("button").removeClass("selected").css("display", "block");

    var money               = jQuery("#hide_" + index).find(".price_service input").val();
    var total_service       = parseFloat(jQuery("#hide_" + index).find(".price_service").attr("service_amount"));
    var total_tax           = parseFloat(jQuery("#hide_" + index).find(".price_service").attr("tax_amount"));
    var type = op.attr("typetr");
    money = money.replace(/\,/g, "");
    money = parseFloat(money);
    jQuery("tr#sp_" + index).find("button").attr("price",money);
    update_total_de(0, money,total_service,total_tax, type,0);
}
function delete_service1(idm,op) {
    var type = op.attr("typetr");
    var invoice = op.attr("typetr1");
        jQuery.post(
                "process_folio.php?check_delete_service1=1&type=" + type + "&invoice_id=" + invoice + "&id=" + idm + "#" + Math.random(),
                {
                }).done(function(data)
        {
            //console.log(data);
			var  info =jQuery.parseJSON(data);
			if(data==0){
			
				//var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id;
			     var index = op.attr("index");
                jQuery("#hide_" + index).removeClass("active_service").addClass("hide_service");
                jQuery("tr#sp_" + index).css("background", "none");
                jQuery("tr#sp_" + index).find("button").removeClass("selected").css("display", "block");
            
                var money               = jQuery("#hide_" + index).find(".price_service input").val();
                var total_service       = parseFloat(jQuery("#hide_" + index).find(".price_service").attr("service_amount"));
                var total_tax           = parseFloat(jQuery("#hide_" + index).find(".price_service").attr("tax_amount"));
                var type = op.attr("typetr");
                money = money.replace(/\,/g, "");
                money = parseFloat(money);
                jQuery("tr#sp_" + index).find("button").attr("price",money);
                update_total_de(0, money,total_service,total_tax, type,0);
				//message('tsuccess', 'Xóa folio ' + idm + ' thành công', jQuery("#cuc-error"));
				//location.replace(url);
            }else if(info['ok']== -1){
                message('warning', folio_da_thanh_toan_khong_duoc_xoa_dich_vu, jQuery("#cuc-error"));
			}else{
              //  var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id;
//				message('twarning', info["error_message"], jQuery("#cuc-error"));
//                location.replace(url);
			}
            // console.log(data);

        }).fail(function() {

            message('warning', 'Vui lòng kiểm tra lại kết nối mạng nội bộ', jQuery("#cuc-error"));
        }).always(function() {

        });
    
    
    
    //	tmpurl = 'process_folio.php?check_delete_service1=1&id='+a;
//	jQuery.ajax({
//		type: 'GET',
//		url: tmpurl,
//		dataType: 'json',
//		success: function(data) {
//		  var  info =jQuery.parseJSON(data);
//			if(data==0){
//			 alert('12345');

	//		}else{
				//message('warning','Phòng của dịch vụ này đã checkout');
				//alert('123456789');
      //          message('warning', '123453333333', jQuery("#cuc-error"));
//			}
//		}
//	});
    
    
}

function delete_service_old(op,tmp_op) {
	tmpurl = 'process_folio.php?check_delete_service=1&id='+op;
	jQuery.ajax({
		type: 'GET',
		url: tmpurl,
		dataType: 'json',
		success: function(data) {
			if(data==0){
				delete_service(tmp_op);
			}else{
				//message('warning','Phòng của dịch vụ này đã checkout');
				if(  confirm('Phòng của dịch vụ này đã checkout. \n Bạn muốn có tới phòng trước đó?') ){
					window.open('?page=reservation&cmd=edit&id='+data.reservation_id+'&r_r_id='+data.id+'');
				}
			}
		}
	});
}

var hasFutureDate = false;
var sendFutureDate = true;
function change_all_category(op) {
    var quay = op.parent().parent().next().find("table tr");
    var today = new Date();
    var next_date = time_next_date.split(":");
    if (today.getHours()*60 + today.getMinutes() > parseInt(next_date[0])*60 + parseInt(next_date[1]) ) {
        today = new Date( new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() + 24*60*60*1000);//next day
        //alert(today);    
    }
    else
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (!displayed_alert) {
        hasFutureDate = false;
        var idx = 0;
        quay.each(function() {
            //select_service(jQuery(this).find("button"), 0);
            var roomDateStr = jQuery(this).children().first().html();
            var dateParts = roomDateStr.split("/");
            var roomDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            idx++;
            startDate = roomDate;
            if (jQuery(this).attr("id").indexOf("ROOM")>=0)
            if ((roomDate>today)||(roomDate>=today && idx==1)) {
                hasFutureDate = true;
            }
        
    });
    }
    
    if (hasFutureDate && !displayed_alert) {
        displayed_alert = true;
        sendFutureDate = confirm("Bạn đang chuyển cả tiền của những ngày trong tương lai. Bạn có muốn chuyển tiền của những ngày này không?");
    }
    var idx = 0;
    quay.each(function() {
        idx++;
        if (sendFutureDate || (jQuery(this).attr("id").indexOf("ROOM")==-1)) {
            select_service(jQuery(this).find("button"), 0);
        }
        else {
            var roomDateStr = jQuery(this).children().first().html();
            var dateParts = roomDateStr.split("/");
            var roomDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            if ((roomDate<today)||(roomDate==today && idx==1)) {
                select_service(jQuery(this).find("button"), 0);
            }
        }
    });
}

function change_all_one_room(op) {
    var parent = op.parent().parent().parent();
    parent.find("div.accordion").each(function() {
        
        change_all_category(jQuery(this).find("h3 button"));
    });
}
function change_all_one_room2(op) {
    var parent = op.parent();//.parent().parent();
    parent.find("div.accordion").each(function() {
        
        change_all_category(jQuery(this).find("h3 button"));
    });
}
function change_all() {
    displayed_alert = false;
    jQuery("div.left_aside div div#tmp_ROOM").each(function() {
        //console.log(jQuery(this).find("h3 button").attr("class"));
        if (jQuery(this).is(":visible") == true)
        if (!jQuery(this).find("h3 button").hasClass("selected")) {
           
            if (jQuery(this).find("h3 button").hasClass("kROOM")) {
                change_all_one_room2(jQuery(this));
            }
        }
    });
    displayed_alert = false;
}
var displayed_alert = false;

function change_all_room() {
    displayed_alert = false;
    jQuery("div.left_aside div div#tmp_ROOM").each(function() {
		//alert(this); 
        //console.log(this);
        if (jQuery(this).is(":visible") == true)
        change_all_category(jQuery(this).find("h3 button"));
    });
    displayed_alert = false;
}

function new_folio() {
    var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id;
    location.replace(url);
}
function check_payment(){

}
function delete_folio() {
// if(check_payment == 0){
        if (jQuery("#lydo").val().length>0) {
                
            } else {
                message('warning',ban_phai_nhap_ly_do_huy_folio,jQuery("#cuc-error"));
                jQuery("#lydo").focus();
                return false;
            }
    var idm=jQuery("#popup_delete_folio .test").html();
    var description_avoid = jQuery("#lydo").val();
    //alert(description_avoid);
    //if (confirm("Click xác nhận xóa Folio " + idm)) {
        
        jQuery.post(
                "process_folio.php?folio_delete=1&description="+description_avoid+ "&folio_id=" + idm + "#" + Math.random(),
                {
                    
                }).done(function(data)
        {
            //console.log(data);
            
			var  info =jQuery.parseJSON(data);
			if(info['ok']==1){
				var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id;
				message('tsuccess', huy_folio_thanh_cong, jQuery("#cuc-error"));
				location.replace(url);
            }else if(info['ok']==3){
                message('warning', ton_tai_dich_vu_cua_phong_da_checkout, jQuery("#cuc-error"));
			}else{
                var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id;
				message('twarning', info["error_message"], jQuery("#cuc-error"));
                location.replace(url);
			}
            // console.log(data);

        }).fail(function() {

            message('warning', vui_long_kiem_tra_ket_noi, jQuery("#cuc-error"));
        }).always(function() {

        });
    //}
	/*}else{
		message('warning','Đã có thanh toán cho folio này nên không xóa được',jQuery("#cuc-error"));
	}*/
}



function message(event, messagei, thism) {
    var check_t = 0;
    jQuery("#cuc-error").css('display', 'block');
    switch (event) {
        case 'error':
            var mmessage = '<div class="alert  alert-error flipInX">'
                    + '<a class="close" data-dismiss="alert">×</a>'
                    + '<strong>Error:</strong>'
                    + ' ' + messagei
                    + '</div>';
            localStorage.stmessage = 0;
            break;
        case 'success':
            var mmessage = '<div class="alert  alert-success flipInX">'
                    + '<a class="close" data-dismiss="alert">×</a>'
                    + '<strong>Success:</strong>'
                    + ' ' + messagei
                    + '</div>';
            localStorage.stmessage = 0;
            break;
        case 'warning':
            var mmessage = '<div class="alert  alert-info flipInX">'
                    + '<a class="close" data-dismiss="alert">×</a>'
                    + '<strong>Warning:</strong>'
                    + ' ' + messagei
                    + '</div>';
            localStorage.stmessage = 0;
            break;
            case 'warning1':
            var mmessage = '<div class="alert  alert-info flipInX">'
                    + '<a class="close" data-dismiss="alert">×</a>'
                    + '<strong>Warning:</strong>'
                    + ' ' + messagei
                    + '</div>';
            localStorage.stmessage = 0;
            break;
        case 'terror':
            check_t = 1;
            localStorage.message = messagei;
            localStorage.stmessage = 'error';
            break;
        case 'tsuccess':
            check_t = 1;
            localStorage.message = messagei;
            localStorage.stmessage = 'success';
            break;
        case 'twarning':
            check_t = 1;
            localStorage.message = messagei;
            localStorage.stmessage = 'warning';
            break;
    }
    if (check_t == 0) { 
        if (!thism.find("div.alert").hasClass("flipInX")) {
            thism.append(mmessage);
            
            jQuery("iframe").remove();
        }
		if(event == 'warning1'){
			setTimeout(function() {
				jQuery("a.close").parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
					jQuery("#cuc-error").css('display', 'none');
				});
			}, 8000);
		}
		if(event != 'error' & event != 'warning1' ){
			setTimeout(function() {
				jQuery("a.close").parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
					jQuery("#cuc-error").css('display', 'none');
				});
			}, 3000);
		}
		
        jQuery("a.close").click(function() {
            jQuery(this).parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
                jQuery("#cuc-error").css('display', 'none');
            });
        });
    }
}


function update_total_pupop(money, value) {
    // console.log('total: '+money+'-'+value); 
    // value = Math.round(value/number_round)*number_round;
    // console.log('total: '+money+'-'+value); 
    var price = parseInt( jQuery("#total_popup").val().replace(/\,/g, "") );
    // console.log(money+'--'+value+'--'+(price + (money - value)) );
    kq = ( Math.abs((price + (money - value))) < un_money)?0:(price + (money - value) ) ;
    // kq =   (price + (money - value));
    // console.log("kq: "+kq);
    if (isNaN(money))
        money = 0;
	if( price != 0 ){
		if ( kq < 0 ) {
			return true;
		} else {
			jQuery("#total_popup").val(  kq  );
			return false;
		}
	}else{
		if ( kq < 0 ) {
			return true;
		} else {
			jQuery("#total_popup").val(   kq   );
			return false;
		}
	}
}

function reset_total_popup() {
    jQuery("#total_popup").val(jQuery("#total_vat").html());
}
jQuery(document).ready(function() {
 
status_in = 0;



    if (localStorage.stmessage != 0) {
        message(localStorage.stmessage, localStorage.message, jQuery("#cuc-error"));
    }
    /*------------------------*/
    /*----emulator data-------*/
    /*------------------------*/
    /*data_room         = { "101":{"id":"01","name":"101"},
     "102":{"id":"02","name":"102"},
     "103":{"id":"03","name":"103"}, 
     };*/

    /*	data_traveller    = { "101":{
     "01":{"id":"01","first_name":"nguyen hoang", "last_name":"long"},
     "02":{"id":"02","first_name":"le thi", "last_name":"minh"},
     "03":{"id":"03","first_name":"nguyen", "last_name":"an"} 
     },
     "102":{
     "04":{"id":"04","first_name":"nguyen", "last_name":"binh"},
     "05":{"id":"05","first_name":"le", "last_name":"giang"},
     "06":{"id":"06","first_name":"manh", "last_name":"quang"} 
     },
     "103":{
     "07":{"id":"07","first_name":"manh", "last_name":"hong"},
     "08":{"id":"08","first_name":"phi", "last_name":"ha"},
     "09":{"id":"09","first_name":"quang", "last_name":"anh"} 
     }
     };	*/

    /*data_service     = { "101":{
     "ROOM":{
     "01":{"id":"01", "date":"01/07/2014" ,"type":"room chart","price":"230.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"},
     "02":{"id":"02", "date":"02/07/2014" ,"type":"room chart","price":"230.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"},
     "03":{"id":"03", "date":"03/07/2014" ,"type":"room chart","price":"230.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"}
     },
     "EXTRA_SERVICE":{
     "01":{"id":"01", "date":"01/07/2014" ,"type":"minibar","price":"20.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"},
     "02":{"id":"02", "date":"02/07/2014" ,"type":"bar","price":"30.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"},
     "03":{"id":"03", "date":"03/07/2014" ,"type":"đưa đón sân bay","price":"210.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"}
     },
     "DEPOSIT":{
     "01":{"id":"01", "date":"01/07/2014" ,"type":"Nợ","price":"100.000","reservation_id":"867","reservation_room_id":"1145","folio_id":"0","delete":"0"}
     },
     },
     "103":{
     "ROOM":{
     "04":{"id":"04", "date":"01/07/2014" ,"type":"room chart","price":"230.000","reservation_id":"867","reservation_room_id":"1146","folio_id":"0","delete":"0"},
     "05":{"id":"05", "date":"02/07/2014" ,"type":"room chart","price":"230.000","reservation_id":"867","reservation_room_id":"1146","folio_id":"0","delete":"0"},
     "06":{"id":"06", "date":"03/07/2014" ,"type":"room chart","price":"230.000","reservation_id":"867","reservation_room_id":"1146","folio_id":"0","delete":"0"}
     },
     "DEPOSIT":{
     "02":{"id":"02", "date":"01/07/2014" ,"type":"Nợ","price":"100.000","reservation_id":"867","reservation_room_id":"1146","folio_id":"0","delete":"0"}
     },
     },	 
     };*/



    category_service = {};


    /*------------------------*/
    /*----GET HTML DATA-------*/
    /*------------------------*/
    var option_room_left = jQuery("select#room_change_left").html();
    jQuery("select#room_change_left").html("");

    var option_room_right = jQuery("select#room_change_right").html();
    jQuery("select#room_change_right").html("");

    var option_traveller = jQuery("select#traveller_option").html();
    jQuery("select#traveller_option").html("");

    var row_service_left = jQuery(".left_aside").html();
    var row_service_left_type = jQuery(".left_aside .accordion").html();
    var row_service_left_detail = jQuery(".left_aside").find("table tbody").html();



    /*------------------------*/
    /*---------RUN MAIN-------*/
    /*------------------------*/
    get_folio_all(id, r_r_id);



    /*------------------------*/
    /*----------EVENT---------*/
    /*------------------------*/
    jQuery("select#room_change_right").change(function() {
        jQuery("a.close").parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
            jQuery("#cuc-error").css('display', 'none');
        });
        var tmp = jQuery(this).find("option:selected").val();
        list_traveller(tmp);
        var data = data_room_checkin[tmp];
        jQuery("#reservation_id").val(data['reservation_id']);
        r_r_idok = jQuery(this).val();
    });

    jQuery(".submit-button").click(function() { 
        if(jQuery("#reservation_id").val() != 0 && jQuery("#reservation_id").val() != '' ){
            if (jQuery("#right_content").find(".active_service").length>0) {
                if (confirm('Click ok để xác nhận tạo Folio')) 
                    save_folio();
                
            } else{
                message("warning","Folio đang rỗng",jQuery("#cuc-error"));
            }
        }else{
            message("warning","Folio id không hợp lệ",jQuery("#cuc-error"));
        }
    });

    jQuery(".update-button").click(function() {
        if(jQuery("#reservation_id").val() != 0 && jQuery("#reservation_id").val() != '' ){
            if (confirm('Click ok để xác nhận cập nhật Folio')) {
                save_folio();
            }
        }else{
            message("warning","Folio id không hợp lệ",jQuery("#cuc-error"));
        }
    });

    jQuery(".button_paid").click(function() {
        jQuery.post(
         'process_folio.php?check_delete_folio=1&folio_id='+folio_id, 
         {
         }).done(function(data) 
          {  
            console.log(data);
            if(data == 0){
                    message('warning', 'Folio đã bị hủy, hãy kiểm tra lại', jQuery("#cuc-error"));
                    setTimeout((function() {
                            window.parent.location.reload();   
                    }), 3000);
                    }
                    else{
                    }
                   
          })
         .fail(function(data) { 
           
          })
         .always(function () { 
          });

        if(jQuery("#room_change_right").val()=='change room')
        {
            var rrid = jQuery("#rrrid").val();
        }
        else
        {
            var rrid = jQuery("#room_change_right").val();
        }
        jQuery('#popup_paid .info').html(title_popup+" " + folio_id);
        inser_iframe('?page=reservation&cmd=add_payment&r_t_id=' + jQuery("#traveller_option").val() + '&id=' + jQuery("#reservation_id").val()  + '&r_r_\n\
id=' +  rrid + '&folio_id=' + folio_id, jQuery("#content_iframe"));
        popup(jQuery("#popup_paid"));
        jQuery("#total_popup,#total_popup_ok").val(jQuery("#total_vat").html());

    });



    /*------------------------*/
    /*----------MAIN---------*/
    /*------------------------*/ 
  
  
  
    function close_message() {
        jQuery("a.close").parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
            jQuery("#cuc-error").css('display', 'none');
        });
    }
    function get_folio_all(id, r_r_id) {
        tmpurl = 'process_folio.php?folio_get_all_info=1&id=' + id + '&r_r_id=' + r_r_id;
        jQuery.ajax({
            type: 'GET',
            url: tmpurl,
            dataType: 'json',
            success: function(data) {
                var tmp = {};
                var tmp1 = {};
                tmp['id'] = 9999;
                tmp['name'] = 'Đặt cọc';
                tmp1['id'] = 8888;
                tmp1['name'] = 'Giảm giá';
                // data['data_room'].push(tmp);;
                // data['data_room']   = tmp;
				if(data.status == 'CHECKOUT'){
                    jQuery(".button_paid").hide();
                }
				//check_folio( data['data_service'] );
                data_room = data['data_room']; 
                data_room[9999] = tmp;
                data_room[8888] = tmp1; 
                data_room_checkin = data['data_room_checkin'];
                data_traveller = data['data_traveller_checkin'];
                data_service = data['data_service'];
                console.log(data);
                customer_id = data['customer_id'];
                data_room_checkin_old = data_room_checkin;
                data_traveller_old = data_traveller;
                list_item_folio(data['all_folio']);
                jQuery("#is_company").html(data['full_name']);
                list_room_left();
                list_room_right(id); 
                list_traveller(r_r_id);
                list_service(function() {
                    
                list_serviced(folio_id, function(){ list_traveller(r_r_id)  });
                    
                });
                //alert(folio_id);
                 
                
				//equal('membell', list_service);
                
                if (folio_id == 0) {
                    list_reservation_if(jQuery("#reservation_id").val());
                }

                $(function() {
                    $(".accordion").accordion({
                        event: "click",
                        active: false,
                        collapsible: true,
                        autoHeight: false
                    });
                });
            },
            error: function() {
                //message('error','auto_list_ourdor_sale Lỗi kết nối database',jQuery("#cuc-error"));
            }
        });
    }
	/*
	function check_folio(data){
	console.log(arr_serviceed);
		jQuery.each(data, function(key1, value1) {
			jQuery.each(value1, function(key2, value2) {
				jQuery.each(value2, function(key, value) {
					jQuery.each(arr_serviceed, function(key12, value12) {
						jQuery.each(value12, function(key11, value11) {
						console.log(arr_serviceed[key12]);
						});
					});
				});
			});
		}); 
	}
	*/

    function popup(op) {
        op.bPopup({
            fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 500, //can be a string ('slow'/'fast') or int
            modalClose: false,
            modalColor: '#000000',
            opacity: 0.7
        });
    }

    function close_popup() {
        jQuery("#popup_paid").bPopup().close();
    }


    function inser_iframe(url, op) {
        op.html('<iframe src="' + url + '" />');
    }



    function list_item_folio(items) {
        jQuery.each(items, function(key, value) {
            var re_a = ( value.re_amount == null ) ? 0:value.re_amount;
            var re_f = ( value.re_folio == null ) ? 0:value.re_folio;
            var check_folio =parseFloat( re_f ) -parseFloat(2*value.deposit)-parseFloat(value.payment) ;
            //var re_check = re_f/parseFloat(value.deposit);
            //var re_pay = parseFloat(value.payment);
            //if(re_check==2 && re_pay==0)
            //{
                //check_folio=0;
            //}
            create_item_folio(value.name,re_f,value.deposit,value.payment,key,value.last_name,check_folio,value.user_id,value.reservation_room_id);
        });
        jQuery(".main_folio").show();
    }

    // Name:        list_room_left
    // Author:      Membell
    // Time:        00:38 01/07/2014
    // Parameter:   
    // Description: load list room left
    function list_room_left() {
        jQuery.each(data_room, function(key, value) {
            if (key != 8888 & key != 9999) {
                var tmp = option_room_left;
                if (typeof (value.name) != 'null') {
                    tmp = tmp.replace("[XX_ROOM_XX]", value.name);
                    tmp = tmp.replace("[XX_VALUE_XX]", key);
                } else {
                    tmp = tmp.replace("[XX_ROOM_XX]", "*/" + key);
                    tmp = tmp.replace("[XX_VALUE_XX]", key);
                }
                jQuery("#room_change_left").append(tmp);
				
            }
			
        });
		var tmp = option_room_left;
		tmp = tmp.replace("[XX_ROOM_XX]", 'All');
		tmp = tmp.replace("[XX_VALUE_XX]", 0);
		jQuery("#room_change_left").prepend(tmp);
        
		jQuery("#room_change_left").change(function(){
			//console.log( jQuery(this).val() );
			show_room_folio( jQuery(this).val() );
		});
        // alert(reservation_room_id);
        // jQuery("#room_change_left").val(reservation_room_id);
    }
	
	
	function show_room_folio( idm ){
		jQuery( ".left_aside div.membell_folio" ).each(function(){
			var index = jQuery(this).attr("id");//console.log(index);
			index = index.replace("tmp1_", "");
			//console.log(index);
			if( idm != 0  && index != 9999 && index != 8888){
				if( index != idm ){
					jQuery(this).addClass("hide");
				}else{
					jQuery(this).removeClass("hide");
				}
			}else{
				jQuery(this).removeClass("hide");
			}
		});
	}
    // Name:        list_room_right
    // Author:      Membell
    // Time:        00:40 01/07/2014
    // Parameter:   
    // Description: load list room right
    function list_room_right(idm) {
        // console.log(data_room_checkin);
        jQuery("#room_change_right").html('');
        jQuery("#room_change_right").append("<option>" + "change room" + "</option>");
        jQuery.each(data_room_checkin, function(key, value) {
            if( value.reservation_id == jQuery("#reservation_id").val() ){
                if (key == r_r_id) {
                    var tmp = '<option value="[XX_VALUE_XX]" selected>[XX_ROOM_XX]</option>';
                } else {
                    var tmp = option_room_right;
                }

                // var tmp = option_room_right;
                if (value.name != null) {
                    tmp = tmp.replace("[XX_ROOM_XX]", value.name);
                    tmp = tmp.replace("[XX_VALUE_XX]", key);
                } else {
                    tmp = tmp.replace("[XX_ROOM_XX]", "No room/" + key);
                    tmp = tmp.replace("[XX_VALUE_XX]", key);
                }
                jQuery("#room_change_right").append(tmp);
            }
           // list_traveller(r_r_id);
        });
        if (idm != null) {
            // jQuery("#room_change_right").val(r_r_id);
            // list_traveller(r_r_id); 
        }
    }
    // Name:        list_traveller
    // Author:      Membell
    // Time:        00:47 01/07/2014
    // Parameter:   
    // Description: load list traveller in room
    function list_traveller(room) {
        //console.log(data_traveller );
        jQuery("#traveller_option").html("");
        if (room != null && typeof (data_traveller[room]) != 'undefined') {
            jQuery.each(data_traveller[room], function(key, value) {
                if( reservation_traveller_id == value.traveller_id ){
                    var tmp = '<option value="[XX_VALUE_XX]" selected>[XX_TRAVELLER_XX]</option>';
                }else{
                    var tmp = option_traveller;
                }
                // console.log( "reservation_traveller_id"+reservation_traveller_id+" value.traveller_id"+value.traveller_id+" tmp:"+tmp );
                tmp = tmp.replace("[XX_TRAVELLER_XX]", value.first_name + ' ' + value.last_name);
                tmp = tmp.replace("[XX_VALUE_XX]", value.traveller_id);
                jQuery("#traveller_option").append(tmp);
                jQuery("#traveller_option").val(reservation_traveller_id);
            });
            get_reservation_traveller_id();
        } else {
            reservation_traveller_id = '0';
            jQuery("#traveller_option").append("<option value='0' >No customer</option>");
        }
    }



    function get_reservation_traveller_id() {
        this.reservation_traveller_id = jQuery("#traveller_option").val();
        jQuery("#traveller_option").change(function() {
            this.reservation_traveller_id = jQuery("#traveller_option").val();
        });
    }








    // Name:        list_service
    // Author:      Membell
    // Time:        01:19 01/07/2014
    // Parameter:   
    // Description: load list service
    function get_category_service() {
        jQuery.each(data_service, function(key, value) {
            jQuery.each(value, function(key1, value1) {
                category_service[key1] = 1;
            });
        });
    }


	// Name:        rename
    // Author:      trungph
    // Time:        07:19 12/09/2015
    // Parameter:   
    // Description: rename service name
    function rename(key){
        var viet = new Array('Phòng','Minibar','DV Mở rộng','Đặt cọc','Trả lại','Hóa đơn Karaoke','Hóa đơn giặt là','Hóa đơn thiết bị trong phòng'
        , 'Hóa đơn nhà hàng','Hóa đơn SPA','Hóa đơn Tour','Hóa đơn điện thoại','Giảm giá');
        var anh = new Array('Room','Minibar','Extra Service','Deposit', 'Repay','Karaoke Invoice','Laundry Invoice','Equipment Invoice','Bar Invoice',
        'SPA Invoice','Tour Invoice','Phone Invoice','Discount');
        var language = 1;
        switch (key){
            case 'ROOM': 
                if (language==1) return viet[0];
                else return anh[0];
                break;
            case 'MINIBAR': 
                if (language==1) return viet[1];
                else return anh[1];
                break;
            case 'EXTRA_SERVICE':
                if (language==1) return viet[2];
                else return anh[2];
                break;
            case 'DEPOSIT':
                if (language==1) return viet[3];
                else return anh[3];
                break;
            case 'REPAY':
                if (language==1) return viet[4];
                else return anh[4];
                break;
            case 'KARAOKE':
                if (language==1) return viet[5];
                else return anh[5];
                break;
            case 'LAUNDRY':
                if (language==1) return viet[6];
                else return anh[6];
                break;
            case 'EQUIP':
                if (language==1) return viet[7];
                else return anh[7];
                break;
            case 'BAR':
                if (language==1) return viet[8];
                else return anh[8];
                break;
            case 'SPA':
                if (language==1) return viet[9];
                else return anh[9];
                break;
            case 'TOUR':
                if (language==1) return viet[10];
                else return anh[10];
                break;
            case 'PHONE':
                if (language==1) return viet[11];
                else return anh[11];
                break;
            case 'DISCOUNT':
                if (language==1) return viet[12];
                else return anh[12];
                break;
        }
    }
    // Name:        list_service
    // Author:      Membell
    // Time:        01:19 01/07/2014
    // Parameter:   
    // Description: load list service
    function list_service(callback) {
        console.log(data_service);
        jQuery.each(data_service, function(key, value) {
            total = {};
			var class_f = '';
            var tmp_p = data_room[key];
			jQuery("#room_change_left").val(r_r_id);
            //alert(group);
			//console.log(r_r_id);
			if( r_r_id ==0 || r_r_id == key || key == 8888 || key == 9999){
				//jQuery("#room_change_left").val(0);
			}else{
				class_f = 'hide';
				//jQuery("#room_change_left").val(r_r_id);
			}
			
            var tmp = ''
                    + '<div id="tmp1_' + key + '" class="membell_folio '+class_f+'">'
                    + '<div class="title_room">'
                    + '<div class="room">Room: ' + tmp_p['name'] + '</div>'
                    + '<div class="next_button"><button onclick="change_all_one_room(jQuery(this))"  class="next_folio   ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"></span></span></button></div>'
                    + '</div>';
            jQuery.each(value, function(key1, value1) {
                var tmp_detail = '';

                tmp += ''
                        + '<div class="accordion  ui-accordion ui-widget ui-helper-reset" id="tmp_' + key1 + '" role="tablist">'
                        + '<h3 class=" ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all" role="tab" id="ui-accordion-tmp_' + key1 + '-header-0" aria-controls="ui-accordion-tmp_' + key1 + '-panel-0" aria-selected="false" tabindex="0"><span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span><span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>'
                        + '<span style="width:25%;float:left;">' + rename(key1) + '</span>'
                        + '<span style="width:65%;text-align:right;float:left;" id="g_' + key + key1 + '"></span>'
                        + '<span style="width:10%;float:left;"><button onclick="displayed_alert=false;change_all_category(jQuery(this));" class="k' + key1 + ' next_folio ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"  style="margin-right: 2px; margin-top:-4px;" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"></span></span></button></span>'
                        + '</h3>'
                        + '<div class="main_arcor ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-tmp_' + key1 + '-panel-0" aria-labelledby="ui-accordion-tmp_' + key1 + '-header-0" role="tabpanel" aria-expanded="false" aria-hidden="true" style="overflow: hidden; display: none;">'
                        + '<table width="100%" border="1">'
                        + '<tbody>';
                total[key1] = 0;
                
                jQuery.each(value1, function(key2, value2) {
                    var ifo = value2.ifo;
                    
                    var t = '';
					var hasRightValue = false;
                    try {

                        t = value2.amount.replace(/\,/g, "");
                    }
                    catch (err) {
                        t = 0;
                    }
                    t = Math.round (parseFloat(t));
                    var arr_folio = '';
                    jQuery.each(value2.folio_id, function(i, va) {
                        // console.log("??",i, va);
                        var im = i.split('_');
                        t -= va;
						//hasRightValue =  true;
                        var check_folio = va.reamount - va.re_folio;
                        try{
                            arr_folio += '<a href="?page=reservation&cmd=create_folio&id=' + ifo.reservation_id + '&r_r_id=' + ifo.reservation_room_id + '&folio_id=' + im[0] + '" >View folio ' + i + '</a>';
						}catch(err){
							 arr_folio += '<a href="?page=reservation&cmd=create_folio&id=' + id + '&r_r_id=' + r_r_id + '&folio_id=' + im[0] + '" >View folio ' + i + '</a>';
						}
                        
                    });
					if( ((value2.amount==0)?0:value2.amount.replace(/\,/g, "")) !=0 ){
						var amp = Math.round( parseFloat(value2.amount.replace(/\,/g, "")));
					}else{
						var amp = 0;
					}
                    total[key1] += t;
                    var tmp_key = key1 + value2.id;//console.log('vao');
					// console.log('hien_thi_gia_phong_bang_khong:'+hien_thi_gia_phong_bang_khong);
					/*console.log(( hien_thi_gia_phong_bang_khong == 0 && key1=='ROOM'   ));
                    console.log(key1 != 'ROOM');
                    console.log((value2.amount != 0 && t==0));
                    console.log(t == 0);*/
                    
                    if ( t == 0 && ( ( hien_thi_gia_phong_bang_khong == 0 && key1=='ROOM'   ) || key1 != 'ROOM' || (value2.amount != 0 && t==0) ) ){
                        tmp += ''
                                + '<tr id="sp_' + tmp_key + '" class="hided" style="background: rgb(180, 180, 180);">'
                                + '<td width="15%">' + value2.date + '</td>'
                                + '<td width="60%">' + value2.description + arr_folio + '</td>'
                                + '<td width="20%" align="right" class="remaining_service">' + amp + '</td>'
                                + '<td  width="5%"><button style="display: none;" service_id="' + value2.id + '"  total="'+value2.amount+'" onclick="select_service(jQuery(this),0)" tax_amount="' + value2.tax_amount + '" service_amount="' + value2.service_amount + '" key1="' + key1 + '" price="' + t + '" key="' + tmp_key + '" class="selected next_folio ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"></span></span></button></td>'
                                + '</tr>';//console.log('vao2');
                        /*if(folio_id == 0 && ifo.reservation_id == id ){
                            //update_total(amp,0,key1,0);
                        }*/
                    } else {
                        if (t == amp) {console.log("t"+t+" amp:"+amp+" value2.amount"+value2.amount+" key1"+key1);
                            tmp += ''
                                    + '<tr id="sp_' + tmp_key + '">'
                                    + '<td width="15%">' + value2.date + '</td>'
                                    + '<td width="60%">' + value2.description + arr_folio + '</td>'
                                    + '<td width="20%" align="right">' + ( (value2.amount==0)?0:parseInt(value2.amount.replace(/\,/g, "") ).formatMoney(0) ) + '</td>'
                                    + '<td  width="5%"><button  onclick="select_service(jQuery(this),0)" total="'+value2.amount +'" service_id="' + value2.id + '" tax_amount="' + value2.tax_amount + '" service_amount="' + value2.service_amount + '" key1="' + key1 + '" price="' + t + '" key="' + tmp_key + '" class="kROOM next_folio ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"></span></span></button></td>'
                                    + '</tr>'; 
                        } else {
                            tmp += ''
                                    + '<tr id="sp_' + tmp_key + '">'
                                    + '<td width="15%">' + value2.date + '</td>'
                                    + '<td width="60%">' + value2.description + arr_folio + '</td>'
                                    + '<td width="20%" align="right"><span style="color: #CECECE;" class="before_total" total="'+value2.amount +'">' + ( (value2.amount==0)?0:parseInt(value2.amount.replace(/\,/g, "")  ).formatMoney(0) )+ '</span>/<strong class="rem">' + number_format(t, 0) + '</strong></td>'
                                    + '<td  width="5%"><button  onclick="select_service(jQuery(this),0)" total="'+value2.amount +'" service_id="' + value2.id + '" tax_amount="' + value2.tax_amount + '" service_amount="' + value2.service_amount + '" key1="' + key1 + '" price="' + t + '" key="' + tmp_key + '" class="kROOM next_folio ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"><span class="ui-button-icon-primary ui-icon ui-icon-arrowthick-1-e"></span><span class="ui-button-text"></span></span></button></td>'
                                    + '</tr>';
                        }
                    }
                });
                tmp += ''
                        + '</tbody></table>'
                        + '</div>'
                        + '</div>';
            });
            tmp += '</div>';

            jQuery(".left_aside").append("");
            jQuery(".left_aside").append(tmp);
            jQuery.each(total, function(i, vl) {
                jQuery("#g_" + key + i).html(number_format(vl, 0));
            });
        });
        if (callback) callback();
    }


    






    function create_item_folio(room_name,total,deposit,payment,idm,name,check,user,r_r_id_1) {
	    check_payment = ( payment != null && payment != 0 )?1:0;
        var url = "\'?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id_1 + "&folio_id=" + idm + "\'";
        if (idm != folio_id) {
            if(Math.abs(check) < un_money || check == 0){
               var item = '<button title="  Tổng:            '+number_format(total,0)+'\n Đặt cọc:       '+number_format(deposit,0)+'\n Thanh toán: '+number_format(payment,0)+'\n Còn:              '+number_format(check,0)+'\n create      '+user+'\n  " type="button" onclick="location.replace(' + url + ');" class="note_button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-note"></span><span class="ui-button-text">'+( (room_name != null )?room_name:'no room' )+'_Folio_' + idm +'_'+name+'</span></button>';
            }else{
                var item = '<button title="  Tổng:            '+number_format(total,0)+'\n Đặt cọc:       '+number_format(deposit,0)+'\n Thanh toán: '+number_format(payment,0)+'\n Còn:              '+number_format(check,0)+'\n create      '+user+'\n  " style="background: rgba(255, 36, 98, 0.72);" type="button" onclick="location.replace(' + url + ');" class="note_button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-note"></span><span class="ui-button-text" style="color: #FFFFFF;">'+( (room_name != null )?room_name:'no room' )+'_Folio_' + idm +'_'+name+ '</span></button>';
            }
        } else { 
                var item = '<button title="  Tổng:            '+number_format(total,0)+'\n Đặt cọc:       '+number_format(deposit,0)+'\n Thanh toán: '+number_format(payment,0)+'\n Còn:              '+number_format(check,0)+'\n create      '+user+'\n  " style="background: rgba(5, 101, 138, 0.72);" type="button" onclick="location.replace(' + url + ');" class="note_button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-note"></span><span class="ui-button-text" style="color: #FFFFFF;">'+( (room_name != null )?room_name:'no room' )+'_Folio_' + idm +'_'+name+'</span></button>';
        }
        jQuery(".load_folio").append(item); 
    }



    function save_folio( ) { 
        reservation_traveller_id = jQuery("#traveller_option").val();
        var data_final = {};
        data_final['folio_id'] = folio_id;
        data_final['reservation_traveller_id'] = reservation_traveller_id;
        data_final['total'] = folio_id;
        data_final['tax_amount'] = tax_amoun;
        data_final['reservation_room_id'] = jQuery("#room_change_right").val();
        data_final['reservation_id'] = jQuery("#reservation_id").val();
        data_final['portal_id'] = '#default';
        data_final['service_amount'] = service_amount;
        data_final['customer_id'] = customer_id;
        data_final['old_r_r_id'] = r_r_id;
        data_final['old_r_id'] = id;
        var keymm = 1;
        var rr_id = jQuery("#room_change_right").val();
        /*-----------------------------------------------------------*/
        /*ROOM*/
        var folio_if = {};
        jQuery("#hide_ROOM tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'ROOM';
            folio_row['invoice_id'] = row.attr("key");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        
		/*-----------------------------------------------------------*/
        /*PHONE*/
        jQuery("#hide_PHONE tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'PHONE';
            folio_row['invoice_id'] = row.attr("id").replace("hide_PHONE", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1'; 
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        /*MINIBAR*/
        jQuery("#hide_MINIBAR tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'MINIBAR';
            folio_row['invoice_id'] = row.attr("id").replace("hide_MINIBAR", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1'; 
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/

        /*EXTRA_SERVICE*/
        jQuery("#hide_EXTRA_SERVICE tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'EXTRA_SERVICE';
            folio_row['invoice_id'] = row.attr("id").replace("hide_EXTRA_SERVICE", "");
                        console.log('************');
            console.log(folio_row['invoice_id']);
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/


        /*-----------------------------------------------------------*/

        /*EXTRA_SERVICE*/
        jQuery("#hide_TOUR tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'TOUR';
            folio_row['invoice_id'] = row.attr("id").replace("hide_TOUR", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });

        /*DEPOSIT*/
        jQuery("#hide_DEPOSIT tr").each(function() {
            var folio_row = {};
            try {
              var dcound = jQuery(this).attr("key");
            } catch (error) {
                var dcound = 0;
            }
            //console.log(dcound);
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['did'] = dcound;
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'DEPOSIT';
            folio_row['invoice_id'] = row.attr("id").replace("hide_DEPOSIT", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            //folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        /*LAUNDRY*/
        jQuery("#hide_LAUNDRY tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'LAUNDRY';
            folio_row['invoice_id'] = row.attr("id").replace("hide_LAUNDRY", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            //folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        /*EQUIP*/
        jQuery("#hide_EQUIP tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'EQUIP';
            folio_row['invoice_id'] = row.attr("id").replace("hide_EQUIP", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        /*BAR*/
        jQuery("#hide_BAR tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'BAR';
            folio_row['invoice_id'] = row.attr("id").replace("hide_BAR", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            //folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            if (row.find(".price_service").attr("discount_rate") != 'null') {
				folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
			}
			else{
				folio_row['discount_rate'] =  0;
			}
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        /*SPA*/
        jQuery("#hide_SPA tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'SPA';
            folio_row['invoice_id'] = row.attr("id").replace("hide_SPA", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
/*-----------------------------------------------------------*/
        /*KARAOKE*/
        jQuery("#hide_KARAOKE tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'KARAOKE';
            folio_row['invoice_id'] = row.attr("id").replace("hide_KARAOKE", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        /*DISCOUNT*/
        jQuery("#hide_DISCOUNT tr").each(function() {
            var folio_row = {};
            var row = jQuery(this);
            folio_row['delete'] = (row.hasClass("active_service")) ? '1' : '0';
            folio_row['id'] = jQuery(this).attr("count");
            folio_row['reservation_traveller_id'] = reservation_traveller_id;
            folio_row['type'] = 'DISCOUNT';
            folio_row['invoice_id'] = row.attr("id").replace("hide_DISCOUNT", "");
            folio_row['amount'] = row.find(".price_service input").val().replace(/\,/g, "");
            folio_row['percent'] = row.find("input").val();
            folio_row['reservation_room_id'] = jQuery("#room_change_right").val();
            folio_row['reservation_id'] = jQuery("#reservation_id").val();
            folio_row['add_payment'] = '1';
            folio_row['portal_id'] = '#default';
            folio_row['folio_id'] = folio_id;
            folio_row['description'] = row.attr("r_r_id")+'_'+row.find(".room_name").html();
            folio_row['tax_amount'] = row.find(".price_service").attr("tax_amount");
            folio_row['service_amount'] = row.find(".price_service").attr("service_amount");
            folio_row['service_rate'] =  row.find(".price_service").attr("service_free");
            folio_row['tax_rate'] =  row.find(".price_service").attr("tax");
            folio_row['discount_rate'] =  row.find(".price_service").attr("discount_rate");
            folio_row['discount_amount'] =  row.find(".price_service").attr("discount_amount");
            folio_row['date_use'] = row.find(".date_use").html();
            folio_row['foc'] = '0';
            folio_row['foc_all'] = '0';
            folio_row['total_amount'] = row.find("input").attr("net_amount").replace(/\,/g, "");
            folio_row['old_r_r_id'] = row.attr("r_r_id");
            folio_row['old_r_id'] = id;
            folio_if[keymm++] = folio_row;
        });
        /*-----------------------------------------------------------*/
        
        data_final['folio_traveller'] = folio_if;

        var data_conver = JSON.stringify(data_final);
        jQuery.post(
                "process_folio.php?folio_update=1#" + Math.random(),
                {
                    "data": data_conver
                }).done(function(data)
        {
            try {
                // console.log(data);
                var info = jQuery.parseJSON(data);
                if (info['ok'] == 0) {
                    if(r_r_id == jQuery("#room_change_right option:selected").text()){
                        var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id + "&folio_id=" + info['folio_id'];
                        message('tsuccess', info['error_message'], jQuery("#cuc-error"));
                        console.log("1_sdsd");
                        //location.replace(url); 
                    }else{
                        
                        
                        if (info['folio_id']) {
                            console.log("2_sdsd");
                            console.log(rr_id);
                            var url = "?page=reservation&cmd=create_folio&id=" + id + "&r_r_id=" + r_r_id +"";
                            message('tsuccess', "Đã chuyển folio sang phòng "+jQuery("#room_change_right option:selected").text(), jQuery("#cuc-error"));
                            location.replace(url);
                        }
                        else {
                            console.log("3_sdsd");
                            message('tsuccess', "Đã chuyển folio sang phòng "+jQuery("#room_change_right option:selected").text(), jQuery("#cuc-error"));
                            window.location.reload();
                            
                        
                        }
                    }
                }
                else if (info['ok'] == -1)
                {
                    message('warning', info['error_message'], jQuery("#cuc-error"));
                    setTimeout((function() {
                            window.location.reload();   
                    }), 3000);                    
                    
                }else if (info['ok'] == -5)
                {
                    message('warning', info['error_message'], jQuery("#cuc-error"));
                    setTimeout((function() {
                            window.parent.location.reload();   
                    }), 3000);                    
                    
                }
            } catch (etc) {
                message('warning', 'Vui lòng xem lại kết nối mạng nội bộ', jQuery("#cuc-error"));
            }
        }).fail(function() {

        }).always(function() {

        });

    }



    /*auto list*/
    function list_reservation_if(idm) {
       // console.log(idm);
        var tmlurl = 'process_folio.php?get_all_room_traveller=1&id=' + idm;
        jQuery.ajax({
            type: 'GET',
            url: tmlurl,
            dataType: 'json',
            success: function(data) {
                //jQuery.each(data,function(key,value){
                // data_room 			= data['data_room']; 
                if (data['ok'] == 0) {//alert(1);
                    data_room_checkin 	= data['data_room'];
                    data_traveller 		= data['data_traveller'];
                    // data_service  		= data['data_service'];   
                    // customer_id   		= data['customer_id'];
                    // jQuery("#is_company").html(data['full_name']);
                    // list_room_left();
                    list_room_right();
                  // list_traveller(null);
                } else {
                    jQuery("#reservation_id").val('');
                    message( 'warning', data['error_message'], jQuery("#cuc-error") );
                    data_room_checkin = data_room_checkin_old;
                    data_traveller = data_traveller_old;
                    list_room_left();
                    list_room_right();
                    list_traveller(r_r_id);
                }
            },
            error: function() {
                message('warning', 'Vui lòng xem lại kết nối mạng nội bộ', jQuery("#cuc-error"));
            }
        });
    }

    jQuery("#reservation_id").change(function() {
        if (jQuery(this).val() != '') {
            list_reservation_if(jQuery(this).val());
        } else {
            data_room_checkin = data_room_checkin_old;
            data_traveller = data_traveller_old;
            list_room_left();
            list_room_right();
        }

    });




});

function list_total_service_hide() {
        console.log('test');
		console.log(data_service);
		
        jQuery.each(data_service, function(key, value) {
            jQuery.each(value, function(key1, value1) {
                jQuery.each(value1, function(key2, value2) {
                    var price = 0;
                    try {

                        price = value2.amount.replace(/\,/g, "");
                    }
                    catch (err) {
                        price = 0;
                    }
                    jQuery.each(value2.folio_id, function(i, va) {
                        price -= va;
                    });
                    price = Math.round(price);
                    
					var pecen =  100;
					var disablePercentTextbox = ' readonly=""';
					if (price !=0) {
						pecen = Math.round ((price/ ( (value2.amount==0)?0:value2.amount.replace(/\,/g, "")) )*100);
						disablePercentTextbox = '';
					}
                    price = number_format(price, 0);
                    if (key1 == 'DEPOSIT') {
                        tmp = ''
                                + '<tr r_r_id="'+value2.type_depo+'" id="hide_' + key1 + value2.id + '" key="' + value2.id + '" count="0" class="hide_service">'
                                + '<td width="10%" class="date_use">' + value2.date + '</td>'
                                + '<td width="40%" class="room_name">' + value2.description + '</td>'
                                + '<td width="15%">'
                                + '<input disabled type="text" class="percent"   style="width: 30px; float:left; margin-right:10px;"  typetr="' + key1 + '"   index="' + key1 + value2.id + '" net_amount="'+value2.net_amount+'" svalue="' + price + '" maxlength="3" onkeyup="keyup_price(jQuery(this));" value="' +pecen+ '"><span>%</span>'
                                + '</td>'
                                + '<td width="17%" align="right" class="price_service"  discount_rate="'+value2.discount_rate+'" discount_amount="'+value2.discount_amount+'" service_amount="' + value2.service_amount + '" tax_amount="' + value2.tax_amount + '"><input readonly="" type="text" style="width: 90px;  margin-right:10px;text-align: right;" class="price_fomat" onkeyup="check_max_value(jQuery(this),0)" value="' + price + '"  maxvalue="' + price + '"/></td>'
                                + '<td width="8%"><button index="' + key1 + value2.id + '" typetr1="' + value2.id + '" typetr="' + key1 + '" onclick="delete_service1('+folio_id+',jQuery(this));" class="close_folio  ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"></button></td>'
                                + '</tr>';
					} else if( key1 == 'DISCOUNT' ){
						tmp = ''
                                + '<tr r_r_id="'+value2.reservation_room_id+'" id="hide_' + key1 + value2.id + '" key="' + value2.id + '" count="0" class="hide_service">'
                                + '<td width="10%" class="date_use">' + value2.date + '</td>'
                                + '<td width="40%" class="room_name">' + value2.description + '</td>'
                                + '<td width="15%">'
                                + '<input disabled type="text" class="percent"   style="width: 30px; float:left; margin-right:10px;"  net_amount="'+ value2.net_amount+'" typetr="' + key1 + '"   index="' + key1 + value2.id + '" svalue="' + price + '" maxlength="3" onkeyup="keyup_price(jQuery(this));" value="' +pecen+ '"><span>%</span>'
                                + '</td>'
                                + '<td width="17%" align="right" class="price_service" discount_rate="'+value2.discount_rate+'" discount_amount="'+value2.discount_amount+'" service_amount="' + value2.service_amount + '" tax_amount="' + value2.tax_amount + '"><input type="text" style="width: 90px;  margin-right:10px;text-align: right;" class="price_fomat" onkeyup="check_max_value(jQuery(this),0)" value="' + price + '"  maxvalue="' + price + '"/></td>'
                                + '<td width="8%"><button index="' + key1 + value2.id + '" typetr1="' + value2.id + '" typetr="' + key1 + '" onclick="delete_service1('+folio_id+',jQuery(this));" class="close_folio  ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"></button></td>'
                                + '</tr>';
                    } else {
                        tmp = ''
                                + '<tr r_r_id="'+key+'" id="hide_' + key1 + value2.id + '" key="' + value2.id + '" count="0" class="hide_service">'
                                + '<td width="10%" class="date_use">' + value2.date + '</td>'
                                + '<td width="40%" class="room_name">' + value2.description + '</td>'
                                + '<td width="15%">'
                                + '<input  type="text" class="percent"  style="width: 30px; float:left; margin-right:10px;" net_amount="'+ value2.net_amount+'" typetr="' + key1 + '"   index="' + key1 + value2.id + '" svalue="' + price + '" maxlength="3" onkeyup="keyup_price(jQuery(this));" value="' +pecen+ '"><span>%</span>'
                                + '</td>'
                                + '<td width="17%" align="right" class="price_service" discount_rate="'+value2.discount_rate+'" discount_amount="'+value2.discount_amount+'" tax="'+value2.tax_rate+'" service_free="'+value2.service_rate+'" service_amount="' + value2.service_amount + '" tax_amount="' + value2.tax_amount + '"><input type="text" style="width: 90px;  margin-right:10px;text-align: right;" class="price_fomat" onkeyup="check_max_value(jQuery(this),0);convert_pervent(jQuery(this));" value="' + price + '"   maxvalue="' + price + '"/></td>'
                                + '<td width="8%"><button index="' + key1 + value2.id + '" typetr1="' + value2.id + '" typetr="' + key1 + '" onclick="delete_service1('+folio_id+',jQuery(this));" class="close_folio  ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"></button></td>'
                                + '</tr>';
                    } 
                    jQuery("#hide_" + key1).append(tmp);
                });

            });
        });
         
        jQuery("input").focus(function() {
            price_focus = jQuery(this).val().replace(/\,/g,"");
        });
        jQuery("input").keyup(function() {
            price_focus = jQuery(this).val().replace(/\,/g,"");
        });
    }
