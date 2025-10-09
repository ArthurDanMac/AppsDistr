var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, function () {
    console.log('Escuchando puerto 3000');
});


/*
Ejercicio 1
{
  "nombre": "Arturo"
}
*/
app.post("/saludo", async function (req, res) {
    const nombre = req.body.nombre;
    r = { 'mensaje': `Hola, ${nombre}` };
    res.json(r);
});



/*
Ejercicio 2
{
  "a": 90,
  "b": 9,
  "operacion": "suma"
}
*/
app.post("/calcular", async function (req, res) {
    const a = req.body.a;
    const b = req.body.b;
    const operacion = req.body.operacion;

    let resultado;
    let error = null;

    switch (operacion) {
        case 'suma':
            resultado = a + b;
            break;
        case 'resta':
            resultado = a - b;
            break;
        case 'multiplicacion':
            resultado = a * b;
            break;
        case 'division':
            if (b === 0) {
                error = 'ERROR /0';
            } else {
                resultado = a / b;
            }
            break;
        default:
            error = 'Error';
    }

    if (error) {
        res.json({ 'error': error });
    } else {
        res.json({ 'resultado': resultado });
    }
});




/*
Ejercicio 3 CRUD
*/
var tareas = [];

/*
POST
{
  "id": 1,
  "titulo": "Estudiar redes",
  "completada": false
}
*/
app.post("/tareas", async function (req, res) {
    tareas.push(req.body);
    res.json({ 'mensaje': 'Tarea creada', 'tarea': req.body });
});

/*GET*/
app.get("/tareas", async function (req, res) {
    res.json(tareas);
});

/*
PUT 
*/
app.put("/tareas/:id", async function (req, res) {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
        res.json({ 'error': 'Tarea no encontrada' });
    } else {
        tareas[index] = { ...tareas[index], ...req.body };
        res.json({ 'mensaje': 'Tarea actualizada', 'tarea': tareas[index] });
    }
});

/*DELETE*/
app.delete("/tareas/:id", async function (req, res) {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
        res.json({ 'error': 'Tarea no encontrada' });
    } else {
        const eliminada = tareas.splice(index, 1);
        res.json({ 'mensaje': 'Tarea eliminada', 'tarea': eliminada[0] });
    }
});

/*EJERCICIO 4
{
  "password": "Segura123"
}
*/
app.post("/validar-password", async function (req, res) {
    const password = req.body.password;
    const errores = [];

    if (!/.{8,}/.test(password)) errores.push("Debe tener al menos 8 caracteres");
    if (!/[A-Z]/.test(password)) errores.push("Debe contener al menos una mayúscula");
    if (!/[a-z]/.test(password)) errores.push("Debe contener al menos una minúscula");
    if (!/[0-9]/.test(password)) errores.push("Debe contener al menos un número");

    res.json({
        esValida: errores.length === 0,
        errores: errores
    });
});

/*Ejercicio 5
{
  "valor": 100,
  "desde": "C",
  "hacia": "F"
}
*/
app.post("/convertir-temperatura", async function (req, res) {
    const { valor, desde, hacia } = req.body;
    let convertido;

    const toCelsius = {
        F: v => (v - 32) * 5 / 9,
        K: v => v - 273.15,
        C: v => v
    };

    const fromCelsius = {
        F: v => (v * 9 / 5) + 32,
        K: v => v + 273.15,
        C: v => v
    };

    if (!toCelsius[desde] || !fromCelsius[hacia]) {
        return res.json({ error: "Escala no válida" });
    }

    const celsius = toCelsius[desde](valor);
    convertido = fromCelsius[hacia](celsius);

    res.json({
        valorOriginal: valor,
        valorConvertido: parseFloat(convertido.toFixed(2)),
        escalaOriginal: desde,
        escalaConvertida: hacia
    });
});

/*EJERCICIO 6
{
  "array": [1, 2, 3, 4, 5],
  "elemento": 3
}
*/
app.post("/buscar", async function (req, res) {
    const { array, elemento } = req.body;
    const indice = array.findIndex(e => e === elemento);
    const encontrado = indice !== -1;

    res.json({
        encontrado,
        indice: encontrado ? indice : -1,
        tipoElemento: typeof elemento
    });
});

/*EJERCICIO 7
{
  "texto": "Aplicaciones distribuidas"
}
*/
app.post("/contar-palabras", async function (req, res) {
    const texto = req.body.texto || "";
    const palabras = texto.trim().split(/\s+/).filter(p => p.length > 0);
    const totalCaracteres = texto.length;
    const palabrasUnicas = new Set(palabras.map(p => p.toLowerCase())).size;

    res.json({
        totalPalabras: palabras.length,
        totalCaracteres,
        palabrasUnicas
    });
});

/*EJERCICIO 8
{
  "nombre": "Arturo",
  "edad": 35,
  "intereses": ["redes", "automatización", "seguridad"]
}
*/
const { v4: uuidv4 } = require('uuid');

app.post("/generar-perfil", async function (req, res) {
    const { nombre, edad, intereses } = req.body;
    let categoria = "junior";
    if (edad >= 30 && edad < 60) categoria = "senior";
    else if (edad >= 60) categoria = "veterano";

    res.json({
        usuario: { nombre, edad, intereses },
        id: uuidv4(),
        fechaCreacion: new Date().toISOString(),
        categoria
    });
});

/*EJERCICIO 9
{
  "calificaciones": [8, 9.5, 7, 6, 10]
}
*/
app.post("/calcular-promedio", async function (req, res) {
    const calificaciones = req.body.calificaciones || [];
    const validas = calificaciones.filter(c => c >= 0 && c <= 10);

    if (validas.length !== calificaciones.length) {
        return res.json({ error: "Todas las calificaciones deben estar entre 0 y 10" });
    }

    const promedio = validas.reduce((a, b) => a + b, 0) / validas.length;
    const estado = promedio >= 6 ? "aprobado" : "reprobado";

    res.json({
        promedio: parseFloat(promedio.toFixed(2)),
        calificacionMasAlta: Math.max(...validas),
        calificacionMasBaja: Math.min(...validas),
        estado
    });
});

/*EJERCICIO 10
{
  "id": 1,
  "nombre": "Router Cisco",
  "categoria": "Networking",
  "precio": 1200
}
*/
let productos = [];

app.post("/productos", async function (req, res) {
    productos.push(req.body);
    res.json({ mensaje: "Producto agregado", producto: req.body });
});

app.get("/productos", async function (req, res) {
    const { categoria, precioMin, precioMax } = req.query;
    let filtrados = productos;

    if (categoria) filtrados = filtrados.filter(p => p.categoria === categoria);
    if (precioMin) filtrados = filtrados.filter(p => p.precio >= parseFloat(precioMin));
    if (precioMax) filtrados = filtrados.filter(p => p.precio <= parseFloat(precioMax));

    res.json(filtrados);
});
