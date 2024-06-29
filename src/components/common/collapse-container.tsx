'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from '../icons/chevron';

interface CollapsibleApplicationBoxProps {
    text: string;
    children: React.ReactNode;
}

const CollapseContainer: React.FC<CollapsibleApplicationBoxProps> = ({ text, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <div className="my_collapseContainer">
            <div className="my_action" onClick={handleToggle}>
                <div className="my_col">
                    <div className="my_title">{text}</div>
                </div>
                <div className="my_chevronWrap">
                    <ChevronDown isOpen={isOpen} />
                </div>
            </div>
            <div
                ref={contentRef}
                style={{ height }}
                className="my_content"
            >
                <div className="my_container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapseContainer;
