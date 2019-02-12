import axios from 'axios'
import {domains} from "./offline";

export {domains};

export const getDomains = (): Promise<string[]> =>
    axios.get('https://asia-northeast1-kr-censorship.cloudfunctions.net/getList').then((data) => data.data);
