import React, { useRef, useEffect } from 'react';
import './VoidParticles.css';

const VoidParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));

    const supernovas = [];
    const supernovaChance = 0.001; // ~0.1% chance per frame for a very rare supernova

    const draw = () => {
      ctx.fillStyle = 'rgba(11,11,22,0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(128,0,255,0.8)';
        ctx.shadowColor = '#5500aa';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      if (Math.random() < supernovaChance) {
        const p = particles[Math.floor(Math.random() * particles.length)];
        supernovas.push({ x: p.x, y: p.y, radius: p.radius, alpha: 1 });
      }

      for (let i = supernovas.length - 1; i >= 0; i--) {
        const s = supernovas[i];
        s.radius += 2;
        s.alpha -= 0.03;
        if (s.alpha <= 0) {
          supernovas.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.shadowColor = '#ff44ff';
        ctx.shadowBlur = 15;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="void-canvas" />;
};

export default VoidParticles;
