import { ConfigAttributes } from "./ConfigAttributes";

const uploadServiceURL = "http://localhost:7001"

const config: ConfigAttributes = {
  uploadFileObject: `${uploadServiceURL}/upload-object`,
  uploadFileText: `${uploadServiceURL}/upload-content`
}

export default config