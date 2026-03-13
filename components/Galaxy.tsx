import React, { useEffect, useRef } from 'react';

interface GalaxyProps {
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  transparent?: boolean;
}

export const Galaxy: React.FC<GalaxyProps> = ({
  starSpeed = 0.2,
  density = 1,
  hueShift = 0,
  speed = 0.3,
  glowIntensity = 0.5,
  saturation = 100,
  mouseRepulsion = false,
  repulsionStrength = 2,
  twinkleIntensity = 0.5,
  rotationSpeed = 0,
  transparent = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    twinkle: number;
    hue: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      const numStars = Math.floor((canvas.width * canvas.height) * density * 0.0005);
      starsRef.current = [];
      
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          hue: (Math.random() * 60 + hueShift) % 360,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseRepulsion) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      time += 0.016;

      // Clear canvas
      if (transparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update z position (depth)
        star.z -= speed * starSpeed * 10;
        
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        // Calculate screen position with perspective
        const scale = 1000 / star.z;
        const screenX = (star.x - canvas.width / 2) * scale + canvas.width / 2;
        const screenY = (star.y - canvas.height / 2) * scale + canvas.height / 2;

        // Mouse repulsion
        if (mouseRepulsion) {
          const dx = screenX - mouseRef.current.x;
          const dy = screenY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const force = (150 - dist) / 150 * repulsionStrength;
            star.x += (dx / dist) * force;
            star.y += (dy / dist) * force;
          }
        }

        // Twinkle effect
        const twinkle = Math.sin(time * 3 + star.twinkle) * twinkleIntensity;
        const currentOpacity = star.opacity * (1 + twinkle * 0.5);

        // Draw star
        const size = star.size * scale;
        
        if (screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height) {
          ctx.save();
          
          // Glow effect
          if (glowIntensity > 0) {
            const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
            gradient.addColorStop(0, `hsla(${star.hue}, ${saturation}%, 80%, ${currentOpacity * glowIntensity})`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
            ctx.fill();
          }

          // Star core
          ctx.fillStyle = `hsla(${star.hue}, ${saturation}%, 90%, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      // Rotation effect
      if (rotationSpeed !== 0) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle = time * rotationSpeed * 0.01;
        
        starsRef.current.forEach((star) => {
          const dx = star.x - centerX;
          const dy = star.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const originalAngle = Math.atan2(dy, dx);
          const newAngle = originalAngle + angle * 0.001;
          
          star.x = centerX + Math.cos(newAngle) * dist;
          star.y = centerY + Math.sin(newAngle) * dist;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [starSpeed, density, hueShift, speed, glowIntensity, saturation, mouseRepulsion, repulsionStrength, twinkleIntensity, rotationSpeed, transparent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};
