import request from "request";
import util from "util";

import {domains, getDomains} from "./domains";
import {getLangText, Language} from './lang'

getLangText().then((lang) => {
    return Promise.all([Promise.race([
        getDomains(),
        new Promise(resolve => setTimeout(() => {
            resolve(domains)
        }, 5000))
    ]),
        new Promise(resolve => resolve(lang))])
}).then(([spoofTo, lang]: [string[], Language]) => {
    return new Promise((resolve, reject) => {
        let numOfChecked = 0;
        let isCensored: boolean = false;
        spoofTo.forEach((blocked) => {
            console.log(lang.reqToBlocked(blocked));

            request({
                    url: util.format("https://google.com"),
                    headers: {
                        host: blocked
                    }
                }, (err) => {
                    numOfChecked++;

                    if (err !== undefined) {
                        if (err.reason !== undefined) {
                            if (err.reason.includes("is not in the cert\'s altnames:")) {
                                console.log(lang.notCensored(blocked));
                            } else if (err.code === "ECONNRESET") {
                                console.log(lang.censored(blocked));
                                isCensored = true;
                            }
                        } else if (err.code === "ECONNRESET") {
                            console.log(lang.censored(blocked));
                            isCensored = true;
                        } else {
                            reject(err)
                        }
                    }

                    if (numOfChecked === spoofTo.length) {
                        resolve([isCensored, lang])
                    }
                }
            );
        });
    });
}).then(([isCensored, lang]: [boolean, Language]) => {
    console.log(lang.result(isCensored));
    return [{result: true}, lang];
}).catch((err) => {
    return {result: false, error: err};
}).then(([result, lang]: [{ result: boolean, error?: Error }, Language]) => {
    if (!result)
        console.log(lang.error());
    process.exit(result.result ? 0 : 1)
});
