// ===== VALIDACIÓN Y ENVÍO DEL FORMULARIO DE RESERVAS =====

// Datos de ciudades por estado
const ciudadesPorEstado = {
    'ciudad-de-mexico': [
        'Álvaro Obregón', 'Azcapotzalco', 'Benito Juárez', 'Coyoacán', 'Cuajimalpa',
        'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco', 'Iztapalapa', 'Magdalena Contreras',
        'Miguel Hidalgo', 'Milpa Alta', 'Tláhuac', 'Tlalpan', 'Venustiano Carranza', 'Xochimilco'
    ],
    'estado-de-mexico': [
        'Ecatepec', 'Naucalpan', 'Nezahualcóyotl', 'Tlalnepantla', 'Toluca', 'Atizapán',
        'Cuautitlán Izcalli', 'Chimalhuacán', 'Texcoco', 'Metepec', 'Coacalco', 'Chalco',
        'Tultitlán', 'Ixtapaluca', 'Valle de Chalco', 'Nicolás Romero', 'Tecámac'
    ],
    'jalisco': [
        'Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Tlajomulco', 'Puerto Vallarta',
        'Lagos de Moreno', 'Tepatitlán', 'El Salto', 'Chapala'
    ],
    'nuevo-leon': [
        'Monterrey', 'Guadalupe', 'San Nicolás', 'Apodaca', 'San Pedro Garza García',
        'General Escobedo', 'Santa Catarina', 'García', 'Cadereyta'
    ],
    'puebla': [
        'Puebla', 'Tehuacán', 'San Martín Texmelucan', 'Atlixco', 'Cholula',
        'Amozoc', 'Cuautlancingo', 'Teziutlán'
    ],
    'guanajuato': [
        'León', 'Irapuato', 'Celaya', 'Salamanca', 'Guanajuato', 'San Miguel de Allende',
        'Silao', 'Pénjamo', 'Cortazar', 'Moroleón'
    ],
    'chihuahua': [
        'Chihuahua', 'Ciudad Juárez', 'Cuauhtémoc', 'Delicias', 'Parral', 'Nuevo Casas Grandes'
    ],
    'veracruz': [
        'Veracruz', 'Xalapa', 'Coatzacoalcos', 'Córdoba', 'Poza Rica', 'Orizaba',
        'Minatitlán', 'Tuxpan', 'Papantla'
    ],
    'yucatan': [
        'Mérida', 'Valladolid', 'Tizimín', 'Progreso', 'Ticul', 'Motul'
    ],
    'quintana-roo': [
        'Cancún', 'Playa del Carmen', 'Chetumal', 'Cozumel', 'Tulum', 'Isla Mujeres'
    ],
    'baja-california': [
        'Tijuana', 'Mexicali', 'Ensenada', 'Rosarito', 'Tecate'
    ],
    'sonora': [
        'Hermosillo', 'Ciudad Obregón', 'Nogales', 'San Luis Río Colorado', 'Navojoa', 'Guaymas'
    ],
    'coahuila': [
        'Saltillo', 'Torreón', 'Monclova', 'Piedras Negras', 'Acuña'
    ],
    'tamaulipas': [
        'Reynosa', 'Matamoros', 'Nuevo Laredo', 'Tampico', 'Ciudad Victoria', 'Ciudad Madero'
    ],
    'sinaloa': [
        'Culiacán', 'Mazatlán', 'Los Mochis', 'Guasave', 'Guamúchil'
    ],
    'michoacan': [
        'Morelia', 'Uruapan', 'Zamora', 'Lázaro Cárdenas', 'Pátzcuaro', 'Apatzingán'
    ],
    'oaxaca': [
        'Oaxaca de Juárez', 'Salina Cruz', 'Juchitán', 'Tuxtepec', 'Huajuapan'
    ],
    'queretaro': [
        'Santiago de Querétaro', 'San Juan del Río', 'Corregidora', 'El Marqués'
    ],
    'san-luis-potosi': [
        'San Luis Potosí', 'Soledad de Graciano Sánchez', 'Ciudad Valles', 'Matehuala'
    ],
    'aguascalientes': [
        'Aguascalientes', 'Jesús María', 'Calvillo', 'Rincón de Romos'
    ],
    'morelos': [
        'Cuernavaca', 'Jiutepec', 'Cuautla', 'Temixco', 'Yautepec'
    ],
    'hidalgo': [
        'Pachuca', 'Tulancingo', 'Tula', 'Tepeji del Río', 'Tizayuca'
    ],
    'tabasco': [
        'Villahermosa', 'Cárdenas', 'Comalcalco', 'Huimanguillo', 'Macuspana'
    ],
    'chiapas': [
        'Tuxtla Gutiérrez', 'Tapachula', 'San Cristóbal de las Casas', 'Comitán', 'Palenque'
    ],
    'guerrero': [
        'Acapulco', 'Chilpancingo', 'Iguala', 'Zihuatanejo', 'Taxco'
    ],
    'durango': [
        'Durango', 'Gómez Palacio', 'Lerdo', 'Santiago Papasquiaro'
    ],
    'zacatecas': [
        'Zacatecas', 'Fresnillo', 'Guadalupe', 'Jerez'
    ],
    'nayarit': [
        'Tepic', 'Bahía de Banderas', 'Xalisco', 'Santiago Ixcuintla'
    ],
    'colima': [
        'Colima', 'Manzanillo', 'Tecomán', 'Villa de Álvarez'
    ],
    'tlaxcala': [
        'Tlaxcala', 'Apizaco', 'Huamantla', 'Chiautempan'
    ],
    'campeche': [
        'Campeche', 'Ciudad del Carmen', 'Champotón'
    ],
    'baja-california-sur': [
        'La Paz', 'Los Cabos', 'Cabo San Lucas', 'San José del Cabo'
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-reserva');
    
    if (form) {
        // Establecer fecha mínima (hoy)
        const fechaInput = document.getElementById('fecha');
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', hoy);
        
        // Manejar cambio de estado para actualizar ciudades
        const estadoSelect = document.getElementById('estado');
        const ciudadSelect = document.getElementById('ciudad');
        
        estadoSelect.addEventListener('change', function() {
            actualizarCiudades(this.value);
        });
        
        // Cargar ciudades de CDMX por defecto si está seleccionado
        if (estadoSelect.value === 'ciudad-de-mexico') {
            actualizarCiudades('ciudad-de-mexico');
        }
        
        // Inicializar validaciones en tiempo real
        inicializarValidaciones();
        
        // Contador de caracteres para comentarios
        const comentariosTextarea = document.getElementById('comentarios');
        const contador = document.getElementById('contador-comentarios');
        
        if (comentariosTextarea && contador) {
            comentariosTextarea.addEventListener('input', function() {
                const length = this.value.length;
                contador.textContent = `${length}/500 caracteres`;
                
                if (length > 450) {
                    contador.style.color = '#ff9800';
                } else {
                    contador.style.color = '#666';
                }
            });
        }
        
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
 * Actualiza las opciones de ciudades según el estado seleccionado
 */
function actualizarCiudades(estado) {
    const ciudadSelect = document.getElementById('ciudad');
    
    // Limpiar opciones actuales
    ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>';
    
    // Si hay un estado seleccionado, cargar sus ciudades
    if (estado && ciudadesPorEstado[estado]) {
        ciudadSelect.disabled = false;
        
        ciudadesPorEstado[estado].forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad.toLowerCase().replace(/\s+/g, '-');
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
        });
    } else {
        ciudadSelect.disabled = true;
        ciudadSelect.innerHTML = '<option value="">Primero selecciona un estado</option>';
    }
}

/**
 * Inicializa validaciones en tiempo real
 */
function inicializarValidaciones() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const codigoPostal = document.getElementById('codigo-postal');
    const fecha = document.getElementById('fecha');
    const numNinos = document.getElementById('num-ninos');
    const calle = document.getElementById('calle');
    const numero = document.getElementById('numero');
    const colonia = document.getElementById('colonia');
    
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
    
    // Validación de código postal - solo números, máximo 5
    if (codigoPostal) {
        codigoPostal.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 5);
            validarCampo('codigo-postal', this.value);
        });
        
        codigoPostal.addEventListener('blur', function() {
            validarCampo('codigo-postal', this.value);
        });
    }
    
    // Validación de fecha
    if (fecha) {
        fecha.addEventListener('change', function() {
            validarCampo('fecha', this.value);
        });
    }
    
    // Validación de número de niños
    if (numNinos) {
        numNinos.addEventListener('input', function() {
            if (this.value > 100) this.value = 100;
            if (this.value < 0) this.value = '';
            validarCampo('num-ninos', this.value);
        });
    }
    
    // Validación de calle
    if (calle) {
        calle.addEventListener('blur', function() {
            validarCampo('calle', this.value.trim());
        });
    }
    
    // Validación de número exterior
    if (numero) {
        numero.addEventListener('blur', function() {
            validarCampo('numero', this.value.trim());
        });
    }
    
    // Validación de colonia
    if (colonia) {
        colonia.addEventListener('blur', function() {
            validarCampo('colonia', this.value.trim());
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
            
        case 'ciudad':
            if (valor.length === 0) {
                error = 'La ciudad es obligatoria';
            } else if (valor.length < 3) {
                error = 'La ciudad debe tener al menos 3 caracteres';
            } else if (valor.length > 50) {
                error = 'El nombre de la ciudad es demasiado largo';
            }
            break;
            
        case 'codigo-postal':
            if (valor.length === 0) {
                error = 'El código postal es obligatorio';
            } else if (valor.length < 5) {
                error = `Faltan ${5 - valor.length} dígitos`;
            } else if (!/^[0-9]{5}$/.test(valor)) {
                error = 'El código postal debe tener exactamente 5 dígitos';
            }
            break;
            
        case 'fecha':
            if (valor.length === 0) {
                error = 'La fecha es obligatoria';
            } else {
                const fechaSeleccionada = new Date(valor);
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                
                if (fechaSeleccionada < hoy) {
                    error = 'La fecha no puede ser anterior a hoy';
                } else {
                    const diasAnticipacion = Math.floor((fechaSeleccionada - hoy) / (1000 * 60 * 60 * 24));
                    if (diasAnticipacion < 2) {
                        error = 'Recomendamos reservar con al menos 2 días de anticipación';
                    }
                }
            }
            break;
            
        case 'num-ninos':
            if (valor && (valor < 1 || valor > 100)) {
                error = 'El número debe estar entre 1 y 100';
            }
            break;
            
        case 'calle':
            if (valor.length === 0) {
                error = 'La calle es obligatoria';
            } else if (valor.length < 3) {
                error = 'La calle debe tener al menos 3 caracteres';
            } else if (valor.length > 100) {
                error = 'El nombre de la calle es demasiado largo';
            }
            break;
            
        case 'numero':
            if (valor.length === 0) {
                error = 'El número exterior es obligatorio';
            } else if (valor.length > 10) {
                error = 'El número es demasiado largo';
            }
            break;
            
        case 'colonia':
            if (valor.length === 0) {
                error = 'La colonia es obligatoria';
            } else if (valor.length < 3) {
                error = 'La colonia debe tener al menos 3 caracteres';
            } else if (valor.length > 50) {
                error = 'El nombre de la colonia es demasiado largo';
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
 * Valida todos los campos del formulario
 */
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const estado = document.getElementById('estado').value;
    const ciudad = document.getElementById('ciudad').value;
    const codigoPostal = document.getElementById('codigo-postal').value.trim();
    const fecha = document.getElementById('fecha').value;
    const horario = document.getElementById('horario').value;
    const tipoEvento = document.getElementById('tipo-evento').value;
    const producto = document.getElementById('producto').value;
    const calle = document.getElementById('calle').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const colonia = document.getElementById('colonia').value.trim();
    const terminos = document.getElementById('terminos').checked;
    
    // Validar cada campo
    const nombreValido = validarCampo('nombre', nombre);
    const emailValido = validarCampo('email', email);
    const telefonoValido = validarCampo('telefono', telefono);
    const codigoPostalValido = validarCampo('codigo-postal', codigoPostal);
    const fechaValido = validarCampo('fecha', fecha);
    const calleValida = validarCampo('calle', calle);
    const numeroValido = validarCampo('numero', numero);
    const coloniaValida = validarCampo('colonia', colonia);
    
    // Validar estado
    const errorEstado = document.getElementById('error-estado');
    if (!estado) {
        errorEstado.textContent = 'Selecciona un estado';
        errorEstado.style.display = 'block';
    } else {
        errorEstado.style.display = 'none';
    }
    
    // Validar ciudad
    const errorCiudad = document.getElementById('error-ciudad');
    if (!ciudad) {
        errorCiudad.textContent = 'Selecciona una ciudad';
        errorCiudad.style.display = 'block';
    } else {
        errorCiudad.style.display = 'none';
    }
    
    // Validar selects
    const errorHorario = document.getElementById('error-horario');
    if (!horario) {
        errorHorario.textContent = 'Selecciona un horario';
        errorHorario.style.display = 'block';
    } else {
        errorHorario.style.display = 'none';
    }
    
    const errorTipoEvento = document.getElementById('error-tipo-evento');
    if (!tipoEvento) {
        errorTipoEvento.textContent = 'Selecciona el tipo de evento';
        errorTipoEvento.style.display = 'block';
    } else {
        errorTipoEvento.style.display = 'none';
    }
    
    const errorProducto = document.getElementById('error-producto');
    if (!producto) {
        errorProducto.textContent = 'Selecciona un producto';
        errorProducto.style.display = 'block';
    } else {
        errorProducto.style.display = 'none';
    }
    
    // Validar términos
    const errorTerminos = document.getElementById('error-terminos');
    if (!terminos) {
        errorTerminos.textContent = 'Debes aceptar los términos y condiciones';
        errorTerminos.style.display = 'block';
    } else {
        errorTerminos.style.display = 'none';
    }
    
    // Si algún campo no es válido, no permitir envío
    if (!nombreValido || !emailValido || !telefonoValido || !codigoPostalValido || 
        !fechaValido || !calleValida || !numeroValido || !coloniaValida || 
        !estado || !ciudad || !horario || !tipoEvento || !producto || !terminos) {
        
        // Enfocar el primer campo con error
        if (!nombreValido) document.getElementById('nombre').focus();
        else if (!emailValido) document.getElementById('email').focus();
        else if (!telefonoValido) document.getElementById('telefono').focus();
        else if (!estado) document.getElementById('estado').focus();
        else if (!ciudad) document.getElementById('ciudad').focus();
        else if (!codigoPostalValido) document.getElementById('codigo-postal').focus();
        else if (!fechaValido) document.getElementById('fecha').focus();
        else if (!horario) document.getElementById('horario').focus();
        else if (!tipoEvento) document.getElementById('tipo-evento').focus();
        else if (!producto) document.getElementById('producto').focus();
        else if (!calleValida) document.getElementById('calle').focus();
        else if (!numeroValido) document.getElementById('numero').focus();
        else if (!coloniaValida) document.getElementById('colonia').focus();
        else if (!terminos) document.getElementById('terminos').focus();
        
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
    
    // Mostrar loader
    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.textContent = 'Enviando...';
    btnSubmit.disabled = true;
    
    // Simular envío (en producción, aquí iría la petición al servidor)
    setTimeout(() => {
        // Mostrar mensaje de éxito
        alert('¡Reserva enviada exitosamente! Te contactaremos en menos de 1 hora para confirmar.');
        
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
        const contador = document.getElementById('contador-comentarios');
        if (contador) {
            contador.textContent = '0/500 caracteres';
            contador.style.color = '#666';
        }
        
        // Restaurar botón
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;
        
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

console.log('📋 Sistema de reservas con validaciones cargado correctamente');
