import { useGetCategoriesQuery } from '@/features/api/apiSlice';
import MainCategories from './main-categories';
import SubCategories from './sub-categories';

export default function Categories() {
  const {
		data,
		error,
		isLoading: isLoadingCategory,
	} = useGetCategoriesQuery(1, 8);
  return (
    <div className='grid gap-10 pb-10'>
      <MainCategories data={data} error={error} isLoadingCategory={isLoadingCategory} />
      <SubCategories mainCategories={data.items} error={error} isLoadingCategory={isLoadingCategory}/>
    </div>
  );
}
