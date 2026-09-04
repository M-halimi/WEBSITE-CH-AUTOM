export const CLIENT_COOKIE_NAME = "autoflows_client_session";

export interface ClientSessionUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  businessType: string | null;
  clientProfile?: any;
  subscription?: any;
  subscriptionState?: import("@/lib/subscriptions").SubscriptionState;
}
