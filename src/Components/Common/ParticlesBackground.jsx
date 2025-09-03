import React, { useEffect, useRef } from "react";

const AshParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Création et configuration du canvas pour l'animation de particules
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Configuration du style pour couvrir toute la page
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    // Ajouter au conteneur plutôt qu'au body directement
    containerRef.current.appendChild(canvas);

    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      return { width, height };
    };

    let { width, height } = updateCanvasSize();

    // Classe représentant une particule de cendre avec propriétés physiques et visuelles
    class AshParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      // Réinitialise les propriétés de la particule pour une nouvelle chute
      reset() {
        this.x = Math.random() * width;
        this.y = -5 - Math.random() * 200;
        this.size = Math.random() * 3 + 1.5;
        this.speed = Math.random() * 0.15 + 0.1;
        this.horizontalSpeed = (Math.random() - 0.5) * 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;

        // Définition des couleurs rouge foncé pour un effet incandescent
        const baseRed = Math.floor(Math.random() * 40 + 90);
        this.color = {
          r: baseRed,
          g: Math.floor(Math.random() * 15 + 15),
          b: Math.floor(Math.random() * 15 + 15),
        };

        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.opacity = 0.6 + Math.random() * 0.3;
        this.currentOpacity = this.opacity;

        // Génération d'une forme irrégulière pour simuler une cendre
        this.shapePoints = this.generateAshShape();
      }

      // Génère des points pour créer une forme de cendre non symétrique
      generateAshShape() {
        const points = [];
        const numPoints = 6 + Math.floor(Math.random() * 4);
        const baseSize = this.size;

        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const variation = 0.3 + Math.random() * 0.4;
          const pointSize = baseSize * variation;

          points.push({
            x: Math.cos(angle) * pointSize,
            y: Math.sin(angle) * pointSize,
            radius: pointSize * 0.3,
          });
        }

        return points;
      }

      // Met à jour la position et les propriétés de la particule
      update() {
        this.y += this.speed;
        this.x +=
          this.horizontalSpeed +
          Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.05;
        this.rotation += this.rotationSpeed;

        // Calcule l'opacité pulsante pour un effet de luminosité variable
        const pulseValue =
          Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.15 +
          0.85;
        this.currentOpacity = this.opacity * pulseValue;

        // Réinitialise la particule si elle sort de l'écran
        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      // Dessine la particule sur le canvas avec effets visuels avancés
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Dessine la forme irrégulière de la cendre
        ctx.beginPath();

        if (this.shapePoints.length > 0) {
          ctx.moveTo(this.shapePoints[0].x, this.shapePoints[0].y);

          for (let i = 0; i < this.shapePoints.length; i++) {
            const nextIndex = (i + 1) % this.shapePoints.length;
            const cpX =
              (this.shapePoints[i].x + this.shapePoints[nextIndex].x) / 2;
            const cpY =
              (this.shapePoints[i].y + this.shapePoints[nextIndex].y) / 2;

            ctx.quadraticCurveTo(
              this.shapePoints[i].x,
              this.shapePoints[i].y,
              cpX,
              cpY
            );
          }

          ctx.closePath();
        } else {
          // Fallback simple si problème avec la forme
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        }

        // Crée un dégradé radial pour l'effet incandescent
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);

        gradient.addColorStop(
          0,
          `rgba(${this.color.r + 50}, ${this.color.g + 10}, ${
            this.color.b + 5
          }, ${this.currentOpacity})`
        );

        gradient.addColorStop(
          0.4,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
            this.currentOpacity * 0.8
          })`
        );

        gradient.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.fill();

        // Ajoute un contour subtil pour plus de réalisme
        ctx.strokeStyle = `rgba(${this.color.r - 30}, ${this.color.g - 10}, ${
          this.color.b - 5
        }, ${this.currentOpacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    // Création du tableau de particules
    const ashParticles = [];

    // Initialisation des particules
    for (let i = 0; i < 100; i++) {
      ashParticles.push(new AshParticle());
    }

    let animationFrameId = null;

    // Boucle d'animation principale
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Applique un effet de fondu pour créer une traînée
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      // Met à jour et dessine toutes les particules
      for (let i = 0; i < ashParticles.length; i++) {
        ashParticles[i].update();
        ashParticles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // Gestion du redimensionnement de la fenêtre
    const handleResize = () => {
      const newSize = updateCanvasSize();
      width = newSize.width;
      height = newSize.height;

      // Réinitialiser les particules pour la nouvelle taille
      for (let i = 0; i < ashParticles.length; i++) {
        ashParticles[i].reset();
      }
    };

    window.addEventListener("resize", handleResize);

    // Lancement de l'animation
    animate();

    // Nettoyage des ressources lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (containerRef.current && containerRef.current.contains(canvas)) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default AshParticles;
