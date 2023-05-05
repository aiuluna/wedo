import { ConfigAttributes } from "./ConfigAttributes";

const uploadServiceURL = "http://localhost:7001"
const docServiceURL = "http://localhost:7002"

const config: ConfigAttributes = {
  uploadFileObject: `${uploadServiceURL}/upload-object`,
  uploadFileText: `${uploadServiceURL}/upload-content`,
  codeProjectURL: (user: string, name: string) => {
    return `${docServiceURL}/code-project/${user}/${name}`
  } 
}

export default config