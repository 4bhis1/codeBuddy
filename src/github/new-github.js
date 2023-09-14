const moment = require("moment");
const fs = require("fs");
const path = require("path");
const scriptReader = require("../logics/scripter");

// more extensions to add
const languageExtension = {
  javascript: ".js",
  python3: ".py",
  python: ".py",
  cpp: ".cpp",
};

const commitCodeScript = ({ branch, message }) => `
git add .
git commit -m '${message}'
git push origin ${branch}
`;

const commitGithubCode = async (code, question_name, language) => {
  const folderPath = `./repositories/DSA/${question_name}`;
  const fileName = `${moment().format("YY-DD-MM")}${
    languageExtension[language] || ".txt"
  }`;

  const filePath = path.join(folderPath, fileName);
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    fs.writeFileSync(filePath, code);
  } catch (err) {
    console.error(`Error writing file: ${err}`);
  }

  try {
    await scriptReader({
      script: commitCodeScript({
        branch: "dev-v1",
        message: "commit from leetBuddy",
      }),
    });
  } catch (err) {
    console.log(`Error while committing file: ${err}`);
  }
};

module.exports = commitGithubCode;
