// import fs from "fs";
// //import path from "path";
// const logPath = path.join(process.cwd, "logs.txt");
// export const logger = (req, res, next) => {
//   const time = new Date().toISOString();
//   const log = `${time}|${req.method} |${req.ip}`;
//   fs.appendFile(logPath, log, (err) => {
//     if (err) {
//       console.err(err.message);
//     }
//   });
//   next();
// };
