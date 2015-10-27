var
transactionList = [];
grid = {
	numberOfDay:15,
	width:1000,
	height:700,
	roomList: {
		roomType1: {
			room_101: {
				name:101,
				status:0
			},
			room_102: {
				name:102,
				status:1
			}		
		},
		roomType2: {room_101: {
				name:201,
				status:0
			},
			room_102: {
				name:202,
				status:1
			}},
		roomType3: {room_101: {
				name:301,
				status:0
			},
			room_102: {
				name:302,
				status:1
			}}		
	}
};
function createGrid(parentId, numberOfDay, width, height) {
	
}
function addTransaction(startDate, endDate, roomId) {
}
function removeTransaction(transID) {
}
function editTransaction(transID, startDate, endDate, roomId) {
}
