const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const fetch = require('node-fetch');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/guardian-home', function (req, res) {

    var url = 'https://content.guardianapis.com/search?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&section=(sport|business|technology|politics)&show-blocks=all';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data.response.results)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.get('/nyc-home', function (req, res) {

    var url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            //  console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.post('/sports', function (req, res) {
    console.log('in gurdnnnnn')
    var params = req.body.category;
    console.log(params)
    if (params == 'guardian')
        var url = 'https://content.guardianapis.com/sport?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
    else
        var url = 'https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.get('/world-nyt', function (req, res) {
    console.log('in world')
    // var params = req.body.category;
   
    
    var url = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
        
});
app.get('/world-guardian', function (req, res) {
    console.log('in world')
    // var params = req.body.category;
    // console.log(params)
    // if (params == 'guardian')
        var url = 'https://content.guardianapis.com/world?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
    // else
    //     var url = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.post('/technology', function (req, res) {
    console.log('in technology')
    var params = req.body.category;
    console.log(params)
    if (params == 'guardian')
        var url = 'https://content.guardianapis.com/technology?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
    else
        var url = 'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.post('/business', function (req, res) {
    console.log('in business')
    var params = req.body.category;
    console.log(params)
    if (params == 'guardian')
        var url = 'https://content.guardianapis.com/business?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
    else
        var url = 'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.post('/politics', function (req, res) {
    console.log('in business')
    var params = req.body.category;
    console.log(params)
    if (params == 'guardian')
        var url = 'https://content.guardianapis.com/politics?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
    else
        var url = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
const server = app.listen(5000, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});