// User create: Membell 
// Tai file html goc phai khoi tao bien type = loai dang ap dung.
//VD var type ="MINIBAR";


jQuery(document).ready(function(){
		var row = '<tr>'
					+'<td><input type="checkbox" checked="" value="[[INVOICEID]]" /></td>'
					+'<td  class="text-center">[[CODE]]</td>'
					+'<td  class="text-center">[[ROOM]]</td>'
					+'<td  class="text-center">[[DATE]]</td>'
					+'<td>[[FULLNAME]]</td>'
					+'<td  class="text-right">[[AMOUNT]]</td>'
					+'<td  class="text-center"></td>'
				+'</tr>';
		var rowf = '<tr style="opacity: 0.5;">'
					+'<td></td>'
					+'<td  class="text-center">[[CODE]]</td>'
					+'<td  class="text-center">[[ROOM]]</td>'
					+'<td  class="text-center">[[DATE]]</td>'
					+'<td>[[FULLNAME]]</td>'
					+'<td  class="text-right">[[AMOUNT]]</td>'
					+'<td  class="text-center">[[FOLIOID]]</td>'
				+'</tr>';
		// var type = "";		
		var invoice_idok = 0 ;
		var rid = 0;
		var r_r_id = 0;

		jQuery('#confirm_delete').on('show.bs.modal', function (event) {
		  var button = jQuery(event.relatedTarget); // Button that triggered the modal
		  // var recipient = button.data('whatever'); // Extract info from data-* attributes
		  var modal = $(this);
		  	if( type == 'EXTRA_SERVICE' ){
		  		show_info_service( button.data('amount'),button.data('date'),button.data('room'),button.data('list_sp') );
		 	}else{
		 		show_info_service( button.data('amount'),button.data('date'),button.data('room'),button.data('whatever'));
		 	}
		  // jQuery("#body_confirm_delete_room").html(recipient); 
		});

		function show_info_service(amount,date,room,invoice_id,list_sp){
			invoice_idok = invoice_id; 
			amount = ( amount == '0')?0:amount.replace(/,/g,"");
			var tmlurl = 'process_folio.php?exit_service=1&amount='+amount+'&type='+type+'&invoice_id='+invoice_id+'#'+ Math.random(); 
			 
	        jQuery.ajax({
	           type: 'POST',
	           url: tmlurl,
	           dataType: 'html',
	           success: function(data){
           		jQuery(".amount_service,.date_service,.room_service,.folio_service").html(""); 
           		jQuery(".amount_service").html( amount );
                jQuery(".date_service").html( date );
                jQuery(".room_service").html( room );

	            if(data != 0){   
	                jQuery(".folio_service").html( data  );
	                 
	                 	jQuery(".header_confirm").html(dich_vu_da_duoc_tao_folio_khong_duoc_xoa);
	                 	jQuery(".showok").hide();
	                 	jQuery(".hideok").show();
	                  /*else{
	                 	jQuery(".header_confirm").html("B?n có ch?c ch?n mu?n xóa?");
	                 	jQuery(".showok").show();
	                 	jQuery(".hideok").hide();
	                 }*/
	             }else{
	             	jQuery(".header_confirm").html(ban_co_chac_muon_xoa);
                 	jQuery(".showok").show();
                 	jQuery(".hideok").hide();
	             }         
	            },
	            error: function(){  //console.log(11111);
	            }
	        });
		}


		 function delete_service( ){
			var tmlurl = 'process_folio.php?delete_service=1&type='+type+'&invoice_id='+invoice_idok+'#'+ Math.random(); 
	        jQuery.ajax({
	           type: 'POST',
	           url: tmlurl,
	           dataType: 'json',
	           success: function(data){
	                if( data == 1 ){
	                	if( type == 'EXTRA_SERVICE' ){
	                		jQuery("#colum_"+invoice_idok).hide();
	                		jQuery(".colum_"+invoice_idok).hide();
	                	 	jQuery("#room_name_"+invoice_idok).parent().hide();
	                	}else{
	                		jQuery("#colum_"+invoice_idok).hide();
	                	 	jQuery("#room_name_"+invoice_idok).parent().parent().hide();
	                	}
	                	 
	                }else{
	                	alert(vui_long_thu_lai_it_phut);
	                }
	            },
            	error: function(){  
	            }
	        });
		}


		function delete_services(){
			var arr_service_checkbox = {};
			jQuery("#body_confirm_delete_checkbox tr").each(function(){
				var btn = jQuery(this).find("input[type='checkbox']");
				if( btn.is(':checked') ){
					arr_service_checkbox[btn.val()] = 1;
				}
			});
			var arr_convert = JSON.stringify(arr_service_checkbox); 
			jQuery.post(
	        'process_folio.php?delete_services=1&type='+type+'#'+ Math.random() , 
	        {
	          "data" : arr_convert 
	        }).done(function(data) 
		        {  
		        	dataconvert = JSON.parse(data);
		            jQuery.each(dataconvert['success'] ,function(key,value){
		            	// console.log(jQuery("tr#colum_"+key));
		            	// jQuery("#colum_"+invoice_idok).hide();
	                	jQuery(".colum_"+key).hide();
		            	jQuery("#room_name_"+key).parent().parent().hide();
		            });	 
		        })
	        .fail(function() { 
		        })
	        .always(function () { 
		        }); 
		}

		jQuery('#confirm_delete_checkbox').on('show.bs.modal', function (event) {
		  var button = jQuery(event.relatedTarget);  
		  var modal = $(this);
		  // console.log(arr_service);
		  show_info_service_checkbox();  
		}); 



		var arr_service  = {};
		var arr_services = {};
		
		jQuery("input[type='checkbox']").click(function(){  
			if( jQuery(this).val() == 1 ){
				if(jQuery(this).is(':checked')){
					jQuery("#table_services tbody tr").each(function(){
						var btn = jQuery(this).find("input[type='checkbox'].dong");
						var idm = btn.val();  
						 if(  typeof(idm) != 'undefined'){
							var tmp = {}; 
							tmp["room"]     				= jQuery("#room_name_"+idm).html(); 
							tmp["code"]     				= idm;
							tmp["date"]     				= jQuery("#date_"+idm).html();
							tmp["reservation_room_id"]     	= jQuery("#reservation_room_id_"+idm).html();  
							tmp["amount"]     				= jQuery("#amount_"+idm).html();  
							tmp["folio_id"] 				= '';  
							  
							arr_service[btn.val()]  = tmp;
							// arr_services[btn.val()] = 1;
							if( type == 'EXTRA_SERVICE' ){ 
								arr_services[btn.val()] = jQuery("#detail_"+idm).val();
							}else{
								arr_services[btn.val()] = 1;	
							} 
						}
						/*}else{
							arr_service[btn.val()]  = null;
							arr_services[btn.val()] = null;
						}*/
					}); 
				}else{
					jQuery("#table_services tbody tr").each(function(){
						var btn = jQuery(this).find("input[type='checkbox' ]");
						var idm = btn.val();
						arr_service[btn.val()]  = null;
						arr_services[btn.val()] = null;
					});
				}
			}else{
				var btn = jQuery(this);
				var idm = btn.val();
				if(jQuery(this).is(':checked')){
					var tmp = {}; 
					tmp["room"]     				= jQuery("#room_name_"+idm).html(); 
					tmp["code"]     				= idm;
					tmp["date"]     				= jQuery("#date_"+idm).html();
					tmp["reservation_room_id"]     	= jQuery("#reservation_room_id_"+idm).html();  
					tmp["amount"]     				= jQuery("#amount_"+idm).html();  
					tmp["folio_id"] 		 		= '';  
					  
					arr_service[btn.val()]  = tmp;
					if( type == 'EXTRA_SERVICE' ){ 
						arr_services[btn.val()] = jQuery("#detail_"+idm).val();
					}else{
						arr_services[btn.val()] = 1;	
					} 
				}else{
					arr_service[btn.val()]  = null;
					arr_services[btn.val()] = null;
				}
			}
			 // console.log(arr_service);
		});
		

		function show_info_service_checkbox(){ 
			var arr_service_checkbox = JSON.stringify(arr_services);
			// console.log( count_object(arr_services)  );
			jQuery("#body_confirm_delete_checkbox").html("");
			if(  count_object(arr_services) == 0   ){
				jQuery(".header_confirms").html("B?n chýa ch?n d?ch v?");
				jQuery("#yes_confirm_delete_rooms").hide();
			}else{
			 
			
			jQuery.post(
	        'process_folio.php?exit_services=1&type='+type+'#'+ Math.random() , 
	        {
	          "data" : arr_service_checkbox 
	        }).done(function(data) 
		        {  
		        	dataconvert = JSON.parse(data); 
		        	if( count_object(arr_service) == count_object(dataconvert) ){
		        		jQuery("#yes_confirm_delete_rooms").hide();
		        		jQuery(".header_confirms").html(khong_co_dich_vu_nao_hop_le);
		        		jQuery("#no_confirm_delete_rooms").hide();
		        	}else{
		        		jQuery("#yes_confirm_delete_rooms").show();
		        		jQuery(".header_confirms").html(ban_co_chac_muon_xoa);
		        		// jQuery("#no_confirm_delete_rooms").html("No");
		        	}
		        	jQuery.each(arr_service ,function(key,value){///console.log( dataconvert[key]  );console.log( key  );
		        	 	if( value != null){
		        	 		if( typeof(dataconvert[key]) == 'undefined' ){
			        	 		var tmp = row; 
			        	 		tmp = tmp.replace("[[INVOICEID]]",value.code);
			        	 	}else{
			        	 		var tmp = rowf;
			        	 		var fo = dataconvert[key];
			        	 		var folio = "";
			        	 		
			        	 		if( type == "EXTRA_SERVICE" ){
			        	 			jQuery.each(fo ,function(key2,value2){
										folio += "<a target='_blank' href='?page=reservation&cmd=edit&id="+value2.reservation_id+"&r_r_id="+value2.reservation_room_id+"'>"+value2.folio_id+"<a>  ";
				        	 		});
			        	 		}else{
			        	 			folio += "<a target='_blank' href='?page=reservation&cmd=edit&id="+fo.reservation_id+"&r_r_id="+fo.reservation_room_id+"'>"+fo.folio_id+"<a>  ";
			        	 			// tmp = tmp.replace("[[FOLIOID]]",fo.folio_id);
			        	 		}
			        	 		tmp = tmp.replace("[[FOLIOID]]",folio);
			        	 		tmp = tmp.replace("[[ID]]",fo.reservation_id);
			        	 		tmp = tmp.replace("[[RRID]]",fo.reservation_room_id);
			        	 	}
			        	 	tmp = tmp.replace("[[CODE]]",value.code);
			        	 	tmp = tmp.replace("[[ROOM]]",value.room);
			        	 	tmp = tmp.replace("[[DATE]]",value.date);
			        	 	tmp = tmp.replace("[[FULLNAME]]",value.reservation_room_id);
			        	 	tmp = tmp.replace("[[AMOUNT]]",value.amount);
			        	 	jQuery("#body_confirm_delete_checkbox").append(tmp);
			        	 } 
		        	 });
		        })
	        .fail(function() { 
		        })
	        .always(function () { 
		        }); 
	    }
		} 

		function count_object(arr) {
			var count = 0;
			jQuery.each(arr ,function(key,value){
				if(value != null){
					count++;
				}
			});
			return count;
		}

		jQuery("#yes_confirm_delete_rooms").click(function(){
			delete_services( );
		});


		jQuery("#yes_confirm_delete_room").click(function(){
			delete_service( );
		});

		jQuery("#yes_view_room").click(function(){
			window.open('?page=reservation&cmd=edit&id='+rid+'&r_r_id='+r_r_id);
		});

	});