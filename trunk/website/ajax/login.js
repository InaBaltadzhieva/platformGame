$(function() {	
	$("#submit").click(function(e) {
		e.preventDefault();
		var url = "http://ittalentsapi.bashibozuk.eu/users/login?X-GameID=104";
		var myData = {};

	    myData.username = $('#username').val();
	    myData.password = $('#password').val();
		console.log(myData);	
		
		$.ajax({
			url: url,
			type: "POST",
			data: myData,
			success: function(data) {
				if (data.errors) {
					$('.errors').html('').css("color", "white");
					for(i in data.errors) {
						$('#errors_' + i).html(data.errors[i].join('<br>'));
					}
				} else {
					$('.errors').html('');
					window.location.href = 'home.html';
					data = JSON.stringify(data);
					window.sessionStorage.setItem('myData', data);					
				}
			} 
		});
	});
	
	
});	