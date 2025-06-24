import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-sky-400',
  textColor = 'text-white',
  hoverColor = 'hover:bg-sky-500',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2 rounded-full font-medium transition duration-200 ease-in-out cursor-pointer ${bgColor} ${textColor} ${hoverColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;