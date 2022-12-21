import { useState, useMemo } from 'react';
import cn from 'classnames';
// import moment from 'jalali-moment';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Table from '../ui/table';
import SpinnerFull from '../ui/spinner-full';
import AddSubCategory from './add-sub-category';
import EditSubCategory from './edit-sub-category';
import DeleteSubCategoryModal from './delete-sub-category-modal';
import { SUBCATEGORY_DELETED_SUCCESSFULLY } from '@/data/messages';
import {
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
  useGetCategoriesQuery
} from '@/features/api/apiSlice';
import { calender } from '@/data/calender';

export default function SubCategories({ header, mainCategories }) {
  const [openAddSub, setOpenAddSub] = useState(false);
  const [openEditSub, setOpenEditSub] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [lastPage, setLastPage] = useState(1);

  const {
    data,
    error,
    isLoading: isLoadingSubCategory
  } = useGetSubCategoriesQuery(page, perPage);
  
  const [deleteSubCategory, { isLoading: isLoadingDelete }] =
    useDeleteSubCategoryMutation();

    
    const memoizedSubCategories = useMemo(() => {
      if (data) {
        const items = data.items;
        const subCategoriesList = [...Array(items.length)];
      for (let i = 0; i < items.length; i++) {
        subCategoriesList[i] = {
          id: items[i]._id,
          name:  mainCategories.filter(el=>el._id === items[i].category_id)[0]?.name,
          categoryId: items[i].category_id,
          categoryName:  items[i].name,
          createdOn: calender(items[i].created_at) 
          // moment(items[i].created_at)
          //   .locale('fa')
          //   .format('YYYY/MM/DD')
        };
      }
      setLastPage(data.lastPage);
      return subCategoriesList;
    }

    return [];
  }, [data]);

  // if (isLoadingSubCategory) {
  //   return <div>...Loading</div>;
  // }

  // if (error) {
  //   return <div>{error.message || 'Error in getting SubCategories'}</div>;
  // }

  const handleCloseAdd = () => setOpenAddSub(false);
  const handleOpenAdd = () => setOpenAddSub(true);

  const handleCloseEdit = () => {
    setCurrentItem(null);
    setOpenEditSub(false);
  };

  const handleOpenEdit = item => {
    setCurrentItem(item);
    setOpenEditSub(true);
  };

  const handleCloseDelete = () => {
    setCurrentItem(null);
    setIsOpenDelete(false);
  };

  const handleOpenDelete = item => {
    setCurrentItem(item);
    setIsOpenDelete(true);
  };

  const handleDelete = async item => {
    deleteSubCategory({ id: currentItem.id })
      .unwrap()
      .then(data => {
        // console.log(data);
        // if (data.success) {
          toast.success(CATEGORY_DELETED_SUCCESSFULLY);
        // } else {
        //   toast.error(data.message || 'Error in deleting sub category');
        // }
      })
      .catch(error => {
        toast.error(error?.data?.message || 'Error in deleting sub category');
      });
    setIsOpenDelete(false);
    setCurrentItem(null);
  };

  const handleClickPrev = () => {
    setPage(prevState => {
      if (prevState > 1) return prevState - 1;
    });
  };

  const handleClickNext = () => {
    setPage(prevState => {
      if (prevState < lastPage) return prevState + 1;
    });
  };

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg shadow-slate-400/10 relative'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-lg font-semibold text-gray-700'>زیر شاخه</h1>
        <div className='flex gap-4'>
          <button
            className='flex gap-2 items-center py-2 px-4 rounded bg-green-200 text-green-700 transition-shadow duration-200 hover:bg-green-300'
            onClick={handleOpenAdd}
          >
            <FaPlus size='15' />
            افزودن زیر شاخه
          </button>
        </div>
      </div>

      <Table
          header={header}
          items={memoizedSubCategories}
          handleEdit={handleOpenEdit}
          handleDelete={handleOpenDelete}
          isLoading={isLoadingSubCategory}
          noDataText='زیر شاخه ای برای نمایش وجود ندارد'
        />

      {memoizedSubCategories.length > 0 && (
        <>
          <div className='flex mr-auto w-fit mt-5 h-11 rounded border'>
            <button
              type='button'
              onClick={handleClickPrev}
              className={cn('w-11 flex justify-center items-center border-l', {
                ['text-gray-700']: page !== 1,
                ['text-gray-300']: page === 1,
                ['hover:bg-gray-100']: page !== 1,
                ['active:bg-transparent']: page !== 1
              })}
              disabled={page === 1}
            >
              <FaChevronRight />
            </button>
            <button
              type='button'
              onClick={handleClickNext}
              className={cn('w-11 flex justify-center items-center', {
                ['text-gray-700']: page !== lastPage,
                ['text-gray-300']: page === lastPage,
                ['hover:bg-gray-100']: page !== lastPage,
                ['active:bg-transparent']: page !== lastPage
              })}
              disabled={page === lastPage}
            >
              <FaChevronLeft />
            </button>
          </div>
        </>
      )}

      {openAddSub && (
        <AddSubCategory isOpen={openAddSub} closeModal={handleCloseAdd} />
      )}

      {currentItem && (
        <EditSubCategory
          isOpen={openEditSub}
          closeModal={handleCloseEdit}
          item={currentItem}
        />
      )}

      {isOpenDelete && (
        <DeleteSubCategoryModal
          isOpen={isOpenDelete}
          closeModal={handleCloseDelete}
          deleteSubCategory={handleDelete}
        />
      )}

      {isLoadingDelete && <SpinnerFull />}

      <ToastContainer />
    </div>
  );
}

SubCategories.defaultProps = {
  header: ['شاخه اصلی', 'زیر شاخه', 'تاریخ ایجاد', 'عملیات']
};
