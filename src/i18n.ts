export type Language = 'es' | 'en';

interface Feature {
  title: string;
  description: string;
}

interface Translation {
  nav: {
    main: string;
    toggleMenu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    recommendation: string;
  };
  viewDemo: string;
  featuresTitle: string;
  features: Feature[];
  libraryDescriptions: Record<string, string>;
  footer: {
    createdBy: string;
    recommendedBy: string;
    sourceCode: string;
  };
}

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      main: 'Navegación principal',
      toggleMenu: 'Abrir o cerrar menú',
    },
    hero: {
      title: '🚀 React Common Libraries Showcase',
      subtitle: 'Colección interactiva de las mejores bibliotecas para React',
      description:
        'Explora ejemplos completos y funcionales de las bibliotecas más populares del ecosistema React. Cada ejemplo incluye código, documentación y casos de uso prácticos.',
      recommendation: '📚 Bibliotecas recomendadas por',
    },
    viewDemo: 'Ver Demo →',
    featuresTitle: '✨ Características',
    features: [
      {
        title: '🎯 Ejemplos Prácticos',
        description: 'Cada biblioteca incluye múltiples ejemplos de uso real',
      },
      {
        title: '📖 Código Completo',
        description: 'Código fuente disponible con explicaciones detalladas',
      },
      {
        title: '🎨 Diseño Moderno',
        description: 'Interfaz limpia y responsive para todos los dispositivos',
      },
      {
        title: '⚡ Rendimiento',
        description: 'Optimizado con Vite para desarrollo rápido',
      },
    ],
    libraryDescriptions: {
      chartjs: 'Gráficos interactivos y responsivos con Chart.js',
      'drag-and-drop':
        'Funcionalidad drag & drop con @formkit/drag-and-drop',
      fontsource: 'Carga tipografías web fácilmente con Fontsource',
      hotkeys: 'Atajos de teclado con hotkeys-js',
      motion: 'Animaciones fluidas con Framer Motion',
      'react-table': 'Tablas potentes con TanStack Table',
      zustand: 'Gestión de estado simple y efectiva',
      dayjs: 'Manipulación de fechas ligera y moderna',
      zod: 'Validación de esquemas TypeScript-first',
    },
    footer: {
      createdBy: '✨ Creado con ❤️ por',
      recommendedBy: '📚 Bibliotecas recomendadas por',
      sourceCode: '📂 Código fuente disponible en',
    },
  },
  en: {
    nav: {
      main: 'Main navigation',
      toggleMenu: 'Toggle menu',
    },
    hero: {
      title: '🚀 React Common Libraries Showcase',
      subtitle: 'Interactive collection of the best libraries for React',
      description:
        'Explore full and working examples of the most popular libraries in the React ecosystem. Each example includes code, documentation and practical use cases.',
      recommendation: '📚 Libraries recommended by',
    },
    viewDemo: 'View Demo →',
    featuresTitle: '✨ Features',
    features: [
      {
        title: '🎯 Practical Examples',
        description: 'Each library includes multiple real-world usage examples',
      },
      {
        title: '📖 Complete Code',
        description: 'Source code available with detailed explanations',
      },
      {
        title: '🎨 Modern Design',
        description: 'Clean, responsive interface for all devices',
      },
      {
        title: '⚡ Performance',
        description: 'Optimized with Vite for fast development',
      },
    ],
    libraryDescriptions: {
      chartjs: 'Interactive and responsive charts with Chart.js',
      'drag-and-drop':
        'Drag & drop functionality with @formkit/drag-and-drop',
      fontsource: 'Easily load web fonts with Fontsource',
      hotkeys: 'Keyboard shortcuts with hotkeys-js',
      motion: 'Smooth animations with Framer Motion',
      'react-table': 'Powerful tables with TanStack Table',
      zustand: 'Simple and effective state management',
      dayjs: 'Lightweight, modern date manipulation',
      zod: 'TypeScript-first schema validation',
    },
    footer: {
      createdBy: '✨ Made with ❤️ by',
      recommendedBy: '📚 Libraries recommended by',
      sourceCode: '📂 Source code available on',
    },
  },
};

