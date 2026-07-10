let vehiculoConfirmado = false; // Estado: bloqueado por defecto
let datosVehiculo = null;

document.addEventListener('DOMContentLoaded', () => {
    configurarNavegacion();
    configurarBotones();
    actualizarEstadoBloqueo();
});

function configurarNavegacion() {
    document.querySelectorAll('.boton-nav').forEach(boton => {
        boton.addEventListener('click', () => {
            const pantallaDestino = boton.dataset.pantalla;
            
            // Si no está confirmado, bloquea acceso a pantallas restringidas
            if(!vehiculoConfirmado && pantallaDestino !== 'pantallaConexion') {
                alert('🔒 Debes confirmar los datos del vehículo primero para acceder a esta sección');
                return;
            }

            // Cambia pantalla si está permitido
            document.querySelectorAll('.boton-nav').forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
            document.getElementById(pantallaDestino).classList.add('activa');
        });
    });
}

function configurarBotones() {
    document.getElementById('btnConectar').addEventListener('click', () => alert('Conectando al adaptador...'));
    document.getElementById('btnLeerVIN').addEventListener('click', mostrarDatosEjemplo);
    document.getElementById('btnConfirmarVehiculo').addEventListener('click', confirmarVehiculo);
    document.getElementById('btnCancelarVehiculo').addEventListener('click', cancelarDatosVehiculo);
    document.getElementById('btnEscanear').addEventListener('click', escanearCodigos);
    document.getElementById('btnBorrar').addEventListener('click', borrarCodigos);
}

// Muestra datos de ejemplo al leer VIN
function mostrarDatosEjemplo() {
    datosVehiculo = {
        vin: '1HGCR2F3XFA1234567',
        marca: 'Honda',
        modelo: 'Accord',
        motor: '2.4L Gasolina',
        anio: '2015'
    };
    document.getElementById('vinDeco').textContent = datosVehiculo.vin;
    document.getElementById('marcaDeco').textContent = datosVehiculo.marca;
    document.getElementById('modeloDeco').textContent = datosVehiculo.modelo;
    document.getElementById('motorDeco').textContent = datosVehiculo.motor;
    document.getElementById('anioDeco').textContent = datosVehiculo.anio;
    document.getElementById('panelVIN').style.display = 'block';
}

// DESBLOQUEA TODO al confirmar datos
function confirmarVehiculo() {
    vehiculoConfirmado = true;
    document.getElementById('infoVehiculo').textContent = `${datosVehiculo.marca} ${datosVehiculo.modelo} ${datosVehiculo.anio}`;
    document.getElementById('infoVehiculo').style.color = 'var(--acento-verde)';
    
    // Quita bloqueo de pantallas y botones
    document.getElementById('pantallaSensores').classList.remove('bloqueada');
    document.getElementById('pantallaCodigos').classList.remove('bloqueada');
    document.getElementById('pantallaHerramientas').classList.remove('bloqueada');
    document.querySelectorAll('[data-pantalla="pantallaSensores"], [data-pantalla="pantallaCodigos"], [data-pantalla="pantallaHerramientas"]').forEach(el => el.classList.remove('bloqueado'));
    
    alert('✅ Vehículo confirmado! Ahora tienes acceso a todas las funciones');
}

// MANTIENE BLOQUEO si cancela o corrige
function cancelarDatosVehiculo() {
    vehiculoConfirmado = false;
    datosVehiculo = null;
    document.getElementById('panelVIN').style.display = 'none';
    document.getElementById('infoVehiculo').textContent = '⚠️ Confirma el vehículo primero';
    document.getElementById('infoVehiculo').style.color = 'var(--texto-secundario)';
    
    // Vuelve a bloquear todo
    document.getElementById('pantallaSensores').classList.add('bloqueada');
    document.getElementById('pantallaCodigos').classList.add('bloqueada');
    document.getElementById('pantallaHerramientas').classList.add('bloqueada');
    document.querySelectorAll('[data-pantalla="pantallaSensores"], [data-pantalla="pantallaCodigos"], [data-pantalla="pantallaHerramientas"]').forEach(el => el.classList.add('bloqueado'));
}

function actualizarEstadoBloqueo() {
    if(!vehiculoConfirmado) {
        console.log('🔒 Funciones de diagnóstico bloqueadas: Confirmar vehículo requerido');
    }
}

// Funciones de ejemplo para DTC
function escanearCodigos() {
    if(!vehiculoConfirmado) return;
    document.getElementById('resumenCodigos').style.display = 'block';
    document.getElementById('cantGraves').textContent = '2';
    document.getElementById('cantLeves').textContent = '1';
    document.getElementById('cantTotal').textContent = '3';
}

function borrarCodigos() {
    if(!vehiculoConfirmado) return;
    document.getElementById('resumenCodigos').style.display = 'none';
    alert('✅ Códigos borrados correctamente');
}
