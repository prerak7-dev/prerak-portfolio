import { MAX_DISCOVERIES } from './scenicDiscoveries.js';

// These are brief ink drawings on the existing plate, not luminous particles or
// new scene layers. The regular contour compositor carries them between scenes.
export const SCENIC_DISCOVERY_GLSL = `
  float discoveryStroke(float distance, float width) {
    float feather = max(fwidth(distance), .002);
    return 1. - smoothstep(max(0., width - feather), width + feather, abs(distance));
  }

  float discoveryLine(vec2 p, vec2 a, vec2 b, float progress, float width) {
    vec2 segment = b - a;
    float t = clamp(dot(p - a, segment) / max(dot(segment, segment), .00001), 0., 1.);
    float stroke = discoveryStroke(length(p - a - segment * t), width);
    return stroke * (1. - smoothstep(progress - .035, progress + .035, t));
  }

  float discoveryLuma(vec3 color) {
    return dot(color, vec3(.213, .715, .072));
  }

  vec4 discoverPainting(sampler2D painting, vec4 paint, vec2 point, float incoming, inout float coverage) {
    for (int j = 0; j < ${MAX_DISCOVERIES}; j++) {
      if (j >= uDiscoveryCount) break;
      vec4 event = uDiscoveries[j], origin = uDiscoveryOrigins[j], region = uDiscoveryArt[j];
      if (event.x > 1.5 && event.x < 2.5 || event.w < .0001) continue;
      if (abs(origin.z - mix(uOutgoingDiscoveryContext, uIncomingDiscoveryContext, incoming)) > .1) continue;
      vec2 p = (point - region.xy) / region.zw;
      if (max(abs(p.x), abs(p.y)) > 1.08) continue;
      float age = event.z, ink = 0., bleed = 0.;
      // Stationary fiber irregularity avoids temporal noise and shimmering.
      float grain = .82 + .12 * sin(point.x * 1341. + sin(point.y * 617.))
        + .06 * sin(point.y * 1907. + point.x * 953.);
      vec2 nib = p + .003 * vec2(sin(p.y * 39.), sin(p.x * 31.));
      if (event.x < 1.5) {
        // A tapered ink tide travels along the real celestial circumference.
        // It follows the visible side upward instead of escaping behind the
        // horizon of a partly cropped moon. No diagram, dots, or star links.
        vec2 touch = (origin.xy - region.xy) / region.zw + vec2(0., -.0001);
        float start = atan(touch.y, touch.x);
        float direction = touch.x < 0. ? 1. : -1.;
        float angle = atan(p.y, p.x), radius = length(p);
        float arc = atan(sin(angle - start), cos(angle - start)) * direction;
        float front = .18 + 1.25 * smoothstep(0., 6.5, age);
        float travel = smoothstep(-.32, -.10, arc) * (1. - smoothstep(front - .18, front, arc));
        float tail = .32 + .68 * exp(-pow((arc - front + .25) * 2.1, 2.));
        for (int k = 0; k < 3; k++) {
          float strand = float(k);
          float contour = .985 + strand * .010 + .002 * sin(angle * 13. + strand)
            + .004 * sin(angle * 4. - age * .22 + strand * .8);
          float screenRadius = region.z * mix(uProjection.z, uIncomingProjection.z, incoming);
          float width = max(.7 / max(screenRadius, 1.), (.0015 + .0018 * tail) * (k == 1 ? 1. : .62));
          float distance = radius - contour;
          ink = max(ink, discoveryStroke(distance, width) * travel * tail);
          bleed = max(bleed, discoveryStroke(distance, width * 3.2) * travel * tail * .48);
        }
        float shore = 1. - smoothstep(origin.w - .012, origin.w, point.y);
        ink *= shore; bleed *= shore;
      } else if (event.x < 3.5) {
        float radius = length(nib), angle = atan(nib.y, nib.x);
        float arc = (angle + 3.14159265) / 6.2831853;
        float written = smoothstep(0., 1.6, age);
        float ring = radius - (.69 + .005 * sin(angle * 19.) + .003 * sin(angle * 31.));
        float reveal = 1. - smoothstep(written - .045, written, arc);
        ink = discoveryStroke(ring, .013) * reveal;
        bleed = discoveryStroke(ring, .034) * reveal * .55;
        ink = max(ink, discoveryStroke(radius - .77, .005) * .62
          * smoothstep(.5, 1.2, age) * smoothstep(.05, .35, sin(angle * 4. + .3)));
        for (int k = 0; k < 16; k++) {
          float a = float(k) * .39269908;
          vec2 ray = vec2(cos(a), sin(a));
          float major = mod(float(k), 4.) < .5 ? 1. : 0.;
          float tick = discoveryLine(nib, ray * mix(.62, .51, major), ray * .72, written * 1.2, mix(.008, .015, major));
          ink = max(ink, tick * smoothstep(.35, .9, age) * mix(.62, 1., major));
        }
        // A needle finds north with one soft, damped turn, then rests.
        float turn = 1.5 * exp(-age * .85) + .20;
        vec2 needle = rotatePaint(nib, turn);
        float spear = abs(needle.x) + abs(needle.y) * .17;
        float needleInk = (1. - smoothstep(.086, .10, spear)) * (1. - smoothstep(.50, .54, abs(needle.y)));
        ink = max(ink, needleInk * smoothstep(.25, .85, age) * (needle.y < 0. ? 1. : .55));
        bleed = max(bleed, (1. - smoothstep(.10, .14, spear)) * (1. - smoothstep(.52, .58, abs(needle.y))) * .4);
        ink = max(ink, discoveryStroke(length(nib), .035) * smoothstep(.3, .8, age));
      } else if (event.x < 4.5) {
        // Read a small, spatially smoothed gradient from the actual brushwork.
        // Ink catches the mountain's existing crests, not invented sine waves.
        vec2 step = region.zw * vec2(.012, .025);
        float north = discoveryLuma(readPainting(painting, point + vec2(-step.x, -step.y)).rgb
          + readPainting(painting, point + vec2(step.x, -step.y)).rgb) * .5;
        float south = discoveryLuma(readPainting(painting, point + vec2(-step.x, step.y)).rgb
          + readPainting(painting, point + vec2(step.x, step.y)).rgb) * .5;
        float crest = pow(smoothstep(.04, .18, abs(north - south)), 1.4);
        float front = -1.2 + 2.6 * smoothstep(0., 5.5, age);
        float sweep = exp(-pow((p.x + p.y * .19 - front) * 3., 2.));
        float after = (1. - smoothstep(front - .12, front + .05, p.x + p.y * .19)) * .06;
        ink = crest * (sweep * .65 + after);
      } else {
        // One tapered, curved brush comet. No burst, flower sprites or looping
        // particle emitter; its tail dries back into the paper behind it.
        float head = -.82 + 1.64 * smoothstep(0., 6.4, age);
        float curve = -.12 + .68 * p.x + .10 * sin(p.x * 2.4);
        float behind = head - p.x;
        float tail = smoothstep(-.02, .06, behind) * (1. - smoothstep(.15, 1.12, behind));
        for (int k = 0; k < 5; k++) {
          float filament = float(k) - 2.;
          float path = curve + filament * .024 * smoothstep(0., .8, behind)
            + sin(p.x * 8. + filament * .7) * .006 * behind;
          float distance = nib.y - path;
          ink = max(ink, discoveryStroke(distance, .010 + tail * .018) * tail * (k == 2 ? 1. : .48));
          bleed = max(bleed, discoveryStroke(distance, .025 + tail * .037) * tail * .4);
        }
        vec2 tip = vec2(head, -.12 + .68 * head + .10 * sin(head * 2.4));
        float tipDistance = length((nib - tip) * vec2(.65, 1.));
        ink = max(ink, discoveryStroke(tipDistance, .045));
        bleed = max(bleed, discoveryStroke(tipDistance, .085) * .6);
      }
      float edge = 1. - smoothstep(event.x < 1.5 ? 1. : .84, 1.08, max(abs(p.x), abs(p.y)));
      float density = event.x > 3.5 && event.x < 4.5 ? .45 : .86;
      float opacity = clamp(ink * grain * event.w * edge * density, 0., .9);
      float underprint = bleed * event.w * edge * .33;
      if (max(opacity, underprint) < .0001) continue;
      // Slow, continuous spatial contrast plus an opposite-tone wet edge keeps
      // fine marks visible on mixed paper without a glow or flickering switch.
      vec3 pigment = readPainting(painting, region.xy).rgb;
      float lightPaper = smoothstep(.06, .40, discoveryLuma(mix(pigment, paint.rgb, .7)));
      vec3 paleInk = mix(uOutgoingDiscoveryPale, uIncomingDiscoveryPale, incoming);
      vec3 darkInk = mix(uOutgoingDiscoveryDark, uIncomingDiscoveryDark, incoming);
      vec3 inkColor = mix(paleInk, darkInk, lightPaper);
      vec3 paperEdge = mix(darkInk, paleInk, lightPaper);
      paint.rgb = mix(paint.rgb, paperEdge, underprint);
      paint.rgb = mix(paint.rgb, inkColor, opacity);
      coverage = max(coverage, min(1., max(opacity, underprint) * 12.));
    }
    return paint;
  }
`;
