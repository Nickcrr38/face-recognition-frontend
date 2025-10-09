import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBg = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        fpsLimit: 45,
        particles: {
          number: { value: 25 },
          color: { value: '#000000ff' },
          shape: { type: 'circle' },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 1.5, outModes: { default: 'out' } },
          links: { enable: true, color: '#000000ff', distance: 120, opacity: 0.3, width: 1 },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: { repulse: { distance: 80 }, push: { quantity: 2 } },
        },
      }}
    />
  );
};

export default ParticlesBg;


