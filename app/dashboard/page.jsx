"use client"
import { Button } from '@/components/ui/button'
import { useContext, useEffect, useState } from 'react';
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import VideoList from './_components/VideoList';
import db from '@/configs/db';
import { eq } from 'drizzle-orm';
import { VideoData } from '@/configs/schema';


const Dashborad = () => {
  const [videoList, setVideoList] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    user && getVideoList();
  }, [user])

  /**
   * Fetches the list of videos created by the current user.
   *
   * @return {Promise<void>}
   */
  const getVideoList = async () => {
    const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress));

    console.log(result);
    setVideoList(result);
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl text-primary font-bold'>Dashboard</h2>
        <Link href="/dashboard/create-new">
          <Button>+ reate New</Button>
        </Link>
      </div>
      {/* Empty list */}
      {videoList.length === 0 && (
        <EmptyState />
      )}

      {/* List of videos */}
      <VideoList videoList={videoList} />
    </div>
  )
}

export default Dashborad