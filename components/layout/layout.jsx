import Head from 'next/head';
import Header from './header';
import Sidebar from './sidebar';
import {useSelector} from "react-redux";
import {selectAdmin} from "@/features/admin/adminSlice";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Layout({children}) {

    const router = useRouter()
    const admin = useSelector(selectAdmin);

    useEffect(() => {
        if (!admin) router.push('/login')
    }, [admin])

  return (
    <div>
      <Head>
        <title>Taroneh | Admin</title>
      </Head>

      <Sidebar />
      <main className='mr-[18rem]'>
        <Header />
        <div className='h-44 w-full bg-emerald-400 pt-11 pr-11 rounded-b-2xl'>
          <h1 className='text-4xl font-semibold text-white'>خوش آمدید!</h1>
        </div>
        <div className='w-full px-9 -mt-10 pb-10'>{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
