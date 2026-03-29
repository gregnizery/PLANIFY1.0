import {
  buildModuleAppUrl,
  getModuleBaseUrl,
  getModuleForHostname,
  getModuleRoute,
} from "@/lib/module-sites";

describe("module sites", () => {
  it("maps each module to its Firebase site and route", () => {
    expect(getModuleRoute("logistique")).toBe("/logistique");
    expect(getModuleRoute("facturation")).toBe("/facturation");
    expect(getModuleRoute("administration")).toBe("/administration");

    expect(getModuleBaseUrl("logistique")).toBe("https://planify-5a976-logistique.web.app");
    expect(getModuleBaseUrl("facturation")).toBe("https://planify-5a976-facturation.web.app");
    expect(getModuleBaseUrl("administration")).toBe("https://planify-5a976-administration.web.app");
  });

  it("detects a module from its dedicated hostname", () => {
    expect(getModuleForHostname("planify-5a976-logistique.web.app")).toBe("logistique");
    expect(getModuleForHostname("planify-5a976-facturation.web.app")).toBe("facturation");
    expect(getModuleForHostname("planify-5a976-administration.web.app")).toBe("administration");
    expect(getModuleForHostname("planify-5a976.web.app")).toBeNull();
  });

  it("builds module URLs from the site base", () => {
    expect(buildModuleAppUrl("logistique", "/login")).toBe("https://planify-5a976-logistique.web.app/login");
  });
});
