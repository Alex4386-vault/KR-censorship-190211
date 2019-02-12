import request from "request";
import util from "util";

// Spoof ServerName Header to this.
let spoofTo:string[] = 
[
    "hitomi.la",
    "pornhub.com",
    "e-hentai.com"
];

let isCensored:boolean = false;
let a = 0;

// request
spoofTo.forEach((blocked) => {
    console.log("Requesting google.com with hostname modified to "+blocked);

    // options
    let options = {
        url: util.format("https://google.com"),
        headers: {
            host: blocked
        }
    };

    request(options,
        (err, res, body) => {
            if (err !== undefined) {
                if (err.reason !== undefined) {
                    if (err.reason.includes("is not in the cert\'s altnames:")) {
                        console.log(blocked+" is OK");
                    } else if (err.code === "ECONNRESET") {
                        console.log(blocked+" is being censored.");
                        isCensored = true;
                    }
                } else if (err.code === "ECONNRESET") {
                    console.log(blocked+" is being censored.");
                } else {
                    console.error("This is something which should not happen or the censor logic was changed.");
                    console.error("Please Report this bug to github.");
                    console.error("https://github.com/Alex4386/KR-censorship-190211");
                }
            }
        }
    );
    
    a++;
    if(a === blocked.length) {
        checkBlocked();
    }

});

function checkBlocked():void {
    if (isCensored) {
        console.log("Your network is currently CENSORED! Please USE VPN to protect your privacy from government supervision!");
        console.log("이 네트워크는 검열 되어있습니다! VPN사용을 적극 권장합니다!");
    } else {
        console.log("이 네트워크는 검열 되어있지 않습니다! ");
        console.log("This network is not censored, Enjoy your internet life.");
    }
}
