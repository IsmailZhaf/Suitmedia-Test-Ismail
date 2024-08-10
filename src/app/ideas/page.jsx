import React from "react";
import Banner from "@/components/Banner";
import { Post } from "./_components/Post";

export default function Page() {
    return (
        <div className="pt-[50px] lg:pt-[110px]">
            <Banner imageUrl={"/banner.jpg"} title={"Ideas"} subtitle={"Where all our great things begin"} />
            <Post />
        </div>
    );
}
