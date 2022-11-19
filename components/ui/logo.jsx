import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image src='/logo.png' alt='Taroneh' width={120} height={120} />
    </div>
  )
}
