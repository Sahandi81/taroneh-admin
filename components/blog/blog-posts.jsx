import {FaChevronLeft, FaChevronRight, FaPlus, FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import Link from 'next/link';
import cn from "classnames";
import {useMemo, useState} from "react";
import {useDeleteBlogPostMutation, useGetBlogPostsQuery,} from "@/features/api/apiSlice";
// import moment from "jalali-moment";
import DeleteProductModal from '../products/delete-product-modal'
import { ToastContainer, toast } from "react-toastify";

import Image from 'next/image';
import customLoader from "@/libs/customLoader";
import { calender } from "@/data/calender";

export default function BlogPosts({header}) {

    const [openAddMain, setOpenAddMain] = useState(false);
    const [openEditMain, setOpenEditMain] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    // const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [lastPage, setLastPage] = useState(1);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deletePost] =useDeleteBlogPostMutation();
    const {
        data,
        error,
        isLoading
    } = useGetBlogPostsQuery(page, perPage);

    const memoizedPosts = useMemo(() => {
        if (data) {
            const items = data.data;
            // console.log(items)

            let blogPosts = [...Array(items.length)];
            for (let i = 0; i < items.length; i++) {
                blogPosts[i] = {
                    photo: items[i].photo?.length ? items[i].photo[0] : 'logo.png',
                    id: items[i]._id,
                    title: items[i].title,
                    body: items[i].body,
                    createdOn: calender(items[i].created_at)
                    // moment(items[i].created_at)
                    //     .locale('fa')
                    //     .format('YYYY/MM/DD')
                };
            }
            return blogPosts;
        }

        return [];
    }, [data]);

    const handleClickPrev = () => {
        setPage(prevState => {
            if (prevState > 1) return prevState - 1;
        });
    };

    const handleClickNext = () => {
        setPage(prevState => {
            if (prevState < data.last_page) return prevState + 1;
        });
    };
    const handleDelete = (productId) => {
		setOpenDeleteModal(false);
        // console.log(productId)
		deletePost({id:productId})
			.unwrap()
			.then(({ data }) => {
				if (data.success) {

                    setTimeout(()=>{
                        window.location.reload()
                    },2000)
					toast.success(PRODUCT_DELETED_SUCCESSFULLY);
				}else{
					toast.error("انجام نشد")
				}
			})
			.catch((error) => {
				(error.message);
			});
	};

    if (isLoading) {
        return <div>...Loading</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div className='bg-white rounded-lg p-6 shadow-lg shadow-slate-400/10 relative'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-lg font-semibold text-gray-700'>وبلاگ</h1>
                <div className='flex gap-4'>
                    <Link href={'/blog/add'} onClick={()=>setTimeout(() => {
                        window.location.reload()
                    }, 3000)}>
                        <button
                            className='flex gap-2 items-center py-2 px-4 rounded bg-green-200 text-green-700 transition-shadow duration-200 hover:bg-green-300'
                        >
                            <FaPlus size='15'/>
                            پست جدید
                        </button>
                    </Link>
                </div>
            </div>

            <table className='w-full rounded overflow-hidden border-collapse'>
                <thead>
                <tr>
                    {header.map((title, idx) => (
                        <th
                            key={idx}
                            className='bg-[#f5f6fa] text-gray-500/90 border border-gray-200 text-right text-sm font-semibold py-3 px-4 last-of-type:text-center'
                        >
                            {title}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {memoizedPosts.map((post, idx) => (
                    <tr key={idx} className='even:bg-gray-100'>
                        <td className='py-3 px-4 text-stone-600 font-semibold border border-gray-200'>
                            <Image src={`/storage/blog/${post.photo}`} alt={post.title} layout="responsive" width={120}
                                   height={80} loader={customLoader}/>
                        </td>
                        <td className='py-3 px-4 text-stone-600 font-semibold border border-gray-200'>
                            {post.title}
                        </td>
                        {/*<td dangerouslySetInnerHTML={{__html: post.body}} className='py-3 px-4 text-stone-600 font-semibold border border-gray-200' />*/}

                        <td className='py-2 px-5 w-40 border border-gray-200'>
                            <Link href={`/blog/${post.id}`} passHref>
                            <span
                                className='text-blue-500 cursor-pointer float-right mr-4'
                            >
                  <FaRegEdit size='20'/>
                </span>
                            </Link>
                            <span
                                className='w-0.5 h-4 inline-block bg-slate-300 rounded float-right mr-4 translate-y-0.5'>
                  &nbsp;
                </span>
                            <span
                                className='text-red-500 cursor-pointer mr-4 float-right'
                                onClick={() =>{ setOpenDeleteModal(true);setCurrentItem(post.id)}}
                            >
                  <FaRegTrashAlt size='20'/>
                </span>
                        </td>
                    </tr>
                ))}
                {memoizedPosts.length === 0 && (
                    <tr>
                        <td
                            className='text-center py-3 text-stone-600 font-semibold border border-gray-200'
                            colSpan={1000}
                        >
                            محصولی برای نمایش وجود ندارد
                        </td>
                    </tr>
                )}
                </tbody>
            </table>


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
                    <FaChevronRight/>
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
                    <FaChevronLeft/>
                </button>

            </div>
            <DeleteProductModal
				isOpen={openDeleteModal}
				closeModal={()=>setOpenDeleteModal(false)}
				deleteProduct={() => handleDelete(currentItem)}
			/>
            <ToastContainer/>
        </div>
    )
}

BlogPosts.defaultProps = {
    header: ['عکس', 'عنوان', 'عملیات'],
}
