import { axios } from "./axiosConfig.ts";

export interface Learner {
  id: number | null;
  username: string | null;
  email: string | null;
}

export interface Register {
  username: string | null;
  email: string | null;
  password: string | null;
}

export interface Login {
  username: string | null;
  password: string | null;
}

export interface Stats {
  good: number;
}

export interface AuthResponse {
  learner: Learner;
  token: string;
}

export default class LearnerService {
  static async register(req: Register) {
    return await axios.post<AuthResponse>("/auth/register", req);
  }

  static async login(req: Login) {
    return await axios.post<AuthResponse>("/auth/authenticate", req);
  }

  static async stats() {
    return await axios.get<Stats>("/learners/stats");
  }
}
