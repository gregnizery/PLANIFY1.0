export type SuiteModuleKey = "logistique" | "facturation" | "administration";

const firebaseModuleUrls: Record<SuiteModuleKey, string> = {
  logistique: "https://planify-5a976-logistique.web.app",
  facturation: "https://planify-5a976-facturation.web.app",
  administration: "https://planify-5a976-administration.web.app",
};

const moduleRoutes: Record<SuiteModuleKey, string> = {
  logistique: "/logistique",
  facturation: "/facturation",
  administration: "/administration",
};

const envModuleUrls: Partial<Record<SuiteModuleKey, string | undefined>> = {
  logistique: import.meta.env.VITE_LOGISTIQUE_APP_URL,
  facturation: import.meta.env.VITE_FACTURATION_APP_URL,
  administration: import.meta.env.VITE_ADMINISTRATION_APP_URL,
};

function normalizeBaseUrl(value: string | undefined) {
  if (!value) return null;

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function normalizeHostname(value: string | undefined) {
  if (!value) return null;

  try {
    return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function getModuleRoute(moduleKey: SuiteModuleKey) {
  return moduleRoutes[moduleKey];
}

export function getModuleBaseUrl(moduleKey: SuiteModuleKey) {
  return normalizeBaseUrl(envModuleUrls[moduleKey]) ?? firebaseModuleUrls[moduleKey];
}

export function buildModuleAppUrl(moduleKey: SuiteModuleKey, path = "/") {
  return new URL(path, getModuleBaseUrl(moduleKey)).toString();
}

export function getModuleSiteHostname(moduleKey: SuiteModuleKey) {
  return normalizeHostname(getModuleBaseUrl(moduleKey));
}

export function getModuleForHostname(hostname: string | undefined) {
  const normalizedHostname = normalizeHostname(hostname);
  if (!normalizedHostname) return null;

  for (const moduleKey of Object.keys(moduleRoutes) as SuiteModuleKey[]) {
    if (normalizedHostname === getModuleSiteHostname(moduleKey)) {
      return moduleKey;
    }
  }

  return null;
}
