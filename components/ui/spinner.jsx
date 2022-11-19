import ReactDOM from 'react-dom';

export default function Spinner({ variant }) {
  if (variant === 'full') {
    return ReactDOM.createPortal(
      <div className='w-screen min-h-screen flex justify-center items-center fixed inset-0 z-[1000] bg-gray-700/70'>
        <div className='w-7 h-7 border-4 border-white/20 border-t-white animate-spin rounded-full'>
          &nbsp;
        </div>
      </div>,
      document.getElementById('spinner-root')
    );
  }

  return (
    <div className='w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin justify-self-center'>
      &nbsp;
    </div>
  );
}
