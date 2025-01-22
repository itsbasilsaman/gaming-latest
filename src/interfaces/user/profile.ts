export interface Country {
  name: string;
  flag: string;
  dialCode: string;
}

export interface ApiCountry {
  name: { common: string };
  flags: { svg: string };
  idd: { root?: string; suffixes?: string[] };
}