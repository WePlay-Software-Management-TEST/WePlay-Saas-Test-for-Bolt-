const { Before, AfterAll, After, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(60000);

AfterAll(async function () {
  await global.browser.close();
});

Before(async function () {
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
});

// Cleanup after each scenario
After(async function () {
  await global.page.close();
  await global.context.close();
});
