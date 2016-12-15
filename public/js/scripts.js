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

function nthMostCommon(string, ammount) {
    var wordsArray = string
    var wordOccurrences = {}
    for (var i = 0; i < wordsArray.length; i++) {
        wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
    }
    var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
        /* you may want to include a binary search here */
        for (var i = 0; i < ammount; i++) {
            if (!acc[i]) {
                acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                break;
            } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                if (acc.length > ammount)
                    acc.pop();
                break;
            }
        }
        return acc;
    }, []);
    return result;
}

function editFileMets(text){
	// console.log(text)
	var wrdCnt = document.getElementById('wordCount')
	var words = text.split(/\s+/)
	var spanWords = words
	words = words.filter(function(e){return e !== '-' && e !== '--' && e !== '...' && e !== ';' && e !== '='})
	console.log(words)
	wrdCnt.innerText = ''
	wrdCnt.innerText = words.length-1

	var sntCnt = document.getElementById('sentCount')
	var sent = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
	
	sntCnt.innerText = ''
	sntCnt.innerText = sent.length
	// console.log(sent)

	var com = document.getElementById('commonWord')
	var mostCommon = nthMostCommon(words,1)
	console.log(mostCommon[0].word)
	com.innerText = mostCommon[0].word
}


function displayFile( event ){
	var hashedFile = location.hash
	var fileName = hashedFile.slice(1,10)

	if(hashedFile != ''){
		function reqListener(){
			var fileText = this.responseText
			var doc = document.getElementById('doc')

			doc.innerText = ''

			doc.innerText = fileText
			if(fileText == ''){
				doc.innerText = ''
				doc.innerText = 'You have not uploaded that file yet!'
				var wrdCnt = document.getElementById('wordCount')
				var sntCnt = document.getElementById('sentCount')
				var com = document.getElementById('commonWord')

				wrdCnt.innerText = ''
				sntCnt.innerText = ''
				com.innerText = ''
			}
			else{
				editFileMets(fileText)
			}
		}

		var oReq = new XMLHttpRequest()

		oReq.addEventListener('load', reqListener)
		oReq.open('GET', '/'+fileName, true)
		oReq.send()
	}
	else{
		doc.innerText = ''
		doc.innerText = 'Please select a file on the left to analyze!'
		var wrdCnt = document.getElementById('wordCount')
		var sntCnt = document.getElementById('sentCount')
		var com = document.getElementById('commonWord')

		wrdCnt.innerText = ''
		sntCnt.innerText = ''
		com.innerText = ''
	}
	
}

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}


function selectInit(){
	$(".clickable").click(function(e){
    s = window.getSelection();
    var range = s.getRangeAt(0);
    var node = s.anchorNode;
    try{
    	while(range.toString().indexOf(' ') != 0) {                 
        range.setStart(node,(range.startOffset -1));
      }
      range.setStart(node, range.startOffset +1);
      do{
        range.setEnd(node,range.endOffset + 1);

      }while(range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
      var str = range.toString().trim();

      var doc = document.getElementById('doc')
      var text = doc.innerText.replace(/\;/g,'').replace(/\:/g,'').replace(/\=/g,' ').replace(/\-/g,' ').replace(/\./g,'').replace(/\,/g,'').replace(/\?/g, '')
      var words = text.split(/\s+/)

      var strLower = str.toLowerCase()

      strLower = strLower.replace(/\;/g,'').replace(/\:/g,'').replace(/\=/g,' ').replace(/\-/g,' ').replace(/\./g,'').replace(/\,/g,'').replace(/\?/g, '')

      var cnt = 0
      console.log(strLower);

      for(var i = 0; i < words.length; i++) {
		    if(words[i].toLowerCase() == strLower) {
		        cnt++
		    }
			}
      console.log(cnt)
      var selWord = document.getElementById('selWord')
			var selCount = document.getElementById('selCount')
			var syn = document.getElementById('synonyms')
			var hiddenDiv = document.getElementById('wordMets')

			selWord.innerText = strLower;
			selCount.innerText = cnt;

			hiddenDiv.removeAttribute('hidden')

    }
    catch(e){
    	console.log('no word there')
    }
   
  });
}


var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  var col = document.getElementById('mets');
  col.style.marginTop = '' + scroll_pos + 'px'
}

function scrollInit(){
  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });
}
