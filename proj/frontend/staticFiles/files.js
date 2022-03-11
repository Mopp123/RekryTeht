
class FileData {
	
	constructor(name, url) {
		this.name = name;
		this.url = url;

		console.log(this.url);
	}
}




var fileList = document.getElementById("id_fileListing");
function addFileToListing(fileData) {
	
	let newNode = document.createElement("li");
	let newLinkNode = document.createElement("a");
	//newLinkNode.setAttribute("href",'javascript:sendReq_getFile("' + fileData.name + '")');
	newLinkNode.setAttribute("href", fileData.url);
	newLinkNode.setAttribute("download", fileData.name);
	//newLinkNode.setAttribute("onclick", 'window.location.href=../../uploads/' + fileData.name);

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
