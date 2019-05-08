const request = require('request');
var express  = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendFile( __dirname + "/" + "index.html");
});

app.get('/process_get', function (req, res){

    //res.send(req.query.site);
    
    request(req.query.site, function(error, response, body){
	        //console.error('error', error);
	        //console.log('statusCode:', response && response.statusCode);
	        //console.log('body:', body);

            passarDominio(body);
    });



    function passarDominio(site){
        var dominio = ["www.youtube.com.*", "www.youtu.be.*"];
        var html = "";
        for (var index = 0; index < dominio.length; index++){           
            html += procurar(site, dominio[index]) + "<br>";
        }
        res.send(html);

        
    }

    function procurar(site, dominio){
	    var regex = dominio;
	    
	    var encontrado = site.match(regex);

	    
	    if (encontrado != null){      
            return "Encontrado: " + encontrado[0];
            
        }
        else{
            return "";
        }
    }

});
var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
});




