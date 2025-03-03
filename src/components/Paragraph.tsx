
import { ReactNode } from "react";


interface ParagraphProps {
    className?: string;
    children: ReactNode;
}


const Paragraph = ({ className, children }: ParagraphProps) => {
    return (<p className={`text-sm md:text-base ${className}`}>
        {children}
    </p>);
}

export default Paragraph;