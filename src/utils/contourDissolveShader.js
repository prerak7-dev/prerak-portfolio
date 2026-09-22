// Both painted scenes and live DOM lettering use exactly the same contour front.
export const CONTOUR_NOISE_GLSL = `
  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float watercolorNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 fraction = fract(point);
    vec2 blend = fraction * fraction * (3.0 - 2.0 * fraction);
    float lower = mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), blend.x);
    float upper = mix(
      hash21(cell + vec2(0.0, 1.0)),
      hash21(cell + vec2(1.0, 1.0)),
      blend.x
    );
    return mix(lower, upper, blend.y);
  }

`;

export const CONTOUR_HANDOFF_GLSL = `
    vec2 flow = geometry.rg * 2.0 - 1.0;
    flow /= max(0.18, length(flow));
    float energy = geometry.b;
    float pigment = clamp(geometry.a * 0.64 + energy * 0.36, 0.0, 1.0);

    float flowPresence = smoothstep(0.0, 0.12, uProgress);
    float edgePresence = flowPresence * (1.0 - smoothstep(0.9, 1.0, uProgress));
    float flowTravel = sin(uProgress * 3.14159265);
    float broadWash = watercolorNoise(
      local * 5.2 + uSource * 9.7 + flow * uProgress * 1.35
    );
    float brokenWash = watercolorNoise(
      local * 13.4
        + flow * (1.8 + uProgress * 2.1)
        + vec2(uSource.y, -uSource.x) * 7.1
    );
    // Long bristle marks follow the painted contour tangent. Fine dry gaps
    // and wider wet blooms share the same field rather than a screen-space wipe.
    vec2 crossFlow = vec2(-flow.y, flow.x);
    vec2 brushSpace = vec2(dot(local, flow), dot(local, crossFlow));
    float paperFiber = watercolorNoise(brushSpace * vec2(26.0, 218.0));
    float brushLoad = watercolorNoise(brushSpace * vec2(8.0, 58.0) + uSource * 7.0);
    float bristle = smoothstep(0.28, 0.76, paperFiber);
    vec2 bleedPosition = local
      + flow * (broadWash - 0.5) * (0.035 + energy * 0.026)
      - flow * flowTravel * (0.009 + energy * 0.012);

    float bloomSide = uSource.x < 0.5 ? 1.0 : -1.0;
    vec2 secondBloom = clamp(
      uSource + vec2(bloomSide * 0.24, 0.13),
      vec2(0.08),
      vec2(0.92)
    );
    vec2 thirdBloom = clamp(
      uSource + vec2(-bloomSide * 0.17, -0.22),
      vec2(0.08),
      vec2(0.92)
    );
    float reach = max(0.2, uSourceReach);
    float primaryOrder = distance(bleedPosition, uSource) / reach;
    float secondOrder = distance(bleedPosition, secondBloom) / (reach * 0.84) + 0.14;
    float thirdOrder = distance(bleedPosition, thirdBloom) / (reach * 0.76) + 0.28;
    float bloomOrder = min(primaryOrder, min(secondOrder, thirdOrder));
    vec2 bloomDelta = bleedPosition - uSource;
    float bloomAngle = atan(bloomDelta.y, bloomDelta.x);
    float edgeFlourish = sin(bloomAngle * 3.0 + broadWash * 4.8) * 0.032
      + sin(bloomAngle * 7.0 - brokenWash * 5.4) * 0.014;
    float contourOrder = clamp(
      mix(bloomOrder, primaryOrder, uOriginFocus) * 0.68
        + (1.0 - pigment) * 0.2
        + (broadWash - 0.5) * 0.085
        + (brushLoad - 0.5) * 0.085
        + (bristle - 0.5) * 0.025 * energy
        + edgeFlourish,
      0.0,
      1.0
    );
    float paintProgress = smoothstep(0.015, 0.985, uProgress);
    float contourLift = smoothstep(0.14, 0.84, pigment) * 0.155 * flowPresence;
    float wetEdgeWidth = mix(
      0.014,
      0.023 + brokenWash * 0.027 + brushLoad * 0.018,
      flowPresence
    );
    float edgeDistance = abs(paintProgress + contourLift - contourOrder);
    float wetEdge = 1.0 - smoothstep(
      wetEdgeWidth * 0.28,
      wetEdgeWidth * 1.72,
      edgeDistance
    );
    float capillaryFront = paintProgress + contourLift
      + (bristle - 0.5) * 0.022 * flowPresence;
    float edgeAA = max(fwidth(contourOrder) * 1.5, 0.0015);
    float handoff = smoothstep(
      contourOrder - wetEdgeWidth - edgeAA,
      contourOrder + wetEdgeWidth + edgeAA,
      capillaryFront
    );
    handoff = clamp(
      handoff * flowPresence + (bristle - 0.5) * wetEdge * edgePresence * 0.045,
      0.0,
      1.0
    );
    // Exhaust the mask, including pixels whose contour order reaches one.
    handoff = mix(handoff, 1.0, smoothstep(0.92, 1.0, uProgress));

`;
