export type CustomResponse = {
    success: boolean;
    message?: string;
    errorCode?: number;
    httpCode?: number;
    data?: any;
};
export declare const analyzeResponse: (resp: Response) => Promise<CustomResponse>;
export declare const fetchStandrd: (url: RequestInfo, init?: RequestInit | undefined) => Promise<CustomResponse>;
