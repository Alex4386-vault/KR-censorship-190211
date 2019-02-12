import request from "request";
import util from "util";

import {domains, getDomains} from "./domains";

Promise.race([getDomains(), new Promise(resolve => setTimeout(() => {
    resolve(domains)
}, 5000))]).then((spoofTo: string[]) => {
    return new Promise((resolve, reject) => {
        let a = 0;
        let isCensored: boolean = false;
        spoofTo.forEach((blocked) => {
            console.log(`Requesting google.com with hostname modified to ${blocked}`);

            // options
            const options = {
                url: util.format("https://google.com"),
                headers: {
                    host: blocked
                }
            };

            request(options, (err) => {
                    a++;

                    if (err !== undefined) {
                        if (err.reason !== undefined) {
                            if (err.reason.includes("is not in the cert\'s altnames:")) {
                                console.log(blocked + " is OK");
                            } else if (err.code === "ECONNRESET") {
                                console.log(blocked + " is being censored.");
                                isCensored = true;
                            }
                        } else if (err.code === "ECONNRESET") {
                            console.log(blocked + " is being censored.");
                            isCensored = true;
                        } else {
                            reject(err)
                        }
                    }

                    if (a === spoofTo.length) {
                        resolve(isCensored)
                    }
                }
            );
        });
    });
}).then((isCensored: boolean) => {
    console.log("");
    console.log("Result:");
    if (isCensored) {
        console.log("이 네트워크는 검열 되어있습니다! VPN 사용을 적극 권장합니다!");
        console.log("Your network is currently CENSORED! Please USE VPN to protect your privacy from government supervision!");
    } else {
        console.log("이 네트워크는 검열 되어있지 않습니다! ");
        console.log("This network is not censored, Enjoy your internet life.");
    }
    return {result: true};
}).catch((err) => {
    console.error("This is something which should not happen or the censor logic was changed.");
    console.error("Please Report this bug to github.");
    console.error("https://github.com/Alex4386/KR-censorship-190211");
    return {result: false, error: err};
}).then((result: { result: boolean, error?: Error }) => {
    process.exit(result.result ? 0 : 1)
});
