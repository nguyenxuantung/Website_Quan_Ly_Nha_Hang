<link href="assets/css/newstyle/reservation/bootstrap.css" rel="stylesheet"> 
<style type="text/css">
.simple-layout-bound{width:100% !important;}
@media screen and (max-width: 1366px){
.right_content{float:left;width:875px; overflow-x:scroll;}
}
@media screen and (max-width: 1280px){
.right_content{float:left;width:813px; overflow-x:scroll;}
}
@media screen and (max-width: 1024px){
.right_content{float:left;width:557px; overflow-x:scroll;}
.simple-layout-content{border: none !important;}
}
.read{
background: #FA5050;
color: #fff;

}
label {
    padding-top:0;
}
</style>

<script type="text/javascript">
    function string_to_date(d) {
        var from = d.split("/");
        f = new Date(from[2], from[1] - 1, from[0]);
        return f;
    }
		jQuery(document).ready(function(){ 
            var arr_customer2 = [];
            var arr_tours2 = [];
            for(var idx in arr_customer) {
                arr_customer2.push(arr_customer[idx]);
            }
            for(var idx in arr_tours) {
                arr_tours2.push(arr_tours[idx]);
            }
            jQuery("#customer_name").typeahead(
                {source:arr_customer2,
                displayField: "id"}
            );
            jQuery("#tour_name").typeahead(
                {source:arr_tours2,
                displayField: "id"}
            );
            jQuery("#night").change(function(){
                var days_diff = parseInt( jQuery(this).val());
                if (isNaN(days_diff)) {
                    days_diff = 1;
                    jQuery(this).val(days_diff);
                }
                var fromDate =  jQuery("#arrival_time").val();
                var date = string_to_date(fromDate).getTime();
                var toDate = new Date(date + days_diff * 60000 * 60 * 24);
                jQuery("#departure_time").val(toDate.format("dd/mm/yyyy"));
            });
			jQuery(".check-availability-day:contains(-)").addClass("read");
		});
    
    var allowchangeprice = <?php echo User::get_allowchangeprice(); ?>;
     
    var tmp_price_error = 0;
	var ty_gia ='<?php echo $_REQUEST['usd']; ?>';     

    //console.log('allo:'+allowviewlog);
    //console.log('allowchangefromcheckintocheckout:'+allowchangefromcheckintocheckout);
    //console.log('add:'+obj['[[.ADD_SHOP.]]'])
    //console.log(obj);
</script>
<script src ="assets/js/newstyle/reservation/jquery.price_format.2.0.min.js"></script>
<script src="assets/js/newstyle/reservation/room_information.js"></script>
<script src="assets/js/newstyle/reservation/dateFormat.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/bootstrap/bootstrap-typeahead.min.js"></script>
<form name="CheckAvailabilityForm" method="post">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table-bound">
    <tr height="20">
	    <td width="90%" class="form-title">[[.reservation.]]</td>      
    </tr>
</table>
<div>
<?php if(Form::$current->is_error()){?><div><br><?php echo Form::$current->error_messages();?></div><br clear="all"><?php }?>
    <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">[[.options.]]</h3>
  </div>
  <div class="panel-body">
 		<table width="100%">
			<tr>
			<td width="25%" valign="top">
				<label class="border_label"><label class="group_option" style="width:10%;">[[.from.]]:</label> <input name="time_in" type="text" id="time_in" class="date-input" style="width:50px;"> <input name="arrival_time" type="text" id="arrival_time" class="date-input" style="width:80px;">
				</label>
				<label class="border_label">
					<label class="group_option" style="width:10%;">[[.to.]]: </label><input name="time_out" type="text" id="time_out" class="date-input" style="width:50px;"> <input name="departure_time" type="text" id="departure_time" class="date-input" style="width:80px;">
					<input name="night" type="text" id="night" style="width:50px;" class="form-control">
				</label>
			</td>
			<td width="35%" valign="top">
				<label class="border_label">
					<label class="group_option">[[.company.]]: </label><input name="customer_name" type="text" id="customer_name" style="width:55%;" AUTOCOMPLETE=OFF onchange="updatecustomer();" onblur="updatecustomer();" >
        <input name="customer_id" type="text" id="customer_id" style="display:none;">
        <a href="#" onclick="window.open('?page=customer&amp;action=select_customer','customer')" style="float:left; margin-top:5px; width:20px;"> 
        <button class="btn btn-default btn-sm"> <span class="glyphicon glyphicon-search"></span></button>
        </a>
        <!-- <img width="15" src="packages/core/skins/default/images/buttons/delete.gif" onClick="$('customer_name').value='';$('customer_id').value=0;" style="cursor:hand;padding-right: 20px;"> -->
				</label>
				<label class="border_label">
					<label class="group_option">[[.tour.]]: </label><input name="tour_name" type="text" id="tour_name" style="width:55%;" AUTOCOMPLETE=OFF onchange="updateTour();" onblur="updateTour();" >
  <input name="tour_id" type="hidden" id="tour_id" value="0" />
  <a href="#" onclick="window.open('?page=tour&amp;action=select_tour','tour')" style="float:left; margin-top:5px; width:20px;">
  <!-- <img src="skins/default/images/cmd_Tim.gif" width="20px;" /></a> <img width="15" src="packages/core/skins/default/images/buttons/delete.gif" onClick="$('tour_name').value='';$('tour_id').value=0;" style="cursor:hand;"> -->
				</label>
			</td>
			<td width="30%" valign="top">
				<label class="border_label">
					<label class="group_option">[[.source.]]: </label><select name="reservation_type_id" id="reservation_type_id"></select>
					[[.confirm.]]: <input name="confirm" type="checkbox" id="confirm" />
				</label>
				<label class="border_label">
					<label class="group_option">[[.booking_code.]]:</label> <input name="booking_code" type="text" id="booking_code" style="width:55%;" tabindex="7">
				</label>
			</td>
			<td width="10%" valign="top">
				<label class="border_label">
					<button name="search" type="submit" class="btn btn-default">
                    <span class="glyphicon glyphicon-check"></span> [[.check_availability.]]
                    </button>
    
				</label>
				<label class="border_label">
					<button name="book" type="submit" class="btn btn-default" >
                    <span class="glyphicon glyphicon-calendar"></span>
                        [[.book_now.]]
                    </button>
				</label>
			</td>
			</tr>
		</table>
	</div>
 </div>
</div>
<div>
<table width="100%" border="1" cellspacing="0" cellpadding="0" bordercolor="#CCCCCC">
  <tr>
    <td style="width:460px;"><?php $i=1;$j=0;?>
    <div style="overflow-y:scroll;width:100%;float:left;">
		<!--LIST:room_levels-->
        	<div class="check-availability-item" style="float:left;width:460px;">
			<?php if($i>1){?>
            <input  name="adult_[[|room_levels.id|]]" type="text" id="adult_[[|room_levels.id|]]" class="price1" style="width:40px; float:left;" tabindex="<?php echo $j+9;$j++;?> ">
            <input  name="child_[[|room_levels.id|]]" type="text" id="child_[[|room_levels.id|]]" class="price1" style="width:40px; float:left;" tabindex="<?php echo $j+9;$j++;?> class ="price_fomat" ">
            <input  name="price_[[|room_levels.id|]]" list="price_option_[[|room_levels.id|]]" type="text" id="price_[[|room_levels.id|]]" class="price1" style="width:90px; float:left;"  tabindex="<?php echo $j+9;$j++;?>" onfocus="buildRateList('[[|room_levels.id|]]');" onclick="buildRateList('[[|room_levels.id|]]');">
            <datalist id="price_option_[[|room_levels.id|]]">
            </datalist>
            <input  name="usd_[[|room_levels.id|]]" type="text" id="usd_[[|room_levels.id|]]" class="usd" style="width:60px; float:left;"  tabindex="<?php echo $j+9;$j++;?>" onkeyup="convert_usd('[[|room_levels.id|]]');">
            <input  name="room_quantity_[[|room_levels.id|]]" type="text" id="room_quantity_[[|room_levels.id|]]" style="height:26px; width:50px !important;//min-width:40px;//background-color:#FF9;border:1px solid #F90; float:left;"  tabindex="<?php echo $j+9;$j++;?>" class="room-quantity-by-date" lang="[[|room_levels.id|]]" title="[[.room_quantity.]]">
			<input  name="note_[[|room_levels.id|]]" type="text" id="note_[[|room_levels.id|]]" style="display:none; height:26px;//min-width:40px;width:55px; float:left;" tabindex="<?php echo $j+9;$j++;?>"> 
            <?php }else{?>
            <span class="room-quantity-by-date" style="width:40px; float:left;margin-right:10px; height:35px; line-height:35px;text-align:center"><img src="packages/core/skins/default/images/buttons/adult.png" style="margin-top:5px;"></span>
            <span class="room-quantity-by-date" style="width:40px; float:left;margin-right:10px; height:35px; line-height:35px;text-align:center"><img src="packages/core/skins/default/images/buttons/child.png" style="margin-top:5px;"></span>
            <span class="room-quantity-by-date" style="width:90px; float:left;margin-right:10px; height:35px; line-height:35px;text-align:center">[[.price.]]</span>
            <span class="room-quantity-by-date" style="width:60px; float:left;margin-right:10px; height:35px; line-height:35px;text-align:center">USD</span>
            <span class="room-quantity-by-date" style="width:50px; float:left;margin-right:10px; height:35px; line-height:35px;text-align:center">[[.r_q.]]</span>
			<span class="room-quantity-by-date" style="display:none; width:55px; float:left;margin-right:10px; height:35px; line-height:35px;">[[.note.]]</span>
            <?php }?>
            [[|room_levels.name|]] <?php if($i>1){?><span style="//width:30px;float:right;height:35px; line-height:35px;text-align:right;"><b>[[|room_levels.room_quantity|]]</b></span><?php } else { ?> <span style="width:30px"></span><?php } ?></div> 
            <?php $i++;?>
        <!--/LIST:room_levels-->
        <div class="check-availability-item" style="float:left;width:460px;">
			<span class="room-quantity-by-date" style="width:30px"></span>
            <span class="room-quantity-by-date" style="width:30px"></span>
            <span class="room-quantity-by-date" style="width:60px"></span>
            <span class="room-quantity-by-date" style="width:40px"></span>
			<!-- membell bo sung tong phong trong -->
			<!-- time: 20:57 12/04/2014 -->
			<span class="room-quantity-by-date" style="width:70px">Tổng số phòng đã sử dụng</span><span style=" text-align:right;width:30px;float:right;padding-top:7px;"><b>[[|total_checkin|]]</b></span>
			<!-- ket thuc bo sung -->
		</div>
        
		<div class="check-availability-item" style="float:left;width:460px;"><span class="room-quantity-by-date" style="width:30px"></span>
            <span class="room-quantity-by-date" style="width:30px"></span>
            <span class="room-quantity-by-date" style="width:60px"></span>
            <span class="room-quantity-by-date" style="width:40px"></span>
			<span class="room-quantity-by-date" style="width:70px">Tổng số phòng trống</span><span style="width:30px;float:right;padding-top:7px;text-align:right;"><b>[[|total_room|]]</b></span></div>
		<div class="check-availability-item" style="float:left;width:98%;">
			<span class="room-quantity-by-date" style="width:30px"></span>
            <span class="room-quantity-by-date" style="width:30px"></span>
            <span class="room-quantity-by-date" style="width:60px"></span>
            <span class="room-quantity-by-date" style="width:40px"></span>
			<span class="room-quantity-by-date" style="width:70px">Hiệu suất sử dụng (%)</span></div>
		</td>
    </div>
    
    <td style="width:70%;">
        	<div class="right_content" style="overflow: auto;width:auto">
        	<div style="float:left;">
			<!--LIST:room_levels-->
				<div class="check-availability-item"><!--LIST:room_levels.day_items-->[[|room_levels.day_items.room_quantity|]]<!--/LIST:room_levels.day_items--></div>
			<!--/LIST:room_levels-->    
        <div class="check-availability-item">
			<!--LIST:total_by_days-->
				<div><span class="check-availability-day header">[[|total_by_days.inusage|]]</span></div>
			<!--/LIST:total_by_days-->
		</div>           
        <div class="check-availability-item">
			<!--LIST:total_by_days-->
				<div><span class="check-availability-day">[[|total_by_days.value|]]</span></div>
			<!--/LIST:total_by_days-->
		</div>
		<div class="check-availability-item">
			<!--LIST:total_by_days-->
				<div><span class="check-availability-day header" style="background-color:#333333;color:white">[[|total_by_days.usage|]]</span></div>
			<!--/LIST:total_by_days-->
		</div>
                
        </div>
        </div>
	</td>
    
	
  </tr>  
</table>
</div>
<div id="rate_list" class="room-rate-list" style="display:none;">
    <div>
        [[.rate_list.]]&nbsp;&nbsp;
        <a onclick="$('rate_list').style.display='none';"><img src="skins/default/images/close.JPG" title="[[.close.]]"></a>
    </div>
    <ul id="rate_list_result">
    </ul>
</div>
</form>
<script>
//$.mask.definitions['~']='[+-]';

  //-- dungnn bo sung ngay 08/03/2014
    var arr_tours = <?php echo String::array2js([[=tours=]])?>;
    var arr_customer = <?php echo String::array2js([[=customer=]])?>;
    
    function updateTour(){
    	if(jQuery('#tour_name') && jQuery('#tour_name').val()){
    		if(typeof(arr_tours[jQuery('#tour_name').val()])=='undefined'){
    		  jQuery('#tour_name').val('');
              jQuery('#tour_id').val('0');
    		}else{
                //console.warn(arr_tours[jQuery('#tour_name').val()]['name']);
                var _id=jQuery('#tour_name').val();
                var _name=arr_tours[_id]['name'];
                //console.warn(_name);
    			//jQuery('#tour_name').val(_name);
                jQuery('#tour_id').val(_name);
    		}

       
        }
    }
   
   function updatecustomer(){
    	if(jQuery('#customer_name') && jQuery('#customer_name').val()){
            
    		if(typeof(arr_customer[jQuery('#customer_name').val()])=='undefined'){    		      
    		  jQuery('#customer_name').val('');
              jQuery('#customer_id').val('0');
    		}else{
                //console.warn(arr_tours[jQuery('#tour_name').val()]['name']);
                var _id=jQuery('#customer_name').val();
                var _name=arr_customer[_id]['name'];
                //console.warn(_name);
    			//jQuery('#tour_name').val(_name);
                jQuery('#customer_id').val(_name);
    		}

       
        }
    }
    

	/*jQuery("#customer_name").autocomplete({
		url:'r_get_customer.php?namejsons=1',
		minChars: 0,
		width: 280,
		matchContains: true,
		autoFill: false,
		formatItem: function(row, i, max) {
		    console.warn(row.id);  
			return ' ' + row.id + '';
		},
		formatMatch: function(row, i, max) {
		      //console.warn(row.id);
			return row.id;
		},
		formatResult: function(row) {
		    //console.warn(row.id); 
			return row.id;
		}
	});*/

    /*jQuery("#tour_name").autocomplete({
		url:'r_get_customer.php?tourjsons=1',
		minChars: 0,
		width: 280,
		matchContains: true,
		autoFill: false,
		formatItem: function(row, i, max) {
		    //console.warn(row.id);  
			return ' <span> ' + row.id + '</span>';
		},
		formatMatch: function(row, i, max) {
		      //console.warn(row.id);
			return row.id;
		},
		formatResult: function(row) {
		    //console.warn(row.id); 
			return row.id;
		}
	});*/
    //-- dungnn ket thuc bo sung       
   
	jQuery("#time_in").mask("99:99");
	jQuery("#time_out").mask("99:99");
	jQuery("#arrival_time").datepicker({ minDate: new Date(BEGINNING_YEAR, 2 - 1, 1),yearRange: '-100:+4'});	
	jQuery("#departure_time").datepicker({ minDate: new Date(BEGINNING_YEAR, 2 - 1, 1),yearRange: '-100:+4' });
   
	function kiemtra_ngay() {

    var d = new Date();
    var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();  

    var arrival_time = jQuery("#arrival_time").val();
	var departure_time = jQuery("#departure_time").val();
    var startDate = parseDate(arrival_time).getTime();
    var endDate = parseDate(departure_time).getTime();
    var today = parseDate(strDate).getTime();
    if (startDate > endDate){
        alert("Ngày đến không nhỏ hơn ngày đi!");
        jQuery("#departure_time").val(strDate);
    }  
       if (startDate >= today) {       	 	
       } else {
       	alert('ngày đến không nhỏ hơn ngày hiện tại!');
       	jQuery("#arrival_time").val(strDate);
       }
	}
	


//Chuyển chuỗi kí tự (string) sang đối tượng Date()
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1]-1, mdy[0]);
}

	function selectAllLevel(levelId,minRoomQuantity){
		jQuery(".room-quantity-by-date").each(function(){
			idString = this.id;
			var re =  new RegExp("room_quantity_"+levelId,"g");
			if(idString.match(re)){
				if(jQuery(this).val()==''){
					jQuery(this).val(minRoomQuantity);
				}else{
					jQuery(this).val('');
				}
			}
		});
	}
	function buildRateList(roomLevelId){ 
    	jQuery(this).val(tmp_price_error); 
       	jQuery('#price_'+roomLevelId).keyup(function(){
       		if(allowchangeprice==0){
       			jQuery(this).val(tmp_price_error);
       		}
       	});
		if(jQuery('#price_'+roomLevelId)){
			var customerId = jQuery('#customer_id').val();
			var adult = jQuery("#adult_"+roomLevelId).val();
			var child = jQuery("#child_"+roomLevelId).val();
			var startDate = jQuery('#arrival_time').val();
			var endDate = jQuery('#departure_time').val();
			getRateList(jQuery('#price_'+roomLevelId).attr('id'),roomLevelId,customerId,adult,child,startDate,endDate);
		}
	}
    var currentRoomLevelId = 0;
	function getRateList(id,roomLevelId,customerId,adult,child,startDate,endDate){
	   currentRoomLevelId = roomLevelId;
		if(adult<=0){
			/*alert('Chưa nhập số lượng người lớn / Miss adult quantity');
			jQuery('#adult_'+roomLevelId).focus();
			return false;*/
            adult = 1;
            jQuery('#adult_'+roomLevelId).val(1);
		}
		if(roomLevelId){
			obj = $(id);
            jQuery.getJSON('r_get_rate_list_news.php?reservation_type_id=1&room_level_id='+roomLevelId+'&customer_id='+customerId+'&adult='+adult+'&child='+child+'&start_date='+startDate+'&end_date='+endDate, setRateList);
		}else{
			//alert('You did not select room');
		}
	}
	function setRateList(text){
	   jQuery("#price_option_" + currentRoomLevelId).html("");
       var i = 0;
	   for(var idx in text) {
	       i++;
           if (i==1)
           {
                jQuery("#price_" + currentRoomLevelId).val(text[idx].rate);
           }
	       jQuery("#price_option_" + currentRoomLevelId).append("<option value='" + text[idx].rate + "'>" + text[idx].name + "</option>");
	   }
	   //jQuery('#rate_list_result').html(text);
       
	}
	function setRate(roomLevelId,rate){
		$('price_'+roomLevelId).value = rate;
		jQuery('#rate_list').hide();
	}
	jQuery("input.price1").priceFormat({prefix: '', suffix: '', centsLimit: ""});

	 // $(".price_fomat").priceFormat({prefix: '', suffix: '', centsLimit: "", thousandsSeparator: '.'});
  

  jQuery("#departure_time").change(function(){
  		kiemtra_ngay();
  }); 

  jQuery("#arrival_time").change(function(){
  		kiemtra_ngay();
  });

  function convert_usd(index){
  	var usd  = jQuery("#usd_"+index).val();
	//roundNumber(pro_price*amount,2)
	var total=roundNumber(parseFloat(usd)*parseFloat(ty_gia),0);
  	jQuery("#price_"+index).val(number_format(total).replace('.00',""));
  }

  	covert_night();
  	function covert_night(){
  		jQuery("#night").val( count_date(jQuery("#arrival_time").val(),jQuery("#departure_time").val()) );
  	}
  	
  	jQuery("#arrival_time,#departure_time").change(function(){
  		covert_night();
  	});
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
</script>
