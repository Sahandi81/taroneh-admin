import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { FaTimes, FaRegSave } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cn from 'classnames';
// import React_star from 'react-star-ratings';
import Spinner from '../ui/spinner';
import Input from '../ui/input';
import SelectBox from '../ui/select-box';
import TypeCheckbox from '../ui/type-checkbox';
import {
  
  useAddProductMutation,
  useAddOfferMutation,
  useGetAllCategoriesQuery,
  useAddAmazingOfferMutation,
  useAddCateringMutation,
  useAddSpecialSaleMutation
} from '@/features/api/apiSlice';
import thousandSeparator from '@/libs/thousandSeparator';
import getPrice from '@/libs/getPrice';
import {
  TYPE_WEIGHT_NOT_DEFINED,
  NO_IMAGE_SELECTED,
  NO_ATTRIBUTES_DEFINED,
  PRODUCT_ADDED_SUCCESSFULLY
} from '@/data/messages';
import { selectUploadImageToken } from '@/features/admin/adminSlice';
import { API_URL, NEXT_URL } from '@/config/index';
// import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const rankList = [{ name: 'درجه 1' }, { name: 'درجه 2' }];

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: '',
    code: '',
    quantity: 1,
    quality: 1,
    unit: 'package',
    amount: 0,
    rank: 4.5,
    scores: 5,
    buyers: 50,
    amazingOffer: false,
    subCategoryId: '',
    shortDesc: '',
    longDesc: '',
    types: [],
    attributes: [],
    photos: [],
    special_sale:[],
    price:0
  });
  
  const [type50, setType50] = useState(false);
  const [type100, setType100] = useState(false);
  const [type250, setType250] = useState(false);
  const [type300, setType300] = useState(false);
  const [type500, setType500] = useState(false);
  const [type1000, setType1000] = useState(false);
  const [type1200, setType1200] = useState(false);
  const [typePack, setTypePack] = useState(false);
  const [typeOne, setTypeOne] = useState(false);

  const [price50, setPrice50] = useState('');
  const [price100, setPrice100] = useState('');
  const [price250, setPrice250] = useState('');
  const [price300, setPrice300] = useState('');
  const [price500, setPrice500] = useState('');
  const [price1000, setPrice1000] = useState('');
  const [price1200, setPrice1200] = useState('');
  const [pricePack, setPricePack] = useState('');
  const [priceOne, setPriceOne] = useState('');

  const [inventory, setInventory] = useState('');

  const [attr1, setAttr1] = useState('');
  const [attr2, setAttr2] = useState('');
  const [attr3, setAttr3] = useState('');
  const [attr4, setAttr4] = useState('');
  const [attr5, setAttr5] = useState('');

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amazingOffer ,setamazingOffer] =useState(false);
  const [offerShow, setOfferShow]= useState(true);
  const [offer, setOffer]= useState(0);
  const [amazing, setAmazing] = useState(false)
  const [numArr, setNumArr] = useState();
  const [addamazingOffer] = useAddAmazingOfferMutation()
  const [catering, setCatering] = useState(false);
  const [specialSale, setSpecialSale] = useState(false);
  // const [specialeSale_offer, setSpecialeSale_offer] = useState(0)

  // const [sbOffer, setsbOffer]= useState({status:false, code:0});
  // const [addOffer, {isload: isLoadingAddOffer}]= useAddOfferMutation();
  // setamazingOffer(e=>!e)
  const amazingOfferHandller =async(id)=>{
        await addamazingOffer({id:id}).unwrap().then((res)=>console.log(res, "add amazingoffer ok"))
  }
  
  const [addOffer] = useAddOfferMutation();
  const [addCatering] = useAddCateringMutation();
  const [addSpecialSale] = useAddSpecialSaleMutation()
  const addOfferHandller =async(id)=>{

        const data = {
          expire: Date.now() * 1 + 60 * 60 * 60 * 24* 60 * 60 * 1000,
          percent: offer,
          id: id
        }
       await addOffer(data).unwrap().then(res=>{
          console.log(res, "add offer ok")
        })
  }

  const addSpecialSaleHandller = (id)=>{
    const data = {
      expire: Date.now() * 1 + 60 * 60 * 60 * 24* 60 * 60 * 1000,
      percent: offer,
      id: id
    }
    addSpecialSale(data).unwrap().then(res=>{
      console.log(res, "add special sale ok")
    })
  }
  // const {item} =useGetCategoriesQuery()
  // console.log(item)
  const imageUploadToken = useSelector(selectUploadImageToken);
  useEffect(() => {
    const tempURLs = [];
    images.forEach(image =>
      tempURLs.push({
        id: image.id,
        url: URL.createObjectURL(image.file)
      })
    );
    setImageURLs(tempURLs);
  }, [images]);

  
  const { data, error, isLoading } = useGetAllCategoriesQuery();
  
  const [addProduct, { isLoading: isLoadingAddProduct }] =
    useAddProductMutation();
   

  const memoizedSubCategories = useMemo(() => {
    let subCategoriesList = [];
    if (data) {
      const tmpCategories = data.items;
      for (let i = 1; i < tmpCategories.length; i++) {
        if (tmpCategories[i].sub_category.length) {
          tmpCategories[i].sub_category.forEach(item => {
            subCategoriesList.push({
              id: item._id,
              name: item.name
            });
          });
        }
      }
    }

    return subCategoriesList;
  }, [data]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleChangeAttr = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'attr1':
        setAttr1(value);
        break;
      case 'attr2':
        setAttr2(value);
        break;
      case 'attr3':
        setAttr3(value);
        break;
      case 'attr4':
        setAttr4(value);
        break;
      case 'attr5':
        setAttr5(value);
        break;
      default:
        break;
    }
  };

  const handleChangeSubCategory = subCategory => {
    // console.log(subCategory, 'dusifysdgysdfsd')
    // product.subCategoryId
    setProduct(prevState => ({ ...prevState, subCategoryId: subCategory._id }));
  };

  const handleChangeRank = rank => {
    setProduct(prevState => ({ ...prevState, rank: rank.name }));
  };

  const handleChangeImage = e => {
    const {files} = e.target;
    if(files["0"].size > 1000000){
      toast.error('حجم عکس بیش از  1مگابایت است')
      return
    }
    const newImages = [];
    Object.values(files).forEach(file => {
      newImages.push({
        id: nanoid(10),
        file
      });
    });

    if (newImages.length) {
      setImages(prevImages => prevImages.concat(newImages));
    }
  };

  const handleDeleteImage = imgId => {
    setImages(prevImages => prevImages.filter(image => image.id !== imgId));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const formattedPrice = thousandSeparator(value);
    switch (name) {
      case 'price50':
        setPrice50(formattedPrice);
        break;
      case 'price100':
        setPrice100(formattedPrice);
        break;
      case 'price250':
        setPrice250(formattedPrice);
        break;
      case 'price300':
        setPrice300(formattedPrice);
        break;
      case 'price500':
        setPrice500(formattedPrice);
        break;
      case 'price1000':
        setPrice1000(formattedPrice);
        break;
      case 'price1200':
        setPrice1200(formattedPrice);
        break;
      case 'pricePack':
        setPricePack(formattedPrice);
        break;
      case 'priceOne':
        setPriceOne(formattedPrice);
        break;
      case 'inventory':
        setInventory(value);
        break;
      case 'attributes':
        setAttributes(value);
        break;
      default:
        setProduct(prevState => ({ ...prevState, [name]: value }));
        break;
    }
  };

  const addcateringHandller =async(e)=>{
     await addCatering({id:e}).unwrap().then(res=>{
        console.log(res,  "add catring handller");
      })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !type50 &&
      !type100 &&
      !type250 &&
      !type300 &&
      !type500 &&
      !type1000 &&
      !type1200 &&
      !typePack &&
      !typeOne
    ) {
      toast.error(TYPE_WEIGHT_NOT_DEFINED);
      return;
    }

    if (images.length === 0) {
      toast.error(NO_IMAGE_SELECTED);
      return;
    }

    const attributes = [];
    if (attr1.length) attributes.push(attr1);
    if (attr2.length) attributes.push(attr2);
    if (attr3.length) attributes.push(attr3);
    if (attr4.length) attributes.push(attr4);
    if (attr5.length) attributes.push(attr5);

    if (attributes.length === 0) {
      toast.error(NO_ATTRIBUTES_DEFINED);
      return;
    }

    const type = {
      name: product.title,
      package: {
        inventory
      }
    };
    const types = [type];
    if (type50) {
      type.package = {
        ...type.package,
        50: getPrice(price50)
      };
    }

    if (type100) {
      type.package = {
        ...type.package,
        100: getPrice(price100)
      };
    }

    if (type250) {
      type.package = {
        ...type.package,
        250: getPrice(price250)
      };
    }

    if (type300) {
      type.package = {
        ...type.package,
        300: getPrice(price300)
      };
    }

    if (type500) {
      type.package = {
        ...type.package,
        500: getPrice(price500)
      };
    }

    if (type1000) {
      type.package = {
        ...type.package,
        1000: getPrice(price1000)
      };
    }

    if (type1200) {
      type.package = {
        ...type.package,
        1200: getPrice(price1200)
      };
    }

    if (typePack) {
      type.package = {
        ...type.package,
        Pack: getPrice(pricePack)
      };
    }

    if (typeOne) {
      type.package = {
        ...type.package,
        One: getPrice(priceOne)
      };
    }

    const newProduct = {
      ...product,
      attributes,
      types: [types]
    };

    const uploadedImageNames = [];
    console.log(images)
    try {
      setLoading(true);
      for (let i = 0; i < images.length; i++) {
        const formdata = new FormData();
        formdata.append('file', images[i].file);
        formdata.append('type', images[i].file.type);
        formdata.append('name', images[i].file.name);
        // console.log(imageUploadToken)
        const result = await fetch(
          `${API_URL}/api/admin/upload_photo`,
          {
            method: 'POST',
            // mode:"no-cors",
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${imageUploadToken}`
            },
            body: formdata
          }
        );
        const data = await result.json();
        console.log(data, 'udgyudsygyugy')
        uploadedImageNames.push(data.file);
      }
    } catch (error) {
      setTimeout(() => setLoading(false), 200);
      console.log(error)
      toast.error("!!تصویر اپلود نشد");
      return;
    }
   
    newProduct.photos = uploadedImageNames.slice();
    // newProduct.amazingOffer = amazing
    newProduct.amount = offer;
    // console.log(newProduct)
    addProduct(newProduct)
      .unwrap()
      .then(({ data }) => {
        if (data.success) {
          toast.success(PRODUCT_ADDED_SUCCESSFULLY);
          //  console.log(data);
          if(amazing){
            
            amazingOfferHandller(data.details._id)
            console.log("amazingOfferHandller")
          }

          if(catering){
            addcateringHandller(data.details._id)
            console.log("addcateringHandller")
          }

          
            addOfferHandller(data.details._id)
            console.log("addOfferHandller")
          

          if(specialSale ){
            addSpecialSaleHandller(data.details._id)
            console.log("speii")

          }
        } else {
          // console.log(data);
        }
      })
      .catch(error => {
        // console.log(error.data);
        toast.error(JSON.stringify(error.data.errors));
      });
      
    //   console.log(sbOffer)
    // setTimeout(() => setLoading(false), 200);

    // // ============ RESET STATES
    // setProduct({
    //   title: '',
    //   code: '',
    //   quantity: 1,
    //   quality: 1,
    //   unit: 'package',
    //   amount: 1,
    //   rank: 1,
    //   scores: 5,
    //   buyers: 50,
    //   amazing_Offer: false,
    //   subCategoryId: '',
    //   shortDesc: '',
    //   longDesc: '',
    //   types: [],
    //   attributes: [],
    //   photos: []
    // });

    // setType50(false);
    // setType50(false);
    // setType100(false);
    // setType250(false);
    // setType300(false);
    // setType500(false);
    // setType1000(false);
    // setType1200(false);
    // setTypeOne(false);
    // setTypePack(false);

    // setPrice50('');
    // setPrice100('');
    // setPrice250('');
    // setPrice300('');
    // setPrice500('');
    // setPrice1000('');
    // setPrice1200('');
    // setPriceOne('');
    // setPricePack('');

    // setInventory('');

    // setAttr1('');
    // setAttr2('');
    // setAttr3('');
    // setAttr4('');
    // setAttr5('');

    // setImages([]);
    // setImageURLs([]);
    // window.scrollTo(0, 0);
  };

  return (
    <div className='flex flex-col bg-white rounded-lg p-6 pb-10 shadow-lg shadow-slate-400/10'>
      <h1 className='text-lg font-semibold text-gray-700'>
        اضافه کردن محصول جدید
      </h1>
      <form
        onSubmit={handleSubmit}
        className='grid lg:grid-cols-3 gap-y-4 gap-x-8 items-center mt-8 auto-rows-max'
      >
        <div className='lg:row-start-1'>
          <Input
            id='title'
            name='title'
            label='عنوان'
            type='text'
            handleChange={handleChange}
            value={product.title}
            autoFocus
            required
          />
        </div>
        <div className='flex flex-col md:flex-row gap-4 md:items-center w-full lg:row-start-2'>
          <div className='flex-1'>
            <Input
              id='code'
              name='code'
              label='کد'
              type='text'
              handleChange={handleChange}
              value={product.code}
              required
            />
          </div>
          <div className='flex-1'>
            <SelectBox
              title='درجه'
              items={rankList}
              handleChangeSelect={handleChangeRank}
              defaultIndex={0}
            />
          </div>
        </div>
        <div className='lg:row-start-2'>
        <SelectBox
            title='شاخه'
            items={data.items}
            handleChangeSelect={(e)=>{data.items.map((mp,i)=>{mp._id === e._id?setNumArr(i):null })
            // handleChangeSubCategory({id:null})
          }}
          />
          </div>
       { <div className='lg:row-start-2' >
          
          <SelectBox
            title='زیر شاخه'
            items={numArr && data.items[numArr].sub_category.length > 0 ?data.items[numArr].sub_category:[]}
            handleChangeSelect={handleChangeSubCategory}
            
          />
        </div>}
        <hr className='lg:row-start-3 lg:col-span-full my-5' />
        <div className='lg:row-start-4 lg:col-span-2 mt-4 lg:mt-0'>
          <label className='mb-2 text-gray-500 block'>نوع / وزن</label>
          <div className='flex flex-wrap gap-4'>
            <TypeCheckbox
              id='type50'
              label='50 گرم'
              checked={type50}
              handleChange={e => setType50(e.target.checked)}
            />
            <TypeCheckbox
              id='type100'
              label='100 گرم'
              checked={type100}
              handleChange={e => setType100(e.target.checked)}
            />
            <TypeCheckbox
              id='type250'
              label='250 گرم'
              checked={type250}
              handleChange={e => setType250(e.target.checked)}
            />
            <TypeCheckbox
              id='type300'
              label='300 گرم'
              checked={type300}
              handleChange={e => setType300(e.target.checked)}
            />
            <TypeCheckbox
              id='type500'
              label='500 گرم'
              checked={type500}
              handleChange={e => setType500(e.target.checked)}
            />
            <TypeCheckbox
              id='type1000'
              label='1000 گرم'
              checked={type1000}
              handleChange={e => setType1000(e.target.checked)}
            />
            <TypeCheckbox
              id='type1200'
              label='1200 گرم'
              checked={type1200}
              handleChange={e => setType1200(e.target.checked)}
            />
            <TypeCheckbox
              id='typePack'
              label='بسته ای'
              checked={typePack}
              handleChange={e => setTypePack(e.target.checked)}
            />
            <TypeCheckbox
              id='typeOne'
              label='دانه ای'
              checked={typeOne}
              handleChange={e => setTypeOne(e.target.checked)}
            />
          </div>
        </div>

        <div className='lg:row-start-5 lg:col-span-3 md:grid lg:grid-cols-4 md:grid-cols-2 gap-8'>
          {type50 && (
            <Input
              id='price50'
              name='price50'
              label='قیمت 50 گرم'
              type='text'
              handleChange={handleChange}
              value={price50}
              currency
              required
            />
          )}

          {type100 && (
            <Input
              id='price100'
              name='price100'
              label='قیمت 100 گرم'
              type='text'
              handleChange={handleChange}
              value={price100}
              currency
              required
            />
          )}

          {type250 && (
            <Input
              id='price250'
              name='price250'
              label='قیمت 250 گرم'
              type='text'
              handleChange={handleChange}
              value={price250}
              currency
              required
            />
          )}

          {type300 && (
            <Input
              id='price300'
              name='price300'
              label='قیمت 300 گرم'
              type='text'
              handleChange={handleChange}
              value={price300}
              currency
              required
            />
          )}

          {type500 && (
            <Input
              id='price500'
              name='price500'
              label='قیمت 500 گرم'
              type='text'
              handleChange={handleChange}
              value={price500}
              currency
              required
            />
          )}

          {type1000 && (
            <Input
              id='price1000'
              name='price1000'
              label='قیمت 1000 گرم'
              type='text'
              handleChange={handleChange}
              value={price1000}
              currency
              required
            />
          )}

          {type1200 && (
            <Input
              id='price1200'
              name='price1200'
              label='قیمت 1200 گرم'
              type='text'
              handleChange={handleChange}
              value={price1200}
              currency
              required
            />
          )}

          {typePack && (
            <Input
              id='pricePack'
              name='pricePack'
              label='قیمت بسته ای'
              type='text'
              handleChange={handleChange}
              value={pricePack}
              currency
              required
            />
          )}

          {typeOne && (
            <Input
              id='priceOne'
              name='priceOne'
              label='قیمت دانه ای'
              type='text'
              handleChange={handleChange}
              value={priceOne}
              currency
              required
            />
          )}
        </div>
        <hr className='lg:row-start-6 lg:col-span-full my-5' />
        <div className='lg:row-start-7'>
          <Input
            id='inventory'
            name='inventory'
            label='میزان شارژ انبار'
            type='text'
            handleChange={handleChange}
            value={inventory}
            required
          />
        </div>
        <hr className='lg:row-start-8 lg:col-span-full my-5' />
     
        <div className='lg:row-start-9 lg:col-span-2 lg:flex lg:gap-8'>
          <Input
            id='shortDesc'
            name='shortDesc'
            label='توضیح کوتاه'
            type='text'
            handleChange={handleChange}
            value={product.shortDesc}
            required
          />

          <div className='w-full mt-4 lg:mt-0'>
            <label htmlFor='longDesc' className='block mb-2 text-gray-500'>
              توضیح کامل
            </label>
            <textarea
              id='longDesc'
              name='longDesc'
              onChange={handleChange}
              value={product.longDesc}
              required
              // cols={53}
              rows={5}
              className='w-full border rounded resize-none border-gray-200 py-2 px-3 text-gray-700 outline-none shadow-blue-200 focus:border-blue-600 focus:shadow-sm'
            ></textarea>
          </div>
        </div>
        <hr className='lg:row-start-10 lg:col-span-full my-5' />
        <div className='lg:row-start-11 flex flex-col gap-2'>
          <Input
            id='attr1'
            name='attr1'
            label='خاصیت 1'
            type='text'
            handleChange={handleChangeAttr}
            value={attr1}
            required
          />
          <Input
            id='attr2'
            name='attr2'
            label='خاصیت 2'
            type='text'
            handleChange={handleChangeAttr}
            value={attr2}
          />
          <Input
            id='attr3'
            name='attr3'
            label='خاصیت 3'
            type='text'
            handleChange={handleChangeAttr}
            value={attr3}
          />
          <Input
            id='attr4'
            name='attr4'
            label='خاصیت 4'
            type='text'
            handleChange={handleChangeAttr}
            value={attr4}
          />
          <Input
            id='attr5'
            name='attr5'
            label='خاصیت 5'
            type='text'
            handleChange={handleChangeAttr}
            value={attr5}
          />
        </div>
        
        <hr className='lg:row-start-12 lg:col-span-full my-5' />
        <div className='lg:row-start-13'>
          <p className='block mb-2 text-gray-500'>گالری تصاویر</p>
          <label
            htmlFor='productImage'
            className='block py-2 px-5 whitespace-nowrap mb-2 text-white bg-emerald-400 hover:shadow-green-200 hover:shadow-md transition duration-200 rounded cursor-pointer w-fit'
          >
            انتخاب عکس{' '}
          </label>
          <input
            id='productImage'
            type='file'
            accept='image/png, image/jpeg'
            onChange={handleChangeImage}
            className='hidden'
            multiple
          />

          <div className='flex gap-7'>
            {imageURLs.map(imgURL => (
              <div
                key={imgURL.id}
                className='border rounded mt-5 relative'
                title='حذف'
              >
                <button
                  type='button'
                  className='absolute z-50 -top-3 -left-3 
                  rounded-full flex justify-center items-center w-7 h-7 bg-red-100 text-rose-500'
                  onClick={() => handleDeleteImage(imgURL.id)}
                >
                  <FaTimes size={16} />
                </button>
                <Image
                  src={imgURL.url}
                  alt='Product Image'
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
        <hr className='lg:row-start-14 lg:col-span-full my-5' />
        <div className='lg:row-start-15'>
           <button type='button' onClick={()=>setAmazing(!amazing)}
           style={{padding:'.5rem 1.8rem', borderRadius:'4px',}}
           className={!amazing?"text-white bg-emerald-400 "
           :"text-white bg-red-400"}>{amazing?"حذف از پیشنهاد شگفت انگیز":" اضافه کردن به پیشنهادات شگفت انگیز "}</button>
        </div>
        <hr className='lg:row-start-16 lg:col-span-full my-5' />
        
        <div className='lg:row-start-17 flex ' >
          <button type='button' 
           style={{padding:'.5rem 1.8rem', borderRadius:'4px',whiteSpace:'nowrap', marginLeft:'1rem'}}
           className={offerShow?"text-white bg-emerald-400 ":"text-white bg-red-400"} 
           onClick={()=>{
            //  setOfferShow(e=>!e);addOfferHandller(product.code)
            }}>{!offerShow?"حذف تخفیف":"اضافه کردن تخفیف"}</button>
           {offerShow &&<input type="number" style={{padding:".5rem"}}
            className='bg-white  border-2 border-black text-black' min={0} max={100}
            onChange={(e)=>{setOffer(e.target.value);setProduct({...product, amount:
             e.target.value})}} value={offer}/>}
        </div>
        <hr className='lg:row-start-18 lg:col-span-full my-5' />
        <div className='lg:row-start-17 flex ' >
          <button type='button' 
           style={{padding:'.5rem 1.8rem', borderRadius:'4px',whiteSpace:'nowrap', marginLeft:'1rem'}}
           className={!catering?"text-white bg-emerald-400 ":"text-white bg-red-400"} 
           onClick={()=>{setCatering(e=>!e);
            }}>{catering?"حذف از محصولات پذیرایی":"اضافه کردن به محصولات پذیرایی"}</button>
        
        </div>
        <hr className='lg:row-start-18 lg:col-span-full my-5' />
        <div className='lg:row-start-19'>
          <button type='button' onClick={()=>{
              setSpecialSale(e=>!e);
              if(specialSale){
                setSpecialeSale_offer(0)
              }
          }}
           style={{padding:'.5rem 1.8rem', borderRadius:'4px',}}
           className={!specialSale ?"text-white bg-emerald-400 "
           :"text-white bg-red-400"}>{!specialSale?" اضافه کردن به فروش ویژه":"حذف از فروش ویژه"}</button>
        </div>
        {/* {specialSale?<div className='lg:row-start-19' style={{marginRight:'2rem',position:'relative'}}>
          <label htmlFor="specialSalepr" style={{position:'absolute', top:'-1rem', fontSize:'.7rem'}} >درصد تخفیف</label>
          <input type="number" name='specialSalepr' style={{padding:".5rem"}}
            className='bg-white  border-2 border-black text-black' 
            value={specialeSale_offer} onChange={(e)=>{
              if( 100 > e.target.value > 0)setSpecialeSale_offer(e.target.value)
            }}
            min={0} max={100}
            />

        </div>:null} */}
        <hr className='lg:row-start-19 lg:col-span-full my-5' />
        {/* <div className='lg:row-start-20'>
            <React_star 
               rating={product.rank}
               starRatedColor="gold"
               changeRating={(e)=>setProduct({...product, rank: e})}
               numberOfStars={5}
               name='rating'
               starDimension="2vh"
               starSpacing="3px"
            />
        </div>
        <hr className='lg:row-start-21 lg:col-span-full my-5' /> */}
        <div className='lg:row-start-22 lg:col-span-full lg:flex lg:justify-end'>
          <button
            disabled={loading}
            type='submit'
            className={cn(
              'py-3 px-5 w-[184px] text-center whitespace-nowrap text-white bg-blue-500 rounded flex items-center gap-1  hover:shadow-md hover:shadow-blue-300 transition duration-200',
              {
                ['bg-blue-300']: loading
              }
            )}
          >
            {loading || isLoadingAddProduct ? (
              <span className='w-5 h-5 block mx-auto rounded-full border-4 border-blue-500 border-t-white animate-spin'>
                &nbsp;
              </span>
            ) : (
              <>
                <span>
                  <FaRegSave size={18} />
                </span>
                <span>ثبت نهایی محصول</span>
              </>
            )}
          </button>
        </div>
      </form>
      {loading && <Spinner variant='full' />}
      <ToastContainer />
    </div>
  );
}
