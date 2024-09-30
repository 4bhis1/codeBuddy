const puppeteer = require("puppeteer");

const parseCode = (code) => {
  code = code.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
  return code;
};

const getCode = async (id) => {
  const browser = await puppeteer.launch({
    headless: "new",
    protocolTimeout: 3 * 60 * 1000,
    // defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://leetcode.com/submissions/detail/${id}`, {
    waitUntil: "networkidle0",
  });

  await page.type("#id_login", "4bhis1");
  await page.type("#id_password", "4bhi$heK");

  await Promise.all([
    page.click("#signin_btn"),
    page.waitForNavigation(/* { waitUntil: "networkidle0" } */),
  ]);

  try {
    const divContents = await page.evaluate(() => {
      const div = Array.from(document.querySelectorAll(".ace_line_group"));

      return div.map((div) => div.innerHTML);
    });

    let code = divContents
      .map((doc) => doc.replace(/<\/?[^>]+(>|$)/g, ""))
      .join("\n");

    code = parseCode(code);

    return code;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
};

module.exports = getCode;
getCode()