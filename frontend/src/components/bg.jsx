import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "#040c15ff" },
      fpsLimit: 120,
      detectRetina: true,
      particles: {
        number: {
          value: 300,
          density: { enable: true, area: 800 }, // ✅ must have area
        },
        color: { value: "#75c4f6ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          outModes: { default: "bounce" },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#099df8ff",
          opacity: 0.5,
          width: 1,
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 150 },
          push: { quantity: 4 },
        },
      },
      emitters: {
        direction: "right",
        rate: { quantity: 1, delay: 7 },
        size: { width: 0, height: 0 },
        position: { x: -5, y: 55 },
        particles: {
          shape: {
            type: "images",
            options: {
              images: [
                {
                  src: "https://particles.js.org/images/cyan_amongus.png",
                  width: 500,
                  height: 634,
                },
                {
                  src: "https://particles.js.org/images/amongus_red.png",
                  width: 500,
                  height: 634,
                },
              ],
            },
          },
          size: { value: 40 },
          move: {
            speed: 10,
            straight: true,
            outModes: { default: "destroy", right: "destroy" },
          },
          zIndex: { value: 0 },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 10, sync: true },
          },
        },
      },
    }),
    []
  );

  return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;
