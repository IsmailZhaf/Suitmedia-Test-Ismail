"use client";
import { useEffect } from "react";
import banner from "@/../public/banner.jpg";

const Banner = ({ imageUrl, title, subtitle }) => {
    useEffect(() => {
        const handleScroll = () => {
            const bannerImage = document.querySelector(".banner-image");
            const bannerText = document.querySelector(".banner-text");

            const scrollPosition = window.pageYOffset;

            // Parallax effect for image
            bannerImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;

            // Parallax effect for text (slower)
            bannerText.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative overflow-hidden h-[500px]">
            {/* Banner Image */}
            <div className="banner-image absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>

            {/* Parallax Text */}
            <div className="banner-text relative z-10 flex flex-col items-center justify-center h-full text-white">
                <h1 className="text-5xl font-semibold">{title}</h1>
                <h1 className="text-xl ">{subtitle}</h1>
            </div>

            {/* Slanted Area */}
            <div className="absolute inset-x-0  -bottom-28 h-[230px] bg-white transform -skew-y-[5deg] origin-bottom"></div>
        </div>
    );
};

export default Banner;
