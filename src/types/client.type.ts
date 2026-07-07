export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IClient {
  _id: string;
  email: string;
  role: string;
  fullName: string;
  gender: string;
  phone: string;
  profileImage: string;
  coverPhoto: string;
  isBlocked: boolean;
  isVerifiedByAdmin: boolean;
  fcmToken: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IGetClientsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IClient[];
    meta: IMeta;
  };
}

export interface IUserAddress {
  _id: string;
  userId: string;
  type: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IClientDetail {
  _id: string;
  email: string;
  role: string;
  fullName: string;
  gender: string;
  phone: string;
  profileImage: string;
  coverPhoto: string;
  isBlocked: boolean;
  isVerifiedByAdmin: boolean;
  verifiedRequest?: boolean;
  fcmToken: string | null;
  hasPortfolio: boolean;
  subscriptionType: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  isTrialUsed: boolean;
  subscriptionEndDate: string | null;
  isAutoRenewActive: boolean;
  subscriptionStatus: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  userAddress: IUserAddress[];
  totalBookings: number;
}

export interface IGetClientDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IClientDetail;
}
