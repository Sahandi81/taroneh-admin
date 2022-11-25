import Login from '@/components/login/login';
import { NEXT_URL } from '../config';

export default function LoginPage() {
  console.log(NEXT_URL)
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <Login />
    </div>
  )
}
