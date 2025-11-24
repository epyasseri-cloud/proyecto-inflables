// ===== VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO =====

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-contacto');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validarFormularioContacto()) {
                enviarMensaje();
            }
        });
    }
});

/**
 * Valida todos los campos del formulario de contacto
 */
function validarFormularioContacto() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    if (!nombre || !email || !telefono || !asunto || !mensaje) {
        alert('Por favor completa todos los campos obligatorios');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor ingresa un email válido');
        return false;
    }
    
    // Validar longitud del mensaje
    if (mensaje.length < 10) {
        alert('El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    return true;
}

/**
 * Simula el envío del mensaje
 */
function enviarMensaje() {
    const form = document.getElementById('form-contacto');
    const formData = new FormData(form);
    
    // Mostrar loader
    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = 'Enviando...';
    btnSubmit.disabled = true;
    
    // Simular envío (en producción, aquí iría la petición al servidor)
    setTimeout(() => {
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado exitosamente! Te responderemos pronto.');
        
        // Limpiar formulario
        form.reset();
        
        // Restaurar botón
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;
        
        console.log('Datos del mensaje:', Object.fromEntries(formData));
        
    }, 1500);
}

/**
 * Copiar email al portapapeles
 */
function copiarEmail() {
    const email = 'info@elasticrent.com';
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiado al portapapeles');
    });
}

console.log('📧 Sistema de contacto cargado correctamente');
