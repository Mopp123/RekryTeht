
function onClick_switchTo_login() {
	console.log("Switching to login");
}


function onClick_switchTo_signup() {
	console.log("Switching to sign up");
}

/*
function reqTest() {
	const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		console.log("Req completed!");
	}

	xhr.open('POST', '/myapi/', true);
	xhr.setRequestHeader("content-type", "application/json");
	let body = '{ "message":"vittusaatana" }'
	console.log("sending: " + body);
	xhr.send(body);
}
*/

function sendReq_signUp(username, organization, password) {
	const xhr = new XMLHttpRequest();
	
	console.log("Attempting to sing up");

	// On response func..
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log("Sign up response was acquired!");
			console.log(xhr.response);
			let responseData = JSON.parse(xhr.response);
			if(responseData['message'] == "success") {
				sendReq_login(username, password);
			}
		}
	}

	
	xhr.open("POST", "/users/createNew/", true);
	xhr.setRequestHeader("content-type", "application/json");
	let body = '{"username":"' + username + '", "organization":"' + organization + '", "password":"' + password + '"}';
	

	console.log("sending: " + body);
	xhr.send(body);
	
}


function sendReq_login(username, password) {
	const xhr = new XMLHttpRequest();
	
	let infoText = document.getElementById("id_debugInfo");
	// Reset prev info text
	infoText.innerHTML = "Logging in...";

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log("login response was acquired!");
			
			// Attempt to parse response as json
			let responseData = JSON.parse(xhr.response);
			console.log(responseData);
			if(responseData['message'] === "success") {
				
				// Switch to "main page"
				window.location.href = "main.html";
			}else{
				infoText.innerHTML = "Failed to login";
			}

		}
	}

	
	xhr.open("POST", "/users/login/", true);
	xhr.setRequestHeader("content-type", "application/json");
	let body = '{"username":"' + username + '", "password":"' + password + '"}';
	

	console.log("sending: " + body);
	xhr.send(body);
	
}


function sendReq_logout() {
	const xhr = new XMLHttpRequest();
	
	let infoText = document.getElementById("id_debugInfo");
	// Reset prev info text
	infoText.innerHTML = "Logging out...";

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			
			// Attempt to parse response as json
			let responseData = JSON.parse(xhr.response);
			console.log(responseData);
			if(responseData['message'] === "success") {
				
				// Switch back to index
				window.location.href = "index.html";
			}else{
				infoText.innerHTML = "Failed to logout.. wtf!!?!?! shouldnt be possible xD";
			}

		}
	}

	xhr.open("POST", "/users/logout/", true);
	xhr.send();
	
}
