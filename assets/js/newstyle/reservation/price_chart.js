    //-----------------------------
    // 			Price chart	     //
    // ---------------------------

    var i_price_chart= 2;
    
    

    function check_date(in_date,lenght,callback,callback2){
        callback();
         // console.log( in_date+"-"+lenght );
        /*if( in_date == now ){  in_date = add_date(now,1); lenght-1;}
            var tmp = {};
            tmp[0] = in_date; 
            for (var i = 1; i <= lenght ; i++) {
                tmp[i] = add_date(in_date,i);
                // console.log(tmp[i]);
            }
            // console.log(tmp);
            jQuery(".popup_checkdate_folio table tbody").html("");
            var data_conver = JSON.stringify(tmp); 
            jQuery.post(
            "process_folio.php?check_date_folio=1&r_r_id="+r_r_id+"&id="+id+"#" + Math.random(),
            {
                "data" : data_conver 
            }).done(function(data)
            { 
                if( data != 0 ){
                    var row = '';
                    jQuery.each(JSON.parse(data),function(key,value){//console.log(value);
                        row = '<tr><td>'+value.date_use+'</td><td>'+value.folio_id+'</td></tr>';
                        jQuery(".popup_checkdate_folio table tbody").append(row);
                    });
                    jQuery('.popup_checkdate_folio').modal('show');
                    callback2(); 
                }else{
                    callback();
                } 
            }).fail(function() {
                callback();
            }).always(function () {
                // callback();
            }); */
       
    }

    // Name:        list_room
    // Author:      Membell
    // Time:        14:35 23/04/2014
    // Parameter: 
    // Description: List ra cac phong tuong ung hang phong
    function add_price_chart(in_date,form_date) {
       // console.log(in_date+'--'+form_date);
        
            total_price = 0;
            if(cmd=='add')
            { 
                jQuery("div#content_prince_chart label.on").remove();
                
                var prince      = jQuery("#pricel").val();if(prince.length==0) prince=0;
                
                var std =in_date.split("/");
                var std_day=std[0];
                var std_month=std[1];
                var std_year=std[2];
                var inm = in_date;
                // if(if_room['departure_time']){
                //     in_date = if_room['departure_time'];
                //     inm     = if_room['departure_time'];
                //     console.log(if_room['departure_time']);
                // }
                var totalday=count_date(in_date,form_date);
                
                if (totalday>0) totalday=totalday-1;

                if(jQuery("#arival_date").val() != form_date){
                    if ((totalday==0))  jQuery("#night").val(totalday+1);
                    else jQuery("#night").val(totalday+1);
                }else{
                    var totalday=count_date(jQuery("#arival_date").val(),form_date);
                    if ((totalday==0))  jQuery("#night").val(totalday);
                    else jQuery("#night").val(totalday+1);
                }
                
        

                
                for (var i = totalday ; i >= 0; i--) {
                   
                    var tmp = ''
                    +'<label for="date_1" class="date on"><p>'+ inm + '</p>'
                        +'<input type="text" name="date_1" list="date_'+(i_price_chart++)+'" id="date_1"  class="date_'+(i_price_chart-1)+' price_ch text ui-widget-content ui-corner-all" value="'+prince+'">'
                        +'<datalist id="date_'+(i_price_chart-1)+'"></datalist>'
                        +'<div id="error-date_1" class="alert  alert-info flipOutX" style="display:none"><a class="close" data-dismiss="alert">×</a><strong>Warning:</strong> Nhập sai định dạng (number)</div>'
                     +'</label>';
                    
                    
                     inm=add_date(inm,1);
                    //  if(prince != 0){
                    //     total_price += str2num(prince.replace(/\./g,''));
                    // }
                     
                     if (parseInt(prince)>0)  total_price += str2num(prince.replace(/\,/g,''));
                    jQuery("div#content_prince_chart").append(tmp);
                    list_data_price(i_price_chart-1);
                }
               
            }
            else 
            {
               check_date(jQuery("#departure_date").val(),count_date( jQuery("#departure_date").val(), di_ok ), function(){
                    // if( (count_date( jQuery("#departure_date").val(), di_ok ) < 0 ) ){
                        if(jQuery('select#price').val() != ''){
                            jQuery("div#content_prince_chart label.on").remove();
                            var prince      = jQuery("#pricel").val();if(prince.length==0) prince=0;
                            
                            var std =in_date.split("/");
                            var std_day=std[0];
                            var std_month=std[1];
                            var std_year=std[2];
                            var inm = in_date;
                            // if(if_room['departure_time']){
                            //     in_date = if_room['departure_time'];
                            //     inm     = if_room['departure_time'];
                            //     console.log(if_room['departure_time']);
                            // }
                            var to = count_date(jQuery("#arival_date").val(),jQuery("#departure_date").val());
                            //alert(to);
                            var totalday=count_date(in_date,form_date);
                            if (to>0) to=to;
                            
                            if(now != jQuery("#arival_date").val()){
                                if ((to == 0))  jQuery("#night").val(to);
                                else jQuery("#night").val(to);
                            }else{
                                //var to=count_date(jQuery("#arival_date").val(),jQuery("#departure_date").val());
                                if ((to == 0))  jQuery("#night").val(to);
                                else jQuery("#night").val(to);
                            }
                            
                            //if(totalday >= 0 ){
                            for (var i = totalday ; i >= 0; i--) {
                                if(count_date(inm,now) <= 0 ){
                                    var tmp = ''
                                    +'<label for="date_1" class="date on"><p>'+ inm + '</p>'
                                        +'<input type="text" name="date_1" list="date_'+(i_price_chart++)+'" id="date_1"  class="date_'+(i_price_chart-1)+' price_ch text ui-widget-content ui-corner-all" value="'+prince+'">'
                                        +'<datalist id="date_'+(i_price_chart-1)+'"></datalist>'
                                        +'<div id="error-date_1" class="alert  alert-info flipOutX" style="display:none"><a class="close" data-dismiss="alert">×</a><strong>Warning:</strong> Nhập sai định dạng (number)</div>'
                                     +'</label>';
                                 }else{
                                    var tmp = ''
                                    +'<label for="date_1" class="date off"><p>'+ inm + '</p>'
                                        +'<input type="text" name="date_1" disabled id="date_1"  class="date_'+(i_price_chart++)+' disable price_ch text ui-widget-content ui-corner-all" value="'+prince+'"><div id="error-date_1" class="alert  alert-info flipOutX" style="display:none"><a class="close" data-dismiss="alert">×</a><strong>Warning:</strong> Nhập sai định dạng (number)</div>'
                                     +'</label>';
                                 }
                                
                                 inm=add_date(inm,1);
                                 
                                 if (parseInt(prince)>0)  total_price += str2num(prince.replace(/\./g,''));
                                jQuery("div#content_prince_chart").append(tmp);
                                list_data_price(i_price_chart-1);
                            }
                        }
                    // }

               },function(){ 
                    jQuery("#departure_date").val(di_ok); 
               } );  
                //console.warn(old_change_price_arr);
                //var tmp2 = count_date(jQuery("#arival_date").val(),now);
                //alert(tmp2);
                
                    
            }
       
    }


    function add_price_chart_addstart(in_date,form_date) {
        var tmp_out = '';
        var prince      = jQuery("#pricel").val();if(prince.length==0) prince=0;
        var std =in_date.split("/");
        var std_day=std[0];
        var std_month=std[1];
        var std_year=std[2];
        var inm = in_date;
        var totalday=count_date(in_date,form_date);
        for (var i = totalday ; i >= 0; i--) {
            if(count_date(inm,now) <= 0 ){
                var tmp = ''
                +'<label for="date_1" class="date on start"><p>'+ inm + '</p>'
                    +'<input type="text" name="date_1" list="date_'+(i_price_chart++)+'" id="date_1"  class="date_'+(i_price_chart-1)+' price_ch text ui-widget-content ui-corner-all" value="'+prince+'">'
                    +'<datalist id="date_'+(i_price_chart-1)+'"></datalist>'
                    +'<div id="error-date_1" class="alert  alert-info flipOutX" style="display:none"><a class="close" data-dismiss="alert">×</a><strong>Warning:</strong> Nhập sai định dạng (number)</div>'
                 +'</label>';
             }else{
                var tmp = ''
                +'<label for="date_1" class="date off start"><p>'+ inm + '</p>'
                    +'<input type="text" name="date_1" disabled id="date_1"  class="date_'+(i_price_chart++)+' disable price_ch text ui-widget-content ui-corner-all" value="'+prince+'"><div id="error-date_1" class="alert  alert-info flipOutX" style="display:none"><a class="close" data-dismiss="alert">×</a><strong>Warning:</strong> Nhập sai định dạng (number)</div>'
                 +'</label>';
             }
            
            inm=add_date(inm,1);
             
            if (parseInt(prince)>0)  total_price += str2num(prince.replace(/\./g,''));
            tmp_out+=tmp;
        }
        jQuery("div#content_prince_chart").prepend(tmp_out);
        list_data_price(i_price_chart-1);
    }


    function remove_price_start(in_date){
        if( count_date(in_date,jQuery("#departure_date").val()) > 0 ){
            jQuery("div#content_prince_chart label").each(function(){
                var date_t = jQuery(this).find("p").text();
                if(count_date(in_date,date_t) < 0 ){
                    jQuery(this).remove();
                }
            });
        }else{
            var prince      = jQuery("#pricel").val();if(prince.length==0) prince=0;
            jQuery("div#content_prince_chart").html('');
            var tmp = ''
            +'<label for="date_1" class="date on"><p>'+ in_date + '</p>'
                +'<input type="text" name="date_1" list="date_'+(i_price_chart++)+'" id="date_1"  class="date_'+(i_price_chart-1)+' price_ch text ui-widget-content ui-corner-all" value="'+prince+'">'
                +'<datalist id="date_'+(i_price_chart-1)+'"></datalist>'
                +'<div id="error-date_1" class="alert  alert-info flipOutX" style="display:none"><a class="close" data-dismiss="alert">×</a><strong>Warning:</strong> Nhập sai định dạng (number)</div>'
             +'</label>';
             jQuery("div#content_prince_chart").append(tmp);
             list_data_price(i_price_chart-1);
        }
        
    }

    function calculateDays(dateFrom,dateTo){
    	var begDate = new Date(convertDateToJSDate(dateFrom));
    	var endDate = new Date(convertDateToJSDate(dateTo));
    	var difDate = endDate.getTime() - begDate.getTime();
    	return difDate/(24*60*60*1000);
    }

    
     //-----------------------------
    // 			Price chart	     //
    // ---------------------------



    // Name:        list_room
    // Author:      dungnn
    // Time:        14:35 05/05/2014
    // Parameter: 
    // Description: make default Price chart for each room in Group 
    function add_price_chart_default(in_date,form_date, prince,currency_id) {
            var arr_pricechart = {};
            var totalday=count_date(in_date,form_date);
            var inm = in_date;
            if (totalday>0) totalday=totalday-1;
            for (var i = totalday ; i >= 0; i--) {
                 arr_pricechart[inm]=prince;
                 
                 
                 inm=add_date(inm,1);
            }
            return arr_pricechart;
       
    }
    

    // Name:        count_date
    // Author:      Membell
    // Time:        20:56 26/04/2014
    // Parameter: 	start_day(ngay vao), end_day(ngay ra)
    // Description: Dem so ngay trong khoang 2 moc ngay cho truoc
    function count_date(start_day, end_day)
	{
		var std = start_day.split("/");
		var std_day=std[0];
		var std_month=std[1];
		var std_year=std[2];
	//----------------------------
		var ed = end_day.split("/");
		var ed_day=ed[0];
		var ed_month=ed[1];
		var ed_year=ed[2];
	//----------------------------
		var startDAY=std_month+"/"+std_day+"/"+std_year;
		var endDAY=ed_month+"/"+ed_day+"/"+ed_year;
		var std_second=Date.parse(startDAY);
		var ed_second=Date.parse(endDAY);
		return (ed_second-std_second)/86400000;
	}


	// Name:        add_date
    // Author:      Membell
    // Time:        00:29 27/04/2014
    // Parameter: 	date(ngay vao), intm(so ngay muon them vao)
    // Description: Tien toi n ngay tu ngay nhap dau vao
	function add_date(date,intm){
		var std =date.split("/");
		var std_day=std[0];
		var std_month=std[1];
		var std_year=std[2];

		var startDAY=std_month+"/"+std_day+"/"+std_year;
		var std_second=Date.parse(startDAY);
		std_second += intm*86400000;
		return new Date(std_second ).format('dd/mm/yyyy');
	}

	// Mang danh sach quoc tich
	var Nationality = [];
    var Nationality_l = [];
	function get_updateNationality(){
        Nationality_l = [];
		var tmlurl = 'r_get_room.php?updateNationality=1';
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
                if(data != null){
                    jQuery.each(data,function(key,value){
                        Nationality[key] = value.name;
                        Nationality_l.push(key);
                        //jQuery("datalist#list_nationality_id").append('<option>'+key+'<option>');
                     });  
                    $( "#nationality_id").autocomplete({ 
                        source: Nationality_l,
                        minLength: 1,
                        select: function( event, ui ) { 
                        //alert(jQuery( "#nationality_id").val());
                        jQuery("#nationality_name").val(Nationality[ui.item.value]);
                      }
                    });
                }     
            },
            error: function(){
              message('error','Lỗi kết nối database',jQuery("#cuc-error"));
            }
        });
	}

    function number_format(nStr,dec)
    {
    	//nStr = format_number(nStr,2);
    	nStr += '';
    	
    	x = nStr.split(',');
    	x1 = x[0];
    	//x2 = x.length > 1 ? '.' + x[1] : '';
    	
    	//duc them
    	var decimals = dec; 
    	if(x.length > 1){
    		var x2 = new String(x[1]);		
    		x2 = String(Math.round(parseFloat(x[1])/Math.pow(10,(x2.length - decimals))));
    		while(x2.length < decimals) { x2 = '0'+x2; }
    		x2 = ','+x2;
    	} else{
    		var x2 = '';
            
            if (dec>0)
            { x2 += '.';
    		  while(x2.length <= decimals) { x2 += '0'; }
            }  
    	}
    	//end edit
    	
    	var rgx = /(\d+)(\d{3})/;
    	while (rgx.test(x1)) {
    		x1 = x1.replace(rgx, '$1' + ',' + '$2');
    	}
    	return x1 + x2;
    }
    
    function roundNumber(num, dec) {
    	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    	return result;
    }

    function list_data_price(index){
        var tmp = 0;
        jQuery('.date_'+index).focus(function(){
            tmp = jQuery(this).val();
            var t = jQuery(this).attr("list"); 
            jQuery("#"+t).html('');
            jQuery.each(option_price_room,function(key,value){
                jQuery("#"+t).append("<option>"+number_format(value.rate,0)+"</option>");
            });
        });
        jQuery('.date_'+index).keyup(function(){
            if(allowchangeprice==0){
                jQuery(this).val(tmp);
            }
        });
    }
	
	