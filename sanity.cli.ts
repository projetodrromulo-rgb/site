import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qkhnc3mo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
    api: {
        projectId,
        dataset,
    },
    server: {
        port: 3333,
        hostname: "0.0.0.0",
    }
});
