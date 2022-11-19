import Spinner from './spinner';
function SpinnerFull() {
  return (
    <div className='absolute inset-0 w-full h-full bg-blue-900/40 flex justify-center items-center z-50 rounded-lg'>
      <Spinner />
    </div>
  );
}

export default SpinnerFull;
