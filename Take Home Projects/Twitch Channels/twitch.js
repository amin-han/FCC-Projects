var usersList = ["ESL_SC2", "MedryBW","Habathcx","RobotCaleb", "FreeCodeCamp"];

var allUsers = [];
var onlineUsers = [];
var offlineUsers = [];

var twitchEndpt = 'https://api.twitch.tv/kraken/';
var cid = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';

$(document).ready(function() {	
	getAllUsers();
	
	$('.options').click(function(event){
		$('.selected').removeClass('selected');
		$(event.currentTarget).addClass('selected');
	});
	
	$('#online').click(function(event) {
		addAllToList(onlineUsers);
	});
	
	$('#offline').click(function(event) {
		addAllToList(offlineUsers);
	});
	
	$('#all').click(function(event) {
		addAllToList(allUsers);
	});
	
	//Search functionality using filter
	$('#searchbox').keyup(function(){
		var input = $('#searchbox').val().toLowerCase();
		console.log('Keyup: ' + input);
		
		if(!input) {
			$('.user').show();
		}
		else {
			$('.user').filter(function() {
				return $(this).children('h1').text().toLowerCase().indexOf(input) === -1;
			}).hide();
		}
	});
});

function getAllUsers() {
	for(var user in usersList) {
		var currentUser = usersList[user];
		$.when(getName(currentUser), getStatus(currentUser))
			.done(function(result1, result2) {
			var nameResult = result1[0];
			var statusResult = result2[0];
			
			var userUrl = 'https://www.twitch.tv/' + nameResult['display_name'];
			var imgUrl = nameResult['logo'] || 'http://placehold.it/50x50';
			var onlineStatusClass = 'gray-border';
			var name = nameResult['display_name'];
			var statusMsg = 'Offline';
			if(statusResult['stream']) {
				onlineStatusClass = 'green-border';
				statusMsg = statusResult['stream']['channel']['status'];
			}
			
			var userObj = {
				'name': name,
				'logo': imgUrl,
				'message': statusMsg,
				'onlineClass': onlineStatusClass,
				'streamUrl': userUrl
			};
			
			allUsers.push(userObj);
			if(statusResult['stream'])
				onlineUsers.push(userObj);
			else
				offlineUsers.push(userObj);
			addToList(userUrl, imgUrl, onlineStatusClass, name, statusMsg);
		});
	}
}

function getName(user) {
	return $.getJSON(twitchEndpt + 'users/' + user + cid);
}

function getStatus(user) {
		return $.getJSON(twitchEndpt + 'streams/' + user + cid);
}

function addAllToList(list) {
	$('.user-list').empty();
		//Start from the end so that the online users appear first
	for(var i = list.length - 1; i >= 0; i--) {
		var currUsr = list[i];
		addToList(currUsr['streamUrl'], currUsr['logo'], currUsr['onlineClass'], currUsr['name'], currUsr['message']);
	}
}

function addToList(streamUrl, imgUrl, onlineStatus, username, status) {
	$('.user-list').append("<a href='" + streamUrl + "' target='_blank'><li class='user'><img class='user-img " + onlineStatus + "' src=" + imgUrl + "><h1>" + username + "</h1><p class='user-txt'>" + status + "</p></li></a>");	
}
