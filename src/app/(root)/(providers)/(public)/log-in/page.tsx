'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { useInputs } from '@/hooks/useInput';
import Link from 'next/link';
import BackBoard from '../_components/BackBoard';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [inputs, setInputs] = useInputs<Inputs>({ email: '', password: '' });

  const { me, logIn } = useAuth();

  const handleClickLogIn = async () => {
    logIn(inputs);
  };

  return (
    <div className="h-screen relative flex  justify-center items-center">
      <BackBoard />
      <div className="relative flex flex-col gap-9 justify-center items-center w-[600px] h-[640px] rounded-3xl bg-white z-10 px-[80px]">
        <h1 className="text-[#6D758F] text-4xl font-black">로그인</h1>
        <input
          className="h-12 border border-[#F1F3F7] w-full px-4 rounded-lg"
          name="email"
          type="email"
          placeholder="이메일"
          onChange={setInputs}
          value={inputs.email}
        />
        <input
          className="h-12 border border-[#F1F3F7] w-full px-4 rounded-lg"
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={setInputs}
          value={inputs.password}
        />
        <button onClick={handleClickLogIn} className="h-12 w-full bg-[#6D758F] text-white rounded-lg">
          이메일로 로그인
        </button>
        <button className="h-12 w-full bg-[#EBBC17] text-white rounded-lg">카카오톡으로 로그인</button>
        <Link href="/sign-up" className="h-12 text-[#6D758F]">
          회원가입하기 &gt;{' '}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
