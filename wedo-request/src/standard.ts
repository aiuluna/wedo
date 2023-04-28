
export type CustomResponse = {
  success: boolean,
  message?: string,
  errorCode?: number,
  httpCode?: number,
  data?: any
}

function getXUser() {
  if (!global.localStorage) {
    return ''
  }
  return localStorage.getItem('x-user')
}

export const analyzeResponse = async (resp: Response): Promise<CustomResponse> => {
  const status = resp.status;
  if (status >= 200 && status < 300) {
    try {
      return await resp.json()
    } catch (error: any) {
      return {
        message: error.toString(),
        success: false,
        httpCode: status
      }
    }
  } else if (status >= 300 && status < 400) {
    return {
      success: false,
      message: 'Error: Redirection occured.',
      httpCode: status
    }
  } else if (status >= 400 && status < 500) {
    return {
      success: false,
      message: "Error: Client side error occured.",
      httpCode: status
    }
  } else {
    return {
      success: false,
      message: "Server side error occured.",
      httpCode: status
    }
  }

}

export const fetchStandrd = async (url: RequestInfo, init?: RequestInit | undefined): Promise<CustomResponse> => {
  if (!init) {
    init = {}
  }
  if (!init.headers) {
    init.headers = {}
  }
  init.headers = {
    ...init.headers,
    'x-user': getXUser()
  }
  return await analyzeResponse(await fetch(url, init))
}

