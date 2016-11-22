var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , qs   = require('querystring')
  , prequireort = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url, true)
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


function sendIndex(res) {
  var contentType = 'text/html'
    , html = ''

  html = html + '<html>'

  html = html + '<head>'
  // You could add a CSS and/or js call here...
  html = html + '<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">'

  html = html + '<link rel="stylesheet" type="text/css" href="css/style.css">'

  html = html + '<link href="https://fonts.googleapis.com/css?family=Libre+Baskerville" rel="stylesheet">'

  html = html + '<link href="https://fonts.googleapis.com/css?family=Luckiest+Guy" rel="stylesheet">'


  html = html + '</head>'

  html = html + '<body>'
  html = html + '<h1>Final Project Description<h1>'
  html = html + '</body>'
  html = html + '</html>'
  
  res.writeHead(200, {'Content-type': contentType})
  res.end(html, 'utf-8')
}