function chooseFile( fileNum ) {
   document.getElementById("inp_file"+fileNum).click();
}


function submitFile( fileNum ) {
		var fileName = document.getElementById("inp_file"+fileNum)
		console.log(fileName.value);
}