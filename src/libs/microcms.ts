import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

const client = createClient({
    serviceDomain: import.meta.env.PUBLIC_SERVICE_DOMAIN,  // ←ここが超重要
    apiKey: import.meta.env.PUBLIC_API_KEY,
});

export const getBlogs = async (queries: MicroCMSQueries) => {
    return await client.get({ endpoint: "portfolio", queries });
};

export const getBlogsDetail = async (blogId:string,
    queries?: MicroCMSQueries
) => {
    return await client.getListDetail({
        endpoint: "portfolio",
        contentId:blogId,
        queries,
    });
};

