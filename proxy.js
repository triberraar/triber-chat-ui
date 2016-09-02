'use strict';

var httpProxy = require('http-proxy');
var express = require('express');
var http      = require( 'http' );
var path = require('path');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({name: 'proxy'});

var proxyHost = process.env.PROXY_HOST || 'localhost';
var proxyPort = process.env.PROXY_PORT || '8080';
var port = process.env.PORT || '3333';

var proxy = httpProxy.createProxyServer({
    target: 'http://' + proxyHost + ':' + proxyPort // where do we want to proxy to?
    //ws    : true // proxy websockets as well
});

var app = express();
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'dst')));

var proxyServer = http.createServer( app );

proxyServer.on( 'upgrade', function( req, socket, head ) {
    logger.info({name: 'upgrading websocket'});
    proxy.ws( req, socket, head );
});

proxy.on( 'error', function ( err ) {
    // console.error( err.stack );
   logger.error({name: 'proxy error', err:err});
});

proxy.on( 'proxyReq', function ( proxyReq) {
    logger.info({name: 'proxyReq', path: proxyReq.path});
});

proxy.on( 'proxyReqWs', function ( proxyReqWs ) {
    logger.info({name: 'proxyReq WS', path: proxyReqWs.path});
});

app.all('/*',  function (req, res) {
    proxy.web(req, res, {target: {host: proxyHost, port:proxyPort}}, function (e, req, res) {
        res.json({'message': 'proxy error', 'error': e});
    });
});


proxyServer.listen(port);

logger.info({message: 'listening on ' + port + '. Proxying ' + proxyHost + ':' + proxyPort});
