import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/features/api/apiSlice';
import { setCredentials } from '@/features/admin/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';
import Input from '../ui/input';
import Spinner from '../ui/spinner';
import { NEXT_URL } from '@/config/index';

export default function Login() {
  const [username, setUsername] = useState({
    value: '',
    error: ''
  });

  const [password, setPassword] = useState({
    value: '',
    error: ''
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'username') {
      setUsername({ error: '', value });
    } else if (name === 'password') {
      setPassword({ error: '', value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(username.value,password.value)
      const data = await login({
        username: username.value,
        password: password.value
      }).unwrap();

      // let data = await fetch( 'https://api.taroneh.ir/api/admin/login',{
      //   method:"POST",
      //   body:JSON.stringify(
      //     {
      //         username: username.value,
      //         password: password.value
      //       })
      // }).then(res=>res.json()).catch(response=>{
      //     console.log(response)
      // })
      // data = await data.json();
      // console.log(data)
      dispatch(setCredentials(data.token));
      setTimeout(() => router.replace('/'), 200);
    } catch (error) {
      toast.error(error.message);
    }
  };
  // const loginHandller=async(e)=>{
  //     e.preventDefault()
  //       const data = {
  //         email: username.value,
  //         password: password.value
  //       }
  //       console.log(data);
  //       let token;
  //       await axios("https://api.taroneh.ir/api/admin/login",{
  //         method:'post',
  //         data:data,
  //         headers:{'Content-Type':'application/json'}
  //     }).then(res=>{
  //       console.log(res)
  //       token = res.data.data.token
  //     }).catch(er=>{
  //       console.clear();
  //       toast.error(er.message);
  //     })
  //     dispatch(setCredentials(token));
  //     setTimeout(() => router.replace('/'), 200);
  // }
  return (
    <div className='w-96 bg-white rounded shadow p-5 pb-10'>
      <h1 className='text-gray-600 text-2xl text-center font-medium mb-10'>
        ورود به سیستم
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <Input
          id='username'
          name='username'
          label='نام کاربری'
          type='text'
          value={username.value}
          handleChange={handleChange}
          error={username.error}
          autoComplete='off'
          autoFocus
          required
        />

        <Input
          id='password'
          name='password'
          label='رمز عبور'
          type='password'
          value={password.value}
          handleChange={handleChange}
          error={password.error}
          autoComplete='off'
          required
        />

        <div className='flex items-center justify-between -mt-1'>
          <div className='flex items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <label
              htmlFor='remember-me'
              className='mr-2 block text-sm text-gray-900'
            >
              به خاطر سپردن
            </label>
          </div>

          <div className='text-sm'>
            <span className='font-medium text-blue-600 hover:text-blue-500 cursor-pointer'>
              فراموشی رمز عبور
            </span>
          </div>
        </div>

        <div className='flex mt-5 justify-center'>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type='submit'
              className='flex w-full justify-center relative items-center py-3 bg-blue-500 text-white rounded hover:shadow-md hover:shadow-blue-500/50 transition-shadow'
            >
              <span className='absolute right-3'>
                <FaLock
                  size={16}
                  className='text-blue-400 group-hover:text-blue-400'
                  aria-hidden='true'
                />
              </span>
              ورود
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
