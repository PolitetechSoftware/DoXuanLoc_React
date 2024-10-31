import { ChangeEvent } from "react";
import "./index.css"

interface PropsInput {
  value: string | number;
  onChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
}

const Input = ({ value, onChange, type, placeholder }: PropsInput) => {
  return (
    <input
      className="input"
      type={type}
      value={value}
      onChange={(event) => onChange(event)}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
