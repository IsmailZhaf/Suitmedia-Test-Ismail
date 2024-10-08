import dotenv from "dotenv";
dotenv.config();
// next.config.js
import { createProxyMiddleware } from "http-proxy-middleware";

export default {
    images: {
        domains: ["1.bp.blogspot.com", "38.media.tumblr.com", "suitmedia.static-assets.id", "assets.suitdev.com"],
    },
    async rewrites() {
        return [
            {
                source: "/api/ideas/:path*",
                destination: process.env.API,
            },
        ];
    },
};
