var xmlhttp

function checkcustomer(str)
{
	//alert(str);
xmlhttp=GetXmlHttpObject();
if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }
var url="checkcustomer.php";
url=url+"?customer="+str;
xmlhttp.onreadystatechange=stateChanged;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}

function checkcode(str)
{
	//alert(str);
xmlhttp=GetXmlHttpObject();
if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }
var url="checkcustomer.php";
url=url+"?code="+str;
xmlhttp.onreadystatechange=stateChanged1;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}

function stateChanged()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("notice").innerHTML=xmlhttp.responseText;  
  }
}

function stateChanged1()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("notice1").innerHTML=xmlhttp.responseText;
  }
}
function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}