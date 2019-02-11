import request from "request";
import util from "util";

// Spoof ServerName Header to this.
let spoofTo:string = "hitomi.la";

// options
let options = {
    url: util.format("https://google.com"),
    headers: {
        host: spoofTo
    }
};

// request
request(options,
    (err, res, body) => {
        if (err !== undefined) {
            if (err.reason !== undefined) {
                if (err.reason.includes("is not in the cert\'s altnames:")) {
                    console.log("Your network is OK, Enjoy your internet");
                } else if (err.code === "ECONNRESET") {
                    console.log("Your network is being censored. use VPN if you can.");
                }
            } else if (err.code === "ECONNRESET") {
                console.log("Your network is being censored. use VPN if you can.");
            } else {
                console.error("This is something which should not happen or the censor logic was changed.");
                console.error("Please Report this bug to github.");
                console.error("https://github.com/Alex4386/KR-censorship-190211");
            }
        }
    }
);