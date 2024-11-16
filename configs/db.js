import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon('postgresql://ai-short-video-generator_owner:HBw14TzuSlgP@ep-dawn-leaf-a2gfr3rs.eu-central-1.aws.neon.tech/ai-short-video-generator?sslmode=require');

const db = drizzle({ client: sql });
export default db;