const axios = require("axios");

const getGfgData = async () => {
  const userName = "4bhis1";
  await axios
    .get(
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/Cb-UxzlTiZkZbQW-VffAM/user/${userName}.json`
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/VSnbVC96EpDghx4M8xpqz/user/4bhis1.json`
    )
    .then((doc) => {
      console.log(">> data", doc.data.pageProps.userSubmissionsInfo);
    })
    .catch((err) => {
      console.log(">> err", err);
    });
};

module.exports = {
  getGfgData,
};

getGfgData();
