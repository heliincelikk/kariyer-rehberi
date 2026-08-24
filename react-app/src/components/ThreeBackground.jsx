import { useEffect } from 'react';
import threeScene from '../../../three-bg.js?raw';

export default function ThreeBackground() {
  useEffect(() => {
    let scriptEl = null;
    let canvasEl = null;

    const initThree = () => {
      if (window.THREE) {
        try {
          Function(threeScene)();
        } catch (e) {
          console.error('Three.js scene init error:', e);
        }
      } else {
        scriptEl = document.createElement('script');
        scriptEl.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        scriptEl.onload = () => {
          try {
            Function(threeScene)();
          } catch (e) {
            console.error('Three.js scene execution error:', e);
          }
        };
        document.head.append(scriptEl);
      }
    };

    initThree();

    return () => {
      canvasEl = document.querySelector('#threeBg canvas');
      canvasEl?.remove();
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, []);

  return <div id="threeBg" aria-hidden="true" />;
}
