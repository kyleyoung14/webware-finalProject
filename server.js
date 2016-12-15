var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , qs   = require('querystring')
  , path = require('path')
  , cookie = require('cookie')
  , port = 5000;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url, true)


  var accounts = []

  // set cookies
  // if(!req.headers.cookie){
  //   console.log('Adding to what should be an empty cookie: ' + req.headers.cookie)
  //   var inAccounts = true;
  //   while(inAccounts){
  //     inAccounts = false;
  //     var randID = makeid();
  //     for(var i = 0; i < accounts.length; i++){
  //       if(accounts[i].user == randID){
  //         inAccounts = true;
  //         break
  //       }
  //     }
  //   }


  //   res.writeHead(200, {
  //     'Set-Cookie': ['user=' + randID + '; Max-Age=60'],
  //   });
  // }
  // else{
  //   console.log('This is the filled cookie: ' + req.headers.cookie)
  // }

//function sendIndex(res, movieList,timer, query, numRes)
  switch( uri.pathname ) {
    // Note the new case handling search
    case '/':
      sendFile(res, 'main.html', 'text/html')
      break
    case '/main.html':
      sendFile(res, 'main.html', 'text/html')
      break
    case '/wordcloud.html':
      sendFile(res, 'wordcloud.html', 'text/html')
      break
    case '/wordtree.html':
      sendFile(res, 'wordtree.html', 'text/html')
      break
    case '/docMetrics.html':
      sendFile(res, 'docMetrics.html', 'text/html')
      break
    case '/README.md':
      sendFile(res, 'README.md', 'text/plain')
      break
    case '/readme.md':
      sendFile(res, 'README.md', 'text/plain')
      break
    case '/wordCloud.png':
      sendFile(res, 'public/img/wordCloud.png', 'image/png')
      break
    case '/phraseTree.png':
      sendFile(res, 'public/img/phraseTree.png', 'image/png')
      break
    case '/back1.jpg':
      sendFile(res, 'public/img/back1.jpg', 'image/jpg')
      break
    case '/img/fileExists.png':
      sendFile(res, 'public/img/fileExists.png', 'image/png')
      break
    case '/img/noFile.png':
      sendFile(res, 'public/img/noFile.png', 'image/png')
      break
    case '/upload/file1':
      saveFile(req, res, 1)
      break
    case '/file1.txt':
      sendFile(res, 'file1.txt', 'text/plain')
      break
    case '/file2.txt':
      sendFile(res, 'file2.txt', 'text/plain')
      break
    case '/file3.txt':
      sendFile(res, 'file3.txt', 'text/plain')
      break
    case '/file4.txt':
      sendFile(res, 'file4.txt', 'text/plain')
      break
    case '/file5.txt':
      sendFile(res, 'file5.txt', 'text/plain')
      break
    case '/file6.txt':
      sendFile(res, 'file6.txt', 'text/plain')
      break
    case '/upload/file2':
      saveFile(req, res, 2)
      break
    case '/upload/file3':
      saveFile(req, res, 3)
      break
    case '/upload/file4':
      saveFile(req, res, 4)
      break
    case '/upload/file5':
      saveFile(req, res, 5)
      break
    case '/upload/file6':
      saveFile(req, res, 6)
      break
    case '/files':
      currentFiles(res)
      break
    case '/css/style.css':
      sendFile(res, 'public/css/style.css', 'text/css')
      break
    case '/css/bootstrap.css':
      sendFile(res, 'public/css/bootstrap.css', 'text/css')
      break
    case '/css/bootstrap.css.map':
      sendFile(res, 'public/css/bootstrap.css.map', 'text/css')
      break
    case '/css/bootstrap.min.css':
      sendFile(res, 'public/css/bootstrap.min.css', 'text/css')
      break
    case '/css/bootstrap.min.css.map':
      sendFile(res, 'public/css/bootstrap.min.css.map', 'text/css')
      break
    case '/css/simple-sidebar.css':
      sendFile(res, 'public/css/simple-sidebar.css', 'text/css')
      break
    case '/js/scripts.js':
      sendFile(res, 'public/js/scripts.js', 'text/javascript')
      break
    case '/js/bootstrap.min.js':
      sendFile(res, 'public/js/bootstrap.min.js', 'text/javascript')
      break
    case '/js/d3.min.js':
      sendFile(res, 'public/js/d3.min.js', 'text/javascript')
      break
    case '/js/cloud.min.js':
      sendFile(res, 'public/js/cloud.min.js', 'text/javascript')
      break
    case '/js/d3.layout.cloud.js':
      sendFile(res, 'public/js/d3.layout.cloud.js', 'text/javascript')
      break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || 8080)
console.log('listening on 8080')

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}


function saveFile(request, response, fileNum){
  console.log('received file')
  if (request.method == 'POST') {
      var body = '';
      request.on('data', function (data) {
          body += data;
          console.log(body)
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 2e7) { 
              // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
              console.log("Destroyed");
              request.connection.destroy();
              response.end('Upload failed')
          }
      });
      request.on('end', function () {
          // console.log("parsing qs")
          // var POST = qs.parse(body).add;
          var POST = body
          console.log(POST)
          
          fs.writeFileSync('./file'+fileNum+'.txt', POST, 'utf-8');

          response.end('Added successfully');
      });
  }
}


function currentFiles(response){
  var results = []
  fs.readdirSync(".").forEach(function(file){
    if(file.slice(0,4) == 'file'){
      results.push(file)
    }
  });
  response.end(results.join('\n'))
}



function makeid()
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

