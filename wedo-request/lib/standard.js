"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStandrd = exports.analyzeResponse = void 0;
function getXUser() {
    if (!global.localStorage) {
        return '';
    }
    return localStorage.getItem('x-user') || '';
}
const analyzeResponse = async (resp) => {
    const status = resp.status;
    if (status >= 200 && status < 300) {
        try {
            return await resp.json();
        }
        catch (error) {
            return {
                message: error.toString(),
                success: false,
                httpCode: status
            };
        }
    }
    else if (status >= 300 && status < 400) {
        return {
            success: false,
            message: 'Error: Redirection occured.',
            httpCode: status
        };
    }
    else if (status >= 400 && status < 500) {
        return {
            success: false,
            message: "Error: Client side error occured.",
            httpCode: status
        };
    }
    else {
        return {
            success: false,
            message: "Server side error occured.",
            httpCode: status
        };
    }
};
exports.analyzeResponse = analyzeResponse;
const fetchStandrd = async (url, init) => {
    if (!init) {
        init = {};
    }
    if (!init.headers) {
        init.headers = {};
    }
    init.headers = {
        ...init.headers,
        'x-user': getXUser()
    };
    return await (0, exports.analyzeResponse)(await fetch(url, init));
};
exports.fetchStandrd = fetchStandrd;
