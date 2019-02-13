export const reqToBlocked = (blocked: string): string => `Requesting google.com with hostname modified to ${blocked}`;

export const notCensored = (blocked: string): string => `${blocked} is OK.`;

export const censored = (blocked: string): string => `${blocked} is being censored.`;

export const result = (isCensored: boolean): string => `\nResult :\n${isCensored ?
    `Your network is currently CENSORED!\nPlease USE VPN to protect your privacy from government supervision!` :
    `This network is not censored.\nEnjoy your internet life.`}`;

export const error = (): string =>
    `This is something which should not happen or the censor logic was changed.\n` +
    `Please Report this bug to github.\n` +
    `https://github.com/Alex4386/KR-censorship-190211`;
