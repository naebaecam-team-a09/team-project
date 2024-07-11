'use server';

export const generateRandomNickname = () => {
  // JSON 데이터 파싱
  const words = require('/public/data/words.json');

  const { adjectives, animals } = words;

  // 랜덤 형용사 선택
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // 랜덤 동물 이름 선택
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  // 랜덤 숫자 생성
  const minNumber = 1000;
  const maxNumber = 9999;
  const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  // 닉네임 조합
  const nickname = `${randomAdjective}${randomAnimal}_${randomNumber}`;

  return nickname;
};
