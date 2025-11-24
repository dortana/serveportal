import React from 'react';

const PlusIcon = ({ className }: { className?: string }) => {
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
        d='M12 8V16M16 12H8'
        stroke='currentColor'
        strokeWidth='currentStrokeWidth'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='currentStrokeWidth'
      ></circle>
    </svg>
  );
};

export default PlusIcon;
