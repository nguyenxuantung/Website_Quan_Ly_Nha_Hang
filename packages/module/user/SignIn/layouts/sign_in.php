 <!-- membell them nhan dang mobile  -->
 <!-- time: 23:00 01/04/2014 -->
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
 <!--script type="text/javascript">
    var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    };

    if(isMobile.any()) {
        window.location.replace('?page=sign_in&m=mobile');
    }
</script-->
<!-- ket thuc them -->

 <!-- Our CSS stylesheet file -->
        <link rel="stylesheet" href="/assets/css/styles_signin.css" />
        
<!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script type="text/javascript" src="packages/core/includes/js/jquery/cookie.js"></script>
<style>
/*
.feature_text {
font-family: "Segoe UI","Segoe UI Web Regular","Segoe UI Symbol","Helvetica Neue","BBAlpha Sans","S60 Sans",Arial,"sans-serif";
font-size: 13px;
color: #434343;
text-align: justify;
padding-left:12px;
padding-right:12px;
vertical-align: top;
}
.loggedout_menubar {
margin: 0 auto;
padding-top: 3px;
width: 1024px;
}
.login_header {
width: 100%;
min-width:1024px;
height: 71px;
background: #3b5998;
border-bottom: 1px solid #e5e5e5;
overflow: hidden;
}*/
</style>
<style type="text/css">
	input:before{
		content: "#";
	}
	.ui-btn{
		height: 50%;
		font-size: 150%;
		background: rgba(44, 53, 156, 0.38);
		color: #FFF;
		text-shadow: 0 0px 0 #f3f3f3;
		font-family: "Segoe UI","Segoe UI Web Regular","Segoe UI Symbol","Helvetica Neue","BBAlpha Sans","S60 Sans",Arial,"sans-serif";
		border-radius: 17px;
		opacity: 1;
	}
	.ui-btn:hover{
		opacity: 0.8;
	}
	#restaurant > div > div.ui-content {
		background: #F8C8C8;
		opacity: 0.8;
		height: 89px;
	}	
	.ui-body-a, .ui-page-theme-a .ui-body-inherit, html .ui-bar-a .ui-body-inherit, html .ui-body-a .ui-body-inherit, html body .ui-group-theme-a .ui-body-inherit, html .ui-panel-page-container-a {
		background: #fff;
		border-color: #ddd;
		color: #333;
		text-shadow: 0 1px 0 #f3f3f3;
		max-width: 300px;margin: 0.3em auto;
	}
	.ui-page-theme-a .ui-btn, html .ui-bar-a .ui-btn, html .ui-body-a .ui-btn, html body .ui-group-theme-a .ui-btn, html head+body .ui-btn.ui-btn-a, .ui-page-theme-a .ui-btn:visited, html .ui-bar-a .ui-btn:visited, html .ui-body-a .ui-btn:visited, html body .ui-group-theme-a .ui-btn:visited, html head+body .ui-btn.ui-btn-a:visited {
background: #f6f6f6;
border-color: #ddd;
color: #333;
text-shadow: 0 1px 0 #f3f3f3;
max-width: 266px;margin: auto;
}
.ui-bar-a, .ui-page-theme-a .ui-bar-inherit, html .ui-bar-a .ui-bar-inherit, html .ui-body-a .ui-bar-inherit, html body .ui-group-theme-a .ui-bar-inherit {
background: rgba(233, 233, 233, 0);
border-color: rgba(221, 221, 221, 0);
color: #FFF;
text-shadow: 0 1px 0 rgba(238, 238, 238, 0);
font-weight: 700;
position: fixed;
bottom: 0px;
width: 100%;
}
.ui-footer .ui-title {
margin: 0 1em;
	padding: 0px;
	
	font-family: initial;
	text-align: left;
}
.logo_left{
	background: url(assets/img/logo.png);
height: 75px;
width: 160px;
float: left;
margin-bottom: 0px;
background-size: 75%;
background-repeat: no-repeat;
margin-right: -40px;
}
.logo_right{
	background: url(assets/img/logo_booking.png);
height: 75px;
width: 160px;
float: left;
margin-bottom: 0px;
background-size: 75%;
background-repeat: no-repeat;
margin-right: -40px;
}
.content-f{
	margin-top: 5px;
}
.content-f *{
    line-height: 17px;
	float: left;
	width: 290px;
	color: #fff;
	font-size: 12px;
	padding: 0px;
	margin: 0px;
}
#restaurant > div.ui-footer.ui-bar-inherit {
opacity: 0.5;
}
.web:hover{
	color: #001535;
	cursor: pointer;
}
span, div, pre, a, code, tr {
font-size: 12px;
line-height: 15px;
color: #000000;
margin: 0px 0px -10px 0px;
padding: 0px 0px 0px 0px;
}
</style> 
</head>
<body style="background-size: cover;background-image: url(assets/img/mlogin.jpg);">
    <div role="main" class="ui-content" style="color: #fff;text-shadow: 0 0px 0 #f3f3f3;height:415px;">
			<div><img src="<?php echo HOTEL_BANNER;?>" style="width: 36%;margin-left: 32%;"></div>
		    <div  style="display:none;height: 100px;margin: auto;position: absolute;z-index: 1;left: 40%;max-width: 280px;border-radius: 20px;" class="ui-content" data-theme="a">
			<p><?php echo Form::$current->error_messages();?></p>
			</div>
            <div style="display: block;margin-left: auto;margin-right: auto; width: 200px; margin-top: -10px;">
		   <form id="login" method="post" data-ajax="false" >
                    <p style="color: red;font-weight:bold;display:none;width: 100%;font-size:18px" id="remote_key"></p>
					<input type="text" style="" placeholder="[[.user_name.]]" type="text" class="inputtext" name="user_id" id="user_id" value="" ><br />
					<input type="password" style="" placeholder="[[.password.]]" class="inputtext" name="password" id="password"><br />
					<input onclick="" style="margin-left: 65px; margin-top: 10px;" href="#transitionExample" data-transition="slidedown" data-rel="popup" type="submit"  id="" class="ui-btn " id="sign_in" value="[[.login.]]" />
    		</form>
		    </div>
	</div>
     <div class="contact" style="width: 420px;margin-left: auto;margin-right: auto;height: 160px;">
    <div id="show_contact">
		<div id="content_detail">
            <div>
    			<span style="line-height:30px;font-size:15px; width:100%; float:left;">
    			<b><img src="resources/interfaces/images/default/mail.png" width="35px" style="float:left;margin-top:10px;margin-right:10px;" /></b><b style="float:left; font-size:15px;"><a style="float: left;margin-top: 20px;font-size: 18px;color: #fff;" href="mailto:hotro@ezcloud.vn?Subject=Yêu cầu hỗ trợ về vấn đề:" target="_top">hotro@ezcloud.vn</a></b>
    			
				<img src="resources/interfaces/images/default/phone1.png" width="35px" style="float:left;margin-top:5px;margin-right:10px; margin-left:20px;"/>
    			<b style="float:left; font-size:18px;color: #fff;margin-top: 15px;">1900 6159</b>
				
    			
    			</span>
            </div>
            <div>
    			<span style="font-size:15px; width:100%; float:left;margin-top: 10px;">
    			<img src="resources/interfaces/images/default/browser.png" width="35px" style=" float:left; margin-right:10px;"/>
    			<b style="float:left; font-size:15px;"><a style="float: left;margin-top: 20px;font-size: 18px;color: #fff" href="http://ezcloud.vn" target="_blank">http://ezcloud.vn</a></b> 
    			
				<img src="resources/interfaces/images/default/Booking.png" width="35px" style="float:left;margin-top:5px;margin-right:10px; margin-left:34px;"/>
    			<b style="float:left; font-size:15px;"><a style="float: left;margin-top: 20px;font-size: 18px;color: #fff" href="http://ezhotel.vn" target="_blank">http://ezhotel.vn</a></b> 
				
    			</span>
            </div>
		</div>
	</div>
</div>
<div data-role="footer" style="" >
    <div id="left" style="float: left;width: 420px;">
		<div class="logo_left">
		</div>
		<div class="content-f" style="padding-top: 10px;">
		<h4>CÔNG TY CP CÔNG NGHỆ EZCLOUD TOÀN CẦU</h4><br>
		<a href="http://ezcloud.vn" target="_blank"><h4 class="web" onclick="home();">Website: ezcloud.vn</h4></a><br>
		<a href="mailto:sale@ezcloud.vn?Subject=Yêu cầu hỗ trợ về vấn đề:" target="_top"><h4>Email: Sale@ezCloud.vn</h4></a>
		</div>
	</div>
    <div id="right" style="float: right;width: 420px;">
		<div class="logo_right">
		</div>
		<div class="content-f" style="padding-top: 10px;">
		<h4>HỆ THỐNG ĐẶT PHÒNG KHÁCH SẠN ONLINE</h4><br>
		<a href="http://ezhotel.vn" target="_blank"><h4 class="web" onclick="home();">Website: ezhotel.vn</h4></a><br>
		<a href="mailto:sale@ezcloud.vn?Subject=Đặt phòng khách sạn online" target="_top"><h4>Email: Sale@ezCloud.vn</h4></a>
		</div>
	</div>
    
</div>
	
<script type="text/javascript">
    jQuery('document').ready(function(){
            var remote_key = jQuery.cookie("rakey");
            if (remote_key) {
                jQuery("#remote_key").html("[[.remote_code.]]: " +remote_key.substr(7));
                jQuery("#remote_key").show();
            }  
    });
    
    function home(){
    	window.location.href='http://ezcloud.vn/';
    }

 
</script>
</body>
