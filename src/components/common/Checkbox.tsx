import React from 'react';

interface CheckboxProps {
  label: string;
  description: string;
  register: any;
  name: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, description, register, name }) => {
  return (
    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
      <input
        type="checkbox"
        {...register(name)}
        className="mr-4"
      />
      <div>
        <span className="font-bold">{label}</span>
        <p className="text-gray-600">{description}</p>
      </div>
    </label>
  );
};

export default Checkbox;