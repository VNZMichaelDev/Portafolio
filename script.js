// Inicializar los iconos de Lucide
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Establecer el año actual en el footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Inicializar el tema
  initTheme();
  
  // Inicializar el menú móvil
  initMobileMenu();
  
  // Inicializar la navegación suave
  initSmoothScroll();
});

// Función para inicializar el tema
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Establecer el tema inicial
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
  
  // Manejar el cambio de tema
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    // Guardar la preferencia del usuario
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Función para inicializar el menú móvil
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Abrir/cerrar el menú móvil
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    
    // Cambiar el ícono del botón
    const icon = menuButton.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });
  
  // Cerrar el menú al hacer clic en un enlace
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = menuButton.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });
}

// Función para inicializar el desplazamiento suave
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Calcular la posición de desplazamiento (restando altura del header)
        const headerOffset = 80; // Altura aproximada del header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Desplazamiento suave
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Actualizar la URL sin recargar la página
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}