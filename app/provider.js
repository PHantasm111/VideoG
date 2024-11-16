"use client"
import { useUser } from "@clerk/nextjs"
import { Users } from "../configs/schema"
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import  db  from "@/configs/db";

function Provider({ children }) {

  const {user} = useUser();

  useEffect(() => {
    user && isNewUser();
  }, [user])

  const isNewUser = async () => {
    const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    console.log(result);

    if (!result[0]) {
      await db.insert(Users).values({
        name: user.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imgUrl: user?.imageUrl
      })
    }

  }


  return (
    <div>{children}</div>
  )
}

export default Provider