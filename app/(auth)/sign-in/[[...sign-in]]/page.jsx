import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url('/login.jpg')`,
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    </div>
  )
}