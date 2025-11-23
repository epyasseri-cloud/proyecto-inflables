# Componentes Reutilizables

Esta carpeta contiene los componentes HTML reutilizables del proyecto.

## 📦 Componentes Disponibles

### Header
- **`header-root.html`** - Header para la página principal (index.html)
- **`header.html`** - Header para páginas internas (views/)

### Footer
- **`footer-root.html`** - Footer para la página principal (index.html)
- **`footer.html`** - Footer para páginas internas (views/)

## 🔧 Uso

### En el archivo HTML

Agrega los contenedores donde quieres que aparezcan los componentes:

```html
<!-- En el body, donde va el header -->
<div id="header-container"></div>

<!-- En el body, donde va el footer -->
<div id="footer-container"></div>

<!-- Antes de cerrar el body, cargar el script -->
<script src="js/components.js"></script>
```

### Rutas automáticas

El sistema `components.js` detecta automáticamente la ubicación del archivo y carga el componente correcto:

- **Desde `index.html`**: Carga `header-root.html` y `footer-root.html`
- **Desde `views/principales/`**: Carga `header.html` y `footer.html` con rutas `../../`
- **Desde `views/cliente/`**: Carga `header.html` y `footer.html` con rutas `../../`
- **Desde `views/extras/`**: Carga `header.html` y `footer.html` con rutas `../../`

## ✨ Ventajas

1. **Mantenimiento centralizado** - Edita el header/footer una vez y se actualiza en todas las páginas
2. **Consistencia** - Mismo diseño en todo el sitio
3. **Rutas automáticas** - No necesitas preocuparte por las rutas relativas
4. **Enlace activo** - El enlace de la página actual se marca automáticamente
