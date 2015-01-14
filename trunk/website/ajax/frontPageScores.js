$(function() {
	var url = 'http://ittalentsapi.bashibozuk.eu/game?X-GameID=104&expand=user&page=1&per-page=10&sortField=score&sortDirection=DESC';	
	$.ajax(url, {
		method: 'GET',
		crossDomain: true,
		dataType: 'json',		
		success: function(data) {
			var table = '<thead>\
								<th> Rang </th>\
								<th> Player </th>\
								<th> Score </th>\
							</thead>\
							<tbody>';
			$(data).each(function(i, val) {	
				table += '<tr>';
				console.log(val);
					table += '<td>' + (i + 1) + '</td>';
					table += '<td>' + val.user.username + '</td>';
					table += '<td>' + val.score + '</td>';
				table += '</tr>';
			});
			table += '</tbody>';
			$('#left-container').html(table);			
			console.log(data);
		}
	});	
});