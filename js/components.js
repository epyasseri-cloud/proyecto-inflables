// ===== CARGA DE COMPONENTES REUTILIZABLES =====

/**
 * Función para cargar componentes HTML (header y footer)
 * Detecta automáticamente la profundidad de la ruta para ajustar las URLs
 */
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${componentPath}: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            
            // Después de cargar el header, actualizar enlaces activos
            if (elementId === 'header-container') {
                updateActiveLink();
            }
        }
    } catch (error) {
        console.error('Error cargando componente:', error);
    }
}

/**
 * Actualiza el enlace activo en el menú según la página actual
 */
function updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        
        // Comparar rutas
        if (currentPath.includes(linkPath) || 
            (currentPath.endsWith('/') && linkPath.includes('index.html')) ||
            (currentPath.endsWith('index.html') && linkPath.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

/**
 * Detecta la profundidad de la ruta actual para ajustar las URLs de los componentes
 */
function getComponentPath(component) {
    const path = window.location.pathname;
    
    // Si estamos en el root o index.html
    if (path.endsWith('/') || path.endsWith('index.html') || !path.includes('/views/')) {
        return `components/${component}-root.html`;
    }
    // Si estamos en views/principales/, views/cliente/ o views/extras/
    else if (path.includes('/views/')) {
        return `../../components/${component}.html`;
    }
    
    return `components/${component}.html`;
}

/**
 * Inicializa la carga de componentes cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        loadComponent('header-container', getComponentPath('header'));
    }
    
    // Cargar footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        loadComponent('footer-container', getComponentPath('footer'));
    }
});

/**
 * Función auxiliar para actualizar las rutas en los componentes según la ubicación
 */
function adjustComponentPaths() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    const footerLinks = document.querySelectorAll('.footer a');
    
    let prefix = '';
    
    if (path.includes('/views/principales/') || path.includes('/views/cliente/') || path.includes('/views/extras/')) {
        prefix = '../../';
    }
    
    // Actualizar enlaces del header
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('../')) {
            // Ya está ajustado
            return;
        } else if (href && !href.startsWith('http')) {
            link.setAttribute('href', prefix + href);
        }
    });
    
    // Actualizar enlaces del footer (opcional)
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('../')) {
            return;
        } else if (href && !href.startsWith('http') && !href.startsWith('#')) {
            if (!href.includes('index.html')) {
                link.setAttribute('href', prefix + href);
            }
        }
    });
}
