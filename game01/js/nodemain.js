var express = require('express')
    , http = require('http')
    , path = require('path');

var bodyParser = require('body-parser')
    , static = require('serve-static');
    
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, '../public')));
app.use('/assets', static(path.join(__dirname, '../assets')));
app.use('/js', static(path.join(__dirname, '../js')));


var router = express.Router();

router.route('/game').get(function(req, res){
    res.redirect('/public/index.html');
});

app.use('/', router);


http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});