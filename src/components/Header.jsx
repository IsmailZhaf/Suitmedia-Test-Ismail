"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo-Photoroom.png";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { ChevronsDown, ChevronsUp, Menu } from "lucide-react";

export const Header = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const controls = useAnimation();
    const path = usePathname();
    const title = [
        {
            title: "Work",
            link: "/work",
        },
        {
            title: "About",
            link: "/about",
        },
        {
            title: "Services",
            link: "/services",
        },
        {
            title: "Ideas",
            link: "/ideas",
        },
        {
            title: "Careers",
            link: "/careers",
        },
        {
            title: "Contact",
            link: "/contact",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                // Scroll ke bawah
                setShowHeader(false);
            } else {
                // Scroll ke atas
                setShowHeader(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const toggleMenu = async () => {
        // Set animasi saat menu dibuka
        await controls.start({
            opacity: isMenuOpen ? 0 : 1,
            y: isMenuOpen ? -10 : 0,
            animation: "infinite",
            transition: { duration: 2, delay: 1 },
        });

        // Set animasi saat menu ditutup
        if (!isMenuOpen) {
            await controls.start({
                opacity: 0,
                y: -10,
                transition: { duration: 0.5, delay: 2 },
                animation: "backwards",
            });
        }

        // Update status menu
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {}, [path]);
    return (
        <div className="absolute">
            <div className={`hidden lg:block fixed w-full transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0  shadow-md" : "-translate-y-full"}`}>
                <div className="flex bg-[#f17747]  justify-between px-[180px] items-center py-[30px]">
                    <Image src={logo} width={120} height={100} alt="logo" />
                    <div className={`flex gap-4 text-white`}>
                        {title.map((title) => (
                            <Link href={title.link} key={title.title} className={`py-1.5 ${path === title.link ? "border-b-2" : ""}`}>
                                {title.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {/* mobile */}
            <motion.div
                className={`block lg:hidden fixed w-full z-20 transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0  shadow-md" : "-translate-y-full"}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ type: "keyframes", duration: 0.5, delay: 0.5 }}
            >
                <div className="flex flex-col lg:flex-row bg-[#f17747] justify-between items-center ">
                    <div className="flex w-full justify-between p-5">
                        <Image src={logo} width={120} height={100} alt="logo" />
                        <button onClick={toggleMenu} className="text-white">
                            <Menu />
                        </button>
                    </div>
                    {isMenuOpen && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                            <div className={`flex flex-col gap-4 text-white text-center`}>
                                {title.map((title) => (
                                    <Link href={title.link} key={title.title} className={` ${path === title.link ? "border-b-2" : ""}`}>
                                        {title.title}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
