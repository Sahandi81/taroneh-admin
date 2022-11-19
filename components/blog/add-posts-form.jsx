import Input from "@/components/ui/input";
import { useEffect, useState } from "react";
import QuillNoSSRWrapper from "@/components/blog/quill";
import cn from "classnames";
import { FaTimes } from "react-icons/fa";
import {
	useAddBlogPostMutation,
	useDeleteBlogPostMutation,
	useUpdateBlogPostMutation,
} from "@/features/api/apiSlice";
import Image from "next/image";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { selectUploadImageToken } from "@/features/admin/adminSlice";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import {
	NO_IMAGE_SELECTED,
	POST_ADDED_SUCCESSFULLY,
	POST_EDITED_SUCCESSFULLY,
	PRODUCT_ADDED_SUCCESSFULLY,
} from "@/data/messages";
import { useRouter } from "next/router";
import customLoader from "@/libs/customLoader";

const modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"], // toggled buttons
		["blockquote", "code-block"],

		[{ header: 1 }, { header: 2 }], // custom button values
		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		[{ direction: "rtl" }], // text direction

		[{ size: ["small", false, "large", "huge"] }], // custom dropdown
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ font: [] }],
		[{ align: [] }],

		["clean"], // remove formatting button
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
];

export default function AddPostsForm({ postData }) {
	console.log(QuillNoSSRWrapper)
	const router = useRouter();
	
	const [post, setPost] = useState({
		title: postData?.title || "",
		body: postData?.body || "",
		photo: postData?.photo || "",
		id: postData?._id || 0,
	});
	const [images, setImages] = useState([]);
	const [imageURLs, setImageURLs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const imageUploadToken = useSelector(selectUploadImageToken);
	const [updatePost, { loading: updateLoading }] = useUpdateBlogPostMutation();
	const [addPost, { isLoading }] = useAddBlogPostMutation();
	

	useEffect(() => {
		const tempURLs = [];
		images.forEach((image) =>
			tempURLs.push({
				id: image.id,
				url: URL.createObjectURL(image.file),
			})
		);
		setImageURLs(tempURLs);
	}, [images]);

	useEffect(() => {
		if (postData && postData._id)
			setImageURLs([{ id: postData._id, url: postData.photo[0] }]);
	}, [postData]);

	const handleChange = (e) => {
		const { value } = e.target;

		setPost({
			...post,
			[e.target.name]: value,
		});
	};

	const handleChangeImage = (e) => {
		const {files} = e.target;
		if(files["0"].size > 1000000){
		  toast.error('حجم عکس بیش از  1مگابایت است')
		  return
		}
		const newImages = [];
		Object.values(files).forEach((file) => {
			newImages.push({
				id: nanoid(10),
				file,
			});
		});

		setImages(newImages);
	};

	const handleDeleteImage = (imgId) => {
		setImages((prevImages) => prevImages.filter((image) => image.id !== imgId));
	};
	// console.log(imageURLs)
	const handleSubmit = async () => {
		const uploadedImageNames = [];
		if (post.id) uploadedImageNames.push(post.photo);

		if (!post.id) {
			if (images.length === 0) {
				toast.error(NO_IMAGE_SELECTED);
				return;
			}
			// console.log(images, "imageURLs")
			try {
				setLoading(true);
				for (let i = 0; i < images.length; i++) {
					const formdata = new FormData();
					formdata.append("file", images[i].file);
					const result = await fetch(`${API_URL}/api/admin/upload_photo`, {
						method: "POST",
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${imageUploadToken}`,
						},
						body: formdata,
					});
					const data = await result.json();
					
					uploadedImageNames.push(data.file);
				}
			} catch (error) {
				setTimeout(() => setLoading(false), 200);
				toast.error(error);
			}
				// console.log(uploadedImageNames,'ydgysafyt')
			setPost({
				...post,
				photo: uploadedImageNames[0],
			});
		}

		if (post.id) {
			let img =[]
			if(post.photo.length  === 0 ){
				// console.log(post.photo.length > 0 &&post.photo[0].endsWith(/\b'jpeg'||'png'|| "jpg"\b/g))
				try {
				setLoading(true);
				for (let i = 0; i < images.length; i++) {
					const formdata = new FormData();
					formdata.append("file", images[i].file);
					const result = await fetch(`${API_URL}/api/admin/upload_photo`, {
						method: "POST",
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${imageUploadToken}`,
						},
						body: formdata,
					});
					const data = await result.json();
					
					uploadedImageNames.push(data.file);
					img.push(data.file)
				}
			} catch (error) {
				setTimeout(() => setLoading(false), 200);
				toast.error(error);
			}}
			// console.log(uploadedImageNames)
			updatePost({
				...post,
				photo: img.length > 0? img[0]:uploadedImageNames[0][0],
			})
				.unwrap()
				.then(({ data }) => {
					if (data.success) {
						toast.success(POST_EDITED_SUCCESSFULLY);
						window.location.reload()
						router.push("/blog");
					} else {
						// console.log(data);
						setTimeout(() => setLoading(false), 200);
					}
				})
				.catch((error) => {
					// console.log(error.data);
					setTimeout(() => setLoading(false), 200);
					toast.error(JSON.stringify(error.data.message));
				});
		} else {
			addPost({
				...post,
				photo: uploadedImageNames[0],
			})
				.unwrap()
				.then(({ data }) => {
					if (data.success) {
						toast.success(POST_ADDED_SUCCESSFULLY);
						// router.push("/blog");
						
						setTimeout(() => {
							window.location.reload()
						}, 2000);
					} else {
						// console.log(data);
						setTimeout(() => setLoading(false), 200);
					}
				})
				.catch((error) => {
					// console.log(error.data);
					setTimeout(() => setLoading(false), 200);
					toast.error(JSON.stringify(error.data.message));
				});
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 shadow-lg shadow-slate-400/10 relative">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-lg font-semibold text-gray-700">پست بلاگ</h1>
			</div>
			<div className="mt-3">
				<Input
					id="title"
					name="title"
					label="عنوان"
					type="text"
					handleChange={handleChange}
					value={post.title}
					autoFocus
					required
				/>
			</div>

			<div>
				<QuillNoSSRWrapper
					theme="snow"
					modules={modules}
					formats={formats}
					value={post.body}
					onChange={(html) => setPost({ ...post, body: html })}
				/>
			</div>

			<div className="lg:row-start-13 mt-5">
				<p className="block mb-2 text-gray-500">تصویر شاخص</p>
				<label
					htmlFor="productImage"
					className="block py-2 px-5 whitespace-nowrap mb-2 text-white bg-emerald-400 hover:shadow-green-200 hover:shadow-md transition duration-200 rounded cursor-pointer w-fit"
				>
					انتخاب عکس{" "}
				</label>
				<input
					id="productImage"
					type="file"
					accept="image/png, image/jpeg"
					onChange={handleChangeImage}
					className="hidden"
					multiple
				/>

				<div className="flex gap-7">
					{imageURLs.map((imgURL) => (
						<div
							key={imgURL.id}
							className="border rounded mt-5 relative"
							title="حذف"
						>
							<button
								type="button"
								className="absolute z-50 -top-3 -left-3 rounded-full flex justify-center items-center w-7 h-7 bg-red-100 text-rose-500"
								onClick={() => handleDeleteImage(imgURL.id)}
							>
								<FaTimes size={16} />
							</button>
							{ !imgURL.url.startsWith('blob') ? (
								<Image
									src={`/storage/${imgURL.url}`}
									alt="Post Image"
									width={100}
									height={100}
									loader={customLoader}
								/>
							) : (
								<Image
									src={imgURL.url}
									alt="Product Image"
									width={100}
									height={100}
								/>
							)}
						</div>
					))}
				</div>
				<hr className="lg:row-start-14 lg:col-span-full my-5" />
				<div className="lg:row-start-15 lg:col-span-full lg:flex lg:justify-end">
					<button
						disabled={isLoading || loading || updateLoading}
						type="submit"
						onClick={handleSubmit}
						className={cn(
							"py-3 px-5 w-[184px] text-center whitespace-nowrap text-white bg-blue-500 rounded flex items-center gap-1  hover:shadow-md hover:shadow-blue-300 transition duration-200",
							{
								["bg-blue-300"]: isLoading || updateLoading,
							}
						)}
					>
						{isLoading || loading || updateLoading ? (
							<span className="w-5 h-5 block mx-auto rounded-full border-4 border-blue-500 border-t-white animate-spin">
								&nbsp;
							</span>
						) : (
							<div className={"text-center"}>
								<span>ثبت</span>
							</div>
						)}
					</button>
				</div>
			</div>
			
		</div>
	);
}
