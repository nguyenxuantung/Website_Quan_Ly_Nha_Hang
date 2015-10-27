 
 var arr_traveller_draf = {};


 function hostReachable() {

  // Handle IE and more capable browsers
  var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
  var status;

  // Open new request as a HEAD to the root hostname with a random param to bust the cache
  //xhr.open( "HEAD", "//" + window.location.hostname + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false );

  // Issue request and handle response
  try {
    //xhr.send();
    // console.log("online");
    //return ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 );
  } catch (error) {
      // console.log("mat ket noi mang");
    //return false;
  }
}
 
    setTimeout(hostReachable(), 3000);
    // ---------------------------

    // Id khach hang
    var id_customer   = 0;
    var arr_cusrtomer_draft  = {}; 
    var key_cus = 0;
    var arr_IF_customer_fn = {};
    var key_cus_edit       =  0;
    var status_edit_cus    =  true;
    var status_payment = false;
    var first_add_adults = false;
    // Name:        Save_customer
    // Author:      Membell
    // Time:        00:35 23/04/2014
    // Parameter: 
    // Description: Luu lai thong tin cua khach
    // sau do tao mot tab tren payment infomation va an di button Save
    // author: edit Duongnv
    // Description them ham validate_input_Customer_if
    function save_customer(tmp){
        if( cmd=='edit' )active_save();
            if (validate_input_Customer_if(tmp) ) {
                if(  ( check_distint_cus( jQuery("#passportl").val() ) ) || (!status_edit_cus) || (jQuery("#passportl").val() == '?')|| (jQuery("#passportl").val() == '')){
                status_edit_cus = true;

                if( AUTO_COUNT_ADULT == 1 && AUTO_COUNT_CHILDREN == 0){
                    // neu lan dau them khach thi khong them nua vi mac dinh dang la 1
                    // neu so luong nguoi lon khac 1 thi them khach luon
                    if( first_add_adults || jQuery("#adults").val() != 1 ){ 
                        addval( jQuery("#adults"),1 );
                    }else{
                        first_add_adults = true;
                    }
                }
                if( AUTO_COUNT_ADULT == 0 && AUTO_COUNT_CHILDREN == 1){
                    if( count_age( jQuery("#birthdate").val() ) <= MIN_OLD_TE  && jQuery("#birthdate").val() != ''){
                        addval( jQuery("#children"),1 );
                    }
                }
                if( AUTO_COUNT_ADULT == 1 && AUTO_COUNT_CHILDREN == 1){
                    // neu lan dau them khach thi khong them nua vi mac dinh dang la 1
                    // neu so luong nguoi lon khac 1 thi them khach luon
                    if( count_age( jQuery("#birthdate").val() ) <= MIN_OLD_TE  && jQuery("#birthdate").val() != ''){
                        addval( jQuery("#children"),1 );
                    }else{
                        if( first_add_adults || jQuery("#adults").val() != 1){ 
                            addval( jQuery("#adults"),1 );
                        }else{
                            first_add_adults = true;
                        }
                    }
                } 
                var arr_IF_customer = {};
                arr_IF_customer["expire_date_of_visa"]            =   jQuery("#visa_hh").val();
                arr_IF_customer["visa_number"]            =   jQuery("#visa").val();
                arr_IF_customer["entry_date"]            =   jQuery("#visa_nc").val(); 
                arr_IF_customer["first_name"]            =  jQuery("#firstname").val();
                arr_IF_customer["last_name"]             =  jQuery("#lastname").val();              
                arr_IF_customer["first_name_khongdau"]            =   locdau(jQuery("#firstname").val());
                arr_IF_customer["last_name_khongdau"]             =   locdau(jQuery("#lastname").val());              
                arr_IF_customer["gender"]               =  jQuery("#gender").val();
                arr_IF_customer["birth_date"]           =   jQuery("#birthdate").val().replace(/-/g, '/');
                arr_IF_customer["phone"]                =   jQuery("#phone").val();
                arr_IF_customer["email"]                =   jQuery("#email").val();
                arr_IF_customer["address"]              =   jQuery("#address").val();
                arr_IF_customer["note"]                 =   jQuery("#note").val();
                arr_IF_customer["nationality_id"]       =   jQuery("#nationality_id").val();
                arr_IF_customer["nationality_name"]     =   jQuery("#nationality_name").val();
                arr_IF_customer["type_card"]            =   jQuery("#type_card").val();
                arr_IF_customer["passport"]             =   (jQuery("#passportl").val() == '') ? '?':jQuery("#passportl").val();
                arr_IF_customer["out_of_date"]          =   jQuery("#passport_datel").val().replace(/-/g, '/');
                arr_IF_customer["payment"]              =   jQuery("#payment").is(':checked') ? 'Payment' : '';
                arr_IF_customer['delete']               =   '1';
                // arr_IF_customer['urlava']               =   jQuery("#urlava").val();
                arr_IF_customer['traveller_id']         =   jQuery("input#traveller_id").val();
                arr_IF_customer["traveller_level_id"]   =   jQuery("#traveller_level_id").val();
                arr_IF_customer['p_time_in'] = jQuery("#in_date").val()+' '+jQuery("#time_in").val();
                arr_IF_customer['p_time_out'] = jQuery("#out_date").val()+' '+jQuery("#time_out").val();
                
                 // bo sung thoi gian den-di cua khach
                arr_IF_customer["arrival_date"]   =   jQuery("#cuss_arival_date").val().replace(/-/g, '/');
                arr_IF_customer["time_in"]   =   jQuery("#cuss_arival_time").val();
                arr_IF_customer["departure_date"]   =   jQuery("#cuss_departure_date").val().replace(/-/g, '/');
                arr_IF_customer["time_out"]   =   jQuery("#cuss_departure_time").val();
                
                // Information Card vip
                arr_IF_customer["card_id"]              =   jQuery(".card_id").val();  
                arr_IF_customer["card_type_vip"]        =   jQuery("#card_vip_type").val();  

                // Information Plane
                arr_IF_customer['code_arrival'] = jQuery("#code_arrival").val();
                arr_IF_customer['code_departure'] = jQuery("#code_departure").val();
                arr_IF_customer['check_arrival'] = jQuery("#check_arrival").is(':checked')?1:0;
                arr_IF_customer['check_departure'] = jQuery("#check_departure").is(':checked')?1:0;
                arr_IF_customer['foc_arrival'] = jQuery("#foc_arrival").is(':checked')?1:0;
                arr_IF_customer['foc_departure'] = jQuery("#foc_departure").is(':checked')?1:0;

                status_payment = jQuery("#payment").is(':checked') ? true:status_payment;
                if(status_payment){
                    jQuery("#payment").attr("disabled", true);
                }
                if( key_cus_edit==0 ){
                    key_cus++;
                    arr_IF_customer_fn[key_cus] = arr_IF_customer;
                    add_tab_customer(arr_IF_customer['lastname'],key_cus);
                }else{
                    arr_IF_customer_fn[key_cus_edit] = arr_IF_customer;
                    // console.log(arr_IF_customer);
                    add_tab_customer(arr_IF_customer['lastname'],key_cus_edit);
                    key_cus_edit = 0;
                }
                
                id_customer = 1;
                if( jQuery(".card_id").val()!= 0 && jQuery(".card_id").val()!= '' ){
                    get_if_card( jQuery(".card_id").val() , jQuery("#birthdate").val(),null );
                }

                reset_form_customer();
                jQuery(".create_card").button('reset');
                 jQuery(".card_id").removeAttr("readonly"); 
                 jQuery("#card_vip_type").removeAttr("disabled");
                }else{
                    jQuery("#cuc-error").show();
                    message('warning','Đã tồn tại khách có passport này rồi',jQuery("#cuc-error"));
                } 
            }
    }
    function addval( op,vl ){
        var t = op.val();
        op.val( parseInt(t) + parseInt(vl) );
    }

    function count_age( born ){ 
        if( born == null || born == '' ) return 99; // khi khong co ngay sinh thi hieu la nguoi lon
        var ed        = born.split("/"); 
        var ed_date   = ed[0];     
        var ed_month  = ed[1]; 
        var ed_year   = ed[2]; 
        var nowt      = now.split("/"); 
        var nowt_date = nowt[2];
        var nowt_month= nowt[2];
        var nowt_year = nowt[2]; 
        var year_     = nowt_year - ed_year;
        var month_    = nowt_year - ed_year;
        var date_     = nowt_year - ed_year;
        if (date_ == 0 && month_ == 0  ){
            return year_++;
        }else{
            return year_;
        }
    }

    function converttime(born){
        var ed = born.split("/");
        var ed_day=ed[0];
        var ed_month=ed[1];
        var ed_year=ed[2]; 

        var endDAY=ed_month+"/"+ed_day+"/"+ed_year;
        var ed_second=Date.parse(endDAY);
        return ed_second;
    }

    /*-------CARD-----------*/
    /*-------------------------*/
    function creadit_card(btn){
        var tmp = '';
        tmp+= 'mobile_no='+jQuery("#phone").val();
        tmp+='&firstname_vip='+locdau(jQuery("#firstname").val())+'&lastname_vip='+locdau(jQuery("#lastname").val());
        tmp+='&full_name='+locdau(jQuery("#firstname").val())+' '+locdau(jQuery("#lastname").val());
        tmp+='&identity='+jQuery("#passportl").val();
        tmp+='&birthday='+jQuery("#birthdate").val();
        tmp+='&email='+jQuery("#email").val();
        tmp+='&gender='+jQuery("#gender").val();
        tmp+='&type_card='+jQuery("#type_card").val();
        tmp+='&card_type='+jQuery("#card_vip_type").val();
        tmp+='&urlava='+jQuery("#urlava").val();
        tmp+='&get_traveller=1';

        // var data_conver = JSON.stringify(tmp);
        var tmlurl = 'r_get_customer.php?create_card=1&q=1&'+tmp;
        jQuery.post(
            tmlurl+"#" + Math.random(), 
            {
                 
            }).done(function(data) 
            { 
              // btn.button('reset'); 
              var card_id = data.split("_"); 
              if(card_id[1] > 0){//alert(card_id[0]);
                btn.html('Success !');
                jQuery(".card_id").val(card_id[1]);
                jQuery("input#traveller_id").val(card_id[0]);
            }else{
                btn.button('reset');
                message( 'warning','SĐT/email đã tồn tại',jQuery("#cuc-error") );
            }
                
            }).fail(function() {
                
            }).always(function () {
             
            });

    }


    // Name:        add_tab_customer
    // Author:      Membell
    // Time:        00:55 23/04/2014
    // Parameter:   name (Ho va ten khach), id (id cua customer)
    // Description: Khoi tao mot tab tren payment Information
    function add_tab_customer(name,id){
        var male    =   objlang['[[.male.]]'];
        var female  =   objlang['[[.female.]]'];
        var other   =   objlang['[[.other.]]'];
        //console.log('female:'+female);
        //console.log('gioitinh:'+jQuery("#gender").val())
        var item =''
        +'<tr id="custo_'+id+'">'
            +'<td>'+jQuery("#firstname").val()+ ' ' + jQuery("#lastname").val() + '</td>';
            
            switch(jQuery("#gender").val())
                {
                case '0':
                  item=item+'<td>'+female+'</td>';
                  break;
                case '1':
                  item=item+'<td>'+male+'</td>';
                  break;
                default:
                  item=item+'<td>'+other+'</td>';
                }
            item=item+'<td>'+jQuery("#birthdate").val()+'</td>'
                +'<td>'+jQuery("#phone").val()+'</td>'
                +'<td>'+jQuery("#email").val()+'</td>'
                +'<td>'+jQuery("#address").val()+'</td>'
                +'<td>'+jQuery("#note").val()+'</td>'
                +'<td>'+jQuery("#nationality_id ").val()+'</td>'
                +'<td>'+jQuery("#type_card").val()+'</td>'
                +'<td>'+jQuery("#passport_datel").val()+'</td>';
            if(jQuery("#payment").attr('checked')){
                //item=item+'<td>payment</td>';
            }else{
                //item=item+'<td></td>';
            }
            item=item+'<td>'+jQuery("#cuss_arival_date").val()+" "+jQuery("#cuss_arival_time").val() +'</td>' 
            item=item+'<td>'+jQuery("#cuss_departure_date").val()+" "+jQuery("#cuss_departure_time").val() +'</td>' 
                
            item=item+'<td>'
                //+'<button onclick="edit_cutomer('+id+')" class="edit-item ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false" title=""><span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span><span class="ui-button-text"></span></button>'
                //+'<button onclick="delete_cutomer('+id+')" class="remove-item ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false" title=""><span class="ui-button-icon-primary ui-icon ui-icon-close"></span><span class="ui-button-text"></span></button>'
                +'<button onclick="edit_cutomer('+id+')" style="height: 21px; width: 24px;" class="edit-item-4 ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" data="#4-edit" id="edit_4" role="button" aria-disabled="false" title=""><span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span><span class="ui-button-text"></span></button>'
                +'<button onclick="delete_cutomer('+id+')" style="height: 21px; width: 24px;"  class="delete-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-trash"></span><span class="ui-button-text"></span></button>'
                
            +'</td>'
        +'</tr>';
        jQuery("table#housekeeping tbody").append(item);
    }


    // Name:        check_distint_cus
    // Author:      Membell
    // Time:        21:39 09/05/2014
    // Parameter:   
    // Description: Kiem tra xem nhan vien co nhap khach hang trung passport khong
    function check_distint_cus(passport){
        var tmp = true;
        if(isEmpty(arr_IF_customer_fn)){
            jQuery.each(arr_IF_customer_fn,function(key,value){
                if(value.passport == passport){//console.log(value.passport+','+passport);
                    tmp = false;
                }
            }),(function(){
                
        });

        }else{
            return true;
        }
        return tmp;
        
    }

    function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true;
    }

    return false;
}

    // Name:        add_cutomer
    // Author:      Membell
    // Time:        01:12 23/04/2014
    // Parameter:   
    // Description: Reset lai toan bo form Customer Information va hien thi button chuc nang
    function add_cutomer(){
        reset_form_customer();
        jQuery("#save-customer").delay('400').fadeIn('400');
        jQuery("#delete-customer").fadeOut('400');
    }




    // Name:        delete_cutomer
    // Author:      Membell
    // Time:        01:29 23/04/2014
    // Parameter:   
    // Description: Xoa customer trong database dong thoi xoa tab tren payment Information
    function delete_cutomer(id){
        if(confirm('Bạn có chắc chắn?')){  
            jQuery('tr#custo_'+id).remove();
            var tmp = arr_IF_customer_fn[''+id+''];
            tmp['delete'] = '0';
            arr_IF_customer_fn[''+id+''] = tmp;
             if( AUTO_COUNT_ADULT == 1 && AUTO_COUNT_CHILDREN == 0){
                    // neu lan dau them khach thi khong them nua vi mac dinh dang la 1
                    // neu so luong nguoi lon khac 1 thi them khach luon 
                    addval( jQuery("#adults"),1 ); 
                }

                if( AUTO_COUNT_ADULT == 0 && AUTO_COUNT_CHILDREN == 1){
                    if( count_age( tmp['birth_date']   ) <= MIN_OLD_TE  && tmp['birth_date'] != null){
                        addval( jQuery("#children"),-1 );
                    }
                }

                if( AUTO_COUNT_ADULT == 1 && AUTO_COUNT_CHILDREN == 1){

                    // neu lan dau them khach thi khong them nua vi mac dinh dang la 1
                    // neu so luong nguoi lon khac 1 thi them khach luon
                    if( count_age( tmp['birth_date'] ) <= MIN_OLD_TE  && tmp['birth_date'] != null){
                        addval( jQuery("#children"),-1 );
                    }else{ 

                        addval( jQuery("#adults"),-1 ); 
                    }
                } 
            if(jQuery("#icon_card").html()==tmp.card_id){

                
                reset_card();
                jQuery("#pay-note").val('');
                jQuery("#money_spend_card_vip").show(300).html( jQuery("#discount_money_vip").val() );
                jQuery("#discount_money_vip").val( 0 ).removeAttr("readonly");
                jQuery("#is_spend_card").val(0);
                if( jQuery("#discount_money").attr("readonly") == "readonly"){
                    jQuery("#discount_money").removeAttr("readonly").val(0);
                }
                jQuery(this).hide(300);
            }
        }
    }



    // Name:        edit_cutomer
    // Author:      Membell
    // Time:        01:29 23/04/2014
    // Parameter:   id(key trong danh sach khach luu tam)
    // Description: Load lai thong tin dẻ sua dong thoi xoa hang cua roi di
    function edit_cutomer(id){
            if(status_edit_cus){
                key_cus_edit  = id;
                var arr_IF_customer =  [];
                arr_IF_customer = arr_IF_customer_fn[id];
                jQuery("#visa_nc").val(arr_IF_customer["entry_date"]);
                jQuery("#visa").val(arr_IF_customer["visa_number"]);
                jQuery("#visa_hh").val(arr_IF_customer["expire_date_of_visa"]); 
                // jQuery("#urlava").val(arr_IF_customer["urlava"]);
                jQuery("input#traveller_id").val(arr_IF_customer["traveller_id"]);
                jQuery("#firstname").val(arr_IF_customer["first_name"]);
                jQuery("#lastname").val(arr_IF_customer["last_name"]);
                jQuery("#gender").val(arr_IF_customer["gender"]);
                jQuery("#birthdate").val(arr_IF_customer["birth_date"]);
                jQuery("#phone").val(arr_IF_customer["phone"]);
                jQuery("#email").val(arr_IF_customer["email"]);
                jQuery("#address").val(arr_IF_customer["address"]);
                jQuery("#note").val(arr_IF_customer["note"]);
                jQuery("#nationality_id").val(arr_IF_customer["nationality_id"]);
                jQuery("#nationality_name").val(arr_IF_customer["nationality_name"]);
                jQuery("#type_card").val(arr_IF_customer["type_card"]);
                jQuery("#traveller_level_id").val(arr_IF_customer["traveller_level_id"]);
                jQuery("#passportl").val(arr_IF_customer["passport"]);
                jQuery("#passport_datel").val(arr_IF_customer["out_of_date"]);
                // jQuery(".card_id").val(arr_IF_customer["card_id"]);

                //jQuery("#rt_id").val(arr_IF_customer["rt_id"]);

 
                // Information Card vip
                jQuery(".card_id").val(  arr_IF_customer["card_id"] );
                if(arr_IF_customer["card_id"]!=0 && arr_IF_customer["card_id"] != null){
                    jQuery(".create_card").button('loading');
                    jQuery(".card_id").attr("readonly","");
                    jQuery("#card_vip_type").attr("disabled","");
                    jQuery(".add_card_b").hide();
                    jQuery('#from_create_card').fadeIn();
                }
                
                jQuery("#card_vip_type").val(  arr_IF_customer["card_type_vip"] );


                // Information plane
                jQuery("#code_arrival").val(arr_IF_customer['code_arrival']);
                jQuery("#code_departure").val(arr_IF_customer['code_departure']); 
                if(arr_IF_customer['p_time_in']){
                    var tmp = arr_IF_customer['p_time_in'].split(" ");
                    jQuery("#time_in").val( tmp[1] );
                    jQuery("#in_date").val( tmp[0] );

                }
                if(arr_IF_customer['p_time_out']){
                    tmp = arr_IF_customer['p_time_out'].split(" ");
                    jQuery("#time_out").val( tmp[1] );
                    jQuery("#out_date").val( tmp[0] );
                }
                if(arr_IF_customer['check_arrival']==1){
                    jQuery("#check_arrival").attr('checked',true);
                }
                if(arr_IF_customer['foc_arrival']==1){
                    jQuery("#foc_arrival").attr('checked',true);
                }
                if(arr_IF_customer['check_departure']==1){
                    jQuery("#check_departure").attr('checked',true);
                }
                if(arr_IF_customer['foc_departure']==1){
                    jQuery("#foc_departure").attr('checked',true);
                } 


                // bo sung thoi gian den-di cua khach
                jQuery("#cuss_arival_date").val(arr_IF_customer["arrival_date"]);
                jQuery("#cuss_arival_time").val(arr_IF_customer["time_in"]) ;
                jQuery("#cuss_departure_date").val(arr_IF_customer["departure_date"] );
                jQuery("#cuss_departure_time").val(arr_IF_customer["time_out"]);


                (arr_IF_customer["payment"] != '') ? jQuery("#payment").attr('checked', true):jQuery("#payment").attr('checked', false);
                status_payment = (arr_IF_customer["payment"] != '') ? false:status_payment;
                jQuery('tr#custo_'+id).remove();
                 status_edit_cus = false;
                if(!status_payment){
                    jQuery("#payment").attr("disabled", false);
                }
            }else{
                jQuery("#cuc-error").show();
                message('warning','Bạn chưa kết thúc sửa thông tin khách hiện tại',jQuery("#cuc-error"));
            }
         
    }




    function locdau( str ){
        str= str.toLowerCase();
        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
        str= str.replace(/đ/g,"d");
        str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,"-");
        str= str.replace(/-+-/g," "); //thay thế 2- thành 1-
        str= str.replace(/^\-+|\-+$/g," ");//cắt bỏ ký tự - ở đầu và cuối chuỗi
        str= str.replace(/-/g," ");
        return str.toUpperCase();
    }


    // Name:        delete_cutomer
    // Author:      Membell
    // Time:        01:38 23/04/2014
    // Parameter:   
    // Description: Reset moi thong tin trong form Customer Information
    function reset_form_customer(){
        jQuery("#traveller_level_id").val('');
        jQuery("#visa_nc").val('');
        jQuery("#visa").val('');
        jQuery("#visa_hh").val(''); 
        jQuery("#firstname").val('');
        jQuery("#lastname").val('');
        jQuery("#gender").val('0');
        jQuery("#birthdate").val('');
        jQuery("#phone").val('');
        jQuery("#email").val('');
        jQuery("#address").val('');
        jQuery("#note").val('');
        jQuery("#nationality_id ").val('');
        jQuery("#nationality_name ").val('');
        jQuery("#type_card").val('0');
        jQuery("#passportl").val('');
        jQuery("#passport_datel").val('');
        jQuery("#payment").attr('checked', false);
        jQuery("input#traveller_id").val('0');
        jQuery("#time_in").val('');
        jQuery("#in_date").val(''); 
        jQuery("#time_out").val('');
        jQuery("#out_date").val('');
        jQuery("#code_arrival").val('');
        jQuery("#code_departure").val('');
        jQuery(".card_id").val('');
        jQuery("#check_arrival").attr('checked',false);
        jQuery("#foc_arrival").attr('checked',false);
        jQuery("#check_departure").attr('checked',false);
        jQuery("#foc_departure").attr('checked',false);  
        jQuery("#card_vip_type").val(1);
        jQuery("#urlava").val('assets/img/ava.jpg');
        var d = new Date();
        var _day = d.getDay();
        var _month = d.getMonth();
        var _year = d.getFullYear();
        jQuery("input#cuss_arival_date").val(_day+'/'+_month+'/'+_year);
        var today = new Date();
        var h = today.getHours(); if (h<10)  h="0"+h;
        var m = today.getMinutes();if (m<10)  m="0"+m;
        jQuery("input#cuss_arival_time").val(h + ":" + m);
        jQuery("input#cuss_departure_date").val(jQuery("#departure_date").val());
        jQuery("input#cuss_departure_time").val(jQuery("#departure_time").val());
    }

 
    
    function auto_hide(tmp){
        tmp.delay(3000).addClass('flipOutX').removeClass('flipInX').fadeOut('5000',function(){
            jQuery("#cuc-error").css('display','none');
        });;
    }

    // Name:        message
    // Author:      Membell
    // Time:        12:49 23/04/2014
    // Parameter:   event (loai message), messagei(message muon truyen ra)
    // Description: Ham thong bao cho nguoi dung
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
            /*thism.delay(1000).css('display','none');
             jQuery("#cuc-error").delay(1000).css('display','none');*/
            jQuery("iframe").remove();
        }
        setTimeout(function() { 
                jQuery("#cuc-error").css('display', 'none'); 
        }, 3000);
        setTimeout(function() {
            jQuery("a.close").parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
               // jQuery("#cuc-error").delay('8000').css('display', 'none');
            });
        }, 2000);
        jQuery("a.close").click(function() {
            jQuery(this).parent().addClass('flipOutX').removeClass('flipInX').fadeOut('5000', function() {
                jQuery("#cuc-error").css('display', 'none');
            });
        });
    }
}









    // Name:        auto_list_first_name
    // Author:      Membell
    // Time:        20:54 24/04/2014
    // Parameter:   firstname(Ten khach)
    // Description: Tu dong tra ve danh sach khach co firstname theo input dat phong gan nhat
    function auto_list_firstname(){
        //locdau( jQuery("#firstname").val() );
        var tmlurl = 'r_get_customer.php?firstnameall=1&q=1&fnvn='+jQuery("#firstname").val()+'&fn='+locdau( jQuery("#firstname").val() )+'&birthday='+jQuery("#birthdate").val()+'&passportl='+jQuery("#passportl").val()+'&phone='+jQuery("#phone").val();
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
                if(data != null){
                    jQuery("#popup_support_traveller").fadeIn("200"); 
                    jQuery("#message").hide(0); 
                    arr_traveller_draf = data;
                    show_support_traveller(data);
                    jQuery("#message").show().addClass('animating').addClass('fade-in-up');
                }
            },
            error: function(){
              jQuery("datalist#firstnamelist").html('');
              message('warning','Lỗi kết nối database',jQuery("input#firstname"));
            }
        });
    }



    function show_support_traveller(data){ 
        
        jQuery("#traveller_support_table tbody").html('');
        if( data.length == 0 ){ 
            jQuery("#popup_support_traveller").stop( true, true ).fadeOut(0); 
        }else{
            jQuery("#popup_support_traveller").stop( true, true ).fadeIn(0);
        }
        jQuery.each(data,function(key,value){
            var row = jQuery("div.row_traveller_support_table table tbody").html(); 
            switch(value.gender) { 
                case 1:
                    var gt = 'NAM';
                    break;
                case 0:
                    var gt = 'NỮ';
                    break;    
                default:
                    var gt = '_';
            }
            row = row.replace('[[KEY]]',key);
            if(value.urlava != null && value.urlava != ''){
                row = row.replace('[[SCAN_IMAGE]]',value.urlava);
            }else{
                row = row.replace('[[SCAN_IMAGE]]','assets/img/ava.jpg');
            }
            
            row = row.replace('[[FULL_NAME]]',value.first_name.toUpperCase() +" "+value.last_name.toUpperCase() );
            row = row.replace('[[GIOI_TINH]]', gt);
            row = row.replace('[[BIRTHDAY]]',((value.birthdate == null || value.birthdate == false)?'_': value.birthdate) );
            row = row.replace('[[FORM]]',((value.address == null)?'_': value.address) );
            row = row.replace('[[PHONE]]',((value.phone == null)?'_': value.phone) );
            row = row.replace('[[TYPE_CARD]]',((value.type_card == null)?'_': value.type_card) );
            row = row.replace('[[NUMBER_CARD]]',((value.passport == null)?'_': value.passport) );
            row = row.replace('[[NUMBER]]',((value.card_id == null)?'_': value.card_id) );
            jQuery("#traveller_support_table tbody").append(row);
           
        });
        jQuery("#traveller_support_table tbody tr")
            .hover(function(event){  
                event.preventDefault();
                var link = jQuery(this).attr("src");
                jQuery("#ava_traveller").fadeIn(0);
                jQuery("#ava_traveller").css("background",'url("'+link+'") ');
                jQuery("#ava_traveller").css("background-size","350px");
                //jQuery("#ava_traveller").stop();
            })
            .mouseleave(function(event){
                event.preventDefault();
                jQuery("#ava_traveller").fadeOut(100); 
            })
            .click(function(){
                var tmp = jQuery(this).attr("id"); 
                var data = arr_traveller_draf[tmp.replace("traveller_","")];
                change_traveller(data); 
                var card_id = jQuery(this).find(".number_card").html();
                 
                if( card_id != '_' ){
                    jQuery(".card_id").val(card_id);
                   
                } 
            });
        /*jQuery("#traveller_support_table tbody tr td")
            .click(function(){
                var tmp = jQuery(this).parent("tr").attr("id");
              
                var data = arr_traveller_draf[tmp.replace("traveller_","")];
                change_traveller(data);
                //value.birthdate
                var card_id = jQuery(this).parent().find(".number_card").html();
                if( card_id != '' ){
                    get_if_card( card_id , data.birthdate );
                } 
            });  */  
    }

    function set_card(card_id,birthdate,callback){ 
        // reset_card();
        if(card_id!= 0 && card_id!= '' && card_id!= null){
            jQuery(".show_vip").show(400);
            jQuery("#icon_card").html(card_id);
            jQuery("#card_id").val(card_id);
            jQuery("#pay-note").val('Giảm giá thẻ vip');
            jQuery("#discount_vip").addClass("disable").attr("readonly","");
            get_if_card_spend( card_id ,birthdate,callback);
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
        getBalance();
    }

    function get_if_card_spend( card_id,birthdate ,callback){ 
        // console.log(birthdate);

        var data_final = {};
        var op =  jQuery("#discount_vip");
        var max = op.val();
        data_final['get_list']  = card_id;
        var data_conver = JSON.stringify(data_final); 
        var kq = 0;
        var tmlurl = 'r_get_customer.php?get_card=1&q=1&card='+card_id+"&rand="+Math.random();
        var arival_date    = jQuery("#arival_date").val();
        var departure_date = jQuery("#departure_date").val(); 
        var d = new Date();
        var year = d.getFullYear();
        jQuery.ajax({
            url: tmlurl, 
            type: 'POST',        
            dataType: 'json',
            success: function(data){ 
                if( data != 1 && data != null && data != []){
					var checkcf = 0;
					jQuery.each(data,function(key,value){
						if( checkcf == 0 ){
							get_spend( value['GainedPoint'] ,value['UsedPoint'] );
							checkcf = 1;
						}
					});
                    if( birthdate != null && birthdate != ''  && birthdate != '0000' ){
                        var tb    = birthdate.split("/");
                        birthdate = tb[0]+'/'+tb[1]+'/'+year;
                         // console.log( "arival_date"+arival_date+"--"+birthdate+"("+count_date(arival_date,birthdate) + ') - ('+ count_date(birthdate,departure_date)+')' );
                        if( count_date(arival_date,birthdate) >= 0 && count_date(birthdate,departure_date) >= 0 ){
                            var t = data[3];
                            var t2 = data[1];
                            jQuery("#discount_vip").val(t2.value);
                            //get_spend( t['GainedPoint'] ,t['UsedPoint'] );
                            get_month_birthday( birthdate,null, t.value);
                        }else{
                            var t = data[1];
                            if( birthdate != '0000' ){ 
                                jQuery("#discount_vip").val(t.value);
                                // get_month_birthday( null,null,null);alert(1);
                            } 
                            // console.log( t['GainedPoint'] );
                            //get_spend( t['GainedPoint'] ,t['UsedPoint'] );
                            
                        }
                    }else{
                            var t = data[1];
                        if( birthdate != '0000' ){    
                            jQuery("#discount_vip").val(t.value);
                            // get_month_birthday( null,null,null);
                        }
                        //get_spend( t['GainedPoint'] ,t['UsedPoint'] ); 
                    } 
                }
                if( callback )callback;
            },
            error: function(){
                if( callback )callback;
                // console.error('err get_if_card');
            }
        });
    }
 

    function get_if_card( card_id, birthdate, tmp ,callback ){ 
        // console.log(birthdate );
        set_card(card_id,birthdate,callback);

        /*var data_final = {};
        var op =  jQuery("#discount_percent");
        var max = op.val();
        data_final['get_list']  = card_id;
        var data_conver = JSON.stringify(data_final); 
        var kq = 0;
        var arival_date    = jQuery("#arival_date").val();
        var departure_date = jQuery("#departure_date").val(); 
        var d = new Date();
        var year = d.getFullYear();
        var tmlurl = 'r_get_customer.php?get_card=1&q=1&card='+card_id+"&rand="+Math.random();
        jQuery.ajax({
            url: tmlurl, 
            type: 'POST',        
            dataType: 'json',
            success: function(data){ 
                if( data != 1 && data != null && data != []){
                    if( typeof(data[3]) != 'undefined'&& birthdate != null && birthdate != ''  ){
                     // if( birthdate == now && birthdate != '' && birthdate != 'NaN' ){

                         var tb    = birthdate.split("/");
                        birthdate = tb[0]+'/'+tb[1]+'/'+year;
                        // console.log(birthdate);
                        // console.log( count_date(arival_date,birthdate) + ' - '+ count_date(birthdate,departure_date) );
                        if( count_date(arival_date,birthdate) >= 0 && count_date(birthdate,departure_date) >= 0 ){ 
                            try{
                                var t = data[3];
                                  console.log('kq5 : '+t['value']);
                                // if(max<=t['value']){
                                    // op.val( t['value'] );//alert(card_id);
                                    set_card(card_id,birthdate);
                                    // get_spend( t['GainedPoint'] ,t['UsedPoint'] );
                                // } 
                            }catch(err){
                                console.info('get_if_card: not data');
                            }
                        }else{
                            try{
                                var t = data[1];
                                // console.log('kq3 : '+t['value']);
                                if(max<=t['value']){
                                    op.val( t['value'] );//alert(card_id);
                                    set_card(card_id);
                                    get_spend( t['GainedPoint'] ,t['UsedPoint'] );
                                }
                            }catch(err){
                                console.info('get_if_card: not data');
                            }
                        }
                    }else{
                        try{
                            var t = data[1];
                            // console.log('kq3 : '+t['value']);
                            if(max<=t['value']){
                                op.val( t['value'] );//alert(card_id);
                                set_card(card_id);
                                get_spend( t['GainedPoint'] ,t['UsedPoint'] );
                            }
                        }catch(err){
                            console.info('get_if_card: no data');
                        }
                    }
                    // op.addClass("disable").attr("readonly","");
                }else{
                    console.info('get_if_card: no data');
                }
                if(tmp==1){
                    save_data();
                }
                
            },
            error: function(){
            	// console.error('err get_if_card');
            }
        });*/
    }
    function active_save( ){
        if( !in_save ){
            in_save = true;
            jQuery("#save").addClass("is_save");
        }
    } 
    // get about to total spend 
    function get_spend(point,usedpoint){
        

        var opsend = jQuery("#discount_money_vip");
        var t = opsend.val( ); 
        // jQuery("#discount_money").val(0).removeAttr("readonly");
        spend = (t=='' || typeof(t) =='undefined')?0:opsend.val( );
        total = point - usedpoint  - spend/10000; 
        // console.log ("total"+total+ " point"+point+" usedpoint"+usedpoint+"spend"+spend);
        // kiem tra co is_send_card khong
            if( jQuery("#is_spend_card").val() == 1   ){
                // neu tong send van khac 0 thi van anble input send
                if( total >0 ){
                    jQuery("#money_spend_card_vip").show(300);   
                    jQuery("#money_spend_card_vip").html( total*10000 );
                 }else{
                    opsend.attr("readonly","");
                    jQuery("#money_spend_card_vip").hide(300); 
                    jQuery("#delete_spend_card_vip").show(200); 
                    jQuery("#money_spend_card_vip").html( total*10000);
                 } 
            }else{ 
                /*var pricel  = ( opsend.val() != '' || (opsend.val() != '' && !isNaN(opsend.val()) ) )?opsend.val():0;
                var spend   = !isNaN(jQuery(this).html( ))?jQuery(this).html( ):0;  
                jQuery("#money_spend_card_vip").show(300).html( parseInt(pricel) + parseInt(spend) );*/
                opsend.val( 0 ).removeAttr("readonly");
                // jQuery("#is_spend_card").val(0);
                // jQuery(this).hide(300);  
                total = point - usedpoint; 
                opsend.val( 0);
                jQuery("#money_spend_card_vip").show(300);   
                jQuery("#money_spend_card_vip").html( total*10000 );
                jQuery("#delete_spend_card_vip").hide(300); 
            }  
            
            
           
    }
    function get_room_discount_by_card_id(card_id) {
        var tmlurl = 'r_get_customer.php?get_card=1&q=1&card='+card_id+"&rand="+Math.random();
        jQuery.ajax({
            url: tmlurl, 
            type: 'POST',        
            dataType: 'json',
            success: function(data){ 
                //alert(data["1"].value);
        }});
    }
    /*function get_if_cards(){ 
        var card_id = '';
        jQuery.each(arr_IF_customer_fn,function(key,value){
            if( value.card_type_vip != '' && value.card_type_vip != null ){
                card_id +=value.card_id+',';
            }
        });
        var op =  jQuery("#discount_percent");
        var max = op.val();
        var tmlurl = 'r_get_customer.php?get_card=1&q=1&card='+card_id+"&rand="+Math.random();
        jQuery.ajax({
            url: tmlurl, 
            type: 'POST',        
            dataType: 'json',
            success: function(data){ 
                if( data != 1 ){
                    if( typeof(data[3]) != 'undefined' ){
                        if( birthdate == now && birthdate != '' && birthdate != 'NaN' ){
                            var t = data[3];
                            // console.log('kq5 : '+t['value']);
                             if(max<t['value']){
                                op.val( t['value'] );
                                jQuery("#icon_card").html();
                            }
                        }else{
                            var t = data[1];
                            // console.log('kq3 : '+t['value']);
                             if(max<t['value']){
                                op.val( t['value'] );
                            }
                        }
                    }else{
                        var t = data[1];
                        // console.log('kq3 : '+t['value']);
                         if(max<t['value']){
                            op.val( t['value'] );
                        }
                    }
                    op.addClass("disable").attr("readonly","");
                }else{
                    console.info('get_if_card: not data');
                }
            },
            error: function(){
                console.error('err get_if_card');
            }
        });
    }*/


// console.info('err get_if_card');
 


    function change_traveller(value){
        reset_form_customer();
        jQuery("input#traveller_id").val(value.id);
        jQuery("input#firstname").val(value.first_name);
        jQuery("#type_card").val(value.type_card);
        jQuery("input#lastname").val(value.last_name);
        jQuery("select#gender").val(value.gender);
        jQuery("input#birthdate").val(value.birthdate);
        jQuery("input#passportl").val(value.passport);
        jQuery("input#phone").val(value.phone);
        jQuery("input#email").val(value.email);
        jQuery("input#address").val(value.address);
        jQuery("input#note").val(value.note);
        jQuery("#popup_support_traveller").fadeOut(100);
        jQuery("#nationality_id").val(value.nationality_id);
        jQuery("#nationality_name").val(value.nationality_name);
    }


    // Name:        auto_list_first_name
    // Author:      Membell
    // Time:        20:54 24/04/2014
    // Parameter:    
    // Description: Tu dong tra ve danh sach khach co lastname theo input dat phong gan nhat
    function auto_list_lastname(){
        var tmlurl = 'r_get_customer.php?lastname=1&q='+jQuery("input#lastname").val();
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            if ((!Modernizr.input.list || (parseInt($.browser.version) > 400))) {
                    jQuery("ul#lastnamelist").html('');
                if(data != null){
                    jQuery.each(data,function(key,value){
                        arr_cusrtomer_draft = data;
                        jQuery("ul#lastnamelist").append('<li id='+value.id+'>'+value.first_name+' '+value.last_name+'-'+value.id+'</li>');
                     });  
                } 
                } else {
            jQuery("datalist#lastnamelist").html('');
                 if(data != null){
                     jQuery.each(data,function(key,value){
                        arr_cusrtomer_draft = data;
                        jQuery("datalist#lastnamelist").append('<option id='+value.id+'>'+value.last_name+' '+value.first_name+'-'+value.id+'<option>');
                     }); 
                 } 
             }       
            },
            error: function(){
              jQuery("datalist#lastnamelist").html('');
              message('error','Lỗi kết nối database',jQuery("input#lastnamelist"));
            }
        });
    }

    // get reason dicount and total money discount in month birthday
    function get_month_birthday(  birthdate,price_chart,discount ){ 
        if( birthdate!=null&& discount != null ){  
            var price = 0;
            var mgs   = "Giảm giá "+discount+"% tháng sinh nhật các ngày: "; 
            var i=0;
            var is_month_birthdate = 0;
            if( price_chart == null ){
                jQuery("#content_prince_chart label").each(function(){

                    total_dk  = parseFloat( jQuery(this).find("input").val().replace(/\./g,"").replace(/\,/g,"") );
                    var date_price = jQuery(this).find("p").html();
                    if( check_month_birthday( birthdate,date_price ) && date_price <= date_money  ){
                        is_month_birthdate = 1;
                        price += (total_dk*discount/100);
                        mgs += slip_year(date_price)+",";
                    }
                });
            }else{
                jQuery.each(price_chart,function(key,value){ i++;
                    // console.log( (  Object.keys(price_chart).length));
                    if( check_month_birthday( birthdate,key ) && ( i <  Object.keys(price_chart).length) && key <= date_money ){
                        is_month_birthdate = 1;
                        price += (value*discount/100);
                        mgs += slip_year(key)+",";
                    }
                });
            } 
            // var t = ParseInt( jQuery("#discount_money_vip").val() );
            if( is_month_birthdate == 1 ){
                jQuery("#pay-note").val(mgs);
                jQuery("#discount_money").val( price ).attr("readonly","");  
            } 
        }else{
             jQuery("#discount_money").val(0).removeAttr("readonly");
        }
    }

    function slip_year(date){
        date2 = date.split("/");
        return date2[0]+"/"+date2[1];
    }
    // check are birthday and date same month?
    function check_month_birthday(birthdate,date){ 
        mbir = birthdate.split( "/" );
        md   = date.split( "/" );
        // console.log( mbir[1]+"-"+md[1] );
        if( mbir[1] == md[1] ){
            return true;
        }else{
            return false;
        }
    }
    function get_if_customer_tooltip(idm){
        idm = idm.replace('custo_','');
        var tmp_if = arr_IF_customer_fn[idm];
        jQuery(".tool_fullname").html(tmp_if.first_name+' '+tmp_if.last_name);
		if( tmp_if.urlava != null ){ 
			jQuery("#avatarcmnd").show();
			jQuery("#avatarcmnd").find('img').attr('src',tmp_if.urlava);
        }else{
			jQuery("#avatarcmnd").hide();
		}
		if(tmp_if.nationality_name == null){
            jQuery(".tool_nationality_check").fadeOut();
        }else{
            jQuery(".tool_nationality_name").html(tmp_if.nationality_name);
            jQuery(".tool_nationality_check").fadeIn();
        }
        if(tmp_if.address == null){
            jQuery(".tool_address_check").fadeOut();
        }else{
            jQuery(".tool_address").html(tmp_if.address);
            jQuery(".tool_address_check").fadeIn();
        }
        if(tmp_if.phone== null){
            jQuery(".tool_phone_check").fadeOut();
        }else{
            jQuery(".tool_phone").html(tmp_if.phone);
            jQuery(".tool_phone_check").fadeIn();
        }
        if(tmp_if.email== null){
            jQuery(".tool_email_check").fadeOut();
        }else{
            jQuery(".tool_email").html(tmp_if.email);
            jQuery(".tool_email_check").fadeIn();
        }
        if(tmp_if.birth_date== null){
            jQuery(".tool_birthdate_check").fadeOut();
        }else{
            jQuery(".tool_birthdate").html(tmp_if.birth_date);
            jQuery(".tool_birthdate_check").fadeIn();
        }
        if(tmp_if.card_id == null || tmp_if.card_id == 0 ){
            jQuery("#tool_if_card").fadeOut();
        }else{
            jQuery(".tool_num_card").html(tmp_if.card_id);
            jQuery(".tool_cat_card").html( LIST_CARD_TYPE[tmp_if.card_type_vip].name );
            jQuery("#tool_if_card").fadeIn();
        }
        var tmp_gender =''; 
        console.log(tmp_if.gender);
        switch(tmp_if.gender) {
            case '0':
                tmp_gender = 'Nữ';
                break;
            case '1':
                tmp_gender = 'Nam';
                break;
            default:
                tmp_gender = 'Khác';
        }
        jQuery(".tool_gender").html(tmp_gender);



        if(tmp_if.email== null){
            jQuery(".tool_email_check").fadeOut();
        }else{
            jQuery(".tool_email").html(tmp_if.email);
            jQuery(".tool_email_check").fadeIn();
        }
        
        // jQuery(".tool_phone").html(tmp_if.phone);
        
        if( tmp_if.type_card != null || tmp_if.passport != '?' ){
            jQuery(".tool_type_card").html(tmp_if.type_card);
            jQuery(".tool_passportl").html(tmp_if.passport);
            jQuery(".tool_passport_datel").html(tmp_if.out_of_date);
            jQuery("#tool_loaithe").fadeIn();
        }else{
            jQuery("#tool_loaithe").fadeOut();
        }
        if( tmp_if.visa_number != null ){
            jQuery(".tool_visa").html(tmp_if.visa_number);
            jQuery(".tool_visa_nc").html(tmp_if.entry_date);
            jQuery(".tool_visa_hh").html(tmp_if.expire_date_of_visa);
            jQuery("#tool_if_visa").fadeIn();
        }else{
            jQuery("#tool_if_visa").fadeOut();
        }

        jQuery(".tool_time_in").html('__');
        jQuery(".tool_time_out").html('__'); 

        if(tmp_if.code_arrival != "" || tmp_if.code_departure != "" || tmp_if.p_time_in != null ||tmp_if.p_time_out != null ){
            jQuery(".tool_code_arrival").html(tmp_if.code_arrival);
            jQuery(".tool_code_departure").html(tmp_if.code_departure);
            jQuery(".tool_in_time").html(tmp_if.p_time_in);
            jQuery(".tool_out_time").html(tmp_if.p_time_out);
            (( tmp_if.check_arrival == 1 )?jQuery(".tool_check_arrival").removeClass('glyphicon-unchecked').addClass('glyphicon-check'):jQuery(".tool_check_arrival").removeClass('glyphicon-check').addClass('glyphicon-unchecked'));
            (( tmp_if.foc_arrival == 1 )?jQuery(".tool_foc_arrival").removeClass('glyphicon-unchecked').addClass('glyphicon-check'):jQuery(".tool_foc_arrival").removeClass('glyphicon-check').addClass('glyphicon-unchecked'));
            (( tmp_if.check_departure == 1 )?jQuery(".tool_check_departure").removeClass('glyphicon-unchecked').addClass('glyphicon-check'):jQuery(".tool_check_departure").removeClass('glyphicon-check').addClass('glyphicon-unchecked'));
            (( tmp_if.foc_departure == 1 )?jQuery(".tool_foc_departure").removeClass('glyphicon-unchecked').addClass('glyphicon-check'):jQuery(".tool_foc_departure").removeClass('glyphicon-check').addClass('glyphicon-unchecked'));
            jQuery("#tool_plane").fadeIn();
        }else{
            jQuery("#tool_plane").fadeOut();
        } 
    }





    // Name:        auto_list_passport
    // Author:      Membell
    // Time:        01:29 25/04/2014
    // Parameter:    
    // Description: Tu dong tra ve danh sach khach co passport theo input dat phong gan nhat
    function auto_list_passport(){
        var tmlurl = 'r_get_customer.php?passport=1&q='+jQuery("input#passportl").val();
        jQuery.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            jQuery("datalist#passport").html('');
                 if(data != null){
                     jQuery.each(data,function(key,value){
                        arr_cusrtomer_draft = data;
                        jQuery("datalist#passport").append('<option id='+value.id+'>'+value.passport+'<option>');
                     }); 
                 }        
            },
            error: function(){
              jQuery("datalist#passport").html('');
              message('error','Lỗi kết nối database',jQuery("input#passportl"));
            }
        });
    }


    function auto_input_customer_if(tmp,key){
        // var firstname = jQuery("input#firstname").val();
        if(!key){
            var id = '';
            var k = 0;
            for(var i=tmp.length-1 ; i >= 0; --i){
                if(tmp[i] == '-'){k=1;}
                if(tmp[i] != 'undefined'){
                    if(k != 1){
                        id = tmp[i] + id; //console.log(value[i]);
                    }
                }
            }
            id = parseInt(id);
            jQuery.each(arr_cusrtomer_draft,function(key,value){
                if(key == id ){
                    reset_form_customer();
                    jQuery("input#traveller_id").val(value.traveller_id);
                    jQuery("input#firstname").val(value.first_name);
                    jQuery("input#lastname").val(value.last_name);
                    jQuery("select#gender").val(value.gender);
                    jQuery("input#birthdate").val(value.birthdate);
                    jQuery("input#phone").val(value.phone);
                    jQuery("input#passportl").val(value.passport);
                    jQuery("input#email").val(value.email);
                    jQuery("input#address").val(value.address);
                    jQuery("input#note").val(value.note);
                }
            });
        }else{
            jQuery.each(arr_cusrtomer_draft,function(key,value){
                if(value.passport == tmp ){
                    reset_form_customer();
                    jQuery("input#traveller_id").val(value.traveller_id);
                    jQuery("input#firstname").val(value.first_name);
					
                    jQuery("input#lastname").val(value.last_name);
                    jQuery("select#gender").val(value.gender);
                    jQuery("input#birthdate").val(value.birthdate);
                    jQuery("input#passportl").val(value.passport);
                    jQuery("input#phone").val(value.phone);
                    jQuery("input#email").val(value.email);
                    jQuery("input#address").val(value.address);
                    jQuery("input#note").val(value.note);
                }
            });
        }
        
    }

        // Name:         validate_input_Customer_if
        // Author:      Duongnv
        // Time:        20:08 24/04/2014
        // Parameter: 
        // Description: Kiểm tra điều kiện input trong form customer information
        function validate_input_Customer_if(kp) { 
                var firstname = jQuery("#firstname").val();
                var lastname = jQuery("#lastname").val();
                if (firstname.length <= 0) {//console.log(kp);sksk
                  if(!kp){ 
                    message('warning','Không bỏ trống firstname',jQuery("#first"));
                    jQuery("#firstname").focus();
                  }  
                    return false;
                }
                jQuery("#first").text("");

                if (lastname.length <= 0) {
                    if(!kp){
                    message('warning','Không bỏ trống lastname',jQuery("#last"));          
                    jQuery("#lastname").focus();
                    } 
                    return false;
                }
                
                jQuery("#last").text("");
                return true;
            
        }





/*function create_card(){
    var tmlurl = 'r_get_customer.php?get_card=1&q=1&card='+card_id+"&rand="+Math.random();
    jQuery.ajax({ 
        url: tmlurl, 
        type: 'POST',        
        dataType: 'json',
        success: function(data){ 
            if( data != 1 ){
                if( typeof(data[5]) != 'undefined' ){
                    if( birthdate ==now ){
                        var t = data[5];
                        op.val( t['value'] );
                    }else{
                        var t = data[3];
                        op.val( t['value'] );
                    }
                }else{
                    var t = data[3];
                    op.val( t['value'] );
                }
                op.addClass("disable").attr("readonly","");
            }else{
                
            } 
        },
        error: function(){ 
        }
    } );
}*/
        
function quit(){
    //jQuery("#popup_room", window.parent.document).prev().remove();
    window.parent.location.reload();
    jQuery("#popup_room", parent.document).bPopup().close();
}

function quit1(){
    window.top.hide_popup();
}

jQuery(document).ready(function(){
/*
jQuery(".card_id").keyup(function(){

	if( jQuery(this).val().length > 1 ){//console.log(1);
		jQuery(".create_card").button('loading'); 
	}else{
		jQuery(".create_card").button('reset'); 
	}
});
*/
$(" .card_id ").keyup(function(e){
	//console.log(e.which);
	if( e.which == 13 ){ //jQuery( ".card_id" ).select();
		var card = streaming(jQuery(this).val()) ;
		jQuery(this).val(card);
		getCard( card );
	}
});
function streaming( text ){
		ext = text.replace(/\ /g,''); 
		if( text.length >= 8 ){
		/*Viet pho*/
		//return text.slice( 1, text.length - 1 );
		
		/*anh em*/
		 return text.slice( 3, text.length - 9 );
		}else{
			return text;
		}
	//text = text.replace(/\ /g,'');
	//return text.slice( 3, text.length - 9 );
}
function getCard( card ){ 
	var tmlurl = 'r_get_customer.php?get_card_at=1&q=1&card_id='+card+'';
  jQuery.ajax({
	  type: 'GET',
	  url: tmlurl,
	  dataType: 'json',
	  success: function(data){
		  jQuery.each(data, function(i, v){console.log(v.id);
			jQuery("#traveller_id").val(v.id);
			jQuery("#lastname").val(v.last_name);
			jQuery("#firstname").val(v.first_name);
			jQuery("#gender").val(v.gender);
			jQuery("#birthdate").val(v.birthdate);   
			if(v.type_card != null ){
				jQuery("#type_card").val(v.type_card);
			}
			jQuery("input#phone").val(v.phone);
			jQuery("input#passportl").val(v.passport);
			jQuery("input#email").val(v.email);
			jQuery("input#address").val(v.address);
			jQuery("input#nationality_id").val(v.nationality_id);
			jQuery("input#nationality_name").val(v.nationality_name);
			jQuery("select#card_vip_type").val(v.card_type_vip);
			jQuery(".img-thumbnail,.img-rounded").attr('src',v.urlava);
			//jQuery(".img-rounded").attr('src',v.urlava);
		  });
		 
	  } 
  });
}
$( ".card_id" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_customer.php?get_card_at=1&q=1",
          dataType: "json",
          data: {
            card_id: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.card_id+' '+item.first_name + ' ' +item.last_name,
                value: item.card_id,
                lastname : item.last_name,
                firstname : item.first_name,
                gender:item.gender,
                birth_date: item.birthdate,
                phone:item.phone,
                passport:item.passport,
                email:item.email,
				type_card:item.type_card,
                address:item.address,
                travel_id:item.id,
				urlava:item.urlava,
                card_type_vip:item.card_type_vip
              }
            }));
          }
        });
      },
      minLength: 1,
      select: function( event, ui ) {
		jQuery(".img-thumbnail,.img-rounded").attr('src',ui.item.urlava);  
        jQuery("#traveller_id").val(ui.item.travel_id);
        jQuery("#lastname").val(ui.item.lastname);
        jQuery("#firstname").val(ui.item.firstname);
        jQuery("#gender").val(ui.item.gender);
        jQuery("#birthdate").val(ui.item.birth_date);   
		if(ui.item.type_card != null ){
			jQuery("#type_card").val(ui.item.type_card);
		}
        jQuery("input#phone").val(ui.item.phone);
        jQuery("input#passportl").val(ui.item.passport);
        jQuery("input#email").val(ui.item.email);
        jQuery("input#address").val(ui.item.address);
        jQuery("input#nationality_id").val(ui.item.nationality_id);
        jQuery("input#nationality_name").val(ui.item.nationality_name);
        jQuery("select#card_vip_type").val(ui.item.card_type_vip);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });




/*
    $( "#firstname" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_customer.php?firstname=1",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.first_name + ' ' +item.last_name,
                value: item.first_name,
                lastname : item.last_name,
                gender:item.gender,
                birth_date: item.birthdate,
                phone:item.phone,
                passport:item.passport,
                email:item.email,
				type_card:item.type_card,
                address:item.address,
                travel_id:item.id
              }
            }));
          }
        });
      },
      minLength: 3,
      select: function( event, ui ) {
        jQuery("#traveller_id").val(ui.item.travel_id);
        jQuery("#lastname").val(ui.item.lastname);
        jQuery("#gender").val(ui.item.gender);
        jQuery("#birthdate").val(ui.item.birth_date);   
		if(ui.item.type_card != null ){
			jQuery("#type_card").val(ui.item.type_card);
		}
        jQuery("input#phone").val(ui.item.phone);
        jQuery("input#passportl").val(ui.item.passport);
        jQuery("input#email").val(ui.item.email);
        jQuery("input#address").val(ui.item.address);
        jQuery("input#nationality_id").val(ui.item.nationality_id);
        jQuery("input#nationality_name").val(ui.item.nationality_name);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });


    $( "#lastname" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_customer.php?lastname=1",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.first_name + ' ' + item.last_name,
                value: item.last_name,
                firstname : item.first_name,
                gender:item.gender,
                birth_date: item.birthdate,
                phone:item.phone,
				type_card:item.type_card,
                passport:item.passport,
                email:item.email,
                address:item.address,
                travel_id:item.id
              }
            }));
          }
        });
      },
      minLength: 2,
      select: function( event, ui ) {
        jQuery("#traveller_id").val(ui.item.travel_id);
        jQuery("#firstname").val(ui.item.firstname);
        jQuery("#gender").val(ui.item.gender);
        jQuery("#birthdate").val(ui.item.birth_date);   
        jQuery("input#phone").val(ui.item.phone);
		if(ui.item.type_card != null ){
			jQuery("#type_card").val(ui.item.type_card);
		}
        jQuery("input#passportl").val(ui.item.passport);
        jQuery("input#email").val(ui.item.email);
        jQuery("input#address").val(ui.item.address);
        jQuery("input#nationality_id").val(ui.item.nationality_id);
        jQuery("input#nationality_name").val(ui.item.nationality_name);
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });



    $( "#passportl" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_customer.php?passport=1",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.passport,
                value: item.passport,
                firstname : item.first_name,
                lastname : item.last_name,
                gender:item.gender,
                birth_date: item.birthdate,
                phone:item.phone,
                passport:item.passport,
				type_card:item.type_card,
                email:item.email,
                address:item.address,
                travel_id:item.id,
                nationality_id:item.nationality_id,
                nationality_name:item.nationality_name
              }
            }));
          }
        });
      },
      minLength: 2,
      select: function( event, ui ) {
        jQuery("#traveller_id").val(ui.item.travel_id);
        jQuery("#firstname").val(ui.item.firstname);
        jQuery("#lastname").val(ui.item.lastname);
        jQuery("#gender").val(ui.item.gender);
		if(ui.item.type_card != null ){
			jQuery("#type_card").val(ui.item.type_card);
		}
        jQuery("#birthdate").val(ui.item.birth_date);   
        jQuery("input#phone").val(ui.item.phone);
        jQuery("input#email").val(ui.item.email);
        jQuery("input#address").val(ui.item.address);
        jQuery("input#nationality_id").val(ui.item.nationality_id);
        jQuery("input#nationality_name").val(ui.item.nationality_name);
      },
      open: function(){
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function(){
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
    
    //get_updateNationality();
    //console.log(Nationality);
*/
    // auto_list_company();
    $( "#companyl" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_customer.php?namejson=1",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.name,
                value: item.name,
                source_id: item.source_id,
                email: item.contact_person_email,
                name: item.contact_person_name,
                phone: item.contact_person_mobile,
                id: item.id
              }
            }));
          }
        });
      },
      minLength: 1,
      select: function( event, ui ) {
        customer_id = ui.item.id;
        jQuery("#source").val(ui.item.source_id);
        jQuery("#customer-name").val(ui.item.name);
        jQuery("#customer-phone").val(ui.item.phone);
        jQuery("#customer-email").val(ui.item.email);
        // console.log(ui.item.source_id);
      },
      open: function(){
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function(){
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });

    $( "#tour-team-groupl" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_customer.php?tourjson=1",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.contact_person_name,
                value: item.contact_person_name,
                id: item.id
              }
            }));
          }
        });
      },
      minLength: 1,
      select: function( event, ui ) {
        // customer_id = ui.item.id;
        tour_id =  ui.item.id;
      },
      open: function(){
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function(){
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });


    $( "#nationality_id" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "r_get_room.php?updateNationality=1",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( $.map( data, function( item ) {
              return { 
                label: item.id,
                value: item.id,
                name: item.name
              }
            }));
          }
        });
      },
      minLength: 1,
      select: function( event, ui ) {
        // customer_id = ui.item.id;
        jQuery("#nationality_name").val(ui.item.name);
      },
      open: function(){
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function(){
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });

    //auto_list_company();
    //auto_list_tour();
    // r_get_customer.php?namejson=1&q=tmp 
});


