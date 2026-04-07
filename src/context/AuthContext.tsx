import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
  name: string;
  email: string;
  phone: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  message: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (payload: RegisterPayload) => AuthResult;
  logout: () => void;
}

const AUTH_USER_KEY = "mobimart-auth-user";
const AUTH_USERS_KEY = "mobimart-users";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const readStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(AUTH_USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
};

const writeStoredUsers = (users: StoredUser[]) => {
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
};

const writeCurrentUser = (user: AuthUser | null) => {
  if (user) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return;
  }

  window.localStorage.removeItem(AUTH_USER_KEY);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawUser = window.localStorage.getItem(AUTH_USER_KEY);
    if (!rawUser) return;

    try {
      setUser(JSON.parse(rawUser) as AuthUser);
    } catch {
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
  }, []);

  const login = (email: string, password: string): AuthResult => {
    const users = readStoredUsers();
    const foundUser = users.find(
      storedUser => storedUser.email === normalizeEmail(email) && storedUser.password === password,
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    const nextUser = { name: foundUser.name, email: foundUser.email, phone: foundUser.phone };
    setUser(nextUser);
    writeCurrentUser(nextUser);

    return { success: true, message: `Welcome back, ${foundUser.name}!` };
  };

  const register = (payload: RegisterPayload): AuthResult => {
    const users = readStoredUsers();
    const email = normalizeEmail(payload.email);
    const exists = users.some(storedUser => storedUser.email === email);

    if (exists) {
      return { success: false, message: "An account with this email already exists" };
    }

    const newUser: StoredUser = {
      name: payload.name.trim(),
      email,
      phone: payload.phone.trim(),
      password: payload.password,
    };

    const nextUsers = [...users, newUser];
    writeStoredUsers(nextUsers);

    const nextUser = { name: newUser.name, email: newUser.email, phone: newUser.phone };
    setUser(nextUser);
    writeCurrentUser(nextUser);

    return { success: true, message: "Your account has been created successfully" };
  };

  const logout = () => {
    setUser(null);
    writeCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
