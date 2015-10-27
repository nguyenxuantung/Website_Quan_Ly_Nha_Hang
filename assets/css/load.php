    <link href="<?php echo Portal::template('core');?>/css/category.css" rel="stylesheet" type="text/css" />
<link href="skins/default/category.css" rel="stylesheet" type="text/css" />
<link href="assets/css/kendo/gird/styles/examples-offline.css" rel="stylesheet"/>
<link href="assets/css/kendo/gird/styles/kendo.common.min.css" rel="stylesheet"/>
<link href="assets/css/kendo/gird/styles/kendo.default.min.css" rel="stylesheet"/>
<link href="assets/css/kendo/gird/styles/kendo.dataviz.min.css" rel="stylesheet"/>
<link href="assets/css/kendo/gird/styles/kendo.dataviz.default.min.css" rel="stylesheet"/>
<link href="assets/css/bootstrap/bootstrap.min.css" rel="stylesheet"/>
<link href="assets/css/bootstrap/bootstrap.css" rel="stylesheet"/>

 
<script src="assets/js/kendo/gird/angular.min.js"></script>
<script src="assets/js/kendo/gird/kendo.all.min.js"></script> 
<script src="assets/js/kendo/gird/jszip.min.js"></script>

<!--<script id="successTemplate" type="text/x-kendo-template">
                <div class="upload-success">
                    <h5>#= message #</h5>
                </div>
            </script>--!>
<style>


@-webkit-keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotateX(-10deg);
    transform: perspective(400px) rotateX(-10deg);
  }

  70% {
    -webkit-transform: perspective(400px) rotateX(10deg);
    transform: perspective(400px) rotateX(10deg);
  }

  100% {
    -webkit-transform: perspective(400px) rotateX(0deg);
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }
}

@keyframes flipInX {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    -ms-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotateX(-10deg);
    -ms-transform: perspective(400px) rotateX(-10deg);
    transform: perspective(400px) rotateX(-10deg);
  }

  70% {
    -webkit-transform: perspective(400px) rotateX(10deg);
    -ms-transform: perspective(400px) rotateX(10deg);
    transform: perspective(400px) rotateX(10deg);
  }

  100% {
    -webkit-transform: perspective(400px) rotateX(0deg);
    -ms-transform: perspective(400px) rotateX(0deg);
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }
}

.flipInX {
  -webkit-backface-visibility: visible !important;
  -ms-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
  -webkit-animation: flipInX 0.3s alternate 0s;
}

@-webkit-keyframes flipOutX {
  0% {
    -webkit-transform: perspective(400px) rotateX(0deg);
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }

  100% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
}

@keyframes flipOutX {
  0% {
    -webkit-transform: perspective(400px) rotateX(0deg);
    -ms-transform: perspective(400px) rotateX(0deg);
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }

  100% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    -ms-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
}

.flipOutX {
  opacity: 0;
  -webkit-animation-name: flipOutX;
  animation-name: flipOutX;
  -webkit-backface-visibility: visible !important;
  -ms-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation: flipOutX 0.3s alternate 0s;
}
.alert-success {
	color: #472104 !important;
	background-color: rgba(0, 255, 0, .8) !important;
	border-color: #d6e9c6;
    vertical-align: middle;
}
.k-header, .k-grid-header-wrap, .k-grid .k-grouping-header, .k-grid-header, .k-pager-wrap, .k-pager-wrap .k-textbox, .k-pager-wrap .k-link, .k-grouping-header .k-group-indicator, .k-gantt-toolbar .k-state-default{
    background-color:#B4D1E6;

}
a, a:visited{
        color: black;
        text-decoration: none;
}
.k-tooltip{
    position: fixed;
}
/*.k-notification {
                    border: 0;
                }
                /* Success template */
/*.k-notification-upload-success.k-group {
                    background: #46629E;
                    color: #fff;
                  	opacity: 0.3;
                }
.upload-success {
                    width: 300px;
                    height: 50px;
                    padding: 17px 0 0 100px;
                }
.upload-success h5 {
                    color: #fff;
                    font-size: 1.3em;
                    font-style: italic;
                    font-weight: bold;
                    font-family: Arial, Helvetica, sans-serif;
                    vertical-align: middle;
                }*/
                
/*td.captain_location{ position: relative;  }
td.captain_location:hover:before{ display:block; }
td.captain_location:before{ content:"Bạn phải chọn nhà hàng trước !!";display:none;    position: absolute;      bottom: -100%; }*/

</style>

<?php System::set_page_title(HOTEL_NAME.' - '.Portal::language('title')); ?>
<div id="cuc-error" style="display: none; position: absolute; width: 30%; height: 40px; line-height: 40px; top: 40%; left:30%; z-index: 9999;">
	</div>
<table cellpadding="15" cellspacing="0" width="100%" border="0" bordercolor="#CCCCCC" class="table-bound">
	<tr>
		<td width="55%" class="form-title">[[.manage_bar_table.]]</td><br />
    </tr>
  </table>
 
<div id="grid" >
    <!--<span id="notification" style="display:none;"></span>--!>
    <div id="div_toolbar" style="width: 100%; height: 0px;position: absolute;z-index: 1;top: 0px;"></div>
    <div id="div_header" style="width: 100%; height: 0px;position: absolute;z-index: 111;top: 7%;"></div>
    <div id="div_pager" style="width: 100%; height: 0px;position: absolute;z-index: 1;bottom: 0px;"></div>
</div> 
<script>

jQuery(document).ready(function() {
           /*var notification = jQuery("#notification").kendoNotification({
                        position: {
                            top: 130,
                            right: Math.floor(jQuery(window).width()/2-150)
                        },
                        autoHideAfter:2000,
                        stacking: "down",
                        templates: [ {
                            type: "upload-success",
                            template: jQuery("#successTemplate").html()
                        }]

                    }).data("kendoNotification");*/
                     
          dataSource = new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: "/?page=restaurant_table&cmd=loaddata",
                                    dataType: "json"
                                },
                                update: {
                                    url: "/?page=restaurant_table&cmd=edit",
                                    dataType: "json",
                                    complete: function(data, status){
                                        event_cancel_add_edit();
                                        var captain = JSON.parse(data.responseText);
                                        console.log(captain);
                                        var error = captain[0];
                                        if(error === 1){
                                          table = captain[1];
                                          var noti = '[[.table_xxx_exists.]]';
                                          message('success',noti.replace('xxx',table),jQuery("#cuc-error"));
                                          jQuery('#grid').data('kendoGrid').dataSource.read();  
                                        }else{
                                        var noti = '[[.update_table_xxx_success.]]';
                                        message('success',noti.replace('xxx',captain[0]['name']),jQuery("#cuc-error"));
                                        }
                                       },
                                    
                                    },
                                destroy: {  
                                    url: "/?page=restaurant_table&cmd=delete",
                                    dataType: "json",
                                    complete: function(data, status) {
                                        var captain = JSON.parse(data.responseText);
                                        var noti = '[[.delete_table_xxx_successfull.]]';
                                        message('success',noti.replace('xxx',captain[0]['name']),jQuery("#cuc-error"));
                                        /*notification.show({
                                                message: "[[.delete_table_xxx_success.]]"
                                            }, "upload-success");*/
                                        },
                                },
                                create: {
                                    url: "/?page=restaurant_table&cmd=add",
                                    dataType: "json",
                                    complete: function(data, status) {
                                        event_cancel_add_edit();
                                        var captain = JSON.parse(data.responseText);
                                        console.log(captain);
                                        var error = captain[0];
                                        if(error === 1){
                                          table = captain[1];
                                          alert('[[.xxx_exists.]]');
                                          var noti = '[[.table_xxx_exists.]]';
                                          message('success',noti.replace('xxx',table),jQuery("#cuc-error"));
                                          jQuery('#grid').data('kendoGrid').dataSource.read();  
                                        }else{
                                          var noti = '[[.add_table_xxx_success.]]';
                                          message('success',noti.replace('xxx',captain['name']),jQuery("#cuc-error"));  
                                        }
                                        },
                                    },
                                
                                parameterMap: function (options, operation) {
                                    if (operation !== "read" && options.models) {
                                        return { models: kendo.stringify(options.models) };
                                    }
                                }
                            },
                            change: function(e){
                                if(e.action === "sync"){
                                    event_cancel_add_edit();
                                }
                                if (e.action === "add") {
                                    var newItem = e.items[0];
                                    
                                    if (this.filter() !== undefined && this.filter() !== null) {
                                        var filter = this.filter().filters;
                                        var i = filter.length;
                                        while (i--) {
                                            filterValue = filter[i].value;
                                            filterField = filter[i].field;
                                            switch (filterField) {
                                                case "code":
                                                    newItem.set("code",filterValue);
                                                    break;
                                                case "name":
                                                    newItem.set("name",filterValue);
                                                    break;
                                                case "num_people":
                                                    newItem.set("num_people",filterValue);
                                                    break;
                                                case "bar_id.id":
                                                    newItem.set("bar_id.id",filterValue);
                                                    break;
                                                case "location_id.id":
                                                    newItem.set("location_id.id",filterValue);
                                                    break;
                                            }
                                        }
                                    }
                                }  
                            },
                            batch: true,
                            pageSize: 10,    
                            schema: { 
                                model: 
                                    { id: "id",
                                        fields: {
                                            id: { editable: false, nullable: true },
                                            code: {
                                                validation:{
                                                    required: { message:"Mã không được để trống !" },
                                                    x: function(input){
                                                        if(input.is("[name='code']") && input.val().length > 255){
                                                            input.attr("data-x-msg","Mã không được vượt quá 255 kí tự !");
                                                            return false;
                                                        }
                                                        if (input.is("[name='code']") && input.val().match(/^\S+$/) === null){
                                                            input.attr("data-x-msg", "Mã không được chứa khoảng trắng !");
                                                            return false;
                                                        }  
                                                            return true;
                                                    },
                                                    
                                                }
                                            },
                                            name: {
                                                validation:{
                                                    required: { message:"Tên không được để trống !" },
                                                    y: function(input){
                                                        if(input.is("[name='name']") && input.val().length > 255){
                                                            input.attr("data-y-msg","Tên không được vượt quá 255 kí tự !");
                                                            return false;
                                                        }  
                                                            return true;
                                                    },
                                                    
                                                }
                                            },
                                            num_people:{ 
                                                type: "number", 
                                                validation: {
                                                        required: {message:"Hãy nhập số lượng !"},
                                                        z: function(input){
                                                           if (input.is("[name='num_people']") && input.val().length > 3) {
                                                            input.attr("data-z-msg", "Số lượng người không được vượt quá 3 số !");
                                                            return false;
                                                            }
                                                            return true; 
                                                         },
                                                       } 
                                                    },
                                            bar_id: {defaultValue: {id: '',name: ''},validation: {required: { message: "Bạn phải chọn nhà hàng !"}}},
                                            location_id: {defaultValue: {id: '',name: ''},validation: {required: { message: "Bạn phải chọn khu vực !"}}}, 
                                                }
                                            }
                                    },
                  });
                  
        var grid = jQuery("#grid").kendoGrid({   
            dataSource: dataSource,
            batch: true,
            filterable:{
                extra: false,
                operators: {
                  string: {
                      startswith: "[[.starts_with.]]",
                      eq: "[[.is_equal_to.]]",
                      neq: "[[.is_not_equal_to.]]",
                      contains:"[[.contains.]]",
                      doesnotcontain:"[[.does_not_contain.]]",
                      endswith:"[[.end_swith.]]"
                  }
              }
            },
          scrollable: true,
          columnMenu: {extra: true},    
          height: 490,
          sortable: true,
          groupable: false,  
          allowCopy: false,
          pageable: {buttonCount: 5},
          resizable: true,
          selectable: "single",
          reorderable: false,
          toolbar: [{name:"Excels", text:"[[.export_to_excel.]]"}
          <?php if(User::can_add(false,ANY_CATEGORY)){?> 
                    ,{name:"create", text: "[[.add_new.]]"}
                    <?php if(User::can_edit(false,ANY_CATEGORY)){}else{?>
                      ,{ name: "save", text: "[[.Save.]]" }
                      ,{ name: "cancel", text: "[[.Cancel.]]" }
                    <?php }?>
                    
          <?php }?>
          <?php if(User::can_view(false,ANY_CATEGORY)){?>
                               ,{name:"refesh", text: "[[.Refesh.]]"}
                              <?php }?>
                    ],
          
          dataBound: resetRowNumber,
          columns: [
                    {
                        title: "[[.order_number.]]",
                        attributes: {"style": "text-align: center"},
                        width:60,
                        template: "#= renderNumber(data) #"
                    },
                    {
                        field: "code",
                        title: "[[.code.]]" ,
                        attributes: {"style": "text-align: left; margin: 10px;"} 
                    },
                    {
                        field: "name",
                        title: "[[.name.]]",
                        attributes: {"style": "text-align: left"}
                    },
                    { field: "num_people", title: "[[.no_of_people.]]" },
                    {
                        field: "bar_id",
                        title: "[[.bar_name.]]",
                        filterable: {
                            extra:false,
                            field: "bar_id.id",
                            ui: function(element) {
                                element.kendoDropDownList(
                                {
                                    optionLabel: "--[[.select_a_bar.]]--",
                                    dataTextField: "name", 
                                    dataValueField: "id",
                                    dataSource: 
                                            {   transport:
                                                {   read:
                                                    {   url: "/?page=restaurant_table&cmd=data_bar",
                                                        type: "POST",
                                                        dataType: "json",
                                                        contentType: "application/json; charset=utf-8",
                                                    },
                                                    schema:
                                                    {   model:  kendo.data.Model.define(
                                                        {   
                                                            id: "id",
                                                            name: "name"
                                                            
                                                        })
                                                    },
                                                    error: function(e)
                                                    {   console.log('Datasource error: ' + JSON.stringify(e));
                                                    }
                                                }
                                            },
                                        filter: "startswith",
                                        suggest:true
                                });
                                console.log(dataSource);
                                }
                            },
                        attributes: {"style": "text-align: left"},
                        editor: Bar_DropDownEditor,
                        template: "#=bar_id.name#"
                    },
                    {
                        field: "location_id",
                        title: "[[.Location.]]",
                        attributes: {"class":"captain_location",style: "text-align: left"},
                        filterable: {
                            extra:false,
                            field: "location_id.id",
                            ui: function(element) {
                                element.kendoDropDownList(
                                {
                                    optionLabel: "--[[.select_a_location.]]--",
                                    dataTextField: "name", 
                                    dataValueField: "id",
                                    dataSource: 
                                            {   transport:
                                                {   read:
                                                    {   url: "/?page=restaurant_table&cmd=data_location",
                                                        type: "POST",
                                                        dataType: "json",
                                                        contentType: "application/json; charset=utf-8",
                                                    },
                                                    schema:
                                                    {   model:  kendo.data.Model.define(
                                                        {   
                                                            id: "id",
                                                            name: "name"
                                                        })
                                                    },
                                                    error: function(e)
                                                    {   console.log('Datasource error: ' + JSON.stringify(e));
                                                    }
                                                }
                                            },
                                            filter: "startswith",
                                            suggest:true
                                    
                                });console.log(dataSource);
                                }
                            },
                        editor: Location_DropDownEditor, template: "#=location_id.name#"
                    },
                    { command: 
                    [
                        <?php if(User::can_edit(false,ANY_CATEGORY)){?>{name:"edit",text: {edit:"[[.Edit.]]", update:"[[.Update.]]", cancel:"[[.Cancel.]]"}}<?php }?> ,
                        <?php if(User::can_delete(false,ANY_CATEGORY)){?>{name:"destroy", text:"[[.Delete.]]"}<?php }?> 
                    ],
                    title: "&nbsp;", width: "200px", attributes: {"style": "text-align:center"}
                    },
                   ],
                editable:{
                        mode: "inline",
                        confirmation: function(e) {
                        return "[[.confirm_delete.]]: "+e.name+ "?";
                                            }
                },
                cancel:function(e){
                        rowNumber = e.container[0].children[0].innerText-1;
                        event_cancel_add_edit();
                },
                edit: function(e){
                        event_click_add_edit();
                        var location = jQuery("#location_id").data("kendoDropDownList");
                        var bar = e.model.bar_id.id;
                        location.dataSource.filter({
                                  field: "bar_id",
                                  value: bar,
                                  operator: "eq",
                            });
                        location.enable(true);
                        location.dataSource.read();
                            
                        if(e.model.isNew()===false){
                            document.getElementById("div_toolbar").style.height = "7%";
                            document.getElementById("div_header").style.height = "7%";
                            document.getElementById("div_pager").style.height = "8%";    
                        }
                              },
                
                
      }).data('kendoGrid');
      jQuery('#grid .k-grid-add').click(function() {
            document.getElementById("div_toolbar").style.height = "7%";
            document.getElementById("div_header").style.height = "7%";
            document.getElementById("div_pager").style.height = "78%";
            grid.dataSource.sort([]);
            rowNumber = 0;
        });
        function event_click_add_edit(){
            jQuery(".k-grid-refesh", "#grid").attr("disabled",true);
            jQuery(".k-grid-Excels", "#grid").attr("disabled",true);
            jQuery(".k-grid-pager", "#grid").attr("disabled",true);
            jQuery(".k-grid-add", "#grid").attr("disabled",true);
        }
        
        function event_cancel_add_edit(){
            jQuery(".k-grid-refesh", "#grid").attr("disabled",false);
            jQuery(".k-grid-Excels", "#grid").attr("disabled",false);
            jQuery(".k-grid-pager", "#grid").attr("disabled",false);
            jQuery(".k-grid-add", "#grid").attr("disabled",false);
            
            document.getElementById("div_toolbar").style.height = "0%";
            document.getElementById("div_header").style.height = "0%";
            document.getElementById("div_pager").style.height = "0%";
                } 
     
        jQuery('#grid .k-grid-refesh').click(function()
        {       
                dataSource.filter([]);
                dataSource.sort([]);
                dataSource.read();
        });
       
        jQuery('#grid .k-grid-Excels').click(function()
            {
                                    var rows = [{
                                    cells: [
                                      { value: "[[.code.]]" },
                                      { value: "[[.name.]]" },
                                      { value: "[[.no_of_people.]]" },
                                      { value: "[[.bar_name.]]" },
                                      { value: "[[.Location.]]" }
                                    ]
                                  }];
                            
                                  //using fetch, so we can process the data when the request is successfully completed
                                  dataSource.fetch(function(){
                                    var data = this.data();
                                    var data_size = data.length;
                                    for (var i = 0; i < data.length; i++){
                                      //push single row for every record
                                      rows.push({
                                        cells: [
                                          { value: data[i].code },
                                          { value: data[i].name },
                                          { value: data[i].num_people },
                                          { value: data[i].bar_id['name'] },
                                          { value: data[i].location_id['name'] }
                                        ]
                                      }) 
                                    }
                                    var workbook = new kendo.ooxml.Workbook({
                                      sheets: [
                                        {
                                          columns: [
                                            { width: 100 },
                                            { width: 100 },
                                            { width: 80 },
                                            { width: 140 },
                                            { width: 140 }
                                          ],
                                          title: "[[.export_to_excel.]]",
                                          rows: rows
                                        }
                                      ]
                                    });
                                    //save the file as Excel file with extension xlsx
                                    kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "List bar table.xlsx"});
                                  }); 
                    });
  });
  
    var rowNumber = 0; 
    function resetRowNumber(e) 
    {  
        rowNumber = 0;  
    }  
  
    function renderNumber(data) 
    {  
        return ++rowNumber;  
    }
    
    function Bar_DropDownEditor(container,options) {
    jQuery('<input id="'+ options.field +'" required data-text-field="name" data-value-field="id" data-bind="value:'+ options.field +'" name="'+ options.field +'" title="Bạn chưa chọn tên nhà hàng"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "name", 
                dataValueField: "id",
                optionLabel: "--[[.select_a_bar.]]--",
                dataSource: 
                        {  
                            transport:
                            {   read:
                                {   url: "/?page=restaurant_table&cmd=data_bar",
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                },
                                schema:
                                {   model:  kendo.data.Model.define(
                                    {   
                                        id: "id",
                                        name:"name"
                                    })
                                },
                                error: function(e)
                                {   
                                    console.log('Datasource error: ' + JSON.stringify(e));
                                }
                            } 
                        },
                change: function(e)
                        {
                            var location = jQuery("#location_id").data("kendoDropDownList");
                            console.log(location.dataSource);
                            location.dataSource.filter({
                                  field: "bar_id",
                                  value: this.value(),
                                  operator: "eq",
                            });
                            location.enable(true);
                            location.dataSource.read();
                            location.value(0);
                        },
                 filter: "startswith",
                 suggest:true
                       }).data("kendoDropDownList");
  } 
   function Location_DropDownEditor(container,options) {
    jQuery('<input id="'+options.field +'" required data-text-field="name" data-value-field="id" data-bind="value:'+ options.field +'" name="'+ options.field +'" title="Bạn chưa chọn tên khu vực"/>')
            .appendTo(container)
            .kendoDropDownList({
                optionLabel: "--[[.select_a_location.]]--",
                dataTextField: "name", 
                dataValueField: "id",
                dataSource: 
                        { 
                            transport:
                            {   read:
                                {   url: "/?page=restaurant_table&cmd=data_location",
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                },
                                schema:
                                {   model:  kendo.data.Model.define(
                                    {   
                                        id: "id",
                                        name: "name",
                                        bar_id: "bar_id"   
                                    })
                                },
                                error: function(e)
                                {   console.log('Datasource error: ' + JSON.stringify(e));
                                }
                            }
                        },
                enable: false,
                filter: "startswith",
                suggest:true
            }).data("kendoDropDownList");
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
        case 'success':
            var mmessage = '<div class="alert  alert-success flipInX">'
                    + '<a class="close" data-dismiss="alert">×</a>'
                    + '<strong>[[.alert.]]:</strong>'
                    + ' ' + messagei
                    + '</div>';
            localStorage.stmessage = 0;
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

    
<?php if(User::can_add(false,ANY_CATEGORY)){if(User::can_edit(false,ANY_CATEGORY)){}else{?>
  jQuery(document).ready(function() {
        jQuery('#grid .k-grid-save-changes').each(function() 
            {
            this.style.display='none';
            })
        jQuery('#grid .k-grid-cancel-changes').each(function() 
            {
            this.style.display='none';
            })
        jQuery('#grid .k-grid-add').click(function() 
            {
            jQuery(".k-grid-save-changes", "#grid").show();
            jQuery(".k-grid-cancel-changes", "#grid").show();
            })
        jQuery('#grid .k-grid-save-changes').click(function() 
            {
            jQuery(".k-grid-save-changes", "#grid").hide();
            jQuery(".k-grid-cancel-changes", "#grid").hide();
            })
});
<?php }}?>
</script>