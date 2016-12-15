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


			function reqListener(){
				var resp = JSON.parse(this.responseText)

				var topSynonyms = Object.values(resp)[0].syn
				topSynonyms = topSynonyms.slice(0,5)

				console.log(topSynonyms)
				syn.innerText = topSynonyms.join(', ')
			}

			var hiddenDiv = document.getElementById('wordMets')
			// var docMet = document.getElementById('docMets')

			selWord.innerText = strLower;
			selCount.innerText = cnt;

			hiddenDiv.removeAttribute('hidden')
			// docMet.setAttribute('hidden', true)

			var oReq = new XMLHttpRequest();
			oReq.addEventListener('load', reqListener);
			oReq.open('GET', 'http://words.bighugelabs.com/api/2/1b27ae90fd3ebc09e575291d103105a4/'+strLower+'/json', true)
			oReq.send()

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

function makeFreq(text){
  text = text.toLowerCase()
  var newText = text.replace(/\;/g,'').replace(/\:/g,'').replace(/\=/g,' ').replace(/\-/g,' ').replace(/\./g,'').replace(/\,/g,'').replace(/\?/g, '')
  var words = newText.split(/\s+/)

  
  var allWords = []

  while(words.length != 0 && allWords.length < 250){
    var dic = {}
    var wd = words[0]
    var cnt = 0

    for(var i = 0; i < words.length; i++) {
        if(words[i] == wd) {
            cnt++
        }
    }
    dic["text"] = wd;
    dic["size"] = cnt*10;
    allWords.push(dic)

    words = words.filter(function(el){ return el !== wd });
  }

  var frequency_list = allWords

  var color = d3.scale.linear()
	  .domain([10,20,40,80, 100])
	  .domain([0,1,2,3,4,5,6,10,15,20,100])
	  // .range(["blue","green","orange","red","black"]);
	  .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

  d3.layout.cloud().size([800, 400])
    .words(frequency_list)
    .padding(1)
    .rotate(function(d){ return 0; })
    .text(function(d) { return d.text; }) // THE SOLUTION
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();

  function draw(words) {
  	document.querySelector("#vis").innerHTML = ''
    d3.select("#vis").append("svg")
    .attr("width", 800)
    .attr("height", 400)
    .attr("class", "wordcloud")
    .attr("id", "svg")
    .append("g")
    // without the transform, words words would get cutoff to the left and top, they would
    // appear outside of the SVG area
    .attr("transform", "translate(400,200)")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("fill", function(d, i) { return color(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
  }

  downloadSVG()
}


function makeFreqList(){
  function reqListener(){
      makeFreq(this.responseText)
  }

  var hashedFile = location.hash
  var fileName = hashedFile.slice(1,10)


  // var fileName = "file4.txt"
  if(fileName != ''){
  	var oReq = new XMLHttpRequest()

	  oReq.addEventListener('load', reqListener)
	  oReq.open('GET', '/'+fileName, true)
	  oReq.send()
  }
  else{
  	alert("You need to select a file first!")
  }
}


function downloadSVG(){
	//get svg element.
	var svg = document.getElementById("svg");

	//get svg source.
	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(svg);

	//add name spaces.
	if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
	    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	}
	if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
	    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	}

	//add xml declaration
	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

	//convert svg source to URI data scheme.
	var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

	//set url value to a element's href attribute.
	document.getElementById("link").href = url;
	//you can download svg file by right click menu.
}
