import { Inter } from 'next/font/google'
import FormGenerator from '@/components/FormGenerator'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='w-screen h-screen bg-blue-100 flex py-14 box-content' >
      <FormGenerator/>
    </div>
  )
}
