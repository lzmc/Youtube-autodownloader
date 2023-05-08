import express from "express";
import { Request, Response } from "express";
import fs from "fs";
const app = express();
const port = 3000;
app.get("/download", (req: Request, res: Response) => {
    const videoID = req.query.vid;
    res.send(`Downloading video ${videoID}`);
    const vidDir = "D:\\VidArchives"; //replace with your own directory
    if (!fs.existsSync(vidDir)) {
        fs.mkdirSync(vidDir);
    }
    process.chdir(vidDir);
    let done = false;
    if (fs.existsSync(`${videoID}.mp4`)) {
        console.log(`Video ${videoID} already downloaded!`);
        return;
    }
    const cmd = `yt-dlp -f 135+140 --write-sub --sub-lang en --embed-subs --output "%(uploader)s - %(title)s ｜ %(upload_date)s ｜ %(view_count)s" --merge-output-format mp4 https://www.youtube.com/watch?v=${videoID} --write-description`;
    const exec = require("child_process").exec;
    exec(cmd, (error: any, stdout: any, stderr: any) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
            return;
        }
        done = true;
    });
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});