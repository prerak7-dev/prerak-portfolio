export const TEXT_ENTRY_MS = 1450;
export const TEXT_CONTENT_ENTRY_MS = 960;
export const HOME_IDENTITY_ENTRY_MS = 1300;
export const HOME_IDENTITY_HOLD_MS = 180;
export const HOME_IDENTITY_EXIT_MS = 650;

const progress = (elapsed, start, duration) => Math.max(0, Math.min(1, (elapsed - start) / duration));

export function homeTextChoreography(elapsed, initial = false) {
  const exitStart = HOME_IDENTITY_ENTRY_MS + HOME_IDENTITY_HOLD_MS;
  const dockStart = exitStart + HOME_IDENTITY_EXIT_MS;
  const roleStart = initial ? dockStart : 0;
  const mottoStart = roleStart + TEXT_ENTRY_MS + 120;
  const duration = mottoStart + TEXT_ENTRY_MS;
  return {
    duration,
    identity: !initial ? 1 : elapsed >= dockStart ? progress(elapsed, dockStart, TEXT_ENTRY_MS)
      : elapsed >= exitStart ? progress(elapsed, exitStart, HOME_IDENTITY_EXIT_MS)
        : progress(elapsed, 0, HOME_IDENTITY_ENTRY_MS),
    identityAtHeader: !initial || elapsed >= dockStart,
    identityDirection: initial && elapsed >= exitStart && elapsed < dockStart ? 'outgoing' : 'incoming',
    role: progress(elapsed, roleStart, TEXT_ENTRY_MS),
    motto: progress(elapsed, mottoStart, TEXT_ENTRY_MS),
    stage: elapsed >= duration ? 'complete' : elapsed >= mottoStart ? 'motto'
      : elapsed >= roleStart ? 'role' : elapsed >= exitStart ? 'identity-exit' : 'identity',
  };
}
