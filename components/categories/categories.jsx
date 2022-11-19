import MainCategories from './main-categories';
import SubCategories from './sub-categories';

export default function Categories() {
  return (
    <div className='grid gap-10 pb-10'>
      <MainCategories />
      <SubCategories />
    </div>
  );
}
