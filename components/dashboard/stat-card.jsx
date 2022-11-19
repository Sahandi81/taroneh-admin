export default function StatCard({ variant, stats, text, icon }) {
  let otherClassNames = '';
  switch (variant) {
    case 'v-1':
      otherClassNames = 'bg-sky-400 shadow-sky-400/50';
      break;
    case 'v-2':
      otherClassNames = 'bg-amber-400 shadow-amber-400/50';
      break;
    case 'v-3':
      otherClassNames = 'bg-fuchsia-500 shadow-fuchsia-500/50';
      break;
    case 'v-4':
      otherClassNames = 'bg-rose-500 shadow-rose-500/50';
      break;
    default:
      break;
  }

  return (
    <div className={`flex justify-between items-center p-5 shadow-lg rounded overflow-hidden ${otherClassNames}`}>
      <div>
        <p className='text-xl font-medium text-white'>{stats}</p>
        <p className='text-white text-sm'>{text}</p>
      </div>
      <div>
        {icon}
      </div>
    </div>
  );
}
