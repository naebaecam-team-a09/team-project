'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { useInputs } from '@/hooks/useInput';
import Link from 'next/link';
import BackBoard from '../_components/BackBoard/BackBoard';
import Input from '../_components/Input';

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpPage = () => {
  const [inputs, setInputs] = useInputs<Inputs>({ email: '', password: '', passwordConfirm: '' });
  const { signUp } = useAuth();

  const handleClickSignUp = async () => {
    signUp(inputs);
  };

  return (
    <div className="h-screen relative flex  justify-center items-center">
      <BackBoard />
      <div className="relative flex flex-col gap-9 justify-center items-center w-[600px] h-[640px] rounded-3xl bg-white z-10 px-[80px]">
        <h1 className="text-[#6D758F] text-4xl font-black">회원가입</h1>

        <Input name="email" type="email" placeholder="이메일" onChange={setInputs} value={inputs.email} />
        <Input name="password" type="password" placeholder="비밀번호" onChange={setInputs} value={inputs.password} />
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          onChange={setInputs}
          value={inputs.passwordConfirm}
        />

        <button onClick={handleClickSignUp} className="h-12 w-full bg-[#6D758F] text-white rounded-lg">
          이메일로 회원가입
        </button>
        <button className="h-12 w-full bg-[#EBBC17] text-white rounded-lg">카카오톡으로 회원가입</button>
        <Link href="/log-in" className="h-12 text-[#6D758F]">
          로그인으로 돌아가기 &gt;{' '}
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
