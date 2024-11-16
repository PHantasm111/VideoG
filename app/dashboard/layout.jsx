"use client"
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { VideoDataContext } from '../_context/VideoDataContext'
import { UserDetailContext } from '../_context/UserDetailContext'
import { useEffect, useState } from 'react'
import db from '@/configs/db'
import { eq } from 'drizzle-orm'
import { Users } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

const DashboradLayout = ({ children }) => {

    const [videoData, setVideoData] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getUserDetail();
    }, [user])

    const getUserDetail = async () => {
        const result = await db.select().from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
        setUserDetail(result[0]);
    }

    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                <div>
                    <div className='hidden md:block h-screen bg-white fixed mt-[75px] w-64'>
                        <SideNav />
                    </div>
                    <div>
                        <Header />
                        <div className='md:ml-64 p-10'>
                            {children}
                        </div>
                        <Toaster />
                    </div>
                </div>
            </VideoDataContext.Provider>
        </UserDetailContext.Provider>


    )
}

export default DashboradLayout