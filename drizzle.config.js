import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://ai-short-video-generator_owner:HBw14TzuSlgP@ep-dawn-leaf-a2gfr3rs.eu-central-1.aws.neon.tech/ai-short-video-generator?sslmode=require',
  },
});
