let vehiculoConfirmado = false;
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
            
            if(!vehiculoConfirmado && pantallaDestino !== 'pantallaConexion') {
                mostrarAviso('🔒 Debes confirmar los datos del vehículo primero para acceder a esta sección');
                return;
            }

            document.querySelectorAll('.boton-nav').forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
            document.getElementById(pantallaDestino).classList.add('activa');
        });
    });
}

function configurarBotones() {
    document.getElementById('btnConectar').addEventListener('click', () => {
        mostrarAviso('📶 Conectando al adaptador...');
        // Aquí iría la lógica real de conexión
    });
    document.getElementById('btnReintentar').addEventListener('click', () => {
        mostrarAviso('🔄 Reintentando conexión...');
    });
    document.getElementById('btnLeerVIN').addEventListener('click', mostrarDatosEjemplo);
    document.getElementById('btnConfirmarVehiculo').addEventListener('click', confirmarVehiculo);
    document.getElementById('btnCancelarVehiculo').addEventListener('click', cancelarDatosVehiculo);
    document.getElementById('btnEscanear').addEventListener('click', escanearCodigos);
    document.getElementById('btnBorrar').addEventListener('click', borrarCodigos);
}

// ✅ FUNCIÓN PARA MOSTRAR MENSAJES SIN ORIGEN
function mostrarAviso(texto) {
    // Usamos alert personalizado para evitar el encabezado del navegador
    const aviso = document.createElement('div');
    aviso.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(18,22,28,0.95); color: white; padding: 24px; border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.15); z-index: 9999; text-align: center;
        width: 85%; max-width: 350px; font-size: 16px;
    `;
    aviso.innerHTML = `
        <p style="margin:0 0 20px 0;">${texto}</p>
        <button onclick="this.parentElement.remove()" style="
            background: #3B82F6; color: white; border: none; padding: 12px 24px;
            border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer;
        ">Aceptar</button>
    `;
    document.body.appendChild(aviso);
}

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

function confirmarVehiculo() {
    vehiculoConfirmado = true;
    document.getElementById('infoVehiculo').textContent = `${datosVehiculo.marca} ${datosVehiculo.modelo} ${datosVehiculo.anio}`;
    document.getElementById('infoVehiculo').style.color = 'var(--acento-verde)';
    
    document.getElementById('pantallaSensores').classList.remove('bloqueada');
    document.getElementById('pantallaCodigos').classList.remove('bloqueada');
    document.getElementById('pantallaHerramientas').classList.remove('bloqueada');
    document.querySelectorAll('[data-pantalla="pantallaSensores"], [data-pantalla="pantallaCodigos"], [data-pantalla="pantallaHerramientas"]').forEach(el => el.classList.remove('bloqueado'));
    
    mostrarAviso('✅ Vehículo confirmado! Ahora tienes acceso a todas las funciones');
}

function cancelarDatosVehiculo() {
    vehiculoConfirmado = false;
    datosVehiculo = null;
    document.getElementById('panelVIN').style.display = 'none';
    document.getElementById('infoVehiculo').textContent = '⚠️ Confirma el vehículo primero';
    document.getElementById('infoVehiculo').style.color = 'var(--texto-secundario)';
    
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

function escanearCodigos() {
    if(!vehiculoConfirmado) return;
    mostrarAviso('🔄 Escaneando códigos de falla...');
    document.getElementById('resumenCodigos').style.display = 'block';
    document.getElementById('cantGraves').textContent = '2';
    document.getElementById('cantLeves').textContent = '1';
    document.getElementById('cantTotal').textContent = '3';
}

function borrarCodigos() {
    if(!vehiculoConfirmado) return;
    mostrarAviso('🗑️ Borrando códigos y apagando Check Engine...');
    document.getElementById('resumenCodigos').style.display = 'none';
    mostrarAviso('✅ Códigos borrados correctamente');
}
