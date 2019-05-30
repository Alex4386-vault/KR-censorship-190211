import req from 'request';
import {domains} from "./offline";

export {domains};

export const getDomains = () => {
    return new Promise<string[]> (
        (resolve, reject) => {
            req.get('https://asia-northeast1-kr-censorship.cloudfunctions.net/getList' , {json: true}, (err, res, body:string[]) => resolve(body));
        });
}

