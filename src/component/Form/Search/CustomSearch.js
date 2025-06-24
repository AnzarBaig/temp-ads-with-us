import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchSubcategoriesAndProducts } from '@/lib/localSearch';
import SerachResults from './SerachResults';
import fetchCategoryData from '@/Contants/CategoryResponse';

export default function CustomSearch() {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchResultProp, setSearchResultProp] = useState([]);
    const [placeholderText, setPlaceholderText] = useState('');
    const inputRef = useRef(null); // Create a ref for the input element

    const { data: CategoryData } = useQuery(
        ["getCategoryData"],
        fetchCategoryData,
        {
            staleTime: 1 * 60 * 1000,
            cacheTime: 3 * 60 * 1000
        }
    );

    useEffect(() => {
        // Focus on the input element when the component mounts
        inputRef.current.focus();
    }, []);



    const handleResultClick = () => {
        setIsOpen(false);
        setSearch('');
    };



    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearch('');
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search.length) {
                const searchTerm = search;
                const searchResults = searchSubcategoriesAndProducts(CategoryData, searchTerm);
                setSearchResultProp(searchResults);
            }
        }, 800);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    useEffect(() => {
        const placeholderStrings = [
            "Steel", "Road Safety Equipment", "Construction Materials", "Plumbing and Fitting",
            "Electricals", "Safety Products", "Tools and Accessories", "Tool Room Machines",
            "Non Ferrous Products", "Renewable Energy", "Welding Machines", "Material Handling Equipment",
            "Medical Equipment", "Fitness Handling Equipment"
        ];

        let currentStringIndex = 0;
        let currentCharIndex = 0;

        const typewriterEffect = () => {
            setPlaceholderText(prev => {
                if (currentCharIndex === placeholderStrings[currentStringIndex].length) {
                    currentStringIndex = (currentStringIndex + 1) % placeholderStrings.length;
                    currentCharIndex = 0;
                    return placeholderStrings[currentStringIndex].substring(0, currentCharIndex);
                } else {
                    currentCharIndex++;
                    return placeholderStrings[currentStringIndex].substring(0, currentCharIndex);
                }
            });
        };

        const interval = setInterval(typewriterEffect, 250);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative w-full max-w-[400px]" ref={inputRef}>
            <div className="bg-slate-100 relative flex min-h-[50px] w-full grow items-center gap-1 rounded-3xl px-4">
                <div className='w-[24px] h-[24px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className='text-black/50'>
                        <path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"></path>
                    </svg>
                </div>
                <input

                    type="text"
                    placeholder={`Search for ${placeholderText}`}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (!isOpen) setIsOpen(true);
                        if (e.target.value === '' && isOpen) setIsOpen(false);
                    }}
                    ref={inputRef}
                    className="paragraph-regular w-full text-dark400_light700 border-none bg-transparent shadow-none outline-none"
                />
            </div>
            {isOpen && <SerachResults searchResultProp={searchResultProp} onResultClick={handleResultClick} />}
        </div>
    );
}
