import request from 'request';
import util from "util";

interface IResult {
    len: number,
    url: string[],
    safeUrl: string[]
}

export const req =
    async (url: string[]): Promise<IResult> =>
        await url.reduce(async (acc: Promise<IResult>, val): Promise<IResult> =>
            await new Promise(async (resolve, reject) => {
                const data: { len: number, url: string[], safeUrl: string[] } = await acc;
                request({
                    url: util.format("https://google.com"),
                    headers: {
                        host: val,
                    }
                }, (err) => {
                    if (err !== undefined) {
                        if ((err.reason !== undefined) && (err.reason.includes("is not in the cert\'s altnames:"))) {
                            data.safeUrl.push(val);
                        } else if (err.code === "ECONNRESET") {
                            data.url.push(val);
                            data.len++;
                        } else {
                            reject(err)
                        }
                        resolve({len: data.len, url: data.url, safeUrl: data.safeUrl});
                    }
                });
            }), Promise.resolve({len: 0, url: [], safeUrl: []}));
