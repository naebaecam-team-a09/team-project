'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { useInputs } from '@/hooks/useInput';
import Link from 'next/link';
import BackBoard from '../_components/BackBoard/BackBoard';
import Input from '../_components/Input';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [inputs, setInputs] = useInputs<Inputs>({ email: '', password: '' });

  const { me, logIn, logInWithProvider } = useAuth();

  const handleClickLogIn = async () => {
    logIn(inputs);
  };

  const handleClickLogInWithKakao = async () => {
    logInWithProvider('kakao');
  };

  return (
    <div className="h-screen relative flex  justify-center items-center pt-[40px]">
      <BackBoard />
      <div className="relative flex flex-col gap-9 justify-center items-center w-[600px] h-[640px] rounded-3xl bg-[#132A43] border border-[#E7C891] z-10 px-[80px]">
        <h1 className="text-[#E7C891] text-4xl font-black">로그인</h1>
        <Input name="email" type="email" placeholder="이메일" onChange={setInputs} value={inputs.email} />
        <Input name="password" type="password" placeholder="비밀번호" onChange={setInputs} value={inputs.password} />
        <button onClick={handleClickLogIn} className="h-12 w-full bg-[#9F8264] text-white rounded-lg font-bold">
          이메일로 로그인
        </button>
        <button
          onClick={handleClickLogInWithKakao}
          className="h-12 w-full bg-[#EBBC17] text-white font-bold rounded-lg"
        >
          카카오톡으로 로그인
        </button>
        <Link href="/sign-up" className="h-12 text-white">
          회원가입하기 &gt;{' '}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
