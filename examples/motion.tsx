import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  rotate: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
  },
};

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

function AnimationDemo({
  variant,
  children,
}: {
  variant: keyof typeof animationVariants;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="animation-box"
      variants={animationVariants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={springConfig}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

function FloatingCard() {
  return (
    <motion.div
      className="floating-card"
      animate={{
        y: [-10, 10, -10],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        y: -5,
      }}
    >
      <h4>🌟 Floating Card</h4>
      <p>Animación continua con hover</p>
    </motion.div>
  );
}

function StaggeredList() {
  const items = ["React", "TypeScript", "Framer Motion", "Vite"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.ul
      className="staggered-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          className="staggered-item"
          variants={itemVariants}
          whileHover={{ x: 10, backgroundColor: "#f0f9ff" }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function FramerMotionExample() {
  const [currentAnimation, setCurrentAnimation] =
    useState<keyof typeof animationVariants>("fadeIn");
  const [showElement, setShowElement] = useState(true);
  const [counter, setCounter] = useState(0);

  const cycleAnimation = () => {
    setShowElement(false);
    setTimeout(() => {
      const animations = Object.keys(
        animationVariants
      ) as (keyof typeof animationVariants)[];
      const currentIndex = animations.indexOf(currentAnimation);
      const nextIndex = (currentIndex + 1) % animations.length;
      setCurrentAnimation(animations[nextIndex]);
      setShowElement(true);
    }, 300);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>✨ Framer Motion</h1>
        <p>Animaciones fluidas y gestos interactivos para React</p>
      </div>

      <div className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="installation-code">
          <pre>
            <code>{`npm install framer-motion`}</code>
          </pre>
        </div>
        <p className="installation-note">
          Framer Motion es una biblioteca de animación lista para producción
          para React.
        </p>
      </div>

      <div className="motion-demo">
        {/* Demo de animaciones básicas */}
        <section className="demo-section">
          <h3>🎬 Animaciones Básicas</h3>
          <div className="animation-controls">
            <button onClick={cycleAnimation} className="btn btn-primary">
              🔄 Cambiar Animación
            </button>
            <span className="current-animation">
              Actual: <strong>{currentAnimation}</strong>
            </span>
          </div>

          <div className="animation-showcase">
            <AnimatePresence mode="wait">
              {showElement && (
                <AnimationDemo
                  key={currentAnimation}
                  variant={currentAnimation}
                >
                  <h4>🎯 {currentAnimation}</h4>
                  <p>Ejemplo de animación</p>
                </AnimationDemo>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Contador animado */}
        <section className="demo-section">
          <h3>🔢 Contador Animado</h3>
          <div className="counter-demo">
            <motion.div
              className="animated-counter"
              key={counter}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {counter}
            </motion.div>
            <div className="counter-buttons">
              <motion.button
                className="btn btn-secondary"
                onClick={() => setCounter(counter - 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ➖
              </motion.button>
              <motion.button
                className="btn btn-primary"
                onClick={() => setCounter(counter + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ➕
              </motion.button>
            </div>
          </div>
        </section>

        {/* Floating Card */}
        <section className="demo-section">
          <h3>🎈 Animación Continua</h3>
          <div className="floating-demo">
            <FloatingCard />
          </div>
        </section>

        {/* Lista con stagger */}
        <section className="demo-section">
          <h3>📋 Lista Escalonada</h3>
          <StaggeredList />
        </section>

        {/* Gestos y drag */}
        <section className="demo-section">
          <h3>👆 Interacciones</h3>
          <div className="interaction-demo">
            <motion.div
              className="draggable-box"
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, rotate: 5 }}
              initial={{ x: 0, y: 0 }}
            >
              <p>🔄 Arrástrame</p>
            </motion.div>

            <motion.button
              className="gesture-button"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#3b82f6",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              👆 Hover & Tap
            </motion.button>
          </div>
        </section>
      </div>

      <div className="motion-features">
        <h3>🚀 Características de Framer Motion:</h3>
        <div className="features-grid">
          <div className="feature">
            <h4>🎨 Declarativo</h4>
            <p>Animaciones definidas como props simples</p>
          </div>
          <div className="feature">
            <h4>⚡ Performante</h4>
            <p>Optimizado para 60fps usando transform y opacity</p>
          </div>
          <div className="feature">
            <h4>🤲 Gestos</h4>
            <p>Drag, hover, tap y más gestos nativos</p>
          </div>
          <div className="feature">
            <h4>🔧 Flexible</h4>
            <p>Desde animaciones simples hasta complejas coreografías</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>📖 Código de ejemplo:</h3>
        <pre>
          {`import { motion } from "framer-motion";

function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={{ left: -100, right: 100 }}
    >
      ¡Elemento animado!
    </motion.div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}
