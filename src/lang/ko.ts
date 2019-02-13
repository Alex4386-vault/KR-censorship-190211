export const reqToBlocked = (blocked: string): string =>
    `${blocked}에 요청중...`;

export const notCensored = (blocked: string): string =>
    `${blocked}은(는) 검열되고 있지 않습니다`;

export const censored = (blocked: string): string =>
    `${blocked}은(는) 검열되고 있습니다`;

export const result = (isCensored: boolean): string =>
    `\n결과 :\n` +
    `${isCensored ?
        `이 네트워크는 검열 되어있습니다!\n` +
        `프라이버시 보호를 위해 VPN 사용을 적극 권장합니다!` :
        `이 네트워크는 검열 되어있지 않습니다!\n` +
        `자유로운 인터넷을 즐기세요!`}`;

export const error = (): string =>
    `예상하지 못한 오류가 발생하였습니다.\n` +
    `검열 방법이 바뀌었을 수도 있습니다.\n` +
    `아래의 깃허브 링크로 이슈를 남겨 주세요.\n` +
    `https://github.com/Alex4386/KR-censorship-190211`;
