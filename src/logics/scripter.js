const { execFile, exec } = require("child_process");
const fs = require("fs");

const scriptReader = async ({ script, args, options }) => {
  try {
    const randomFileName = `script-${new Date().getTime()}.sh`;
    fs.writeFileSync(randomFileName, script);

    exec(`chmod +x ${randomFileName}`);

    const data = await new Promise((resolve, reject) => {
      execFile(
        `./${randomFileName}`,
        args,
        options,
        (codeErr, scriptOut, scriptErr) => {
          if (scriptOut) {
            resolve(scriptOut);
          } else if (scriptErr) {
            reject(scriptErr);
          } else {
            reject(codeErr);
          }
        }
      );
    });
    exec(`rm -rf ${randomFileName}`);
    return data;
  } catch (e) {
    console.error("error", e);
  }
};

module.exports = scriptReader;
