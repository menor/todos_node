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

    case 'DELETE':
      var path = url.parse( req.url ).pathname;
      var i = parseInt( path.slice( 1 ), 10 );

      // Check if the value is a number
      if ( isNaN( i ) ) {
        res.statusCode = 400;
        res.end( 'Todo id needs to be a number' );
      // Check if the todo exists
      } else if ( !todos[i] ) {
        res.statusCode = 404;
        res.end( "Todo doesn't exist" );
      } else {
        // Delete todo
        todos.splice( i, 1 );
        res.end( 'Todo deleted' );
      }
      break;

  }
});

server.listen( 3000 );