import { useLayoutEffect, useRef } from 'react';
import { gateSealLandmark } from '../utils/gateSealMotion.js';
import { GATE_SEAL_ART_EXTENT, prepareGateSealArtwork } from '../utils/gateSealArtwork.js';
import { getGateSealPose, subscribeGateSealTurn } from '../state/gateSealTurnStore.js';

export function GateSealPainting({ portrait, theme }) {
  const canvasRef = useRef(null);
  const landmark = gateSealLandmark(portrait);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const image = canvas.parentElement.querySelector('.gateway-sequence-preloads img');
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, disposed = false, artwork, source = '';
    const size = 192;
    canvas.width = canvas.height = size;
    const surface = document.createElement('canvas');
    surface.width = surface.height = size;
    const surfaceContext = surface.getContext('2d');
    if (!surfaceContext) return undefined;
    const draw = now => {
      frame = 0;
      if (disposed) return;
      const pose = getGateSealPose(now);
      const angle = !reduced.matches && pose.theme === theme ? pose.angle : 0;
      canvas.dataset.sealAngle = String(angle);
      if (!image?.complete || !image.naturalWidth) { canvas.style.visibility = 'hidden'; return; }
      const filename = image.currentSrc || image.src;
      if (source !== filename) { artwork = prepareGateSealArtwork(image, portrait, size); source = filename; }
      context.clearRect(0, 0, size, size);
      context.drawImage(artwork.backing, 0, 0);
      const radians = angle * Math.PI / 180;
      surfaceContext.clearRect(0, 0, size, size);
      surfaceContext.save();
      surfaceContext.translate(size / 2, size / 2); surfaceContext.rotate(radians);
      surfaceContext.drawImage(artwork.face, -size / 2, -size / 2);
      surfaceContext.restore();
      // The carved relief turns, while its very soft directional light remains
      // aligned to the gate. This does not add an external shadow or glow.
      const shade = Math.abs(Math.sin(radians)) * .04;
      if (shade > .000001) {
        const light = surfaceContext.createLinearGradient(0, 0, size, size);
        light.addColorStop(0, 'rgba(0,0,0,0)'); light.addColorStop(1, `rgba(0,0,0,${shade})`);
        surfaceContext.globalCompositeOperation = 'source-atop';
        surfaceContext.fillStyle = light; surfaceContext.fillRect(0, 0, size, size);
        surfaceContext.globalCompositeOperation = 'source-over';
      }
      context.drawImage(surface, 0, 0);
      canvas.dataset.sealPrepared = image.currentSrc || image.src;
      canvas.style.visibility = 'visible';
      if (pose.moving && pose.theme === theme && !reduced.matches && !document.hidden) schedule();
    };
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(draw); };
    const unsubscribe = subscribeGateSealTurn(schedule);
    image?.addEventListener('load', schedule);
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', schedule);
    draw(performance.now());
    return () => {
      disposed = true; cancelAnimationFrame(frame); unsubscribe();
      image?.removeEventListener('load', schedule);
      document.removeEventListener('visibilitychange', schedule); reduced.removeEventListener('change', schedule);
    };
  }, [theme, portrait]);
  return <canvas ref={canvasRef} className="gate-seal-painted-face" aria-hidden="true"
    style={{ left: `${landmark.x * 100}%`, top: `${landmark.y * 100}%`, width: `${landmark.diameter * GATE_SEAL_ART_EXTENT * 100}%` }} />;
}
