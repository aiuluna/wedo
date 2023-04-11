export interface PropConfig {
  name: string;
  label?: string;
  props?: any;
  disable?: boolean;
  type: string;
  path: string;
  default?: any;
  row?: number;
  rowLabel?: string;
  selections?: any;
  children?: Array<PropConfig>
}

export class PropMeta {
  disable?: boolean;
  path: Array<string>;
  config: PropConfig; 
  constructor(config: PropConfig) {
    this.config = config;
    this.path = config.path.split('.');
  }
}