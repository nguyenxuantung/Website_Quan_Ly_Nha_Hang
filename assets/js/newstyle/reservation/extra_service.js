    //-----------------------------
    // Extra Service     		//
    // ---------------------------

    // Name:        add_minibar
    // Author:      Membell
    // Time:        00:08 25/04/2014
    // Parameter: 
    // Description: Chuyen sang trang add_minibar
    function add_minibar (){
    	if(reservation_room_id != 0){
    		var url = '?page=minibar_invoice&cmd=add&reservation_room_id='+reservation_room_id;
    		window.location.replace(url);
    	}
    }