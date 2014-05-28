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
      var body = todos.map( function( todo, index ) {
        return index + ' - ' + todo ;
      }).join( '\n' );
      // Setting Content-Length disables Node chunked encoding.
      // Less data needs to be transfered this way
      res.setHeader( 'Content-Length', Buffer.byteLength( body ) );
      res.setHeader( 'Content-Type', 'text/plain; charset="utf-8"' );
      res.end( body );
      break;
  }
});

server.listen( 3000 );