const puppeteer = require("puppeteer");

class Scrap {
  constructor(username) {
    this.username = username;
    this.BASE_URL = `https://auth.geeksforgeeks.org/user/${this.username}/practice/`;
  }

  async fetchProblems() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
      await page.goto(this.BASE_URL, { waitUntil: "networkidle2" });

      // Wait for the problem sections to load
      await page.waitForSelector(".problem_list_section");

      // Evaluate the page to extract the list of problems
      const problems = await page.evaluate(() => {
        const allProblems = [];

        // Helper function to extract problems from a section
        function extractProblems(sectionId) {
          const sectionProblems = [];
          const problemElements = document.querySelectorAll(
            `#${sectionId} ul.row li`
          );

          problemElements.forEach((element) => {
            const problemText = element.innerText.trim();
            const problemUrl = element.querySelector("a")
              ? element.querySelector("a").href
              : "";
            sectionProblems.push({ text: problemText, url: problemUrl });
          });

          return sectionProblems;
        }

        // Extract problems from different sections
        const sectionIds = ["school", "basic", "easy", "medium", "hard"];
        sectionIds.forEach((id) => {
          allProblems.push({
            section: id,
            problems: extractProblems(id),
          });
        });

        return allProblems;
      });

      await browser.close();
      return problems;
    } catch (error) {
      console.error(error);
      await browser.close();
      return { error: "Failed to fetch data" };
    }
  }
}

// Example usage
(async () => {
  const scrap = new Scrap("4bhis1"); // Replace 'yourUsername' with the actual username
  const problems = await scrap.fetchProblems();
  console.log(JSON.stringify(problems));
})();
