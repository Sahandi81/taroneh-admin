import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { FaTimes, FaRegSave } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cn from 'classnames';

import Input from '../ui/input';
import SelectBox from '../ui/select-box';
import TypeCheckbox from '../ui/type-checkbox';
import {
  useGetCategoriesQuery,
  useEditProductMutation,
  useAddOfferMutation
} from '@/features/api/apiSlice';
import thousandSeparator from '@/libs/thousandSeparator';
import getPrice from '@/libs/getPrice';
import {
  TYPE_WEIGHT_NOT_DEFINED,
  NO_IMAGE_SELECTED,
  NO_ATTRIBUTES_DEFINED,
  PRODUCT_EDITED_SUCCESSFULLY
} from '@/data/messages';
import { selectUploadImageToken } from '@/features/admin/adminSlice';
import Spinner from '../ui/spinner';
import { API_URL } from '@/config/index';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const rankList = [{ name: 'درجه 1' }, { name: 'درجه 2' }];

export default function EditProduct({ product }) {
  const [currentProduct, setCurrentProduct] = useState({
    id: product._id,
    title: product.title,
    code: product.code,
    quantity: 1,
    quality: product.quality,
    unit: product.unit_measurement,
    amount: product.amount,
    rank: 1,
    scores: 5,
    buyers: 50,
    amazingOffer: product.amazing_offer,
    subCategoryId: product.sub_category?._id,
    shortDesc: product.short_explanation,
    longDesc: product.Description,
    types: product.types,
    attributes: product.attributes,
    photos: product.photos
  });
  // console.log(product)
  const [type50, setType50] = useState(
    Boolean(product.types[0][0]['package']['50']) || false
  );
  const [type100, setType100] = useState(
    Boolean(product.types[0][0]['package']['100']) || false
  );
  const [type250, setType250] = useState(
    Boolean(product.types[0][0]['package']['250']) || false
  );
  const [type300, setType300] = useState(
    Boolean(product.types[0][0]['package']['300']) || false
  );
  const [type500, setType500] = useState(
    Boolean(product.types[0][0]['package']['500']) || false
  );
  const [type1000, setType1000] = useState(
    Boolean(product.types[0][0]['package']['1000']) || false
  );
  const [type1200, setType1200] = useState(
    Boolean(product.types[0][0]['package']['1200']) || false
  );
  const [typePack, setTypePack] = useState(
    Boolean(product.types[0][0]['package']['package']) || false
  );
  const [typeOne, setTypeOne] = useState(
    Boolean(product.types[0][0]['package']['one']) || false
  );

  const [price50, setPrice50] = useState(
    product.types[0][0]['package']['50'] || ''
  );
  const [price100, setPrice100] = useState(
    product.types[0][0]['package']['100'] || ''
  );
  const [price250, setPrice250] = useState(
    product.types[0][0]['package']['250'] || ''
  );
  const [price300, setPrice300] = useState(
    product.types[0][0]['package']['300'] || ''
  );
  const [price500, setPrice500] = useState(
    product.types[0][0]['package']['500'] || ''
  );
  const [price1000, setPrice1000] = useState(
    product.types[0][0]['package']['1000'] || ''
  );
  const [price1200, setPrice1200] = useState(
    product.types[0][0]['package']['1200'] || ''
  );
  const [pricePack, setPricePack] = useState(
    product.types[0][0]['package']['package'] || ''
  );
  const [priceOne, setPriceOne] = useState(
    product.types[0][0]['package']['one'] || ''
  );

  const [inventory, setInventory] = useState(
    product.types[0][0]['package']['inventory']
  );

  const [attr1, setAttr1] = useState(product.attributes[0] || '');
  const [attr2, setAttr2] = useState(product.attributes[1] || '');
  const [attr3, setAttr3] = useState(product.attributes[2] || '');
  const [attr4, setAttr4] = useState(product.attributes[3] || '');
  const [attr5, setAttr5] = useState(product.attributes[4] || '');

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [indexQuality, setIndexQuality] = useState(product.quality - 1);
  const [currentImages, setCurrentImages] = useState(product.photos || []);
  const [currentImageURLs, setCurrentImageURLs] = useState([]);

  const [indexSubCategory, setIndexSubCategory] = useState(0);
  const [amazing, setAmazing]= useState(product.amazing_offer?true:false);
  const [offerShow, setOfferShow]= useState(product.amount > 0?true:false);
  const [offer, setOffer]= useState(product.amount);
  const imageUploadToken = useSelector(selectUploadImageToken);
  const [addAmmazingOffer]=useAddOfferMutation() 
  // console.log(currentProduct.photos)
  const add_ammazingOfferHandller= (image)=>{
      // console.log(imageUploadToken)
      // try{  
        // let frdt =new FormData();
        //   frdt.append("expire",7947473687436);
        //   frdt.append("percent", 40);
        const dt = {
          expire: amazing?`${Date.now() * 1 + 30 * 24 * 60 * 60 * 1000}`:"0",
          percent: offerShow ?offer:0,
          photos: [image],
          active: true,
          id: product.amazing_offer
        }
        
        addAmmazingOffer(dt).unwrap().then(res=>{
          // console.log(res,'vali')
        })
      //     const result = await axios(API_URL + "/api/admin/add_amazing_offer",{
      //       method:"POST",
      //       headers:{
      //         Accept: 'application/json',
      //         // "Content-Type": 'application/json',
      //         Authorization: `Bearer 62f7cb87e498181ad85b7762|08yUu22ikh5aGRz5FTNl5WDAI2N7mIWFrXYqoz1l`
      //       },
      //       data: JSON.stringify(dt)    }).then((res)=>{

      //         console.log(data, "dataforrrm")
      //       })
      //       // const data = await result.json();
      // } catch(er){
      //   console.log(er)
      // }
  }
  useEffect(()=>{
    // setCurrentProduct({...currentProduct, 
    //   amazingOffer: !offerShow?false:currentProduct.amazingOffer});
    setAmazing(!offerShow?false:amazing);
  },[offerShow])

  useEffect(()=>{
    setOfferShow(amazing?true:offerShow)
  },[amazing])

  useEffect(() => {
    const tempURLs = [];
    currentImages.forEach(
      img => tempURLs.push(`${API_URL}/storage/${product.code}/${img}`)
    )
    setCurrentImageURLs(tempURLs);
  }, [currentImages]);

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

  const { data, error, isLoading } = useGetCategoriesQuery();

  const [editProduct, { isLoading: isLoadingEditProduct }] =
    useEditProductMutation();

  const memoizedSubCategories = useMemo(() => {
    let subCategoriesList = [];
    if (data) {
      // console.log(data)
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
    const subCategoryIndex = subCategoriesList.findIndex(
      item => item.id === product.sub_category?._id
    );
    setIndexSubCategory(subCategoryIndex);
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
    setCurrentProduct(prevState => ({
      ...prevState,
      subCategoryId: subCategory.id
    }));
  };

  const handleChangeRank = rank => {
    let quality = 1;
    if (rank.name === 'درجه 2') quality = 2;
    setCurrentProduct(prevState => ({
      ...prevState,
      rank: rank.name,
      quality
    }));
  };

  const handleChangeImage = e => {
    const { files } = e.target;
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

  const handleDeleteCurrentImage = img => {
    const imgName = img.split('/')[5];
    setCurrentImages(prevImages =>
      prevImages.filter(image => image !== imgName)
    );
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
        setCurrentProduct(prevState => ({ ...prevState, [name]: value }));
        break;
    }
  };

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

    if (currentImages.length === 0 && images.length === 0) {
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
      name: currentProduct.title,
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
      ...currentProduct,
      attributes,
      types: [types]
    };

    const uploadedImageNames = [];

    try {
      setLoading(true);
      for (let i = 0; i < images.length; i++) {
        const formdata = new FormData();
        formdata.append('file', images[i].file);
        formdata.append('type', images[i].file.type);
        formdata.append('name', images[i].file.name);
        const result = await fetch(
          `${API_URL}/api/admin/upload_photo`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${imageUploadToken}`
            },
            body: formdata
          }
        );
        const data = await result.json();
        uploadedImageNames.push(data.file);
      }
    } catch (error) {
      setTimeout(() => setLoading(false), 200);
      toast.error(error);
    }

    newProduct.photos = currentProduct.photos.concat(uploadedImageNames.slice());
    // console.log(newProduct,"new product")
    // newProduct.amazingOffer =  product.amazing_offer;
    // newProduct.amazingOffer = currentProduct.amazingOffer
    if(offerShow && offer > 0){
      newProduct.amount = offer;
    }else if(!offerShow){
      newProduct.amount = 0;
    }
    if(product.amazing_offer){
         add_ammazingOfferHandller(newProduct.photos[0]);
    }
    // const pr= {...newProduct, amazingOffer : product.amazing_offer}
    
    editProduct(newProduct)
      .unwrap()
      .then(({ data }) => {
        if (data.success) {
         
          toast.success(PRODUCT_EDITED_SUCCESSFULLY);
        } else {
          // console.log(data);
        }
      })
      .catch(error => {
        // console.log(error.data);
        toast.error(JSON.stringify(error.data.errors));
      });

    setTimeout(() => setLoading(false), 200);
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
            value={currentProduct.title}
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
              value={currentProduct.code}
              required
            />
          </div>
          <div className='flex-1'>
            <SelectBox
              title='درجه'
              items={rankList}
              handleChangeSelect={handleChangeRank}
              defaultIndex={indexQuality}
            />
          </div>
        </div>

        <div className='lg:row-start-2'>
          <SelectBox
            title='زیر شاخه'
            items={memoizedSubCategories}
            handleChangeSelect={handleChangeSubCategory}
            defaultIndex={indexSubCategory}
          />
        </div>
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
            value={currentProduct.shortDesc}
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
              value={currentProduct.longDesc}
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
                  className='absolute z-50 -top-3 -left-3 rounded-full flex justify-center items-center w-7 h-7 bg-red-100 text-rose-500'
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

            {currentImageURLs.map(imgURL => (
              <div
                key={imgURL}
                className='border rounded mt-5 relative'
                title='حذف'
              >
                <button
                  type='button'
                  className='absolute z-50 -top-3 -left-3 rounded-full flex justify-center items-center w-7 h-7 bg-red-100 text-rose-500'
                  onClick={() => handleDeleteCurrentImage(imgURL)}
                >
                  <FaTimes size={16} />
                </button>
                <Image
                  src={imgURL}
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
           <button type='button' onClick={()=>{setAmazing(!amazing);
          // add_ammazingOfferHandller();
          
        }}
           style={{padding:'.5rem 1.8rem', borderRadius:'4px',}}
           className={!currentProduct.amazingOffer?"text-white bg-emerald-400 "
           :"text-white bg-red-400"}>{currentProduct.amazingOffer?"حذف از پیشنهاد شگفت انگیز":" اضافه کردن به پشنهادات شگفت انگیز "}</button>
        </div>
        <hr className='lg:row-start-16 lg:col-span-full my-5' />
        
        <div className='lg:row-start-17 flex ' >
          <button type='button' 
           style={{padding:'.5rem 1.8rem', borderRadius:'4px',whiteSpace:'nowrap', marginLeft:'1rem'}}
           className={!offerShow?"text-white bg-emerald-400 ":"text-white bg-red-400"} 
           onClick={()=>{setOfferShow(e=>!e);
            }}>{offerShow?"حذف تخفیف":"اضافه کردن تخفیف"}</button>
           {offerShow &&<input type="number" style={{padding:".5rem"}}
            className='bg-white  border-2 border-black text-black' min={0} max={100}
            onChange={(e)=>{setOffer(e.target.value);setCurrentProduct({...currentProduct, amount:
             e.target.value})}} value={offer}/>}
        </div>
        <hr className='lg:row-start-18 lg:col-span-full my-5' />
        <div className='lg:row-start-19 lg:col-span-full lg:flex lg:justify-end'>
          <button
            disabled={loading}
            type='submit'
            className={cn(
              'py-3 px-5 w-[184px] text-center justify-center whitespace-nowrap text-white bg-blue-500 rounded flex items-center gap-1  hover:shadow-md hover:shadow-blue-300 transition duration-200',
              {
                ['bg-blue-300']: loading
              }
            )}
          >
            {loading || isLoadingEditProduct ? (
              <span className='w-5 h-5 block mx-auto rounded-full border-4 border-blue-500 border-t-white animate-spin'>
                &nbsp;
              </span>
            ) : (
              <>
                <span>
                  <FaRegSave size={18} />
                </span>
                <span>ذخیره تغییرات</span>
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
