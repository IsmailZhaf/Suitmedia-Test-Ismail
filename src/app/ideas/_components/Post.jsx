"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import axios from "axios";
import { imageUrlSearch } from "@/app/utils/imageUrlSearch";
import { formatDate } from "@/app/utils/formatDate";
import { motion, useInView, useAnimaton } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const Post = () => {
    const [ideas, setIdeas] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortOrder, setSortOrder] = useState("Newest");
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIdeas();
    }, [page, pageSize]);

    useEffect(() => {
        const savedPage = parseInt(localStorage.getItem("currentPage"), 10);
        if (savedPage) {
            setPage(savedPage);
        }
    }, []);

    const fetchIdeas = async () => {
        try {
            const response = await axios.get("/api/ideas", {
                params: {
                    "page[number]": page,
                    "page[size]": pageSize,
                    append: ["small_image", "medium_image"],
                },
            });
            setIdeas(response.data.data);
            setTotalPages(response.data.meta.last_page);
            setTotalItems(response.data.meta.total);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        }
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        sortIdeas(e.target.value);
    };

    const sortIdeas = (order) => {
        const sortedIdeas = [...ideas].sort((a, b) => {
            const dateA = new Date(a.published_at);
            const dateB = new Date(b.published_at);
            if (order === "Newest") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
        setIdeas(sortedIdeas);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setPage(1);
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
        localStorage.setItem("currentPage", newPage);
    };

    const renderPagination = () => {
        const paginationItems = [];
        const maxPagesToShow = 5;

        if (page > 1) {
            paginationItems.push(
                <button key="first" onClick={() => handlePageChange(1)}>
                    <ChevronsLeft />
                </button>
            );
            paginationItems.push(
                <button key="prev" onClick={() => handlePageChange(page - 1)}>
                    <ChevronLeft />
                </button>
            );
        }

        const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`${page === i ? "bg-[#f17747] font-semibold rounded-lg p-1 px-2 text-white" : ""}`}>
                    {i}
                </button>
            );
        }

        if (page < totalPages) {
            paginationItems.push(
                <button key="next" onClick={() => handlePageChange(page + 1)}>
                    <ChevronRight />
                </button>
            );
        }

        if (endPage < totalPages) {
            paginationItems.push(
                <button key="last" onClick={() => handlePageChange(totalPages)}>
                    <ChevronsRight />
                </button>
            );
        }

        return paginationItems;
    };

    return (
        <div className="mx-[40px] lg:mx-[200px] mt-10 flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-between">
                <p className="text-base">
                    Showing {page * pageSize - pageSize + 1} - {Math.min(page * pageSize, totalItems)} of {totalItems}
                </p>
                <div className="flex items-center gap-4 text-base">
                    <div className="flex gap-2 items-center ">
                        {" "}
                        <label>Sort By:</label>
                        <div className="border rounded-3xl">
                            <select value={sortOrder} onChange={handleSortChange} className="m-2 focus:outline-none">
                                <option value="Newest">Newest</option>
                                <option value="Oldest">Oldest</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label>Show Per Page:</label>
                        <div className="border rounded-3xl">
                            <select value={pageSize} onChange={handlePageSizeChange} className="m-2 focus:outline-none">
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="grid  lg:grid lg:grid-cols-5 my-10 items-center gap-8">
                    {ideas.map((idea) => {
                        const imageUrl = imageUrlSearch(idea.content);
                        console.log(idea);
                        const date = formatDate(idea.created_at);
                        return (
                            <Card
                                key={idea.id}
                                imageUrl={imageUrl}
                                date={date}
                                title={idea.title}
                                // variants={{
                                //     hidden: { opacity: 0, y: 75 },
                                //     visible: { opacity: 1, y: 0 },
                                // }}
                                // initial="hidden"
                                // animate="visible"
                            />
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-center gap-4 mb-10">{renderPagination()}</div>
        </div>
    );
};
