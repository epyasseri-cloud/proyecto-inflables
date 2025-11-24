// ===== VALIDACIÓN Y ENVÍO DEL FORMULARIO DE RESERVAS =====

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-reserva');
    
    if (form) {
        // Establecer fecha mínima (hoy)
        const fechaInput = document.getElementById('fecha');
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', hoy);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validarFormulario()) {
                enviarReserva();
            }
        });
    }
});

/**
 * Valida todos los campos del formulario
 */
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const fecha = document.getElementById('fecha').value;
    const terminos = document.getElementById('terminos').checked;
    
    if (!nombre || !telefono || !email || !fecha) {
        alert('Por favor completa todos los campos obligatorios');
        return false;
    }
    
    if (!terminos) {
        alert('Debes aceptar los términos y condiciones');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido');
        return false;
    }
    
    // Validar que la fecha no sea pasada
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
        alert('La fecha no puede ser anterior a hoy');
        return false;
    }
    
    return true;
}

/**
 * Simula el envío de la reserva
 */
function enviarReserva() {
    const form = document.getElementById('form-reserva');
    const formData = new FormData(form);
    
    // Mostrar loader (simulado)
    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = 'Enviando...';
    btnSubmit.disabled = true;
    
    // Simular envío (en producción, aquí iría la petición al servidor)
    setTimeout(() => {
        // Mostrar mensaje de éxito
        alert('¡Reserva enviada exitosamente! Te contactaremos pronto.');
        
        // Limpiar formulario
        form.reset();
        
        // Restaurar botón
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;
        
        // Opcional: redirigir o mostrar modal de confirmación
        console.log('Datos de la reserva:', Object.fromEntries(formData));
        
    }, 1500);
}

/**
 * Calcula el precio estimado según el producto seleccionado
 */
function calcularPrecio() {
    const producto = document.getElementById('producto').value;
    const precios = {
        'castillo-saltarin': 500,
        'trampolin-happy': 400,
        'tobogan-aventura': 700,
        'castillo-princesas': 600,
        'combo-fiesta': 850,
        'tobogan-acuatico': 650
    };
    
    return precios[producto] || 0;
}

console.log('📋 Sistema de reservas cargado correctamente');
