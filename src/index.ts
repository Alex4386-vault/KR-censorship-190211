import {req} from "./request";
import {domains, getDomains} from "./domains";
import {getLangText, Language} from './lang'

(async () => {
    const lang = await getLangText();
    const domains: string[] = (await Promise.race([
        getDomains(),
        new Promise(resolve => setTimeout(() => {
            resolve(domains)
        }, 5000))
    ])) as string[];

    domains.forEach((blocked) => {
        console.log(lang.reqToBlocked(blocked));
    });
    console.log();

    const data = await req(domains);

    data.safeUrl.forEach((e) => {
        console.log(lang.notCensored(e));
    });
    console.log();

    data.url.forEach((e) => {
        console.log(lang.censored(e));
    });
    console.log();

    console.log(lang.result(data.url.length !== 0));

    process.exit(0);
})();
