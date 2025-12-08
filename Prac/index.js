// npm install express

var express = require('express');
var app = express(); //Contenedor de Endpoints o WS Restful

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {

    r ={
      'message':'Nothing to send'
    };

    response.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
http://localhost:3000/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv001", async function (req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;

    r ={
      'user_id': user_id,
      'token': token,
      'geo': geo
    };

    res.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
http://localhost:3000/serv002?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv002", async function (req, res) {
    const user_id1 = req.query.id;
    const token1 = req.query.token;
    const geo1 = req.query.geo;

    r1 ={
      'user_id': user_id1,
      'token': token1,
      'geo': geo1
    };

    res.json(r1);
});

// Call this service sending payload in body: raw - json
/*
{
    "id": "nope",
    "token": "ertydfg456Dfgwerty",
    "geo": "12345678,34567890"
}
*/

app.post("/serv003", async function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

    r ={
      'user_id': user_id,
      'token': token,
      'geo': geo
    };

    res.json(r);
});

/*
Call this service sending parameter as a part of the URL
http://localhost:3000/serv004/1234567
*/
app.post("/serv004/:info", async function (req, res) {
    const info = req.params.info;
    let r = {'info': info};
    res.json(r);
});


app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
