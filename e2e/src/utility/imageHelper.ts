import { browser } from 'protractor';
import * as fs from 'fs';

function NotExist(filename: string): boolean {
    fs.access(filename, fs.constants.R_OK || fs.constants.W_OK, (err) => {
        if (err) {
            return false;
        }
    });

    return true;
}

function createDic(filepath: string): Promise<boolean> {
    return new Promise((resolve, rejecit) => {
        fs.mkdir(filepath, (err) => {
            if (err) {
                rejecit(err);
            }
        });
        resolve(true);
    });
}

function writeFile(data: string, filename: string) {
    const stream = fs.createWriteStream(filename);
    stream.write(Buffer.from(data, 'base64'));
    stream.end();
}

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {

    const folder = './dist';
    const filepath = `${folder}/${filename}`;

    if (NotExist(folder)) {
        createDic(folder).then((isCreate) => {
            if (isCreate) {
                writeFile(data, filepath);
            }
        });
    } else {
        writeFile(data, filepath);
    }

}

function takeScreenshot(imgName: string) {
    browser.takeScreenshot().then(data =>
      writeScreenShot(data, `${imgName}.png`)
    );
}

export  { takeScreenshot };
