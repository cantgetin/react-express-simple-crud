import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props} className={`px-5 py-1 bg-blue-800 rounded-md text-white ${props.className}`}>
            {children}
        </button>
    );
};

export default Button;