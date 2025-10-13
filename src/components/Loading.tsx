const Loading = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
    width='200'
    height='200'
    className={className}
  >
    <g>
      <path
        strokeLinecap='round'
        d='M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z'
        strokeDasharray='42.76482137044271 42.76482137044271'
        strokeWidth='5'
        stroke='currentColor'
        fill='none'
      >
        <animate
          values='0;256.58892822265625'
          keyTimes='0;1'
          dur='2.6315789473684212s'
          repeatCount='indefinite'
          attributeName='stroke-dashoffset'
        />
      </path>
      <g></g>
    </g>
  </svg>
);

export default Loading;
