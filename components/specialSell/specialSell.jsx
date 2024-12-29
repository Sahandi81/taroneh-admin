import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import {
	FaPlus,
	FaRegEdit,
	FaRegTrashAlt,
	FaInfoCircle,
	FaChevronLeft,
	FaChevronRight
} from "react-icons/fa";
import cn from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeleteProductModal from "../products/delete-product-modal";
import getUnitText from "@/libs/getUnitText";
import {
	useGetAmazingOfferQuery,
	useDeleteProductMutation,
  useDeleteAmazingOfferMutation,
  useDeleteMainAmazingOfferMutation,
  useAddMainAmazingOfferMutation,
  useUpdateMainAmazingOfferMutation,
  useGetSpecialSellQuery,
} from "@/features/api/apiSlice";
import Spinner from "../ui/spinner";

import { PRODUCT_DELETED_SUCCESSFULLY } from "@/data/messages";
import axios from "axios";

export default function Products({ header, typeOrWeight }) {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [productId, setProductId] = useState(null);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(5);
  
  const { data, error, isLoading } = useGetSpecialSellQuery();
	// console.log(data)
  const [offer, setoffer] = useState();

  useEffect(()=>{
        if(data){
            setoffer(data.percent)
        }
  },[data])
  
//   useEffect(async()=>{
// 		await axios(`https://tapi.ydos.ir/api/special_sales`,{
// 			method:'get',
// 			headers:{"Content-Type":"application/json"}
// 		}).then(res=>console.log(res,'dhuygyds')).catch(er=>console.log('error'))	
// 	},[])
	const router = useRouter();

	
	const [deleteProduct, { isLoading: isLoadingDelete }] =
		useDeleteAmazingOfferMutation();

  const [addMain] = useAddMainAmazingOfferMutation();
  const [updateMain] = useUpdateMainAmazingOfferMutation();
  const [deleteMain] = useDeleteMainAmazingOfferMutation();
	console.log(data)
	const memoizedProducts = useMemo(() => {
		if (data) {
			const tmpData = data?.list?.data;
			const productsList = [...Array(tmpData.length)];
			for (let i = 0; i < tmpData.length; i++) {
				productsList[i] = {
					id: tmpData[i].product_info._id,
					name: tmpData[i].product_info.title,
					unit: getUnitText(tmpData[i].product_info.unit_measurement),
					subCategory: {
						id: tmpData[i]["sub_category"]?._id,   
						name: tmpData[i].product_info.code,
					},
					inventory: tmpData[i].product_info.types[0][0]["package"]["inventory"],
				};
			}
			return productsList;
		}

		return [];
	}, [data]);

	if (isLoading) {
		return <div>...Loading</div>;
	}

	// if (error) {
	// 	return <div>Error</div>;
	// }

	const handleClose = () => setOpenDeleteModal(false);

	const handleOpenDeleteProductModal = (productId) => {
		setOpenDeleteModal(true);
		setProductId(productId);
	};

	const handleAddProduct = () => {
        if(data?.amazing_offer_id){
            deleteMain(data.amazing_offer_id).unwrap().then(()=>{
            window.location.reload()
              toast.success('با موفقیت حذف شد')
          }
            );
        }else{
          if(offer){
            addMain({
              percent: offer,
              expire: Date.now() * 1 + 360  * 24 * 360 * 1000
            }).unwrap().then(res=>{
              toast.success('با موفقیت ایجاد شد')
              window.location.reload();
            })
            
          }else{
					toast.error('تخفیف را وارد نکردید');

          }
        }
  };

	const handleEditProduct = (productId) => {
		router.push(`/products/edit?productId=${productId}`);
	};
	// console.log(memoizedProducts)
	const handleDelete = (productId) => {
		setOpenDeleteModal(false);
		deleteProduct(productId)
			.unwrap()
			.then(({ data }) => {
				if (data.success) {
					toast.success(PRODUCT_DELETED_SUCCESSFULLY);
				}else{
					toast.error("انجام نشد")
				}
			})
			.catch((error) => {
				(error.message);
			});
	};

	const handleClickPrev = () => {
		setPage((prevState) => {
			if (prevState > 1) return prevState - 1;
		});
	};

	const handleClickNext = () => {
		setPage((prevState) => {
			if (prevState < data.last_page) return prevState + 1;
		});
	};

	return (
		<div className="bg-white rounded-lg p-6 pb-10 shadow-lg shadow-slate-400/10">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-lg font-semibold text-gray-700">محصولات</h1>
        <div className="flex gap-4">
					 <input value={offer}  onChange={(e)=>{
            data?.amazing_offer_id ?updateMain({percent:e.target.value, id: data.amazing_offer_id}):null;
                setoffer(e.target.value)
          }} className="border-4 border-black p-1" placeholder="درصد تخفیف" />
				</div>
				<div className="flex gap-4">
					<button
						className={`flex gap-2 items-center py-2 px-4 rounded ${!data?.amazing_offer_id?"bg-green-200":'bg-red-500'} text-green-700 transition-shadow duration-200 hover:bg-green-300`}
						onClick={handleAddProduct}
					>
						<FaPlus size="15" />
            {data?.amazing_offer_id?"حذف کامل پیشنهاد ویژه":'ساخت پیشنهاد ویژه'}
					</button>
				</div>
			</div>
			<table className="w-full rounded overflow-hidden border-collapse">
				<thead>
					<tr>
						{header.map((title, idx) => (
							<th
								key={idx}
								className="bg-[#f5f6fa] text-gray-500/90 border border-gray-200 text-right text-sm font-semibold py-3 px-4 last-of-type:text-center"
							>
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{memoizedProducts?.map((product, idx) => (
						<tr key={idx} className="even:bg-gray-100">
							<td className="py-3 px-4 text-stone-600 font-semibold border border-gray-200">
								{product.name}
							</td>
							<td className="py-3 px-4 text-stone-600 font-semibold border border-gray-200">
								{product.subCategory.name}
							</td>
							<td className="py-3 px-4 text-stone-600 font-semibold border border-gray-200">
								{product.unit}
							</td>
							<td className="py-3 px-4 text-stone-600 font-semibold border border-gray-200">
								{product.inventory > 0 ? (
									<span>{product.inventory}</span>
								) : (
									<span className="text-red-600">ناموجود</span>
								)}
							</td>
							<td className="py-2 px-5 w-40 border border-gray-200">
								{/* <span
                  className='text-violet-500 cursor-pointer float-right mr-6'
                  onClick={() => handleEdit(product.id)}
                >
                  <FaInfoCircle size='20' />
                </span>
                <span className='w-0.5 h-4 inline-block bg-slate-300 rounded float-right mr-4 translate-y-0.5'>
                  &nbsp;
                </span> */}
								{/* <span
									className="text-blue-500 cursor-pointer float-right mr-2"
									onClick={() => handleEditProduct(product.id)}
								>
									<FaRegEdit size="20" />
								</span> */}
								{/* <span className="w-0.5 h-4 inline-block bg-slate-300 rounded float-right mr-2 translate-y-0.5">
									&nbsp;
								</span> */}
								{/* <span
									className="text-blue-500 cursor-pointer float-right mr-2"
									onClick={() =>{}}>
									<img width="20px" height="20px" src="data:image/png;base64,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"/>
								</span>
								<span className="w-0.5 h-4 inline-block bg-slate-300 rounded float-right mr-2 translate-y-0.5">
									&nbsp;
								</span> */}
								<span
									className="text-red-500 cursor-pointer mr-2 float-right"
									onClick={() => handleOpenDeleteProductModal(product.id)}
								>
									<FaRegTrashAlt size="20" />
								</span>
								
							</td>
						</tr>
					))}
					{memoizedProducts.length === 0 && (
						<tr>
							<td
								className="text-center py-3 text-stone-600 font-semibold border border-gray-200"
								colSpan={1000}>
								محصولی برای نمایش وجود ندارد
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* <div className="flex mr-auto w-fit mt-5 h-11 rounded border"> */}
				{/* <button
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
				</button> */}
				{/* <button
					type="button"
					onClick={handleClickNext}
					className={cn("w-11 flex justify-center items-center", {
						["text-gray-700"]: page !== data.last_page,
						["text-gray-300"]: page === data.last_page,
						["hover:bg-gray-100"]: page !== data.last_page,
						["active:bg-transparent"]: page !== data.last_page,
					})}
					disabled={page === data.last_page}
				>
					<FaChevronLeft />
				</button> */}
			{/* </div> */}

			{isLoadingDelete && <Spinner variant="full" />}
			<DeleteProductModal
				isOpen={openDeleteModal}
				closeModal={handleClose}
				deleteProduct={() => handleDelete(productId)}
			/>
			<ToastContainer />
		</div>
	);
}

Products.defaultProps = {
	header: ["نام محصول", "کد محصول", "تخفیف", "زمان تخفیف", "عملیات"],
	typeOrWeight: [
		{ id: "tow01", name: "250/500/1000 (گرم)" },
		{ id: "tow02", name: "50/100 (گرم)" },
		{ id: "tow03", name: "بسته ای" },
		{ id: "tow04", name: "دانه ای" },
		{ id: "tow05", name: "سایر" },
	],
};
