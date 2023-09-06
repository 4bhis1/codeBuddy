require("dotenv").config();
const getCode = require("../logics/puppeteer");
const getTodayDate = require("../logics/getTodaysDate");
const leetcodeApi = require("./leetcodeAPi");
const setupRepo = require("../github/setup-method");
const commitGithubCode = require("../github/new-github");
const {
  profile: profileQuery,
  recentSubmissions,
  problems,
  daily,
} = require("./queries");

const recentSubmissionsApi = async (req, res) => {
  try {
    let username = process.env.LEETCODE_USERNAME;

    await setupRepo();

    const { data } = await leetcodeApi({
      variables: { username, limit: 4 },
      query: recentSubmissions,
    });

    for (let i of data["recentSubmissionList"]) {
      if (getTodayDate(i.time)) {
        console.log(">> i", i);
        const code = await getCode(i.id);
        await commitGithubCode(code, i.titleSlug, i.lang);
      } else {
        break;
      }
    }

    // res.send(data);
  } catch (err) {
    let error = err?.response?.data || err || "unwanted error";
    throw error;
  }
};

// not in use
const problemsApi = async (req, res) => {
  try {
    let username = "4bhis1";
    const { data } = await leetcodeApi({
      variables: {
        titleSlug: "two-sum",
        // username,
      },
      query: problems,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// no in use
const dailyApi = async (req, res) => {
  try {
    let username = "4bhis1";
    const { data } = await leetcodeApi({
      query: daily,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// not in use
const profile = async (req, res) => {
  try {
    let user = req.params.userID;
    const data = await leetcodeApi({
      query: profileQuery,
      variables: { username: user },
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

recentSubmissionsApi();

// module.exports = {
//   profile,
//   recentSubmissionsApi,
//   submissionsApi,
//   problemsApi,
//   dailyApi,
// };
