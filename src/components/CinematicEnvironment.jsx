import { useEffect, useLayoutEffect, useRef } from 'react';
import { getCinematicAssets, GATEWAY_FRAME_COUNT } from '../data/cinematicAssets.js';
import { createAssetPath } from '../security/contentSecurity.js';
import { subscribeSpatialMotion } from '../state/spatialMotionStore.js';

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smootherStep(value) {
  const t = clamp(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function revealBetween(scenePosition, start, duration) {
  return smootherStep((scenePosition - start) / duration);
}

function assetPath(filename) {
  return createAssetPath(import.meta.env.BASE_URL, filename);
}

function plateTransform({ x = 0, y = 0, depth = 0, scale = 1 }) {
  return `translate3d(${x}%, ${y}%, ${depth}px) scale(${scale})`;
}

function setPlateStyle(node, opacity, transform) {
  if (!node) return;
  node.style.opacity = String(opacity);
  node.style.transform = transform;
}

function EnvironmentPlate({ filename, className, plateRef }) {
  return (
    <div ref={plateRef} className={`environment-plate ${className}`} aria-hidden="true">
      <img src={assetPath(filename)} alt="" draggable="false" decoding="async" loading="eager" />
    </div>
  );
}

function GatewaySequence({ filenames, frameRefs, imageRefs, plateRef }) {
  return (
    <div ref={plateRef} className="environment-plate gateway-sequence-plate" aria-hidden="true">
      {filenames.map((filename, index) => (
        <div
          key={filename}
          ref={(node) => { frameRefs.current[index] = node; }}
          className="gateway-sequence-frame"
          style={{ opacity: index === 0 ? 1 : 0, visibility: index === 0 ? 'visible' : 'hidden' }}
          aria-hidden="true"
        >
          <img
            ref={(node) => { imageRefs.current[index] = node; }}
            src={assetPath(filename)}
            alt=""
            draggable="false"
            decoding="async"
            loading="eager"
            fetchPriority={index < 4 ? 'high' : 'auto'}
          />
        </div>
      ))}
    </div>
  );
}

function decodeImage(image) {
  if (!image) return Promise.resolve();
  const waitForLoad = image.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });

  return waitForLoad.then(async () => {
    if (!image.naturalWidth) return;
    try {
      await image.decode();
    } catch (error) {
      // A successful load is sufficient when a browser declines an explicit decode.
    }
  });
}

export function CinematicEnvironment({ theme, onReady, systemsOverlay = null }) {
  const assets = getCinematicAssets(theme);
  const rootRef = useRef(null);
  const overlayRootRef = useRef(null);
  const gatewayPlateRef = useRef(null);
  const systemsPlateRef = useRef(null);
  const systemsOverlayPlateRef = useRef(null);
  const chronologyPlateRef = useRef(null);
  const fieldPlateRef = useRef(null);
  const returnPlateRef = useRef(null);
  const frameRefs = useRef([]);
  const imageRefs = useRef([]);
  const visibleFramesRef = useRef([]);

  useEffect(() => {
    let cancelled = false;
    const images = imageRefs.current.slice(0, assets.gatewayFrames.length);
    Promise.all(images.map(decodeImage)).then(() => {
      if (cancelled) return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!cancelled) onReady?.();
        });
      });
    });
    return () => { cancelled = true; };
  }, [assets.gatewayFrames, onReady]);

  useLayoutEffect(() => {
    frameRefs.current.forEach((frame) => {
      if (!frame) return;
      frame.style.opacity = '0';
      frame.style.visibility = 'hidden';
    });
    visibleFramesRef.current = [];

    const applyMotion = ({ scenePosition, direction }) => {
      const root = rootRef.current;
      if (!root) return;

      const travelDirection = direction > 0 ? 1 : -1;
      const gatewayProgress = smootherStep(scenePosition / 0.82);
      const gatewayFramePosition = gatewayProgress * (GATEWAY_FRAME_COUNT - 1);
      const currentIndex = Math.floor(gatewayFramePosition);
      const nextIndex = Math.min(GATEWAY_FRAME_COUNT - 1, currentIndex + 1);
      const blend = gatewayFramePosition - currentIndex;
      const visibleFrames = blend > 0.0001 && nextIndex !== currentIndex
        ? [currentIndex, nextIndex]
        : [currentIndex];

      visibleFramesRef.current.forEach((index) => {
        if (visibleFrames.includes(index)) return;
        const frame = frameRefs.current[index];
        if (!frame) return;
        frame.style.opacity = '0';
        frame.style.visibility = 'hidden';
      });

      const currentFrame = frameRefs.current[currentIndex];
      if (currentFrame) {
        currentFrame.style.visibility = 'visible';
        currentFrame.style.opacity = '1';
      }
      if (visibleFrames.length === 2) {
        const nextFrame = frameRefs.current[nextIndex];
        if (nextFrame) {
          nextFrame.style.visibility = 'visible';
          nextFrame.style.opacity = String(blend);
        }
      }
      visibleFramesRef.current = visibleFrames;

      const systemsMix = revealBetween(scenePosition, 0.56, 0.44);
      const chronologyMix = revealBetween(scenePosition, 1.2, 0.8);
      const fieldMix = revealBetween(scenePosition, 3.2, 0.8);
      const returnMix = revealBetween(scenePosition, 4.2, 0.8);
      const transitionPulse = Math.max(
        Math.sin(systemsMix * Math.PI),
        Math.sin(chronologyMix * Math.PI),
        Math.sin(fieldMix * Math.PI),
        Math.sin(returnMix * Math.PI),
      );
      const parallaxX = Math.sin(scenePosition * 0.72) * 0.34;
      const parallaxY = Math.cos(scenePosition * 0.54) * 0.1;
      const gatewayScale = 1.005 + gatewayProgress * 0.24 + systemsMix * 0.19;

      root.classList.toggle('direction-forward', travelDirection > 0);
      root.classList.toggle('direction-backward', travelDirection < 0);
      root.classList.toggle('transition-active', transitionPulse > 0.001);
      root.classList.toggle('transition-idle', transitionPulse <= 0.001);
      root.style.setProperty('--environment-parallax-x', `${parallaxX}%`);
      root.style.setProperty('--environment-parallax-y', `${parallaxY}%`);
      root.style.setProperty('--transition-pulse', transitionPulse.toFixed(4));
      root.style.setProperty('--travel-direction', String(travelDirection));
      if (overlayRootRef.current) {
        const projectDistance = Math.abs(1 - scenePosition);
        const projectProximity = clamp((0.52 - projectDistance) / (0.52 - 0.14));
        const projectReveal = smootherStep(projectProximity);
        overlayRootRef.current.style.setProperty('--environment-parallax-x', `${parallaxX}%`);
        overlayRootRef.current.style.setProperty('--environment-parallax-y', `${parallaxY}%`);
        overlayRootRef.current.style.setProperty('--project-scene-reveal', projectReveal.toFixed(4));
      }

      setPlateStyle(
        gatewayPlateRef.current,
        1 - systemsMix,
        plateTransform({
          x: -systemsMix * travelDirection * 0.7,
          y: -gatewayProgress * 0.7,
          depth: systemsMix * 82,
          scale: gatewayScale,
        }),
      );
      setPlateStyle(
        systemsPlateRef.current,
        systemsMix * (1 - chronologyMix),
        plateTransform({
          x: (1 - systemsMix) * travelDirection * 1.25 - chronologyMix * travelDirection * 0.7,
          y: (1 - systemsMix) * 0.38 - chronologyMix * 0.42,
          depth: (1 - systemsMix) * -72 + chronologyMix * 46,
          scale: 1.095 - systemsMix * 0.07 + chronologyMix * 0.07,
        }),
      );
      setPlateStyle(
        systemsOverlayPlateRef.current,
        systemsMix * (1 - chronologyMix),
        plateTransform({
          x: (1 - systemsMix) * travelDirection * 1.25 - chronologyMix * travelDirection * 0.7,
          y: (1 - systemsMix) * 0.38 - chronologyMix * 0.42,
          depth: (1 - systemsMix) * -72 + chronologyMix * 46,
          scale: 1.095 - systemsMix * 0.07 + chronologyMix * 0.07,
        }),
      );
      setPlateStyle(
        chronologyPlateRef.current,
        chronologyMix * (1 - fieldMix),
        plateTransform({
          x: (1 - chronologyMix) * travelDirection * 1.15 - fieldMix * travelDirection * 0.7,
          y: (1 - chronologyMix) * 0.34 - fieldMix * 0.42,
          depth: (1 - chronologyMix) * -68 + fieldMix * 46,
          scale: 1.09 - chronologyMix * 0.065 + fieldMix * 0.07,
        }),
      );
      setPlateStyle(
        fieldPlateRef.current,
        fieldMix * (1 - returnMix),
        plateTransform({
          x: (1 - fieldMix) * travelDirection * 1.15 - returnMix * travelDirection * 0.7,
          y: (1 - fieldMix) * 0.34 - returnMix * 0.42,
          depth: (1 - fieldMix) * -68 + returnMix * 46,
          scale: 1.09 - fieldMix * 0.065 + returnMix * 0.07,
        }),
      );
      setPlateStyle(
        returnPlateRef.current,
        returnMix,
        plateTransform({
          x: (1 - returnMix) * travelDirection * 1.1,
          y: (1 - returnMix) * 0.3,
          depth: (1 - returnMix) * -64,
          scale: 1.09 - returnMix * 0.055,
        }),
      );
    };

    return subscribeSpatialMotion(applyMotion);
  }, [theme]);

  return (
    <>
      <div ref={rootRef} className="cinematic-environment direction-forward transition-idle" aria-hidden="true">
        <div className="cinematic-image-stage">
          <GatewaySequence
            filenames={assets.gatewayFrames}
            frameRefs={frameRefs}
            imageRefs={imageRefs}
            plateRef={gatewayPlateRef}
          />
          <EnvironmentPlate filename={assets.systems} className="systems-plate" plateRef={systemsPlateRef} />
          <EnvironmentPlate filename={assets.chronology} className="chronology-plate" plateRef={chronologyPlateRef} />
          <EnvironmentPlate filename={assets.field} className="field-plate" plateRef={fieldPlateRef} />
          <EnvironmentPlate
            filename={assets.gatewayFrames[GATEWAY_FRAME_COUNT - 1]}
            className="return-gateway-plate"
            plateRef={returnPlateRef}
          />
        </div>
        <div className="environment-transition-veil" />
        <div className="environment-volumetrics" />
        <div className="environment-vignette" />
      </div>
      {systemsOverlay && (
        <div ref={overlayRootRef} className="cinematic-systems-overlay">
          <div className="cinematic-image-stage">
            <div ref={systemsOverlayPlateRef} className="environment-plate systems-overlay-plate">
              {systemsOverlay}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
