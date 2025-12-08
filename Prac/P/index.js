/*
	npm init -y
	npm install express
	node index.js
*/

var express = require('express');
var app = express();
const crypto = require('crypto');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000');
});

// mascaracteres: recibe dos cadenas y regresa la que tenga más caracteres.
//					Si son iguales, regresa la del primer parámetro
app.post("/mascaracteres", async function (req, res) {
  const nombre = req.body.nom;
  const boleta = req.body.id;
  const cadena1 = req.body.cad1;
  const cadena2 = req.body.cad2;
  var cadena = (cadena1 >= cadena2) ? cadena1 : cadena2;

  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'cadena': cadena
  };

  res.json(r);
});

// menoscaracteres: recibe dos cadenas y regresa la que tenga menos caracteres.
//					Si son iguales, regresa la del primer parámetr
app.post("/menoscaracteres", async function (req, res) {
  const boleta = req.body.id;
  const nombre = req.body.nom;
  const cadena1 = req.body.cad1;
  const cadena2 = req.body.cad2;
  var cadena = (cadena1 <= cadena2) ? cadena1 : cadena2;

  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'cadena': cadena
  };

  res.json(r);
});

//numcaracteres: recibe una cadena y regresa el número de caracteres que la cadena tiene
app.post("/numcaracteres", async function (req, res) {
  const nombre = req.body.nom;
  const boleta = req.body.id;
  const cadena = req.body.cad;
  var num = cadena.length;

  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'numero_caracteres': num
  };

  res.json(r);
});

//palindroma: recibe una cadena y regresa true si la cadena es una palindroma, y false en caso contrario
app.post("/palindroma", async function (req, res) {
  const nombre = req.body.nom;
  const boleta = req.body.id;
  const cadena = req.body.cad;
  var pal=palindromo(cadena);
  
  function palindromo (cadena){
	  const cadena2 = cadena.split('').reverse().join('');
	  if(cadena==cadena2)
		  return true;
	  else
		  return false;
  }

  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'palindromo': pal
  };

  res.json(r);
});

//concat: recibe dos cadenas y regresa la concatenación iniciando con el primer parámetro
app.post("/concat", async function (req, res) {
  const nombre = req.body.nom;
  const boleta = req.body.id;
  const cadena1 = req.body.cad1;
  const cadena2 = req.body.cad2;
  var cadena = cadena1+cadena2;

  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'cadena': cadena
  };

  res.json(r);
});

//applysha256: recibe una cadena, le aplica una encriptación SHA256
//				y regresa como resultado la cadena original y la encriptada
app.post("/applysha256", async function (req, res) {
  const nombre = req.body.nom;
  const boleta = req.body.id;
  const cadena = req.body.cad;
  var encrpit= SHA256(cadena);
  function SHA256(texto) {
	return crypto.createHash('sha256').update(texto).digest('hex');
}
  
  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'cadena': cadena,
	'SHA256': encrpit
  };

  res.json(r);
});

//verifysha256: recibe una cadena encriptada, una cadena normal,
//				a la cadena normal le aplica SHA256, la compara 
//				con la cadena encriptada y regresa true si coinciden, y false en otro caso
app.post("/verifysha256", async function (req, res) {
  const nombre = req.body.nom;
  const boleta = req.body.id;
  const cadena = req.body.cad1;
  const encriptada = req.body.cad2;
  
  var validacion = validar(cadena,encriptada);
  function validar(cadena,encriptada){
	  
	  	var cad=SHA256(cadena);
		if(cad==encriptada)
			return true;
		else
			return false;

  }
  function SHA256(texto) {
	return crypto.createHash('sha256').update(texto).digest('hex');
}

  const r = {
    'boleta': boleta,
    'nombre': nombre,
    'verificacion': validacion
  };

  res.json(r);
});
