import { FC } from "react";

interface TitleProps {
    title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
    return (<>

        <h1 className="text-xl md:text-2xl font-bold text-primary mb-3">{title}</h1>

    </>);
}

export default Title;