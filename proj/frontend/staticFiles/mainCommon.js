
function onClick_switchTo_login() {
	console.log("Switching to login");
}


function onClick_switchTo_signup() {
	console.log("Switching to sign up");
}

function setInfoText(txt) {
	let infoText = document.getElementById("id_debugInfo");
	infoText.innerHTML = txt;
}



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
	
	setInfoText("Logging in...");

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			console.log("login response was acquired!");
			
			// Attempt to parse response as json
			let responseData = JSON.parse(xhr.response);
			console.log(responseData);
			if(responseData['message'] === "success") {
				setCookie("username", username, 1);
				// Switch to "main page"
				window.location.href = "main.html";	
			}else{
				setInfoText("Failed to login");
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
	
	setInfoText("Logging out...");

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			
			// Attempt to parse response as json
			let responseData = JSON.parse(xhr.response);
			console.log(responseData);
			if(responseData['message'] === "success") {
				
				// Switch back to index
				window.location.href = "index.html";
			}else{
				setInfoText("Failed to logout.. wtf!!?!?! shouldnt be possible xD");
			}

		}
	}

	xhr.open("POST", "/users/logout/", true);
	xhr.send();
	
}


function sendReq_uploadFile(file) {
	let xhr = new XMLHttpRequest();
	
	setInfoText("Attempting to upload file...");
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			sendReq_getFileListing();
		}
	}

	let formData = new FormData();
	formData.append("file", file);

	xhr.open("POST", "/files/upload/", true);
	xhr.send(formData);	
}

// Requests ALL uploads
function sendReq_getFileListing() {
	let xhr = new XMLHttpRequest();
	
	setInfoText("Getting uploads...");
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4){
			setInfoText("");
			
			let responseData = JSON.parse(xhr.response);
			clearFileListing();
			// Add each acquired file data to listing
			for(let key in responseData) {
				console.log(key);
				f = new FileData(String(key));
				addFileToListing(f);
			}
		}
	}

	xhr.open("POST", "/files/getListing/", true);
	xhr.send();	
}

function sendReq_getFile(name) {
	let xhr = new XMLHttpRequest();
	
	setInfoText("Attempting to download file...");
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4){
			setInfoText("");
			
			let responseData = JSON.parse(xhr.response);
			console.log(responseData);	
		}
	}

	xhr.open("POST", "/files/get/", true);
	xhr.send('{"filename:"' + name + '"}');
}
