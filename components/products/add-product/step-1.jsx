import Input from '../../ui/input';
import SelectBox from '../../ui/select-box';

export default function AddProductStep1({
  product,
  rankList,
  subCategoriesList,
  handleChange,
  handleChangeRank,
  handleChangeSubCategory
}) {
  return (
    <>
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
      <div className='flex gap-4 items-center w-full'>
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

      <SelectBox
        title='زیر شاخه'
        items={subCategoriesList}
        handleChangeSelect={handleChangeSubCategory}
      />

      <button
        className='flex-1 py-2 px-4 mt-10 rounded bg-blue-500 text-white hover:shadow-md hover:shadow-blue-500/50 transition-shadow'
        type='submit'
      >
        ذخیره و ادامه
      </button>
    </>
  );
}
