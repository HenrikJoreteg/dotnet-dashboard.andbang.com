/*
server.js

This is the *main* application file. It will create and configure our server
and begin listening for requests.
*/

/*global console*/
// First we import the modules we'll need:
var express = require('express'),
    stitch = require('stitch'),
    andbangAuth = require('andbang-express-auth'),
    templatizer = require('templatizer'),
    config = require('getconfig');

// build our client templates into vanilla javascript
templatizer(__dirname + '/clientTemplates', __dirname + '/clientmodules/templates.js');

// Then we define the files that will make up our clientside application. 
// We use Stitch (https://github.com/sstephenson/stitch) to allow us to 
// organize our browser.js using the same CommonJS module pattern we use 
// on the server.
var clientSideJS = stitch.createPackage({
        paths: [__dirname + '/clientmodules', __dirname + '/clientapp'],
        dependencies: [
            __dirname + '/public/jquery.js',
            __dirname + '/public/sugar-1.3.6-dates.js',
            __dirname + '/public/socket.io.js',
            __dirname + '/public/init.js'
        ]
    });

// Now create and configure our express.js application
// docs at: http://expressjs.com
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'neat-o bandit-o' }));
app.use(andbangAuth.middleware({
    app: app,
    clientId: config.auth.clientId,
    clientSecret: config.auth.clientSecret,
    loginPageUrl: '/auth',
    defaultRedirect: '/&!/',
    //local: true
}));

// We can now use our application to specify which url we'll use to server the
// clientisde application. Stitch turns it into a single file for us and while we're
// in development it can also watch for changes and update itself so we don't have
// to re-start the server each time we change any of our client files.

// We wouldn't want to serve our application this way in production. For that, we can 
// write the file to disk, minify it and just serve it as a static javascript file.
app.get('/&!-dashboard.js', clientSideJS.createServer());

// Here we serve our static html file.
// We also tack on a quickly expiring accessToken as a cookie. This lets us tack on a tiny bit
// of dynamic data to our otherwise static response.
app.get('/', andbangAuth.secure(), function (req, res) {
    res.cookie('apiToken', req.session.accessToken, {expires: new Date(Date.now() + 30000)});
    res.sendfile(__dirname + '/app.html');
});

// start listening for requests
app.listen(config.port);

// write some helpful log output
console.log('Dashboard is running on port %d. Yep. That\'s pretty awesome.', config.port);
