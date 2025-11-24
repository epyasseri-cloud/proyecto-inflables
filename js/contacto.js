// ===== VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO =====

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-contacto');
    
    if (form) {
        // Inicializar validaciones en tiempo real
        inicializarValidaciones();
        
        // Contador de caracteres para mensaje
        const mensajeTextarea = document.getElementById('mensaje');
        const contador = document.getElementById('contador-mensaje');
        
        if (mensajeTextarea && contador) {
            mensajeTextarea.addEventListener('input', function() {
                const length = this.value.length;
                contador.textContent = `${length}/500 caracteres`;
                
                if (length < 10) {
                    contador.style.color = '#f44336';
                } else if (length > 450) {
                    contador.style.color = '#ff9800';
                } else {
                    contador.style.color = '#4caf50';
                }
            });
        }
        
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
 * Inicializa validaciones en tiempo real
 */
function inicializarValidaciones() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const mensaje = document.getElementById('mensaje');
    
    // Validación de nombre - solo letras
    if (nombre) {
        nombre.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            validarCampo('nombre', this.value.trim());
        });
        
        nombre.addEventListener('blur', function() {
            validarCampo('nombre', this.value.trim());
        });
    }
    
    // Validación de email
    if (email) {
        email.addEventListener('blur', function() {
            validarCampo('email', this.value.trim());
        });
    }
    
    // Validación de teléfono - solo números, máximo 10
    if (telefono) {
        telefono.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 10);
            validarCampo('telefono', this.value);
        });
        
        telefono.addEventListener('blur', function() {
            validarCampo('telefono', this.value);
        });
    }
    
    // Validación de mensaje
    if (mensaje) {
        mensaje.addEventListener('blur', function() {
            validarCampo('mensaje', this.value.trim());
        });
    }
}

/**
 * Valida un campo específico y muestra errores
 */
function validarCampo(campo, valor) {
    const errorElement = document.getElementById(`error-${campo}`);
    const inputElement = document.getElementById(campo);
    let error = '';
    
    switch(campo) {
        case 'nombre':
            if (valor.length === 0) {
                error = 'El nombre es obligatorio';
            } else if (valor.length < 3) {
                error = 'El nombre debe tener al menos 3 caracteres';
            } else if (valor.length > 50) {
                error = 'El nombre no puede exceder 50 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                error = 'El nombre solo puede contener letras';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor.length === 0) {
                error = 'El email es obligatorio';
            } else if (!emailRegex.test(valor)) {
                error = 'Ingresa un email válido (ejemplo: usuario@dominio.com)';
            } else if (valor.length > 100) {
                error = 'El email es demasiado largo';
            }
            break;
            
        case 'telefono':
            if (valor.length === 0) {
                error = 'El teléfono es obligatorio';
            } else if (valor.length < 10) {
                error = `Faltan ${10 - valor.length} dígitos`;
            } else if (valor.length > 10) {
                error = 'El teléfono debe tener exactamente 10 dígitos';
            } else if (!/^[0-9]{10}$/.test(valor)) {
                error = 'El teléfono solo puede contener números';
            }
            break;
            
        case 'mensaje':
            if (valor.length === 0) {
                error = 'El mensaje es obligatorio';
            } else if (valor.length < 10) {
                error = `Faltan ${10 - valor.length} caracteres (mínimo 10)`;
            } else if (valor.length > 500) {
                error = 'El mensaje no puede exceder 500 caracteres';
            }
            break;
    }
    
    if (errorElement) {
        errorElement.textContent = error;
        errorElement.style.display = error ? 'block' : 'none';
    }
    
    if (inputElement) {
        if (error) {
            inputElement.classList.add('input-error');
            inputElement.classList.remove('input-valid');
        } else if (valor.length > 0) {
            inputElement.classList.remove('input-error');
            inputElement.classList.add('input-valid');
        } else {
            inputElement.classList.remove('input-error', 'input-valid');
        }
    }
    
    return error === '';
}

/**
 * Valida todos los campos del formulario de contacto
 */
function validarFormularioContacto() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validar cada campo
    const nombreValido = validarCampo('nombre', nombre);
    const emailValido = validarCampo('email', email);
    const telefonoValido = validarCampo('telefono', telefono);
    const mensajeValido = validarCampo('mensaje', mensaje);
    
    // Validar asunto
    const errorAsunto = document.getElementById('error-asunto');
    if (!asunto) {
        errorAsunto.textContent = 'Por favor selecciona un asunto';
        errorAsunto.style.display = 'block';
        return false;
    } else {
        errorAsunto.style.display = 'none';
    }
    
    // Si algún campo no es válido, no permitir envío
    if (!nombreValido || !emailValido || !telefonoValido || !mensajeValido) {
        // Enfocar el primer campo con error
        if (!nombreValido) document.getElementById('nombre').focus();
        else if (!emailValido) document.getElementById('email').focus();
        else if (!telefonoValido) document.getElementById('telefono').focus();
        else if (!mensajeValido) document.getElementById('mensaje').focus();
        
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
        alert('¡Mensaje enviado exitosamente! Te responderemos en menos de 24 horas.');
        
        // Limpiar formulario y validaciones
        form.reset();
        
        // Limpiar mensajes de error
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        
        // Limpiar clases de validación
        document.querySelectorAll('.input-error, .input-valid').forEach(el => {
            el.classList.remove('input-error', 'input-valid');
        });
        
        // Restaurar contador
        const contador = document.getElementById('contador-mensaje');
        if (contador) {
            contador.textContent = '0/500 caracteres';
            contador.style.color = '#666';
        }
        
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

console.log('📧 Sistema de contacto con validaciones cargado correctamente');
