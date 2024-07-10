'use client';

import { DOMAIN } from '@/constants/domain';
import { Provider, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type Inputs = {
  email: string;
  password: string;
};

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  me: User | null;
  logInWithProvider: (provider: Provider) => void;
  logIn: (inputs: Inputs) => void;
  logOut: () => void;
  signUp: (inputs: Inputs) => void;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  logInWithProvider: () => {},
  logIn: () => {},
  logOut: () => {},
  signUp: () => {}
};

const AuthContext = createContext<AuthContextValue>(initialValue);

export const useAuth = () => useContext<AuthContextValue>(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(false);
  const [me, setMe] = useState<AuthContextValue['me']>(null);
  const isLoggedIn = !!me;

  const logIn: AuthContextValue['logIn'] = async (inputs) => {
    if (me) return alert('이미 로그인되어 있습니다');
    const { email, password } = inputs;
    if (!email || !password) return;
    const response = await fetch(`${DOMAIN}/api/auth/log-in`, {
      method: 'POST',
      body: JSON.stringify(inputs)
    });
    const {
      data: { user },
      error
    } = await response.json();
    if (error) return alert('로그인 실패');
    setMe(user);
    router.push('/');
  };

  const logInWithProvider: AuthContextValue['logInWithProvider'] = async (provider) => {
    try {
      setIsPending(true);
      const response = await fetch(`${DOMAIN}/api/auth/provider?provider=${provider}`);
      const data = await response.json();

      setIsPending(false);
      router.replace(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut: AuthContextValue['logOut'] = async () => {
    if (!me) return alert('로그인 상태가 아닙니다');
    const response = await fetch(`${DOMAIN}/api/auth/log-out`, {
      method: 'DELETE'
    });
    setMe(null);
  };
  const signUp: AuthContextValue['signUp'] = async (inputs) => {
    const { email, password } = inputs;
    if (!email || !password) return alert('이메일과 비밀번호를 모두 입력하세요.');
    const response = await fetch(`${DOMAIN}/api/auth/sign-up`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });
    const {
      data: { user },
      error
    } = await response.json();
    if (error) return alert('회원가입 실패');
    setMe(user);
    router.push('/');
  };

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    logInWithProvider,
    logIn,
    logOut,
    signUp
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:3000/api/auth/users`);
      console.log('response', response);
      if (response.status === 200) {
        const user = await response.json();

        setMe(user);
      }
    };
    fetchUserData();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
