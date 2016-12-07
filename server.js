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
  if(!req.headers.cookie){
    console.log('Adding to what should be an empty cookie: ' + req.headers.cookie)
    var inAccounts = true;
    while(inAccounts){
      inAccounts = false;
      var randID = makeid();
      for(var i = 0; i < accounts.length; i++){
        if(accounts[i].user == randID){
          inAccounts = true;
          break
        }
      }
    }


    res.writeHead(200, {
      'Set-Cookie': ['user=' + randID + '; Max-Age=60'],
    });
  }
  else{
    console.log('This is the filled cookie: ' + req.headers.cookie)
  }

//function sendIndex(res, movieList,timer, query, numRes)
  switch( uri.pathname ) {
    // Note the new case handling search
    case '/':
      sendFile(res, 'index.html', 'text/html')
      break
    case '/index.html':
      sendFile(res, 'index.html', 'text/html')
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
    case '/css/style.css':
      sendFile(res, 'public/css/style.css', 'text/css')
      break
    case '/css/bootstrap.min.css':
      sendFile(res, 'public/css/bootstrap.min.css', 'text/css')
      break
    case '/css/bootstrap.min.css.map':
      sendFile(res, 'public/css/bootstrap.min.css.map', 'text/css')
      break
    case '/js/scripts.js':
      sendFile(res, 'public/js/scripts.js', 'text/javascript')
      break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || port)
console.log('listening on 8080')

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

