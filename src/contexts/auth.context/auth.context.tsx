'use client';

import { createClient } from '@/supabase/client';
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
  const supabase = createClient();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(false);
  const [me, setMe] = useState<AuthContextValue['me']>(null);
  const isLoggedIn = !!me;

  const logIn: AuthContextValue['logIn'] = async (inputs) => {
    if (me) return alert('이미 로그인되어 있습니다');
    const { email, password } = inputs;
    if (!email || !password) return;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`, {
      method: 'POST',
      body: JSON.stringify(inputs)
    });
    const {
      data: { user },
      error
    } = await response.json();
    if (error) return alert('로그인 실패');
    setMe(user);

    alert('로그인되었습니다');
    router.replace('/');
  };

  const logInWithProvider: AuthContextValue['logInWithProvider'] = async (provider) => {
    try {
      setIsPending(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`);
      const data = await response.json();

      setIsPending(false);
      alert('로그인되었습니다');
      router.replace(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut: AuthContextValue['logOut'] = async () => {
    if (!me) return alert('로그인 상태가 아닙니다');
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, {
      method: 'DELETE'
    });
    setMe(null);
    alert('로그아웃 되었습니다. 홈 화면으로 이동합니다');
    router.replace('/');
  };

  const signUp: AuthContextValue['signUp'] = async (inputs) => {
    const { email, password } = inputs;
    if (!email || !password) return alert('이메일과 비밀번호를 모두 입력하세요.');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
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

    alert('회원가입이 완료되었습니다');
    setMe(user);
    router.replace('/');
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
