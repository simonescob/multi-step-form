import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <label className="mr-2 text-gray-700">{label}</label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          style={{ right: checked ? '0' : '1rem' }}
        />
        <label
          htmlFor="toggle"
          className={`toggle-label block overflow-hidden h-6 rounded-full ${
            checked ? 'bg-blue-500' : 'bg-gray-300'
          } cursor-pointer`}
        ></label>
      </div>
      <span className="text-sm font-medium text-gray-700">
        {checked ? 'Yearly' : 'Monthly'}
      </span>
    </div>
  );
};

export default Switch; 