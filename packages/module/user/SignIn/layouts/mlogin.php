<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="stylesheet" href="assets/css/jquery.mobile-1.4.0.min.css"/>
  <script src="assets/js/jquery-1.10.2.min.js"></script>
  <script src="assets/js/jquery.mobile-1.4.0.min.js"></script>
  <script type="text/javascript" src="packages/core/includes/js/jquery/cookie.js"></script> 
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
		opacity: 0.4;
	}
	.ui-btn:hover{
		opacity: 0.9;
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
.logo{
	background: url(assets/img/logo.png);
height: 75px;
width: 120px;
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
	float: left;
	width: 239px;
	color: #fff;
	font-size: 10px;
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
margin: 0px 0px -20px 0px;
padding: 0px 0px 0px 0px;
}
</style> 
</head>
<body>
<div data-role="page" style="background-size: cover;background-image: url(assets/img/mlogin.jpg);"  id="restaurant" class="restaurant" data-url="demo-page">
    <div role="main" class="ui-content" style="color: #fff;text-shadow: 0 0px 0 #f3f3f3;">
			<div><img src="<?php echo HOTEL_BANNER;?>" style="width: 40%;margin-left: 30%;">
                
            </div>
		    <div  style="display:none;height: 100px;margin: auto;position: absolute;z-index: 1;left: 40%;max-width: 280px;border-radius: 20px;" class="ui-content" data-theme="a">
			<p><?php echo Form::$current->error_messages();?></p>
			</div>
		   <form id="login" method="post" data-ajax="false"> 
                    <p style="color: red;font-weight:bold;display:none;width: 30%;margin-left: 40%;font-size:20px" id="remote_key"></p>
					<input type="text" style="height: 50%;font-size: 150%;max-width: 300px;" placeholder="[[.user_name.]]" type="text" class="inputtext" name="user_id" id="user_id" value="" >
					<input type="password" style="height: 50%;font-size: 150%;max-width: 300px;" placeholder="[[.password.]]" class="inputtext" name="password" id="password">
					<input onclick="" style="max-width: 300px;" href="#transitionExample" data-transition="slidedown" data-rel="popup" type="submit"  id="" class="ui-btn " id="sign_in" value="[[.login.]]" />
    		</form>
		    
	</div>
	<div data-role="footer"  >
		<div class="logo">
		</div>
		<div class="content-f">
		<h4>CÔNG TY CP CÔNG NGHỆ EZCLOUD TOÀN CẦU</h4><br>
		<h4 class="web" onclick="home();">Website: ezcloud.vn</h4><br>
		<h4>Email: Sale@ezCloud.vn</h4>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
jQuery('document').ready(function(){
        if((jQuery("#restaurant > div > div.ui-content").text()).length != 21){
    	   jQuery("#restaurant > div > div.ui-content").fadeIn().delay( 2500 ).fadeOut();
        }  
        var remote_key = jQuery.cookie("rakey");
        if (remote_key) {
            jQuery("#remote_key").html("[[.remote_code.]]: " +remote_key);
            jQuery("#remote_key").show();
        }  
});

function home(){
	window.location.href='http://ezcloud.vn/';
}

 
</script>
</html>