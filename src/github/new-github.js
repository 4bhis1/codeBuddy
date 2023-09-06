const moment = require("moment");
const fs = require("fs");
const path = require("path");

// more extensions to add
const languageExtension = {
  javascript: ".js",
  python3: ".py",
  python: ".py",
  cpp: ".cpp",
};

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
};

module.exports = commitGithubCode;
