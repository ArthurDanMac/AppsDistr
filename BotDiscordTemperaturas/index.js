const axios = require('axios');

const arregloTemperaturas = [];
const tiempoIntervalo = 3000; 
const temperaturaMinima = 15;
const temperaturaMaxima = 30;
const umbralAlerta = 20;
const mensajeAlerta = '**ALERTA: Calentamiento extremo detectado**';
let banderaMensaje = false;
const webhookUrl = 'https://discord.com/api/webhooks/1422778841486590025/RHpL6rwbxYVfWOzCrC3MZd-DtcTPgDkEIidQ5fZC90EDVwKeULGJUJQYsWvpiM6pdjoD';

function generarTemperatura() {
    return Math.floor(Math.random() * (temperaturaMaxima - temperaturaMinima + 1)) + temperaturaMinima;
}

function inicializarArreglo() {
    while (arregloTemperaturas.length < 3) {
        arregloTemperaturas.push(generarTemperatura());
    }
    console.log('Arreglo inicializado:', arregloTemperaturas);
}

async function verificarTemperaturas() {
    try {
        console.log('Verificando temperaturas:', arregloTemperaturas);
        
        const todasSobreUmbral = arregloTemperaturas.every(temp => temp > umbralAlerta);
        
        if (todasSobreUmbral) {
            console.log('¡Todas las temperaturas superan el umbral! Activando alerta...');
            banderaMensaje = true;
        } else {
            arregloTemperaturas.shift();
            arregloTemperaturas.push(generarTemperatura());
            console.log('Arreglo actualizado:', arregloTemperaturas);
        }
        
        if (banderaMensaje) {
            await enviarWebhook();
            banderaMensaje = false; 
        }
        
    } catch (error) {
        console.error('Error en verificarTemperaturas:', error.message);
    }
}

async function enviarWebhook() {
    try {
        const mensaje = {
            content: `${mensajeAlerta}\nTemperaturas detectadas: ${arregloTemperaturas.join(', ')}°C\nUmbral: ${umbralAlerta}°C`
        };
        
        console.log('Enviando webhook a Discord...');
        await axios.post(webhookUrl, mensaje);
        console.log('✅ Webhook enviado exitosamente (simulado)');
        
        arregloTemperaturas.length = 0;
        inicializarArreglo();
        
    } catch (error) {
        console.error('Error al enviar webhook:', error.message);
    }
}

function iniciarMonitoreo() {
    try {
        inicializarArreglo();
        
        setInterval(() => {
            verificarTemperaturas();
        }, tiempoIntervalo);
        
        console.log(`Iniciando monitoreo de temperaturas`);
        
    } catch (error) {
        console.error('Error al iniciar: ', error.message);
    }
}

iniciarMonitoreo();