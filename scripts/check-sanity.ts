import { createClient } from "next-sanity";
import * as dotenv from "dotenv";

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2026-05-25",
    useCdn: false,
});

async function main() {
    console.log(`Querying Sanity dataset: ${dataset}...`);
    const posts = await client.fetch(`*[_type == "post"] { _id, title, slug }`);
    console.log("Found posts:", JSON.stringify(posts, null, 2));
}

main();
