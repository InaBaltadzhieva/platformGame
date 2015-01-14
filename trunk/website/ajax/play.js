$(function() {
	var data = window.sessionStorage.getItem('myData');
    if (!data) {
        window.location = '../website/login.html';
    } else {
    	data = JSON.parse(data);
    	console.log(data);	   	    	
    	var url = 'http://ittalentsapi.bashibozuk.eu/game/game-start?user_id='+data.id+'&X-GameID=104';
    	$.ajax(url, {
			method: 'GET',
			crossDomain : true,
			success: function(data) {
				console.log(data);
				preloader(data.id);
			}
		});	
	   
    }
});