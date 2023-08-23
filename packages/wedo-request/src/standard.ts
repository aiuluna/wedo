
export type CustomResponse = {
  success: boolean,
  message?: string,
  errorCode?: number,
  httpCode?: number,
  data?: any
}

function getXUser() {
  if (!globalThis.localStorage) {
    return ''
  }
  return localStorage.getItem('x-user') || ''
}

export const analyzeResponse = async (resp: Response): Promise<CustomResponse> => {
  const status = resp.status;
  if (status >= 200 && status < 300) {
    try {
      return await resp.json()
    } catch (error) {
      return {
        message: (error as Error).toString(),
        success: false,
        httpCode: status
      }
    }
  } else if (status >= 300 && status < 400) {
    return {
      success: true,
      message: 'Warning: Redirection occured.',
      httpCode: status
    }
  } else if (status >= 400 && status < 500) {
    return {
      success: false,
      message: "Error: Client side error occured.",
      httpCode: status
    }
  } else if (status >= 500){
    const msg = "Server side 500"
    try {
      const jsonRes = await resp.json();
      throw new Error(jsonRes.message)
    } catch (error) {
      throw new Error(msg)
    }
  }  else {
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

