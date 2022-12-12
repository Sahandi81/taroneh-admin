import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
// import moment from "jalali-moment";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Table from "../ui/table";
import SpinnerFull from "../ui/spinner-full";
import AddMainCategory from "./add-main-category";
import EditMainCategory from "./edit-main-category";
import DeleteCategoryModal from "./delete-category-modal";
import { CATEGORY_DELETED_SUCCESSFULLY } from "@/data/messages";
import { setCategories } from "@/features/category/categorySlice";
import {
	useGetCategoriesQuery,
	useDeleteCategoryMutation,
} from "@/features/api/apiSlice";
import { calender } from "@/data/calender";

export default function MainCategories({ header , data, error, isLoadingCategory}) {
	const [openAddMain, setOpenAddMain] = useState(false);
	const [openEditMain, setOpenEditMain] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(8);
	const [lastPage, setLastPage] = useState(1);

	const dispatch = useDispatch();

	// const {
	// 	data,
	// 	error,
	// 	isLoading: isLoadingCategory,
	// } = useGetCategoriesQuery(page, perPage);

	const [deleteCategory, { isLoadingDelete }] = useDeleteCategoryMutation();
	
	const memoizedCategories = useMemo(() => {
		if (data) {
			const items = data.items;
			let categoriesList = [...Array(items.length)];
			for (let i = 0; i < items.length; i++) {
				categoriesList[i] = {
					photo: items[i].photos?.length ? items[i].photos[0] : "",
					id: items[i]._id,
					name: items[i].name,
					createdOn: calender(items[i].created_at)
					// moment(items[i].created_at)
					// 	.locale("fa")
					// 	.format("YYYY/MM/DD"),
				};
			}
			setLastPage(data.lastPage);
			dispatch(setCategories(categoriesList));
			return categoriesList;
		}

		return [];
	}, [data, dispatch]);

	// if (isLoadingCategory || !data) {
	//   return <div>...Loading</div>;
	// }

	// if (error) {
	//   return <div>{error.message || 'Error in getting categories'}</div>;
	// }

	const handleCloseAdd = () => setOpenAddMain(false);
	const handleOpenAdd = () => setOpenAddMain(true);

	const handleCloseEdit = () => {
		setCurrentItem(null);
		setOpenEditMain(false);
	};

	const handleOpenEdit = (item) => {
		setCurrentItem(item);
		setOpenEditMain(true);
	};

	const handleCloseDelete = () => {
		setCurrentItem(null);
		setIsOpenDelete(false);
	};
	const handleOpenDelete = (item) => {
		setCurrentItem(item);
		setIsOpenDelete(true);
	};

	const handleDelete = () => {
		deleteCategory({ id: currentItem.id })
			.unwrap()
			.then((data) => {
				
				if (data.success) {
					toast.success(CATEGORY_DELETED_SUCCESSFULLY);
				} else {
					toast.error(data.message || "Error in deleting category");
				}
			})
			.catch((error) => {
				toast.error(error.data.message || "Error in deleting category");
			});
		setIsOpenDelete(false);
		setCurrentItem(null);
	};

	const handleClickPrev = () => {
		setPage((prevState) => {
			if (prevState > 1) return prevState - 1;
		});
	};

	const handleClickNext = () => {
		setPage((prevState) => {
			if (prevState < lastPage) return prevState + 1;
		});
	};

	return (
		<div className="bg-white rounded-lg p-6 shadow-lg shadow-slate-400/10 relative">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-lg font-semibold text-gray-700">شاخه اصلی</h1>
				<div className="flex gap-4">
					<button
						className="flex gap-2 items-center py-2 px-4 rounded bg-green-200 text-green-700 transition-shadow duration-200 hover:bg-green-300"
						onClick={handleOpenAdd}
					>
						<FaPlus size="15" />
						افزودن شاخه اصلی
					</button>
				</div>
			</div>
			<Table
				header={header}
				items={memoizedCategories}
				handleEdit={handleOpenEdit}
				handleDelete={handleOpenDelete}
				isLoading={isLoadingCategory}
				noDataText="شاخه اصلی برای نمایش وجود ندارد"
			/>

			<div className="flex mr-auto w-fit mt-5 h-11 rounded border">
				<button
					type="button"
					onClick={handleClickPrev}
					className={cn("w-11 flex justify-center items-center border-l", {
						["text-gray-700"]: page !== 1,
						["text-gray-300"]: page === 1,
						["hover:bg-gray-100"]: page !== 1,
						["active:bg-transparent"]: page !== 1,
					})}
					disabled={page === 1}
				>
					<FaChevronRight />
				</button>
				<button
					type="button"
					onClick={handleClickNext}
					className={cn("w-11 flex justify-center items-center", {
						["text-gray-700"]: page !== lastPage,
						["text-gray-300"]: page === lastPage,
						["hover:bg-gray-100"]: page !== lastPage,
						["active:bg-transparent"]: page !== lastPage,
					})}
					disabled={page === lastPage}
				>
					<FaChevronLeft />
				</button>
			</div>

			{openAddMain && (
				<AddMainCategory isOpen={openAddMain} closeModal={handleCloseAdd} />
			)}

			{currentItem && (
				<EditMainCategory
					isOpen={openEditMain}
					closeModal={handleCloseEdit}
					item={currentItem}
				/>
			)}

			{isOpenDelete && (
				<DeleteCategoryModal
					isOpen={isOpenDelete}
					closeModal={handleCloseDelete}
					deleteCategory={handleDelete}
				/>
			)}

			{isLoadingDelete && <SpinnerFull />}

			<ToastContainer />
		</div>
	);
}

MainCategories.defaultProps = {
	header: ["تصویر", "شاخه اصلی", "تاریخ ایجاد", "عملیات"],
};
