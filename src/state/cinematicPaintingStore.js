let owner = null;
let paintings = null;

export function getCinematicPaintings() {
  return paintings;
}

export function publishCinematicPaintings(token, available) {
  owner = token;
  paintings = Object.freeze(available.map(Boolean));
}

export function clearCinematicPaintings(token) {
  if (owner !== token) return;
  owner = paintings = null;
}
