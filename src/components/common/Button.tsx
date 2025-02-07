import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button className="bg-denim text-white px-4 py-2 rounded-md" type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;