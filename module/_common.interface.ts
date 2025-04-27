export interface PartialConfig {
  title: string;
  path: string;
}

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  keywords: string[];
  author: string;
  license: string;
  repository: {
    type: string;
    url: string;
  };
  bugs: {
    url: string;
  };
  homepage: string;
}
