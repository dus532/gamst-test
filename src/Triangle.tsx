export default function Triangle({ fill = '#DD2121' }) {
  return (
    <svg
      width='40'
      height='80'
      viewBox='0 0 40 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 40L40 40L0 0V40ZM0 40L40 80L0 80V40Z'
        fill={fill}
      />
    </svg>
  );
}
