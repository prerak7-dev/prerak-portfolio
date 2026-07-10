const ALLOWED_EXTERNAL_HOSTS = new Set([
  'github.com',
  'www.github.com',
  'linkedin.com',
  'www.linkedin.com',
]);

export function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return value;
  seen.add(value);
  Object.freeze(value);
  Object.values(value).forEach((child) => deepFreeze(child, seen));
  return value;
}

export function safeText(value) {
  return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
}

export function createAssetPath(baseUrl, filename) {
  const cleanBase = String(baseUrl || '/').replace(/\/?$/, '/');
  const cleanName = safeText(filename).replace(/^\/+/, '');
  if (!/^[\w./-]+$/.test(cleanName) || cleanName.includes('..')) {
    throw new Error(`Unsafe asset path: ${filename}`);
  }
  return `${cleanBase}${cleanName}`;
}

export function assertAllowedExternalUrl(url) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname.toLowerCase())) {
    throw new Error(`External URL is not allowlisted: ${url}`);
  }
  return parsed.toString();
}

export function createMailtoHref(email) {
  const cleanEmail = safeText(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw new Error(`Invalid email address: ${email}`);
  }
  return `mailto:${cleanEmail}`;
}

export function getSafeLinkProps(href) {
  const cleanHref = safeText(href);
  const isExternal = /^https:\/\//i.test(cleanHref);
  if (isExternal) assertAllowedExternalUrl(cleanHref);
  if (/^\s*javascript:/i.test(cleanHref)) throw new Error('Unsafe javascript: link blocked');
  return isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {};
}

export function validatePortfolioData({ profile, projects, personalProjects }) {
  assertAllowedExternalUrl(profile.github);
  assertAllowedExternalUrl(profile.linkedin);
  createMailtoHref(profile.email);

  projects.forEach((project) => {
    project.actions?.forEach((action) => {
      if (/^https:\/\//i.test(action.href)) assertAllowedExternalUrl(action.href);
      if (/^\s*javascript:/i.test(action.href)) throw new Error(`Unsafe project action link: ${action.label}`);
    });
  });

  personalProjects.forEach((project) => {
    project.media?.forEach((item) => {
      ['src', 'poster'].forEach((key) => {
        if (item[key] && /^\s*javascript:/i.test(item[key])) {
          throw new Error(`Unsafe media ${key} in ${project.meta}`);
        }
      });
    });
  });
}
