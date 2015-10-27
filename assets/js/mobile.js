/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


jQuery(document).ready(function() {
    
    /*Khoi tao so khach hang*/
    customers=0;
    /*Khoi tao bien ten ban*/
    table='';
    /*Vi tri cua input nhap so mon an*/
    var numberF = jQuery("div#chonmon div div input.numberfoot");
    var btchonmon = jQuery("div.ui-responsive div a.chonmon");
    var popupchonmon = jQuery("div#chonmon ul li");
    var chonmon;
    var checkin = jQuery("div#checkin ul:first");
    var flag = 0;
    var money=0;
    var nametable='';
    var ncustomer=0;
    var code_table='';
    var bar_reservation_id = 0;
    var bar_id;
    var table_id;
    //var foot;
    namefoot = '';
    var tmp;
    function checklogin(){///alert('Bạn chưa login');
      //if(data=='0000'){
        alert('Bạn chưa login');
         window.location.replace('/');
      //}
   }
    


    list_restaurant();
 
/*----------------------------PAGE LIST TABLE*--------------------------*/
    /*SET CUSTOMERS at popup*/
    jQuery('#startorder').click(function(){
        
        customers = setdata(jQuery("#numberct"));
        getinf();
   });


    /*SET CUSTOMERS & TABLE at selected*/
    jQuery('div#listtable .content ul li a').click(function(){
        jQuery("#numberct").val('');
        if(jQuery(this).hasClass('ui-btn-icon-left')){
            customers = jQuery(this).find('span.ui-li-count').text();
        }
        table = jQuery(this).find('h2').text();
        getinf()
   });


    
    jQuery('div.formcheckin div div input[value="Ghi lại"]').click(function(){
        //alert(customers);
    });

    function chuyen(){
        jQuery("div#listtable div.ui-content ul li a.table_busy").click(function(){
            var link = jQuery(this).attr("link");
            window.location.replace(link); 
        });
        
    }

    

    if(localStorage.location_id != null){
        list_table(localStorage.location_id);
    }
    dataok = new Object();
    function list_table(id) { 

        jQuery("div#bandolocation img").attr("src",localStorage.bando_location);


        check_busy_table();//console.log(dataok);
        jQuery("#listtable div h1").html(localStorage.bar_location_name);
        jQuery("#location div h1").html(localStorage.bar_name);
        jQuery("div#listtable div.content ul").html('');
        var tmlurl = "sp_bar_pos.php?id=1&list_table="+id;
               $.ajax({
               type: 'POST',
               url: tmlurl,
               dataType: 'json',
               success: function(data){
                    $.each(data,function(key, value){
                        var khoangoai = 0;
                         $.each(dataok,function(key1, value1){
                            if(value1.id == value.id){khoangoai = 1;
                                var url = "/?page=bar_reservation&touchscreen=1&order=1&name="+value.name+"&bar_id="+value.bar_id+"&ncustomer="+value1.num_people+"&table_id="+value.id+"&code="+value.code+"&reservation_id="+value1.bar_reservation_id;
                                url = url.replace(" ","%20");
                                jQuery("div#listtable div.ui-content ul").append(
                                    "<li class='ui-li-has-thumb'><a  link='"+url+"' class='table_busy ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-check ui-btn-icon-left ui-btn-a' data-transition='pop' code="+value.code+" id='"+value.id+"'>"
                                        +"<img src='assets/img/busy_table.png' class='ui-li-thumb'>"
                                        +"<h2>"+value.name+"</h2>"
                                        +"<p></p>"
                                        +"<span class='ui-li-count'>"+value1.num_people+" Customers</span>"
                                    +"</a></li>"
                                    ); 
                            }
                         });
                        
                        if(khoangoai == 0 ){
                            jQuery("div#listtable div.ui-content ul").append(
                            "<li class='ui-li-has-thumb'><a href='#popup' data-rel='popup' class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-transition='slide' code="+value.code+" id='"+value.id+"'>"
                                +"<img src='assets/img/table.png' class='ui-li-thumb'>"
                                +"<h2>"+value.name+"</h2>"
                                +"<p></p>"
                            +"</a></li>"
                            );
                        }
                        bar_reservation_id=0;
                        //

                       
                        
                        jQuery("#listtable div ul li a").click(function(){
                                table_id = jQuery(this).attr("id");
                                code_table = jQuery(this).attr("code");
                                startorder(jQuery(this));
                            });
                       
                        
                    });
                        jQuery("#popup form div div div a").click(function(){
                                if(isNaN(jQuery("#numberct").val()) || ( jQuery("#numberct").val()!= '' ) || ( jQuery("#numberct").val()!= 0 )){
                                    var url =  "?page=bar_reservation&touchscreen=1&order=1&name="+nametable+"&bar_id="+localStorage.bar_id+"&ncustomer="+jQuery("#numberct").val()+"&table_id="+table_id+"&code="+code_table;
                                    window.location.replace(url);
                                }else{
                                    jQuery("#numberct").val('1');
                                    alert("vui lòng nhập số vào");
                                }
                          });
                        chuyen();
                     
                },
                error: function(){
                    //alert('error');
                }

            });
        }
        
    
    function check_busy_table(){
         

        var tmlurl = "/sp_bar_pos.php?id=1&check_busy_table";
        $.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            dataok = data;
            /*
                 $.each(data,function(key,value){
                    if(key == ban.id){
                        dataok = data;
                        console.log(value);                
                    }else{
                        dataok = null; 
                    }
                 });*/         
            },
            error: function(){
                 dataok = null;
            }
        }); 

    } 
    
    /*
    
    function check_busy_table(){
        localStorage.bar_reservation_id = 0;
        //var tmlurl = "/sp_bar_pos.php?id=1&check_busy_table";
        var tmlurl = "/sp_bar_pos.php?id=1&check_busy_table";
        
        $.ajax({
           type: 'POST',
           url: tmlurl,
           dataType: 'json',
           success: function(data){
            dataok = data;
                 console.log(data); 
                 //list_table(id,data);     
            },
            error: function(){
                 return 1; 
            }
        }); 

    }*/
 
    if(localStorage.bar_id != null){
        //alert('ok');
        list_location(localStorage.bar_id);
    }
    function list_location(id) {
        jQuery("div#location div.ui-content ul").html('');
        jQuery("div#location img").attr("src",localStorage.image_path);
        jQuery("div#listtable div.ui-content ul").html('Chưa có bàn nào');
        var tmlurl = "sp_bar_pos.php?id=1&list_location="+id;
               $.ajax({
               type: 'POST',
               url: tmlurl,
               dataType: 'json',
               success: function(data){
                    $.each(data,function(key,value){
                        //alert(value.bar_location_id);
                        jQuery("div#location div.ui-content ul").append(
                            "<li class='ui-li-has-thumb'><a bando="+value.image_path+" href='#listtable' class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-transition='slide' id='"+value.id+"'>"
                                +"<img src='assets/img/icon_restaurant.png' class='ui-li-thumb'>"
                                +"<h2>"+value.name+"</h2>"
                                +"<p></p>"
                            +"</a></li>"
                            );
                    });
                    /*------------------------PAGE LIST LOCATION---------------------------*/   
                     jQuery("div#location div.ui-content ul li a").click(function(){
                        //alert(jQuery(this).attr("id"));
                        localStorage.location_id = jQuery(this).attr("id");
                        localStorage.bar_location_name = jQuery(this).find("h2").text();
                        jQuery("#listtable div h1").html(jQuery(this).find("h2").text());


                        localStorage.bando_location =  jQuery(this).attr("bando");
                        jQuery("div#bandolocation img").attr("src",jQuery(this).attr("bando"));
                        list_table(jQuery(this).attr("id"));
                     }); 
                },
                error: function(){
                    //alert('error');
                }
            });
        }
    
    function list_restaurant() {
        jQuery("div#restaurant div.ui-content ul").html('');
        jQuery("div#location div.ui-content ul").html('Chưa có dữ liệu');
        var tmlurl = "sp_bar_pos.php?id=1&list_restaurant";
               $.ajax({
               type: 'POST',
               url: tmlurl,
               dataType: 'json',
               success: function(data){
                    if(data != "" ){
                        $.each(data,function(key,value){
                            //alert(value.bar_location_id);
                            jQuery("div#restaurant div.ui-content ul").append(
                                "<li class='ui-li-has-thumb'><a href='#location' bando="+value.image_path+" class='ui-btn ui-btn-icon-right ui-icon-carat-r' data-transition='slide' id='"+value.id+"'>"
                                    +"<img src='assets/img/icon-restaurantok.png' class='ui-li-thumb'>"
                                    +"<h2>"+value.name+"</h2>"
                                    +"<p></p>"
                                +"</a></li>"
                                );
                        });
                    } 
                    /*------------------------PAGE LIST LOCATION---------------------------*/   
                     jQuery("div#restaurant div.ui-content ul li a").click(function(){
                        //alert(jQuery(this).attr("id"));
                        bar_id = jQuery(this).attr("id");
                        localStorage.bar_id = bar_id;
                        localStorage.image_path =  jQuery(this).attr("bando");
                        jQuery("div#location img").attr("src",jQuery(this).attr("bando"));

                        localStorage.bar_name = jQuery(this).find("h2").text();
                        jQuery("#location div h1").html(jQuery(this).find("h2").text());

                        list_location(bar_id);
                     });
                     /*
                     $("div,li,ul a").click(function() {
                      //function full(){
                        var docElement, request;

                        docElement = document.documentElement;
                        request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;

                        if(typeof request!="undefined" && request){
                            request.call(docElement);
                        }
                     // }
                    });*/
                },
                error: function(){
                    checklogin();
                }

            });


                
        }


/*---------------------list group mon an----------------------*/
/*
    function list_group_monan(){
        jQuery(".ui-content div div#foot ul,.ui-content div div#drink ul,.ui-content div div#wine ul").html('');
        //jQuery(".ui-content div div#foot ul,.ui-content div div#drink ul,.ui-content div div#wine ul").html('Chưa có dữ liệu');
        var tmlurl = "sp_bar_pos.php?id=1&list_category_foot&bar_id="+bar_id;
        var group;
        var k=0;        
               $.ajax({
               type: 'POST',
               url: tmlurl,
               dataType: 'json',
               success: function(data){
                    if(data != "" ){//tmp = data;
                        $.each(data,function(key,value){
                            //alert(value.bar_location_id);
                            if(value.groupcategory == 'DRK'){
                                group = 'drink';
                            }else if(value.groupcategory == 'FOD'){
                                 group = 'foot';
                            }else if(value.groupcategory == 'WNE'){
                                 group = 'wine';
                            }
                            if(check_list_category(value.category_id)){
                                list_cat_mon[k++] = value.category_id;
                                jQuery(".ui-content div div#"+group+" ul").append(
                                "<li class='ui-li-has-thumb'><a href='#rightpanel' class='ui-btn ui-btn-icon-right ui-icon-carat-r' id='"+value.category_id+"'>"
                                    +"<img src='"+value.category_icon_url+"' >"
                                    +"<h2>"+value.name+"</h2>"
                                    +"<p></p>"
                                +"</a></li>"
                                );
                            }
                            jQuery("div#rightpanel div ul").append(
                                "<li class='ui-li-has-thumb' idgroup='"+value.category_id+"' idmon='"+value.id+"' name_unit="+value.name_unit_1+">"
                                    +"<a href='#chonmon' data-rel='popup' data-position-to='window' data-transition='pop' aria-haspopup='true' aria-owns='chonmon' aria-expanded='false' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>"
                                        +"<img src='"+value.icon_url+"'>"
                                        +"<h2>"+value.name_1+"</h2>"
                                        +"<p>"+value.price+"</p>"
                                    +"</a>"
                                +"</li>");
                            
                            
                        });
                    } 
                    /*------------Bat su kien khi click chon group mon--------------*/   
                     /*jQuery(".ui-content div div#foot ul li a,.ui-content div div#drink ul li a,.ui-content div div#wine ul li a").click(function(){
                        //tmp = ;
                        list_monan(jQuery(this).attr("id"));
                    })
                 },
                
                error: function(){
                    alert('error');
                }
                
            });
    }
*/



/*---------------------List mon an---------------------*/
    function list_monan(id){
        jQuery("div#rightpanel div ul li").each(function(){
                if(jQuery(this).attr("idgroup")!=id){
                    jQuery(this).hide();
                }else{
                    jQuery(this).show();
                }
        });
        jQuery(".chonmon").click(function(){
            click_chon_mon();
        });
        add_monan();
    }


/*----------------Yeu cau chon mon---------------*/
    function add_mon(){
        
            var id_mon = jQuery(this).attr("id");
            var gia = jQuery(this).attr("gia");
            var kieu = jQuery(this).attr("name_unit");
            var ten = jQuery(this).find("a h2").text();
            jQuery("#chonmon ul#autocomplete li h2").html(ten);
            jQuery("#chonmon ul#autocomplete li p").html(gia);
            jQuery("#chonmon ul#autocomplete li span.ui-li-count").html('1');
        
    }

    function check_list_category(category_id){
        for (var i=0;i<list_cat_mon.length;i++)
        { 
            if(category_id==list_cat_mon[i])
            return false;
        }
        return true;
    }





/*----------------------------PAGE START ORDER*--------------------------*/
/*Select foot*/
function add_monan(){
jQuery("div#rightpanel div.panel-content ul li a").click(function(){
    
    foot = jQuery(this).html();
    namefoot = jQuery(this).find("h2").text();
    numberF.val('1');
    //alert(namefoot);
    jQuery("div#chonmon ul#autocomplete li").html(foot);
    btchonmon.click(function(){
        //var numberfoot = numberF.val();
        //alert(namefoot);

        jQuery("div#checkin ul li.ui-li-has-alt a").each(function(){
            var txt = jQuery(this).find("h2").text();
            alert('txt: '+txt+'  namefoot: '+namefoot);
            if((txt == namefoot )&&(txt != null)){
                flag = 1;
                var t = parseFloat(jQuery(this).find("span").text()) + parseFloat(numberF.val());
                jQuery(this).find("span").html(t);
                alert(t);
            }else{

            }
        });
        if(flag==0){
            jQuery("div#checkin ul").append('<li class="ui-li-has-alt ui-li-has-count ui-li-has-thumb " >'
            +'<a id="moned" href="#chonmon" data-transition="turn" data-rel="popup" aria-haspopup="true" aria-owns="chonmon" aria-expanded="false" class="ui-btn">'
            +foot+'<span class="ui-li-count ui-body-inherit">'+numberF.val()+'</span></a><a href="#popupDialog" data-rel="popup" data-position-to="window" '
            +'data-transition="pop" class="ui-btn ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-b delete ui-btn-icon-notext deletefoot" '
            +'aria-haspopup="true" aria-owns="popupDialog" aria-expanded="false" title="Delete"></a></li>');
            
            //DELETE//
            jQuery('a.deletefoot').bind('click',function(){//alert('ok');
                delet = jQuery(this).parent();
                jQuery("div#popupDialog div a.yes").click(function(){
                    delet.remove();
                });
            });


            //ADD MON//
            
        }
        
    }); 

  numberF.val(1);
    chonmon = jQuery(this); 
    jQuery("div#chonmon ul:first li").html(
        "<li class='ui-li-static ui-body-inherit ui-li-has-count"
        +" ui-li-has-thumb ui-first-child ui-last-child'>"
        +chonmon.html()
        +"</li>");



    
});
}

function click_chon_mon(){
    
    addcheckin(0);coutmoney();

    checkin.find("li a").click(function(){
        numberF.val(parseFloat(jQuery(this).find("span").text()));
        chonmon = jQuery(this); 
        jQuery("div#chonmon ul:first li").html(
        "<li class='ui-li-static ui-body-inherit ui-li-has-count"
        +" ui-li-has-thumb ui-first-child ui-last-child'>"
        +chonmon.html()
        +"</li>");
        jQuery(".chonmon").click(function(){
            editcheckin();coutmoney();
        });
        

    });

    checkin.find("li a.deletefoot").click(function(){
        chonmon = jQuery(this).parent();
        jQuery("div#popupDialog div a.yes").click(function(){
            chonmon.remove();coutmoney();
        });
        
    });
}






/*
jQuery("div#checkin ul li a").on('click',function(){
                tmpvt = jQuery(this).find("span.ui-li-count");
                var tmp = jQuery(this).html();
                //alert(tmp);
                //var numberfoot = parseFloat(jQuery(this).find("span").text());
                jQuery("div#chonmon ul#autocomplete li").html(tmp);
                numberF.val('1');
                btchonmon.click(function(){
                    var editnumberF = numberF.val();
                    tmpvt.html(editnumberF);
                });
            });

*/

/*Button plus*/
jQuery("div#chonmon div div div.button-wrap button[data-icon='plus']").click(function(){
    var t = numberF.val();numberF.val((++t));
    t = parseFloat(jQuery("div#chonmon ul li span").text());
    jQuery("div#chonmon ul li span").text(++t);
});

/*Button minus*/
jQuery("div#chonmon div div div.button-wrap button[data-icon='minus']").click(function(){
    var t = numberF.val();numberF.val((--t));
    t = parseFloat(jQuery("div#chonmon ul li span").text());
    jQuery("div#chonmon ul li   span").text(--t);
});


      // Do something after 5 seconds
//jQuery('a.deletefoot');


/*
    function ghilai(){
        jQuery("div#checkin ul li")
    }
*/  




    function get_selected_foods() {             
        var arr = [];
        jQuery("div#checkin ul li").each(function () {
            var sfoodid = this.id.replace("sfood_","");
            var amount = jQuery(this).find(".amount").text();
            arr.push([sfoodid,amount]);
        });
        var query = "";
        for(a in arr) {
            query += "[" + arr[a][0] + "," + arr[a][1] + "]";
        }
        return query;
    }
    function submit_data() {
        alert('ok');
        var values = get_selected_foods();
        alert("data to post:" + values);
        jQuery.post("save_data.php", {"foods": values}).done(function () {
            alert("done");
        }).fail(function() {
        alert("failed");
        }
        ).always(function () {
            //always
        });
    }




    function startorder(table){
        //list_group_monan();

        nametable = table.find("h2").text();
        jQuery("#listtable #popup ").find("h3").html(nametable);
        jQuery("#goimon div h1").html(nametable);
        jQuery("#startorder").click(function(){
            ncustomer = jQuery("#numberct").val();
        });

    }


   function setdata(a){
            return a.val();
   }

/*
  jQuery('.delete').click(function(){
    var t = $(this);
    jQuery('a.yes').click(function(){
        alert('ok');
        t.parent().remove();
    });
    
  })
  */


  function getinf(){
    jQuery('div#finish div h1').html(table);
    jQuery("div#order div[data-role='header'] h1").html(table);
    jQuery('div#finish div.ui-content h3').text(customers+' Customers');
  }




  function addcheckin(){
    var tmp = chonmon.html();
    var tenmon = chonmon.find("h2").text();
    checkin.find("li.ui-li-has-alt a").each(function(){
        var mon = jQuery(this).find("h2").text();
        if((tenmon==mon)&&(mon != '')){
            flag = 1;
            var tmp = parseFloat(jQuery(this).find("span").text());
            jQuery(this).find("span").html(++tmp);
        }
    });
    if(flag==0){
        checkin.prepend('<li class="ui-li-has-alt ui-li-has-count ui-li-has-thumb ">'
            +'<a id="moned" href="#chonmon" data-transition="turn" data-rel="popup" aria-haspopup="true" aria-owns="chonmon" aria-expanded="false" class="ui-btn">'
            +tmp+'<span class="ui-li-count ui-body-inherit">'+numberF.val()+'</span></a><a href="#popupDialog" data-rel="popup" data-position-to="window" '
            +'data-transition="pop" class="ui-btn ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-b delete ui-btn-icon-notext deletefoot" '
            +'aria-haspopup="true" aria-owns="popupDialog" aria-expanded="false" title="Delete"></a></li>');
    }else{
        flag = 0;
    }
    
  }



  function editcheckin(){
    var tmp = numberF.val();
    chonmon.find("span").html(tmp);
  }



  function coutmoney(){
    money = 0;
    checkin.find("li a").each(function(){
        var tmp = jQuery(this).find("p").text();
        var n   = parseFloat(jQuery(this).find("span.ui-li-count").text());
        if(tmp != ''){
            tmp=tmp.replace("$","");
            tmp = parseFloat(tmp);
            money = money+tmp*n;
        }
        
    });
    checkin.find("li span.tong").html(money+' VNĐ');
  }



});
