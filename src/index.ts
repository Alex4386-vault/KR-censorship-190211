import request from "request";
import util from "util";

import {domains, getDomains} from "./domains";
import {lang} from './lang'

Promise.race([
    getDomains(),
    new Promise(resolve => setTimeout(() => {
        resolve(domains)
    }, 5000))
]).then((spoofTo: string[]) => {
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
                        resolve(isCensored)
                    }
                }
            );
        });
    });
}).then((isCensored: boolean) => {
    console.log(lang.result(isCensored));
    return {result: true};
}).catch((err) => {
    console.log(lang.error());
    return {result: false, error: err};
}).then((result: { result: boolean, error?: Error }) => {
    process.exit(result.result ? 0 : 1)
});
