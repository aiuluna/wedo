import { ConfigAttributes } from "./ConfigAttributes";

const uploadServiceURL = "http://localhost:7001"
const docServiceURL = "http://localhost:7002"
const buildServiceURL = "http://localhost:7003"
const faasServiceURL = "http://localhost:7004"

const config: ConfigAttributes = {
  uploadFileObject: `${uploadServiceURL}/upload-object`,
  uploadFileText: `${uploadServiceURL}/upload-content`,
  codeProjectURL: (user: string, name: string) => {
    return `${docServiceURL}/code-project/${user}/${name}`
  },
  codeProjectBuildURL: (user: string, name: string) => {
    return `${buildServiceURL}/build/${user}/${name}`
  },
  pageUrl: (user?: string, name?: string) => {
    if (!name || !user) {
      return `${docServiceURL}/page`
    }
    return `${docServiceURL}/page/${user}/${name}`
  },
  faasRunner: (user: string, project: string, fnName: string, ...args: string[]) => {
    const query = args.join(',')
    return `${faasServiceURL}/${user}/${project}/${fnName}?${query}`
  }
}

export default config