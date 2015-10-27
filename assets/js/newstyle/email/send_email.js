

function send_email( bt,list_email,form  ){ 
    // var t = jQuery(".email").html(); 
        var tmlurl = 'send_email.php?act=sends&email='+list_email+'&form='+form+'#'; 
    jQuery.post(
    tmlurl + Math.random(),
    { 
        "content" : "<table id='content' style='border:0px solid black;border-collapse: collapse;color:#313131;'>"+jQuery("#content").html()+"</table>"
    }).done(function(data)
    {  
         var  info =jQuery.parseJSON(data);
         if( info['status'] == 1 ){ 
            jQuery("#send_email").removeAttr("disabled");
            jQuery("#send_email").html(bt);
            alert("[[.da_luu_vao_stack_gui.]]");
         }else{
            jQuery("#send_email").removeAttr("disabled");
            jQuery("#send_email").html(bt);
            alert(info['message']);
         }
    }).fail(function() { 
        jQuery("#send_email").removeAttr("disabled");
        jQuery("#send_email").html(bt); 
    }).always(function () { 

    });
}
 
    // kiem tra xem ton tai email khong
    function innit_send_email( list_email,form ){
        op = '<button id="send_email" style="display: block;">send email</button>';
        jQuery("#printer").prepend(op);
        op = jQuery("button#send_email");
        // console.log(list_email.length);
        if( list_email.length  < 5 ){
            jQuery("#send_email").hide();
        }
        op.click(function(){
            var t = op.html();
            op.attr("disabled","");
            op.html("loading..."); 
            send_email( t,list_email,form  );
        });
    } 