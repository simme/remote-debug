(function () {
  document.write('<script src="http://127.0.0.1:1337/socket.io/socket.io.js"></script>');
  var delayedConsole = [],
    socket = false,
    oldLog = window.console.log;

  document.addEventListener( "DOMContentLoaded", function() {
    document.removeEventListener( "DOMContentLoaded", arguments.callee, false );

    socket = io.connect('http://localhost:1337');

    for (i in delayedConsole) {
      console.log(delayedConsole[i]);
    }

    delete(delayedConsole);

    console.log('hej')
  
  }, false);

  window.console.log = function (obj) {
    var idx, args = [];
    if (!socket) {
      delayedConsole.push(arguments);
      return;
    }

    for (idx = 0; idx < arguments.length; idx++) {
      args.push(arguments[idx]);
    }
    oldLog.apply(window.console, arguments);
    socket.emit('log', args);
  }
}());