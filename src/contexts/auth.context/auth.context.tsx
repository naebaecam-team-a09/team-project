'use client';

import { createClient } from '@/supabase/client';
import { Provider, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useModal } from '../modal.context/modal.context';
import AlertModal from '@/components/Modal/AlertModal';

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
  const { open, close } = useModal();

  const logIn: AuthContextValue['logIn'] = async (inputs) => {
    if (me) {
      open(
        <AlertModal
          content={'이미 로그인되어 있습니다'}
          onNextEvent={() => {
            router.replace('/');
            close();
          }}
        />
      );
      return;
    }
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
    if (error) {
      open(
        <AlertModal
          content={'로그인에 실패했습니다.'}
          onNextEvent={() => {
            close();
          }}
        />
      );
      return;
    }
    setMe(user);

    open(
      <AlertModal
        content={'환영합니다.'}
        onNextEvent={() => {
          router.replace('/');
          close();
        }}
      />
    );
  };

  const logInWithProvider: AuthContextValue['logInWithProvider'] = async (provider) => {
    try {
      setIsPending(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`);
      const data = await response.json();

      setIsPending(false);
      open(
        <AlertModal
          content={'환영합니다.'}
          onNextEvent={() => {
            router.replace(data.url);
            close();
          }}
        />
      );
    } catch (error) {
      console.error(error);
    }
  };

  const logOut: AuthContextValue['logOut'] = async () => {
    if (!me) {
      open(
        <AlertModal
          content={'로그인 상태가 아닙니다'}
          onNextEvent={() => {
            router.replace('/');
            close();
          }}
        />
      );
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, {
      method: 'DELETE'
    });
    setMe(null);
    open(
      <AlertModal
        content={'로그아웃 되었습니다. 홈 화면으로 이동합니다'}
        onNextEvent={() => {
          router.replace('/');
          close();
        }}
      />
    );
  };

  const signUp: AuthContextValue['signUp'] = async (inputs) => {
    const { email, password } = inputs;
    if (!email || !password) {
      open(
        <AlertModal
          content={'이메일과 비밀번호를 모두 입력하세요.'}
          onNextEvent={() => {
            close();
          }}
        />
      );
      return;
    }
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
    if (error) {
      open(
        <AlertModal
          content={'회원가입에 실패했습니다.'}
          onNextEvent={() => {
            close();
          }}
        />
      );
      return;
    }

    open(
      <AlertModal
        content={'회원가입이 완료되었습니다'}
        onNextEvent={() => {
          setMe(user);
          router.replace('/');
          close();
        }}
      />
    );
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users`);

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
