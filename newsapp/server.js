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
app.get('/sports-nyt', function (req, res) {
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
app.get('/sports-guardian', function (req, res) {
    console.log('in world')
    var url = 'https://content.guardianapis.com/sport?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
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
app.get('/technology-nyt', function (req, res) {
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
app.get('/technology-guardian', function (req, res) {
    console.log('in world')
    var url = 'https://content.guardianapis.com/technology?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
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
app.get('/business-nyt', function (req, res) {
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
app.get('/business-guardian', function (req, res) {
    console.log('in world')
    var url = 'https://content.guardianapis.com/business?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
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

app.get('/politics-nyt', function (req, res) {
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
app.get('/politics-guardian', function (req, res) {
    console.log('in world')
    var url = 'https://content.guardianapis.com/politics?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
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
app.post('/detailed-guardian', function (req, res) {
    console.log('detailed guardian')
    param = req.body.id;
    console.log(param)

    url = 'https://content.guardianapis.com/' + param + '?api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all'
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.post('/detailed-nyt', function (req, res) {
    console.log('detailed nyt')
    param = req.body.id;
    console.log(param)

    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + param + '")&api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    // url='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(“'+param+' ”) &api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    console.log(url)
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
app.post('/search-nyt', function (req, res) {
    console.log('search nyt')
    param = req.body.id.label;
    console.log(param)

    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=['+param+']&api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    // url='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(“'+param+' ”) &api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("in searchhhh")
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});
app.post('/search-guardian', function (req, res) {
    console.log('search guardian')
    param = req.body.id.label;
    console.log(param)

    url = 'https://content.guardianapis.com/search?q='+param+'&api-key=9565a22d-c6b6-459a-abe5-ef7cd586da28&show-blocks=all';
    // url='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(“'+param+' ”) &api-key=FvJvL8Hpqz5JMaLPhhGci4rf0hqqXnkV';
    console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("in searchhhh gg")
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
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });
// module.exports = app;