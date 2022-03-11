
class FileData {
	
	constructor(name) {
		this.name = name;
	}
}



var fileList = document.getElementById("id_fileListing");
function addFileToListing(fileData) {
	
	let newNode = document.createElement("li");
	let newLinkNode = document.createElement("a");
	newLinkNode.setAttribute("href","#");

	let newTxtNode = document.createTextNode(fileData.name);
	

	newLinkNode.appendChild(newTxtNode);
	newNode.appendChild(newLinkNode);

	fileList.appendChild(newNode);
}

function clearFileListing() {
	while (fileList.firstChild) {
    		fileList.removeChild(fileList.lastChild);
  	}
}

// Exec immediately on search..
sendReq_getFileListing();
