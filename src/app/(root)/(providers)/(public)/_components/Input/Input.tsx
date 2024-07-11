interface TInput {
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ name, type, placeholder, onChange, value }: TInput) => {
  return (
    <input
      className="h-12 shadow-inner border border-[#F1F3F7] w-full px-4 rounded-lg"
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
