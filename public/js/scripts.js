function chooseFile( fileNum ) {
   document.getElementById("inp_file"+fileNum).click();
}


function submitFile( fileNum ) {
	var fileName = document.getElementById("inp_file"+fileNum)

	function reqListener (){
		var response = this.responseText.split('\n');
		alert(response)
		existingFiles()
	}

	var oReq = new XMLHttpRequest()

	oReq.addEventListener("load", reqListener)

	oReq.open('POST', 'upload/file' + fileNum)
	oReq.send(fileName.files[0])
}

function existingFiles(){
	function reqListener(){
		var files = this.responseText.split('\n')
		var fileNums = []

		files.forEach(function(file){
			fileNums.push(file.slice(4,5))
		})

		var allImages = document.getElementsByClassName('uploadedImage')
		

		for(var i = 0; i < allImages.length; i++){
			console.log(allImages[i].id.slice(3,4))
			var indx = fileNums.indexOf(allImages[i].id.slice(3,4))
			var imgNum = parseInt(allImages[i].id.slice(3,4))

			var img = document.getElementById('img' + imgNum)

			if(indx >= 0){
				img.setAttribute('src', 'img/fileExists.png')
			}
			else{
				img.setAttribute('src', 'img/noFile.png')
			}
		}
	}

	var oReq = new XMLHttpRequest();

	oReq.addEventListener('load', reqListener);

	oReq.open('POST', '/files', true);
	oReq.send()
}