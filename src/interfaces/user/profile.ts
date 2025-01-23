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


export interface UserProfileData {
    email: string;
    firstName: string;
    lastName: string;
    languages: string[];
    avatar: string | null;
    coverPic: string | null;
    memberSince: string; // ISO date string
    userName: string;
    dob : string | null; // ISO date string
    gender: "MALE" | "FEMALE" | "OTHER"; // You can add more options if needed
    followersCount: number;
    country: string;
    countryCode: string;
    folowingCount: number;
    description: string | null 
    blockedUsersCount: number;
    succesfullDeliveries: number;
    nextLevel: string | null;
    sellerProfile: string | null;
    level: {
      id: string;
      level: number;
      requiredTransactionsUSD: number;
      requiredTransactionsSR: number;
    };
  };
