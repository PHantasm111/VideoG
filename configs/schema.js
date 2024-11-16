import { integer, json } from "drizzle-orm/pg-core";
import { serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imgUrl: varchar('imgUrl'),
    subscription: varchar('subscription').default(false),
    credits:integer('credits').default(30)
})

export const VideoData = pgTable('videoData', {
    id: serial('id').primaryKey(),
    script: json('script').notNull(),
    audioFileUrl: varchar('audioFileUrl').notNull(),
    captions: json('captions').notNull(),
    imageList: varchar('imageList').array(),
    createdBy: varchar('createdBy').notNull()
})