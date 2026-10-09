import { MAX_PAINTED_SUBJECTS } from '../data/paintedSubjects.js';

export const PAINTED_SUBJECT_GLSL = `
  uniform vec4 uOutgoingActorRegions[${MAX_PAINTED_SUBJECTS}];
  uniform vec4 uIncomingActorRegions[${MAX_PAINTED_SUBJECTS}];
  uniform vec4 uOutgoingActorMotion[${MAX_PAINTED_SUBJECTS}];
  uniform vec4 uIncomingActorMotion[${MAX_PAINTED_SUBJECTS}];
  uniform int uOutgoingActorCount, uIncomingActorCount;
  uniform float uActorTime, uActorStrength, uActorIdle;

  vec2 animatePainting(vec2 point, float incoming, float travel, out float coverage, out vec2 spinUv, out float spinCoverage) {
    vec2 displacement = vec2(0.);
    vec2 spinDisplacement = vec2(0.);
    coverage = 0.;
    spinCoverage = 0.;
    for (int i = 0; i < ${MAX_PAINTED_SUBJECTS}; i++) {
      if (incoming < .5 && i >= uOutgoingActorCount || incoming > .5 && i >= uIncomingActorCount) break;
      vec4 region = mix(uOutgoingActorRegions[i], uIncomingActorRegions[i], incoming);
      vec4 motion = mix(uOutgoingActorMotion[i], uIncomingActorMotion[i], incoming);
      vec2 local = (point - region.xy) / region.zw;
      if (max(abs(local.x), abs(local.y)) > 1.01) continue;
      float distance = motion.x < 1.5 ? length(local) : max(abs(local.x), abs(local.y));
      float weight = 1. - smoothstep(.78, 1., distance);
      if (motion.x > 1.5 && motion.x < 2.5) {
        weight *= (1. - smoothstep(.1, .6, local.x)) * smoothstep(-.95, -.35, local.y)
          * (1. - smoothstep(.45, .9, local.y));
      } else if (motion.x > 3.5 && motion.x < 4.5) weight *= 1. - smoothstep(.5, .98, local.y);
      float border = min(min(point.x, 1. - point.x), min(point.y, 1. - point.y));
      weight *= smoothstep(.004, .025, border);
      if (weight < .00001) continue;
      float phase = uActorTime * motion.y;
      vec2 shift = vec2(0.);
      if (motion.x < 1.5) {
        float angle = (motion.x < .5 ? sin(phase) * motion.z : phase) + travel * motion.w;
        float c = cos(angle), s = sin(angle);
        shift = (vec2(local.x * c + local.y * s, -local.x * s + local.y * c) - local) * region.zw;
      } else if (motion.x < 2.5) {
        shift = motion.z * region.zw * vec2(sin(phase + local.y * 2.2 + local.x * 2.6)
          + .33 * sin(phase * 2. - local.y * 3.7 + local.x), .3 * cos(phase + local.y * 2.7));
      } else if (motion.x < 3.5) {
        shift = motion.z * region.zw * vec2(sin(phase + local.y * 7. + local.x * 1.3),
          .35 * sin(phase * 1.6 + local.x * 5.));
      } else if (motion.x < 4.5) {
        shift = motion.z * region.zw * (1. - local.y) * .5
          * vec2(sin(phase + local.y * 3.), .2 * cos(phase + local.x * 2.));
      } else {
        shift = motion.z * region.zw * vec2(.2 * sin(phase + local.y * 22.), sin(phase - local.y * 18.));
      }
      if (motion.x > .5 && motion.x < 1.5) {
        spinDisplacement = shift;
        spinCoverage = max(spinCoverage, weight * uActorStrength);
      } else displacement += shift * weight;
      coverage = max(coverage, weight * uActorStrength);
    }
    spinUv = clamp(point + displacement * uActorStrength + spinDisplacement, 0., 1.);
    return clamp(point + displacement * uActorStrength, 0., 1.);
  }
`;
