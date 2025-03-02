

import { FC } from "react";

interface ParagraphProps {
    className?: string;
    children: string;
}


const Paragraph: FC<ParagraphProps> = ({ className, children }) => {
    return (<p className={`text-sm md:text-base ${className}`}>
        {children}
    </p>);
}

export default Paragraph;