import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  register: any;
  name: string;
  defaultChecked?: boolean;
  isYearly?: boolean;
  price: number;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, register, name, defaultChecked, isYearly, price }) => {
  return (
    <label className="flex flex-col p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
      <input
        type="radio"
        value={value}
        {...register(name)}
        defaultChecked={defaultChecked}
        className="hidden"
      />
      <span className="font-bold">{label}</span>
      <span className="text-gray-600">${price}/{isYearly ? 'yr' : 'mo'}</span>
    </label>
  );
};

export default RadioButton;