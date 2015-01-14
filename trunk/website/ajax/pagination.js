$(function() {
	var url = 'http://ittalentsapi.bashibozuk.eu/game?X-GameID=104&expand=user&page=1&per-page=50&sortField=score&sortDirection=DESC';
	$.ajax(url, {
		method: 'GET',
		crossDomain : true,
		success: function(data,request) {
			console.log(arguments[2].getAllResponseHeaders());
			var string = '';
			for(var i=1;i<=10;i++) {
				//console.log(data[i-1].user.username);
				string+='<div class="player_row"><span class="player_numh">'+i+'</span><span class="player_nameh">'+data[i-1].user.username+'</span><span class="player_scoreh">'+data[i-1].score+'</span></div>';
			}
			$('.highscore_list').html(string);
			string = '';
			for(var i=1;i<=data.length/10+1;i++) {
				string+="<a class='numbers' id='"+i+"' href='#'>"+i+"</a>";
			}
			$('#menu_hs').html(string);
			$('.numbers').click(function(event) {
				event.preventDefault();
				var that=this;
				url = 'http://ittalentsapi.bashibozuk.eu/game?X-GameID=104&expand=user&page='+this.id+'&per-page=10&sortField=score&sortDirection=DESC';
				$.ajax(url, {
					method: 'GET',
					crossDomain : true,
					success: function(data) {
						var string = '';
						for(var i=0;i<data.length;i++) {
							string+='<div class="player_row"><span class="player_numh">'+((i+1)+10*(that.id-1))+'</span><span class="player_nameh">'+data[i].user.username+'</span><span class="player_scoreh">'+data[i].score+'</span></div>';
						}
						console.log(string)
						$('.highscore_list').html(string);
					}});
			});
		}
	});		
});