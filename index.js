const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
let {
  profile,
  submissionsApi,
  recentSubmissionsApi,
  problemsApi,
  dailyApi,
} = require("./src/external_utilities/leetcode");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/recentSubmissions", recentSubmissionsApi);
app.get("/problems", problemsApi);
app.get("/submissions", submissionsApi);
app.get("/daily", dailyApi);
app.get("/:userID", profile);

app.listen(5008, () => {
  console.log(`App is running on port 5008`);
});
