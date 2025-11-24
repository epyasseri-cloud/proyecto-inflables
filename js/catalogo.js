// ===== FILTROS DEL CATÁLOGO =====

/**
 * Aplica los filtros seleccionados a los productos
 */
function aplicarFiltros() {
    const categoriaSeleccionada = document.getElementById('categoria').value;
    const precioSeleccionado = document.getElementById('precio').value;
    const capacidadSeleccionada = document.getElementById('capacidad').value;
    
    const productos = document.querySelectorAll('.producto-card');
    let productosVisibles = 0;
    
    productos.forEach(producto => {
        let mostrar = true;
        
        // Filtrar por categoría
        if (categoriaSeleccionada !== 'todos') {
            const categoria = producto.dataset.categoria;
            if (categoria !== categoriaSeleccionada) {
                mostrar = false;
            }
        }
        
        // Filtrar por precio
        if (precioSeleccionado !== 'todos' && mostrar) {
            const precio = parseInt(producto.dataset.precio);
            switch (precioSeleccionado) {
                case 'menor':
                    if (precio >= 500) mostrar = false;
                    break;
                case 'medio':
                    if (precio < 500 || precio > 700) mostrar = false;
                    break;
                case 'mayor':
                    if (precio <= 700) mostrar = false;
                    break;
            }
        }
        
        // Filtrar por capacidad
        if (capacidadSeleccionada !== 'todos' && mostrar) {
            const capacidad = producto.dataset.capacidad;
            if (capacidad !== capacidadSeleccionada) {
                mostrar = false;
            }
        }
        
        // Mostrar u ocultar producto con animación
        if (mostrar) {
            producto.style.display = 'flex';
            setTimeout(() => {
                producto.style.opacity = '1';
                producto.style.transform = 'translateY(0)';
            }, 10);
            productosVisibles++;
        } else {
            producto.style.opacity = '0';
            producto.style.transform = 'translateY(20px)';
            setTimeout(() => {
                producto.style.display = 'none';
            }, 300);
        }
    });
    
    // Mostrar mensaje si no hay productos
    const noResultados = document.getElementById('no-resultados');
    if (productosVisibles === 0) {
        noResultados.style.display = 'block';
    } else {
        noResultados.style.display = 'none';
    }
    
    // Scroll suave al catálogo
    document.querySelector('.catalogo-productos').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Reinicia todos los filtros
 */
function resetearFiltros() {
    document.getElementById('categoria').value = 'todos';
    document.getElementById('precio').value = 'todos';
    document.getElementById('capacidad').value = 'todos';
    aplicarFiltros();
}

/**
 * Aplicar filtros automáticamente al cambiar selección
 */
document.addEventListener('DOMContentLoaded', function() {
    const filtros = document.querySelectorAll('.filtro-select');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('change', aplicarFiltros);
    });
    
    // Animación inicial de productos
    const productos = document.querySelectorAll('.producto-card');
    productos.forEach((producto, index) => {
        producto.style.opacity = '0';
        producto.style.transform = 'translateY(20px)';
        producto.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            producto.style.opacity = '1';
            producto.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

/**
 * Contador de productos visibles
 */
function actualizarContador() {
    const productosVisibles = document.querySelectorAll('.producto-card[style*="display: flex"]').length;
    const total = document.querySelectorAll('.producto-card').length;
    
    console.log(`Mostrando ${productosVisibles} de ${total} productos`);
}

// Animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.producto-card');
    cards.forEach(card => observer.observe(card));
});

console.log('🛒 Catálogo de inflables cargado correctamente');
