import Image from 'next/image'
import {Button} from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { useContext } from 'react';
import { UserDetailContext } from '@/app/_context/UserDetailContext';

const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
      <div className='flex items-center gap-3'>
        <Image src="/youtube.png" alt="logo" width={50} height={50} />
        <h2 className='font-bold text-2xl'>VideoG</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <div className='flex items-center gap-1'>
          <Image src="/coin.png" alt="credit logo" width={30} height={30} />
          <h2>
            {userDetail?.credits}
          </h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  )
}

export default Header