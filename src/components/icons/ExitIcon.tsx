import React from 'react';

const ExitIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      color='currentColor'
      fill='none'
      className={className}
    >
      <path
        d='M15.5 7.86859V7.34663C15.5 5.90823 14.4791 4.67225 13.0665 4.40061L6.06655 3.05446C4.21637 2.69866 2.5 4.1164 2.5 6.00048V17.9995C2.5 19.8836 4.21636 21.3013 6.06654 20.9455L13.0665 19.5994C14.4791 19.3278 15.5 18.0918 15.5 16.6534V16.1314'
        stroke='#141B34'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.5 14.9995L21.5 11.9995L18.5 8.99953M21 11.9995H8.5'
        stroke='#141B34'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ExitIcon;
