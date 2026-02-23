import { Before, After, Status } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import fs from "fs";
import path from "path";

Before({ tags: "@ithaka" }, async function (this: CustomWorld) {
  await this.init("ithaka");
});

Before({ tags: "@nettra" }, async function (this: CustomWorld) {
  await this.init("nettra");
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const reportsDir = path.resolve("reports/screenshots");

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const screenshotPath = path.join(
      reportsDir,
      `${scenario.pickle.name.replace(/\s+/g, "_")}-${Date.now()}.png`
    );

    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    await this.attach(screenshot, "image/png");
  }

  await this.close();
});