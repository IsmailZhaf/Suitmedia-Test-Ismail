import dataNotFound from "@/../public/logo.png";
export const imageUrlSearch = (content) => {
    const regex = /<img.*?src="(.*?)"/;
    const match = content.match(regex);
    return match ? match[1] : dataNotFound;
};
