import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LearnerService, {
  AuthResponse,
  Learner,
  Login,
  Register,
} from "@/api/LearnerService.ts";
import { resetHeader, setHeader } from "@/api/axiosConfig.ts";
import { AxiosResponse } from "axios";

interface AuthProviderState {
  learner: Learner | null;
  token: string | null;
  register: ({ username, email, password }: Register) => Promise<void>;
  login: ({ username, password }: Login) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthProviderState>({} as AuthProviderState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [learner, setLearner] = useState<Learner | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const learnerLocal = localStorage.getItem("learner");
    const token = localStorage.getItem("token");
    if (token && learnerLocal) {
      setLearner(JSON.parse(learnerLocal));
      setToken(token);
      setHeader();
    }
    setIsReady(true);
  }, []);

  const register = async ({ username, email, password }: Register) => {
    await LearnerService.register({ username, email, password }).then((res) => {
      setUp(res);
      setHeader();
      navigate("/");
    });
  };

  const login = async ({ username, password }: Login) => {
    await LearnerService.login({ username, password }).then((res) => {
      setUp(res);
      setHeader();
      navigate("/");
    });
  };

  const setUp = (res: AxiosResponse<AuthResponse, any>) => {
    setToken(res.data.token);
    setLearner(res.data.learner);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("learner", JSON.stringify(res.data.learner));
    setHeader();
  };

  const isLoggedIn = () => {
    return !!learner;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("learner");
    setLearner(null);
    setToken(null);
    resetHeader();
    navigate("/login");
  };

  const value: AuthProviderState = {
    learner,
    token,
    register: register,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
