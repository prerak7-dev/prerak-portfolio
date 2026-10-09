import { MAX_PAINTED_SUBJECTS } from '../data/paintedSubjects.js';

export const PAINTED_SUBJECT_GLSL = `
  uniform vec4 uOutgoingActorRegions[${MAX_PAINTED_SUBJECTS}];
  uniform vec4 uIncomingActorRegions[${MAX_PAINTED_SUBJECTS}];
  uniform vec4 uOutgoingActorMotion[${MAX_PAINTED_SUBJECTS}];
  uniform vec4 uIncomingActorMotion[${MAX_PAINTED_SUBJECTS}];
  uniform vec2 uOutgoingActorEdges[${MAX_PAINTED_SUBJECTS}];
  uniform vec2 uIncomingActorEdges[${MAX_PAINTED_SUBJECTS}];
  uniform int uOutgoingActorCount, uIncomingActorCount;
  uniform float uActorTime, uActorStrength, uActorIdle;

  vec4 readPainting(sampler2D painting, vec2 point) {
    return texture2D(painting, vec2(clamp(point.x, 0., 1.), 1. - clamp(point.y, 0., 1.)));
  }

  vec2 rotatePaint(vec2 point, float angle) {
    float c = cos(angle), s = sin(angle);
    return vec2(point.x * c + point.y * s, -point.x * s + point.y * c);
  }

  float insidePainting(vec2 point) {
    return smoothstep(0., .012, min(min(point.x, 1. - point.x), min(point.y, 1. - point.y)));
  }

  vec4 animatePainting(sampler2D painting, vec2 point, float incoming, float travel, out float coverage) {
    vec4 original = readPainting(painting, point);
    vec4 result = original;
    coverage = 0.;
    for (int i = 0; i < ${MAX_PAINTED_SUBJECTS}; i++) {
      if (incoming < .5 && i >= uOutgoingActorCount || incoming > .5 && i >= uIncomingActorCount) break;
      vec4 region = mix(uOutgoingActorRegions[i], uIncomingActorRegions[i], incoming);
      vec4 motion = mix(uOutgoingActorMotion[i], uIncomingActorMotion[i], incoming);
      vec2 edge = mix(uOutgoingActorEdges[i], uIncomingActorEdges[i], incoming);
      vec2 local = (point - region.xy) / region.zw;
      if (max(abs(local.x), abs(local.y)) > 1.) continue;
      bool roundSubject = motion.x < 1.5 || motion.x > 5.5;
      float distance = roundSubject ? length(local) : max(abs(local.x), abs(local.y));
      float weight = 1. - smoothstep(motion.x > 5.5 ? .82 : .78, motion.x > 5.5 ? .97 : 1., distance);
      weight *= 1. - smoothstep(edge.x - edge.y, edge.x + edge.y, point.y);
      if (motion.x > 1.5 && motion.x < 2.5) {
        weight *= (1. - smoothstep(.1, .6, local.x)) * smoothstep(-.95, -.35, local.y)
          * (1. - smoothstep(.45, .9, local.y));
      } else if (motion.x > 3.5 && motion.x < 4.5) weight *= 1. - smoothstep(.5, .98, local.y);
      weight *= insidePainting(point) * uActorStrength;
      if (weight < .00001) continue;
      float phase = uActorTime * motion.y;
      vec4 paint;
      if (motion.x < .5 || motion.x > 4.5 && motion.x < 5.5) {
        // Each sample keeps travelling in one direction. Its reset happens at
        // zero weight while the other sample carries the original brushwork.
        float a = fract(phase / 6.28318530718 + float(i) * .173);
        float b = fract(a + .5);
        float blend = .5 - .5 * cos(a * 6.28318530718);
        vec2 sourceA, sourceB;
        if (motion.x < .5) {
          sourceA = region.xy + rotatePaint(local, (a - .5) * motion.z + travel * motion.w) * region.zw;
          sourceB = region.xy + rotatePaint(local, (b - .5) * motion.z + travel * motion.w) * region.zw;
        } else {
          float flutter = .025 * sin(phase + local.y * 5.);
          sourceA = region.xy + vec2(local.x + flutter, clamp(local.y - (a - .5) * motion.z, -.93, .93)) * region.zw;
          sourceB = region.xy + vec2(local.x + flutter, clamp(local.y - (b - .5) * motion.z, -.93, .93)) * region.zw;
          weight *= (1. - smoothstep(.45, .92, abs(local.x))) * smoothstep(-.98, -.6, local.y)
            * (1. - smoothstep(.58, .98, local.y));
          weight *= smoothstep(.035, .32, dot(original.rgb, vec3(.213, .715, .072)));
        }
        float validA = blend * insidePainting(sourceA), validB = (1. - blend) * insidePainting(sourceB);
        float valid = validA + validB;
        paint = (readPainting(painting, sourceA) * validA + readPainting(painting, sourceB) * validB) / max(valid, .00001);
        weight *= valid;
      } else if (motion.x < 1.5 || motion.x > 5.5) {
        vec2 turned = rotatePaint(local, phase + travel * motion.w);
        if (motion.x > 5.5) {
          // The lower sun is hidden by water. Reconstruct that unseen pigment
          // from the visible face, and keep the real foreground and rim fixed.
          turned.y = -abs(turned.y);
          float warmth = (original.r + original.g - 2. * original.b) / max(.1, original.r + original.g + original.b);
          weight *= smoothstep(.035, .11, warmth);
        }
        paint = readPainting(painting, region.xy + turned * region.zw);
      } else {
        vec2 shift;
        if (motion.x < 2.5) {
          shift = motion.z * region.zw * vec2(sin(phase + local.y * 2.2 + local.x * 2.6)
            + .33 * sin(phase * 2. - local.y * 3.7 + local.x), .3 * cos(phase + local.y * 2.7));
        } else if (motion.x < 3.5) {
          shift = motion.z * region.zw * vec2(sin(phase + local.y * 7. + local.x * 1.3),
            .35 * sin(phase * 1.6 + local.x * 5.));
        } else {
          shift = motion.z * region.zw * (1. - local.y) * .5
            * vec2(sin(phase + local.y * 3.), .2 * cos(phase + local.x * 2.));
        }
        paint = readPainting(painting, point + shift * weight);
      }
      result = mix(result, paint, weight);
      coverage = max(coverage, weight);
    }
    return result;
  }
`;
