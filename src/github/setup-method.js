require("dotenv").config();
const fs = require("fs");
const scriptReader = require("../logics/scripter");

const primerSetup = (accessToken, branch, userName, repoName) => `
mkdir -p repositories
cd repositories
git clone https://${accessToken}@github.com/${userName}/${repoName}.git
cd ${repoName}
git checkout -b ${branch} || git checkout ${branch} 
git pull origin ${branch}
`;

const setupRepo = async () => {
  if (fs.existsSync("./repositories/DSA")) {
    return;
  }
  await scriptReader({
    script: primerSetup(
      process.env.GITHUB_ACCESS_TOKEN,
      "code-extension",
      process.env.GITHUB_USERNAME,
      "DSA"
    ),
  });
};

setupRepo();

module.exports = setupRepo;
