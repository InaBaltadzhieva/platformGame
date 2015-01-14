$(function() {
	$("#submit").click(function(e) {
		e.preventDefault();
		var url = "http://ittalentsapi.bashibozuk.eu/users/register?X-GameID=104";
		var myData = {};
			
		myData.email = $('#email').val();
	    myData.username = $('#username').val();
	    myData.password = $('#password').val();
	    myData.password_repeat = $('#password_repeat').val();
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
					alert('You registered successfully!');	
				}
			}
		});
	});
});