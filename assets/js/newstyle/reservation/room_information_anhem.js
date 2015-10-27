    //-----------------------------
    // Room Information     //
    // ---------------------------

    
    // mang company
    var arr_company   = [];

    var arr_companyl  = [];
    var arr_tour      = [];
    var arr_tourl     = [];
    // mang loai phong tim duoc tu input loai phong cua nguoi dung
    var arr_room_type   = [];
    var arr_room_type_l = [];
    // mang phong tim duoc tu input nhap so phong cua nguoi dung
    var arr_room 	  = [];
    // id Loai phong
    var roomtype_id   =  0;
    // id phong
    var room_id       =  0;
    // id cutomer    
    var customer_id   =  0;
    //balance
    var balance       =  0;
    var remaining = 0;
    var total_service = 0;
    var total_price = 0;
    var arr_type = [];
    
    
    


    // Name:        show_room
    // Author:      Membell
    // Time:        02:22 28/04/2014
    // Parameter: 
    // Description: show phong da chon o so do ban
    var nhap = [];
    function show_room(){
        var tmlurl = 'r_get_room.php?list_room&q=1';
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
             jQuery.each(data,function(key,value){
              arr_room[value.name] = value.id;
              arr_type[value.type_name] = value.rt_id;
              arr_room_type[value.type_name] = value.lv_id;
              arr_room_type_l[value.lv_id] = value.type_name;
              if(typeof(nhap[value.lv_id]) == 'undefined'){
                  nhap[value.lv_id] = value.lv_id;
                  jQuery("datalist#roomtype").append('<option id='+value.lv_id+'>'+value.type_name+'<option>');
              }
              
                if(room_id == value.id ){
                    jQuery("#rooml").val(value.name); 
                     
                    jQuery("#room_result").html(value.name);
                    jQuery("#roomtypel").val(value.type_name);  
                    roomtype_id = value.lv_id;

                    //if (cmd == 'add'){
                        outprice();
                    //};
                }
             });   
            },
            error: function(){
              show_room();
              //message('error','Lỗi kết nối database',jQuery("#cuc-error"));
              console.log('Error: function Show_room from room_information.js');
            }
        });
    }

    // Name:        list_room_type
    // Author:      Membell
    // Time:        14:40 23/04/2014
    // Parameter: 
    // Description: List ra loai phong
    /*function list_room_type(){
    	var tmlurl = 'r_get_room.php?get_room&q=t';
		jQuery("datalist#roomtype").html('');
	    jQuery.ajax({
	       type: 'POST',
	       url: tmlurl,
	       dataType: 'json',
	       success: function(data){
	         jQuery.each(data,function(key,value){
	         	arr_room_type[value.name] = value.lv_id;
            arr_room_type_l[value.lv_id] = value.name;
            arr_type[value.name] = value.rt_id;
            jQuery("datalist#roomtype").append('<option id='+value.id+'>'+value.name+'<option>');
	         });   
            if(allowviewlog==1){
              show_log(jQuery("#rooml").val());
            } 
             jQuery("#roomtypel").val(arr_room_type_l[roomtype_id]);    
              if(cmd=='add'){
                show_room(); 
              }
              
	        },
	        error: function(){
            list_room_type();
	          //message('error',' function list_room_type Lỗi kết nối database',jQuery("#cuc-error"));
	        }
	    });
    }*/




    // Name:        list_room
    // Author:      Membell
    // Time:        14:35 23/04/2014
    // Parameter: 
    // Description: List ra cac phong tuong ung hang phong
    function list_room(){
        if(jQuery("#roomtypel").val() != '' ){
          var lev_id = arr_room_type[jQuery("#roomtypel").val()];
          var tmlurl = '/save_reservation_room.php?get_room_avaiable=1&time_in='+jQuery("#arival_time").val()+'&time_out='+jQuery("#departure_time").val()+'&arrival_time='+jQuery("#arival_date").val()+'&departure_time='+jQuery("#departure_date").val()+'&room_level_id='+lev_id+'&room_type_id='+arr_type[jQuery("#roomtypel").val()]+'';
    
        	// var tmlurl = 'r_get_room.php?get_number_room_id&loai_phong='+arr_room_type[jQuery("#roomtypel").val()];
        	// console.log(tmlurl);
          //console.log(arr_room_type[jQuery("#roomtypel").val()]);
         var arr_rooml =[]; 
    		jQuery("datalist#room").html('');
    	    jQuery.ajax({
    	       type: 'POST',
    	       url: tmlurl,
    	       dataType: 'json',
    	       success: function(data){
    	         jQuery.each(data[lev_id],function(key,value){
                  // arr_room[value.name] = key;
                  if(isMobile.any()) {
                    arr_rooml.push(value.name);
                  }else{
                    jQuery("datalist#room").append('<option>'+value.name+'<option>');
                  }
    	            //
                    if(room_id == value.id ){
                        jQuery("#rooml").val(value.name); 
                        jQuery("#room_result").html(value.name);
                    }
    	         });   
               if(isMobile.any()) {
                 $("#rooml").autocomplete({
                    source: arr_rooml,
                    minLength: 1,
                    select: function( event, ui ){
                      //customer_id = arr_company[jQuery(this).val()]; 
                      //jQuery("#nationality_name").val('vnm');
                    }
                  });
               }
    	        },
    	        error: function(){
                list_room();
    	          //message('error','Lỗi kết nối database',jQuery("#cuc-error"));
    	        }
    	    });
        }else{
            message('warning','Phải nhập Room type trước',jQuery("#error_roomtype"));
        }
    }


    
    // function list_room_first(){
    //     var tmlurl = 'r_get_room.php?list_room&q=1';
    //               jQuery.ajax({
    //                     type: 'POST',
    //                     url: tmlurl,
    //                 dataType: 'json',
    //                  success: function(data){
    //                     jQuery.each(data,function(id,value){
                        
    //               arr_room[value.name] = value.id;
    //                // jQuery("datalist#room").append('<option>'+value.name+'<option>');
    //               //jQuery("#cus_"+id+" td div #g_roomtypel").val(value.type_name); 
    //             }
    //           ) 
             
    //         },
    //         error: function(){
    //           list_room_first();
    //             //message('error','show_room_for_room_type: Lỗi kết nối database',jQuery("#cuc-error"));
    //         }
    //     });
      
    // }





    // Name:        update_room_type_id
    // Author:      Membell
    // Time:        14:59 23/04/2014
    // Parameter: 
    // Description: List ra cac phong tuong ung hang phong
    function update_room_type_id(){
    	// alert(arr_room_type[jQuery("#roomtypel").val()]);
    	jQuery("#roomtype_id").val() = arr_room_type[jQuery("#roomtypel").val()]; 
    }



    // arr remark room
    var list_remark_room = {};


    // Name:        add_remark
    // Author:      Membell
    // Time:        02:12 25/04/2014
    // Parameter: 
    // Description: Show popup dang ky hien thi chon remark room
    function show_add_remark(){
        show_remarked();
        jQuery('#popup_add_remark_room').bPopup({
            fadeSpeed: 'slow', //can be a string ('slow'/'fast') or int
            followSpeed: 1500, //can be a string ('slow'/'fast') or int
            modalClose: false,
            modalColor: '#000000',
            opacity: 0.7
        });
        jQuery('button#cancel-remark').bind('click', function() {
            jQuery('#popup_add_remark_room').bPopup().close();
        });
    }


    // Name:        show_remark_room
    // Author:      Membell
    // Time:        20:23 25/04/2013
    // Parameter:   
    // Description: List danh sach remark
    function show_remark_room(){
            jQuery("#list_remark").html('');
            var tmlurl = "/remark_room.php?&id=1&list_remark_room";
            jQuery.ajax({
               type: 'POST',
               url: tmlurl,
               dataType: 'json',
               success: function(data){
                     // var k = {};
                     // k = list_remark_room[keykey];
                     var tmp_old = {};
                     tmp_old     = list_remark_room[r_r_id];
                     jQuery.each(data,function(key,value){
                        //jQuery.each(list_remark_room['1'],function(key,value){
                            if(list_remark_room[r_r_id] != null){
                                if(tmp_old[value.id] == null){
                                   jQuery("#list_remark").append('<td><p class="remark" en="'+value.name2+'"  vn="'+value.name1+'" id="'+value.id+'" onclick="chuyen(jQuery(this));">'+value.name1+'</p></td>'); 
                               }
                           }else{
                                jQuery("#list_remark").append('<td><p class="remark" en="'+value.name2+'"  vn="'+value.name1+'" id="'+value.id+'" onclick="chuyen(jQuery(this));">'+value.name1+'</p></td>'); 
                           }
                        });
                     //});
                },
                error: function(){
                     message('error','Lỗi kết nối database',jQuery("#cuc-error"));
                }
            });  
        }



    // Name:        chuyen
    // Author:      Membell
    // Time:        20:23 25/04/2013
    // Parameter:   chon(opject)
    // Description: Chuyen remark sang phan duoc chon
    function chuyen(chon){ 
        var t = chon.text();
        chon.remove();
        jQuery("#list_remarked").append('<td><p class="remark"  id="'+chon.attr("id")+'" en="'+chon.attr("en")+'" vn="'+chon.attr("vn")+'" onclick="bo(jQuery(this));">'+t+'</p></td>');
    }


    // Name:        bo
    // Author:      Membell
    // Time:        20:23 25/04/2013
    // Parameter:   bo(opject)
    // Description: Chuyen remark tu duoc chon sang phan duoc chon 
    function bo(bo){
        var t = bo.text();
        bo.remove();
        jQuery("#list_remark").append('<td><p class="remark"  en="'+bo.attr("en")+'" vn="'+bo.attr("vn")+'" onclick="chuyen(jQuery(this));">'+t+'</p></td>');
    }

    // Name:        save_change_remark
    // Author:      Membell
    // Time:        20:23 25/04/2013
    // Parameter:    
    // Description: Luu remark vao danh sach tam 
    function save_change_remark(){
        var info_remark = {};
        jQuery('#list_remarked td p').each(function(){
            var t = {};
            t['id'] = jQuery(this).attr("id");
            t['vn'] = jQuery(this).attr("vn");
            t['en'] = jQuery(this).attr("en");
            info_remark[jQuery(this).attr("id")] = t; 
        });
        list_remark_room[r_r_id] = info_remark;
        
        jQuery('#popup_add_remark_room').bPopup().close();
        show_remarked();
     }


    // Name:        show_remarked
    // Author:      Membell
    // Time:        20:23 25/04/2013
    // Parameter:    
    // Description: Show remark da duoc chon 
     function show_remarked(){
        if(list_remark_room[r_r_id] != null){
            // console.log(list_remark_room);
            jQuery("#list_remarked").html('');
            jQuery("#show_list_remarked").html('');
            jQuery.each(list_remark_room[r_r_id],function(key,value){
                jQuery("#list_remarked").append('<td><p class="remark" id="'+value.id+'" vn="'+value.vn+'" en="'+value.en+'" onclick="bo(jQuery(this));">'+value.vn+'</li></td>');
                jQuery("#show_list_remarked").append('<td><p class="remark" >'+value.vn+'</p></td>');
            });
        }  
    }

    function save_remark_final(){ 
    var remark = JSON.stringify(list_remark_room);
    jQuery.post(
        "remark_room.php?&id=1&save_remark_room&remark_room="+remark+'&id_remark='+r_r_id, 
        {
        }).done(function (data) 
        {
          
        //alert(data);
      }).fail(function() {
         message('error','Lỗi kết nối database',jQuery("#cuc-error"));
      }
      ).always(function(){
        //always
         
      });
    jQuery('#mask').show();
  }





          // show remark room da duoc luu trong database
          function show_remark_saved(){
            var tmlurl = "/remark_room.php?&id=1&show_remark_roomed&id_remark="+r_r_id;
            jQuery.ajax({
               type: 'POST',
               url: tmlurl,
               dataType: 'json',
               success: function(data){
                     var k = {};
                     jQuery.each(data,function(key,value){
                        var tt = {};
                        tt['vn'] = value.name1;
                        tt['en'] = value.name2;
                        tt['id']    = value.id;
                        k[value.id] = tt;
                        list_remark_room[r_r_id]=k;
                       //jQuery("#cart ol").append('<li style="position: relative;" en="'+value.name1+'" vn="'+value.name2+'" id='+value.id+'  onclick="bo(jQuery(this));">'+value.name1+'<img src="assets/img/'+link_image+'" style="width: 29px;position: absolute;right: 10px;top: 0px;display:none;-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease;-ms-transition: all 0.3s ease;-o-transition: all 0.3s ease;transition: all 0.3s ease;"></li>');
                        jQuery("#list_remarked").append('<td><p class="remark" id="'+value.id+'" vn="'+value.name1+'" en="'+value.name2+'" onclick="bo(jQuery(this));">'+value.name1+'</li></td>');
                        jQuery("#show_list_remarked").append('<td><p class="remark" >'+value.name1+'</p></td>');
                     });        
                },
                error: function(){
                     //dataok = null;
                }
            }); 
          }




    // Name:        Kiểm tra ngày tháng, và giờ theo chuẩn
    // Author:      Duongnv
    // Time:        20:15 25/04/2014
    // Parameter: 
    // Description: Kiểm tra tra ngày tháng
    var gio1;
    var gio2;
    function kiemtra_gio(ktgio,vitri){
    	 ktgio.mask("99:99");


    	 ktgio.keypress(function(){
    	    var gio = ktgio.val();    	  
    	    var hour = gio.split(":");
    	    	    // console.log(hour[0]);
    	    var gio = isNaN(hour[0]);
    	    var phut = isNaN(hour[1]);
    	    // console.log(gio);
    	    if (!gio) {  
    	   
    	    	if(hour[0] > 23 || hour[0] < 0) {
    	    	    	message('warning',"giờ nằm trong khoảng 0 đến 23!",vitri);
    	    	    	return false;
    	    	    }
    	    	else {
              	vitri.find("div.alert").addClass('flipOutX').removeClass('flipInX').fadeOut('5000');
              }

    	    	}  
    	    	
    	    	if (!phut) {
    	    	
    	    	if(hour[1] > 59 || hour[1] < 0) {
    	    	    	message('warning',"phút nằm trong khoảng 0 đến 59!",vitri);
    	    	    	return false;
    	    	    }
    	    	else {
              	   vitri.find("div.alert").addClass('flipOutX').removeClass('flipInX').fadeOut('5000');
              }

    	    	} 	   		

       	 })    
    }

    function kiemtra_percent(ktpercent) {
    	 ktpercent.mask("99");
    }
               


    // name: Kiểm tra ngày đến và ngày đi
    // author: Duongnv



        var today = $.datepicker.formatDate('dd/mm/yy', new Date());
              
        var today2 = parseDate(today).getTime();
        var ngayden;
        var ngaydi;

    function test() {
           ngayden = $('#arival_date').datepicker("getDate");
           ngaydi = $('#departure_date').datepicker("getDate");
           var now2 = $('#today').datepicker("getDate");
          // if (ngaydi != ngayden) {
            // alert(ngaydi);
            
                
            
           if (now2 > ngaydi) {
              if(ngaydi < ngayden){
                  jQuery("#departure_date").val('');
                  message('warning','Ngày đi không nhỏ hơn ngày đến tại',$("#error_departure_date"));
              }else{
                  if(cmd != 'edit'){
                    jQuery("#departure_date").val('');
                    message('warning','Ngày đi không nhỏ hơn ngày hiện tại',$("#error_departure_date"));
                  }else{
                    message('warning','Ngày đi đang nhỏ hơn ngày hiện tại',$("#error_departure_date"));
                  }
              }           
            }else{
              	$("#error_departure_date").find("div.alert").addClass('flipOutX').removeClass('flipInX').fadeOut('5000');
              }


      var ngayden2 = $('#arival_date').val();
      var ngayden3 = parseDate(ngayden2).getTime();   

      if(today2 > ngayden3) {
        message('warning','Ngày đến không nhỏ hơn ngày hiện tại',$("#error_arival_date"));
        $('#arival_date').val(today);
      }else{    		
  			$("#error_arival_date").find("div.alert").addClass('flipOutX').removeClass('flipInX').fadeOut('5000');    	
   }
 }


 //Chuyển chuỗi kí tự (string) sang đối tượng Date()
function parseDate(str) {
    var mdy = str.split("-");
    return new Date(mdy[2], mdy[1], mdy[0]);
}




		//name: kiem tra mail co hop le hay khong
		//author : Duongnv

function test_mail(mail_test,vitri) {	 
        var dangmail  = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,4}$/; 
        mail_test.focusout(function(){
            var email = mail_test.val();          
            var ktMail = dangmail.test(email);
            if ((!ktMail) && (email.length >=1)) {
               message('warning','Phải nhập đúng định dạng mail hoặc bỏ trống',vitri);           
               mail_test.focus();
               return false;
              }else {
                    vitri.find("div.alert").addClass('flipOutX').removeClass('flipInX').fadeOut('5000');
                    vitri.children().remove();
              }     
        });
}


 // kiem tra phone co hop le hay khong

function test_phone(phone_test,vitri) {
	phone_test.keyup(function(){
             var  phone = phone_test.val();
             var ktPhone = isNaN(phone);

                if (ktPhone) {
                    message('warning','Nhập sai định dạng (number)',vitri); 
                    phone_test.focus();
                    phone_test.val(" ");
                    return false;                   
                } else
                {
                     vitri.find("div.alert").addClass('flipOutX').removeClass('flipInX').fadeOut('5000');
                     vitri.children().remove();
                 }              
    });
}
    // Name:        auto_list_tour
    // Author:      Membell
    // Time:        21:06 27/04/2013
    // Parameter:    
    // Description: Show list Order sale
    function auto_list_tour(){
        var tmlurl = 'r_get_customer.php?tourjson=1&q=tmp';
        jQuery("#tour-team-groupl").html('');
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            if(data != null){
                jQuery.each(data,function(key,value){
                  if( value.contact_person_name != null ){
                    arr_tour[value.contact_person_name] = key;
                    arr_tourl.push(value.contact_person_name);
                  }
                    
                    /*if(value.contact_person_name != null){
                        jQuery("datalist#tour-team-group").append('<option>'+value.contact_person_name+'<option>');
                    }*/
                });
                $("#tour-team-groupl").autocomplete({
                  source: arr_tourl,
                  minLength: 1,
                  select: function( event, ui ){
                  }
                });
             }         
            },
            error: function(){
                message('error','Lỗi kết nối database',jQuery("#cuc-error"));
            }
        });
    }

	// Name:        OUT PRICE
    // Author:      James
    // Time:        14:59 27/04/2014
    // Parameter: 
    // Description: Dua ra gia dat phong
    
    function str2num(val)
            {
                val = '0' + val;
                val = parseInt(val);
                return val;
            };
	
	function outprice(){
      // jQuery("datalist#price").html('');
			//jQuery("input#pricel").val('');
			var i = 101;
			var adult = jQuery("#adults").val();
			var child = jQuery("#children").val();
			var startDate = jQuery("#arival_date").val();
			var endDate = jQuery("#departure_date").val();
            var reser_type_id = jQuery("#source").val();    
            if(cmd=='add'){
             getPriceRoom(roomtype_id,i,id_customer,adult,child,startDate,endDate,reser_type_id);  
            }     
			                  
            getPrice(roomtype_id,i,id_customer,adult,child,startDate,endDate,reser_type_id);
            
		};
        
        
  	function getPrice(roomLevelId,index,customerId,adult,child,startDate,endDate,reservation_type_id){
		if(adult<=0){
		alert('Miss adult quantity');
		jQuery('#adults').focus();
		return false;
		}
		if(roomLevelId){
      reservation_type_id = 1;
		  var tmlurl = 'r_get_rate_list_news.php?&room_level_id='+roomLevelId+'&index='+index+'&customer_id='+customerId+'&adult='+adult+'&child='+child+'&start_date='+startDate+'&end_date='+endDate+'&reservation_type_id='+reservation_type_id;
          jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            option_price_room = data;
            // console.log(data);
            if(data != null){
                jQuery.each(data,function(key,value){
                    if(value.rate != null){
                        jQuery("datalist#price").append('<option value="'+number_format(value.rate,0)+ '"><option>');
                    }
                });
             }         
            },
            error: function(){
                //message('error','GetPrice: Lỗi kết nối database',jQuery("#cuc-error"));
                console.log('Error: function GetPrice from room_information.js');
            }
        });
		}
	   }
    function getPriceRoom(roomLevelId,index,customerId,adult,child,startDate,endDate,reservation_type_id){
		if(adult<=0){
		alert('Miss adult quantity');
		jQuery('#adults').focus();
		return false;
		}
		if(roomLevelId){
      reservation_type_id=1;
		  var tmlurl = 'r_get_rate_list_news.php?&room_level_id='+roomLevelId+'&index='+index+'&customer_id='+customerId+'&adult='+adult+'&child='+child+'&start_date='+startDate+'&end_date='+endDate+'&reservation_type_id='+reservation_type_id;
          jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            console.log(data);
            if(data != null){
                jQuery.each(data,function(key,value){
                    if(value.rate != null){
                        //jQuery("input#pricel").val(number_format(value.rate,0));
                    }
                });
             }         
            },
            error: function(){
                console.log('Error: function getPriceRoom from room_information.js');
                // message('error','getPriceRoom: Lỗi kết nối database',jQuery("#cuc-error"));
            }
        }).done(function(){var tmp_ob =   jQuery("#arival_date");
          //add_price_chart(tmp_ob.val(),jQuery("#departure_date").val());

            if(cmd=='add'){
                //alert('p');
                add_price_chart(date_in,date_out);
                startdate_price = now;
                 
            }else{
               
            } 
        });
		}
	   }
    


    // Name:        auto_list_company
    // Author:      Membell
    // Time:        21:06 27/37/2013
    // Parameter:    
    // Description: Show list Order sale
    /*function auto_list_company(){
        var tmlurl = 'r_get_customer.php?namejson=1&q=tmp';
        jQuery("#companyl").html('');
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            if(data != null){
                 jQuery.each(data,function(key,value){
                    arr_company[value.name] = key;
                    arr_companyl.push(value.name);
                    if(value.name != null){
                        jQuery("datalist#company").append('<option>'+value.name+'<option>');
                    }
                 });
                 $("#companyl").autocomplete({
                    source: arr_companyl,
                    minLength: 1,
                    select: function( event, ui ){
                      customer_id = arr_company[jQuery(this).val()]; 
                      //jQuery("#nationality_name").val('vnm');
                    }
                  });
             }         
            },
            error: function(){
                message('error','Lỗi kết nối database',jQuery("#cuc-error"));
            }
        });
    }*/
    
    // Name:        FOC
    // Author:      James
    // Time:        27/04/2014
    // Parameter: 
    // Description: Foc

    function getBalance(){
            balance=0;
            //jQuery('#balance_result').html('');
            jQuery('#remaining').html('')
            jQuery('#remain').val('');
            
            // lay thong tin he thong
            var exchange_rate=arr_room_payment.exchange_rate;
            var totalroom=arr_room_payment.totalroom;
            var totalservice=arr_room_payment.totalservice;
            
            var total_remaining=0;
          
            var foc = str2num(jQuery('#foc').val().replace(/\./g,''));
            var discount_percent = str2num(jQuery('#discount_percent').val().replace(/\./g,''));
            var discount_money = str2num(jQuery('#discount_money').val().replace(/\./g,''));
            var tax_percent = str2num(jQuery('#tax_percent').val());            
            var service_fee_percent = str2num(jQuery('#service_fee_percent').val());
            
            var payment_vnd = str2num(jQuery('#payment_vnd').val().replace(/\./g,''));
            var payment_usd = str2num(jQuery('#payment_usd').val().replace(/\./g,''));
            var credit_vnd = str2num(jQuery('#credit_vnd').val().replace(/\./g,''));
            var credit_usd = str2num(jQuery('#credit_usd').val().replace(/\./g,''));
           
            //Tinh (13)
           
            var total_after_service_free=parseFloat(totalroom*service_fee_percent/100);
            
            var total_room_final=parseInt(totalroom)
                                +total_after_service_free
                                +parseFloat((parseInt( totalroom)+parseFloat(total_after_service_free))*tax_percent/100)
                                -parseInt(foc)
                                -parseFloat( parseInt(totalroom) - Math.round( totalroom  /( 1 + discount_percent/100) ))
                                -parseInt(discount_money);
            
            
            if(jQuery("#foc_all").attr('checked')){
                total_room_final=0;
            }
                               
            var  total_for_payment=total_room_final+parseInt(totalservice)
                                
            
            //console.log(total_for_payment);
            
            // Tong tien da than toan
            total_remaining=total_for_payment-payment_vnd-credit_vnd - payment_usd*exchange_rate-credit_usd*exchange_rate;
            
             
            if (cmd == 'edit'){
                
                jQuery('#remain').val(number_format(total_remaining,0)); 
                
                jQuery('#remaining').html(number_format(total_remaining,0));
                
                jQuery('#balance_result_2').html(number_format(total_for_payment,0));
                jQuery('#balance_fn').val(number_format(total_for_payment,0));
                
                 if (arr_room_payment.isgroup==0){
                    jQuery('#total_room_payment').html(number_format(total_room_final,0));
                    jQuery('#hid_total_room_payment').val(number_format(total_room_final,0)); 
                 }else{
                    jQuery("#total_room_payment").html('Company');
                    jQuery("#hid_total_room_payment").val('0');
                 }
                         
                     
               
               
            }
			
    };

    

   jQuery(document).ready(function(){
        $('#pricel').focus(function(){
            tmp_price_error = jQuery(this).val();
        });
        
        
        //thay the tat ca cac ki tu
        function replaceAllin(text,code,decode)
        {
            do
                {
                var old_text =text;
                text=text.replace(code,decode);
        
            }while(old_text != text)
            return text;

        }
        
        $('#foc').keyup(function(){
            getBalance();
        });
        $("input[name='foc_all']").click(function(){ 
             var totalroom=arr_room_payment.totalroom;
             
             if(jQuery("#foc_all").attr('checked')){
                
                jQuery('#foc').val(number_format(totalroom,0)); 
                
                jQuery('#foc').addClass("disable").attr("disabled","");
                jQuery('#discount_percent').val(0);
                jQuery('#discount_percent').addClass("disable").attr("disabled","");
                jQuery('#discount_money').val(0);
                jQuery('#discount_money').addClass("disable").attr("disabled","");
                jQuery('#tax_percent').val(0);
                jQuery('#tax_percent').addClass("disable").attr("disabled","");
                jQuery('#service_fee_percent').val(0);
                jQuery('#service_fee_percent').addClass("disable").attr("disabled","");
               
                getBalance();
            }
            else {
              
                //console.log(arr_room_payment);
                
                if (arr_room_payment.isgroup==0){
                    jQuery('#total_room_payment').html(number_format(totalroom,0));
                    jQuery('#hid_total_room_payment').val(number_format(totalroom,0));
                 }else{
                    jQuery("#total_room_payment").html('Company');
                    jQuery("#hid_total_room_payment").val('0');
                 }
                 
                jQuery('#foc').val(0);
                
                getBalance();
                
                jQuery('#tab2-1 .border-box input').removeAttr("disabled").removeClass("disable");
                jQuery('#exchange_rate_value').addClass("disable");
                
            }
        });
        $('#discount_money').keyup(function(){
            getBalance();
        });
        $('#discount_percent').keyup(function(){
            getBalance();
        });
        $('#tax_percent').keyup(function(){
            getBalance();
        });
        $('#service_fee_percent').keyup(function(){
            getBalance();
        });
        $('#payment_vnd').keyup(function(){           
           getBalance();  
        });
        $('#payment_usd').keyup(function(){
           getBalance();  
        });
        $('#credit_vnd').keyup(function(){
            getBalance(); 
        });
        $('#credit_usd').keyup(function(){
            getBalance(); 
        });
        
        $('#pricel').keyup(function(){
           if(allowchangeprice == 0){
            jQuery(this).val(tmp_price_error);
           }
           if(cmd=='add'){
              data_date = jQuery("#arival_date").val();
           }
          if(data_date <  jQuery("#departure_date").val()) {
            add_price_chart(data_date,jQuery("#departure_date").val());
          }  
        });
        
        // out gia theo loai phong khi thay doi loai phong
			jQuery('#roomtypel').change(function(){			     
				roomtype_id = arr_room_type[jQuery(this).val()];
                outprice();                  
                //add_price_chart(jQuery("#arival_date").val(),jQuery("#departure_date").val());  
                //price_chart_arival(jQuery("#arival_date"));    
			});
        
            //check sorce de lua chon cach tinh gia
           // jQuery('#source').change(function(){
//               getBalance(); 
//            });
        });



    // Name:  load_list_soure      
    // Author:      membell
    // Time:        08/06/2014
    // Parameter: 
    // Description: List souce
     function load_list_soure(){
        var tmlurl = 'save_reservation_room.php?list_source=1&q=tmp';
        jQuery("#source").html('');
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            if(data != null){
                jQuery.each(data,function(key,value){
                  if(value!='' && key != ''){ 
                      jQuery("#source").prepend('<option value="'+key+'">'+value+'</option>'); 
                  }   
                });
             }         
            },
            error: function(){
                load_list_soure();
                //message('error','auto_list_ourdor_sale Lỗi kết nối database',jQuery("#cuc-error"));
            }
        });
     }


    // Name:  Contract      
    // Author:      James
    // Time:        28/04/2014
    // Parameter: 
    // Description: Them cac hop dong
    function depositInvoice(isgroup){
        if((status != 'BOOKED')||(isgroup == 999)||(isgroup == 888)){
          
        
    		var url = '?page=extra_service_invoice';
        if(isgroup == 888){
          url += '&deposit=1'; 
        }
        
    		url += '&cmd=add';
         isgroup = (isgroup == 999 || isgroup == 888) ? 0:isgroup; 
    		url += '&isgroup='+isgroup;
    		url += '&reservation_room_id='+r_r_id;
        
    		window.open(url);
        }else{
            message('warning','Phòng '+status+' không được thêm dịch vụ',jQuery("#cuc-error"));
        }

    }
    function allInvoice(typeoffpayment){
        if(status != 'BOOKED'){
           var url = '?page='+typeoffpayment;
		  url += '&cmd=add';
		  url += '&reservation_room_id=' + r_r_id;
		  window.open(url); 
        }else{
            message('warning','Phòng '+status+' không được thêm dịch vụ',jQuery("#cuc-error"));
        }
    }
    
    function registrationForm() {
        var url = '?page=reservation&cmd=guest_registration_card&form=1&id=';
        url += r_r_id;
        window.open(url);
    }
    
    function guestCard(){
        var url = '?page=reservation&cmd=guest_registration_card&id=';
        url += r_r_id;
        window.open(url);
    }
    

    // Name:  Show Invoice      
    // Author:      James
    // Time:        30/04/2014
    // Parameter: 
    // Description: Xem hoa don   
    
    
    function convert(day){
        var std =day.split("-");
		var std_day=std[0];
		var std_month=std[1];
		var std_year=std[2];
        var reDay=std_day+"/"+std_month+"/"+std_year;
        return reDay;
    }
    
    function cMoney(money){
        var mn =money.split(",");
		var mn_1=mn[0];
		var mn_2=mn[2];
        var reMon=mn_1 + mn_2;
        return reMon;
    }
    

    function updateUrl(){
  	var url = '';
  	if($("#room-contract").is(':checked')){
  		url += '&room_invoice=1';
  	} else {url += '&room_invoice=0'; }
  	if($("input[name='chamber-contract']").is(':checked')){
  		url += '&hk_invoice=1';
  	} else {url += '&hk_invoice=0';}		
  	if($("input[name='restaurant-contract']").is(':checked')){
  		url += '&bar_invoice=1';
  	}	else {url += '&bar_invoice=0';}	
  	if($("input[name='extra-contract']").is(':checked')){
  		url += '&extra_service_invoice=1';
  	} else {url += '&other_invoice=0';}
  	if($("input[name='phone-contract']").is(':checked')){
  		url += '&phone_invoice=1';
  	} else {url += '&phone_invoice=0';}
  	if($("input[name='expand-service-contract']").is(':checked')){
  		url += '&other_invoice=1';
  	} else {//url += '&extra_service_invoice=0';
    }
  	if($("input[name='massage-contract']").is(':checked')){
  		url += '&massage_invoice=1';
  	} else {url += '&massage_invoice=0';}
  	if($("input[name='includes-other-amounts']").is(':checked')){
  		url += '&included_related_total=1';
  	} else {url += '&included_related_total=0';}
  	jQuery('#url').val(url);
    }
    
    
   function change_identity(){
      jQuery("#type_card").change(function(){
        var tmp = jQuery(this).val();
        
      });
   }
    
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
