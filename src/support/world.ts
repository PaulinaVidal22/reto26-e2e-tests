import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export class CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  baseUrl?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(project?: "ithaka" | "nettra"): Promise<void> {
    const headless = process.env.HEADLESS === "true";

    const viewportWidth = Number(process.env.DEFAULT_VIEWPORT_WIDTH) || 1280;
    const viewportHeight = Number(process.env.DEFAULT_VIEWPORT_HEIGHT) || 720;

    const actionTimeout = Number(process.env.ACTION_TIMEOUT) || 10000;
    const navigationTimeout = Number(process.env.NAVIGATION_TIMEOUT) || 30000;

    if (project === "ithaka") {
      this.baseUrl = process.env.ITHAKA_BASE_URL;
    } else if (project === "nettra") {
      this.baseUrl = process.env.NETTRA_BASE_URL;
    }

    this.browser = await chromium.launch({
      headless
    });

    this.context = await this.browser.newContext({
      viewport: { width: viewportWidth, height: viewportHeight }
    });

    this.page = await this.context.newPage();

    this.page.setDefaultTimeout(actionTimeout);
    this.page.setDefaultNavigationTimeout(navigationTimeout);
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }

    if (this.context) {
      await this.context.close();
    }

    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);