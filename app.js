var http = require( 'http' ),
    url = require( 'url' ),
    todos = [];

var server = http.createServer( function( req, res ) {
  
  switch( req.method ) {
    
    case 'POST':
      var todo = '';
      req.setEncoding( 'utf8' );
      req.on( 'data', function( chunk ) {
        todo += chunk;
      });
      req.on( 'end', function() {
        todos.push( todo );
        res.end( 'Todo added!\n' );
      });
      break;

    case 'GET':
      todos.forEach( function( todo, index ) {
        res.write( index + ' - ' + todo + '\n' );
      });
      res.end();
      break;
  }
});

server.listen( 3000 );