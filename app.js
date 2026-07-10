document.addEventListener('DOMContentLoaded', () => {
    // Navegación
    document.querySelectorAll('.boton-nav').forEach(b => {
        b.addEventListener('click', () => {
            document.querySelectorAll('.boton-nav').forEach(x => x.classList.remove('activo'));
            b.classList.add('activo');
            document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
            document.getElementById(b.dataset.pantalla).classList.add('activa');
        });
    });

    // Botones DTC
    document.getElementById('btnEscanear').addEventListener('click', () => {
        document.getElementById('resumenCodigos').style.display = 'block';
        document.getElementById('cantGraves').textContent = '2';
        document.getElementById('cantLeves').textContent = '1';
        document.getElementById('cantHistoricos').textContent = '1';
        document.getElementById('cantTotal').textContent = '4';
        document.getElementById('listaCodigos').innerHTML = `
            <div class="tarjeta-vidrio codigo-tarjeta codigo-grave">
                <h3>P0300 - Falla encendido aleatoria</h3>
                <p>Causas: Bujías desgastadas, bobinas defectuosas</p>
                <p>Soluciones: Revisar bujías y cambiar si es necesario</p>
            </div>
            <div class="tarjeta-vidrio codigo-tarjeta codigo-leve">
                <h3>B1000 - Falla módulo carrocería</h3>
                <p>Causas: Conexiones sueltas</p>
            </div>
        `;
    });

    document.getElementById('btnBorrar').addEventListener('click', () => {
        document.getElementById('resumenCodigos').style.display = 'none';
        document.getElementById('listaCodigos').innerHTML = '<div class="tarjeta-vidrio aviso"><p>✅ Códigos borrados, Check Engine apagado</p></div>';
    });
});
