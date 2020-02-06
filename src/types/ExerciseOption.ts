export interface Exercise {
  name: string;
  _id: string;
  user: string;
  createdAt: string;
  prDate?: string;
  pr?: number;
}

export interface Msg {
  success?: string;
  error?: string;
}
