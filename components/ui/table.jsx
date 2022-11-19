import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Spinner from './spinner';

export default function Table({
  header,
  items,
  isLoading,
  noDataText,
  handleEdit,
  handleDelete,
  route
}) {
  // console.log(items)
  return (
    <div className='relative'>
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
          {items.map(item => (
            <tr key={item.id} className='even:bg-gray-100'>
              {Object.keys(item).map((key, idx) => {
                if (key !== 'id' && key !== 'categoryId') {
                  return (
                    <td
                      key={idx}
                      className='py-3 px-4 text-stone-600 font-semibold border border-gray-200'
                    >
                      {item[key]}
                    </td>
                  );
                }
              })}
             {route !== '/contact'?<td className='py-2 px-4 w-40 border border-gray-200'>
             {route !== '/customers'?<><span
                  className='text-blue-500 cursor-pointer float-right mr-6'
                  onClick={() => handleEdit(item)}
                >
                  <FaRegEdit size='20' />
                </span>
                <span className='w-0.5 h-4 inline-block bg-slate-300 rounded float-right mr-4 translate-y-0.5'>
                  &nbsp;
                </span></>:null}
                <span
                  className='text-red-500 cursor-pointer mr-4 float-right'
                  onClick={() => handleDelete(item)}
                >
                  <FaRegTrashAlt size='20' />
                </span>
              </td>:null}
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td
                className='text-center py-3 text-stone-600 font-semibold border border-gray-200'
                colSpan={1000}
              >
                {noDataText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isLoading && (
        <div className='flex justify-center rounded items-center absolute inset-0 w-full h-full bg-slate-800/20'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
