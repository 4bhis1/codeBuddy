require("dotenv").config();
const axios = require("axios");

const leetcodeApi = async (body) => {
  const { data } = await axios.post(
    "https://leetcode.com/graphql",
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
        referer: "https://leetcode.com",
        origin: "https://leetcode.com",
        cookie: `csrftoken=${
          process.env.LEETCODE_CSRF_TOKEN || ""
        }; LEETCODE_SESSION=${process.env.LEETCODE_SESSION || ""};`,
        "x-csrftoken": process.env.LEETCODE_CSRF_TOKEN || "",
        "user-agent": process.env.LEETCODE_USER_AGENT,
      },
    }
  );

  return data;
};

module.exports = leetcodeApi;
