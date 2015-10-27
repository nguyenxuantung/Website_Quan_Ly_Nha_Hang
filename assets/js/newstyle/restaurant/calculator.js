var Calculator = {}
jQuery(document).ready(function(){
	//Dom is ready lets get the fun started.

		Calculator = {
		runningTotal : 0,	
		currentVal : '',
		setCurrentVal: false,
		executeAction: '',
		display: 0,
		adjustTotals: function(val){
			// console.log(val);
			if (!this.setCurrentVal) {
				//If this is the first number user has entered then it becomes runningTotal
				//Otherwise it becomes currentVal which will then be used to update runningTotal based on the action picked
				this.runningTotal += val;
			} else {
				//val is a string so we can append to currentVal for multiple digits
				this.currentVal += val;
			};
		},
		add: function(){
			this.runningTotal = parseInt(this.runningTotal) + parseInt(this.currentVal);
		},
		subtract: function() {
			this.runningTotal = parseInt(this.runningTotal) - parseInt(this.currentVal);
		},	
		multiply: function(){
			this.runningTotal = parseInt(this.runningTotal) * parseInt(this.currentVal);
		},
		divide: function(){
			this.runningTotal = parseInt(this.runningTotal) / parseInt(this.currentVal);
		},
		deleteone: function(){  
			try{
				var t = this.runningTotal.replace(/,/g, '/'); 
			}catch(err){
                var t = this.runningTotal;
            }
            this.runningTotal = parseInt( (t - t % 10)/10 ); 
		},
		clear: function(){
			this.runningTotal = 0;
			this.currentVal = '';
			this.executeAction = '';
			this.setCurrentVal = false;
			this.display = '';
		},
		resetCurrentVal: function (){
			this.currentVal = '';
		},
		calculate: function(){
			this.executeAction = '';
			this.currentVal = '';
			return this.runningTotal;
		},
		getAction: function(val){
			 var method = '';
			switch (val) {
				case '+': 
					method = Calculator.add;
					break;
				case '-':
					method = Calculator.subtract;
					break;
				case 'x':
					method = Calculator.multiply;
					break;	
				case '/':
					method = Calculator.divide;
					break;
					
			}

			return method;
		},
		refreshVal: function(){console.log( "this.display "+this.display + "   "+jQuery("#value_VND").val()+" long may tinh" );
			jQuery('#maininput').val( number_format(this.display) );
			update_by_cash(this.display);
		},
		setVal: function(val){
			console.log("this.runningTotal"+this.runningTotal+"   currentVal"+this.currentVal+"   display"+this.display);
			this.runningTotal = val;
			// this.currentVal = val;
			this.display = val;
			this.refreshVal();
			// this.currentVal = '';
			// this.executeAction = '';
			// this.setCurrentVal = false;
			
		},
		setDisplay: function(){console.log("calculate this.runningTotal"+this.runningTotal+"   currentVal"+this.currentVal+"   display"+this.display);
		 
		this.runningTotal = parseInt(this.runningTotal);
			return this.display =  this.currentVal  == '' ?  this.runningTotal  :  this.currentVal ;

		}
	};

	
	var onButtonPress = function (){
		var that = jQuery(this),
			action = that.hasClass('action'),
			instant = that.hasClass('instant'),
			val = that.attr("val");
		if (!action) {
			//No action means the button pressed is a number not an "action"
			Calculator.adjustTotals(val);
		} else if(!instant) { 
			//A action button was pressed. Store the action so it can be executed lator
			if (Calculator.executeAction != ''){
				Calculator.executeAction();
			};

			Calculator.executeAction = Calculator.getAction(val);
			Calculator.setCurrentVal = true;
			Calculator.resetCurrentVal();
		} else {
			//Either = or Clr is clicked. this needs immediate action.
			if (Calculator.executeAction != ''){
				Calculator.executeAction();
			};

			switch (val){
				case 'C': 
					method = Calculator.clear();
					break;
				case '=':
					method = Calculator.calculate();
					break;
				case 'D': 
					method = Calculator.deleteone();
					break;	
			}
		}
// console.log(Calculator.display);
		Calculator.setDisplay();
	}

	var refreshVal = function(){
		jQuery('.calculator input[type=text]').val( number_format(Calculator.display) );
		update_by_cash(Calculator.display);
	}

	jQuery('div.key').click(function(){
		if( !jQuery(this).hasClass("disable") ){
			//We want this to stay as div.keyin the onButtonPress function
			if( !jQuery("#VND").is(':checked') && !jQuery("#CRDVND").is(':checked') ){
				ez_popup("Warning","Bạn phải chọn loại tiền thanh toán <span class='glyphicon glyphicon-usd' aria-hidden='true'></span> hoặc <span class='glyphicon glyphicon-credit-card' aria-hidden='true'></span> ","warning");
			}else{
				onButtonPress.call(this);
				refreshVal();
			} 
		}
	}).mouseenter(function(){
		// onButtonPress.call(this);
		// refreshVal();
	}) ;

	Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
		    c = isNaN(c = Math.abs(c)) ? 2 : c, 
		    d = d == undefined ? "." : d, 
		    t = t == undefined ? "," : t, 
		    s = n < 0 ? "-" : "", 
		    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		    j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
	function resetCalculator(){
		Calculator.clear();
	}
	function number_format(nStr, dec)
	{ 
		dec = 0;
	    var val = parseFloat((""+nStr).replace(/\,/g,""));
	    if (dec)
	        return val.formatMoney(dec);
	    else 
	        return val.formatMoney(0); 
	}
});