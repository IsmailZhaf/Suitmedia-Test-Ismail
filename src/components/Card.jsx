import Image from "next/image";
import React from "react";

export const Card = ({ imageUrl, date, title }) => {
    return (
        <div className="shadow-lg w-[250px] h-[280px] lg:w-[280px] lg:h-[400px] rounded-xl">
            <Image src={imageUrl} width={100} height={100} alt={title || "card image"} className="h-[150px] w-[250px] lg:w-[280px] lg:h-[250px] rounded-t-xl" loading="lazy" />
            <article className="p-6">
                <p className="text-xs lg:text-sm text-slate-500 truncate">{date}</p>
                <p className="text-[18px] lg:text-[21px] lg:break-words lg:line-clamp-3">{title}</p>
            </article>
        </div>
    );
};
