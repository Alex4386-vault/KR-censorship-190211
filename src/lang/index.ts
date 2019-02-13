import * as os from "os";
import * as korean from './ko'
import * as english from './en'

const cmd = require('node-cmd');

export type Language = {
    reqToBlocked: (blocked: string) => string;
    notCensored: (blocked: string) => string;
    censored: (blocked: string) => string;
    result: (isCensored: boolean) => string;
    error: () => string;
}

export const getLangText = (): Promise<Language> => new Promise((resolve, reject) => {
    if (os.type() == 'Windows_NT')
        cmd.get(`systeminfo`, (err, data) => {
            if (err)
                reject(err);
            else {
                const lang = /: *[a-z]{2};/.exec(data)[0];
                resolve(lang.substr(lang.length - 3, 2));
            }
        });
    else
        resolve((process.env.LANG || process.env.LANGUAGE).substr(0, 2))
}).then((lang) => {
    if (lang === 'ko') {
        return korean
    } else {
        return english
    }
});
