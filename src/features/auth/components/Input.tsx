import Icon from "@components/Icon";
import { icons } from "lucide-react";

interface InputProps {
    icon: keyof typeof icons;
    name: string;
    label: string;
    type?: string;

}


const input = ({ icon, name, label, type = "text" }: InputProps) => {
    return (

        <div className="relative mb-3">
            <label htmlFor={name} className="">{label}</label>
            <div className="flex gap-3 border p-2 rounded-xl mt-1 border-white/40">
                <Icon name={icon} size={30} color="#fff" />
                <input
                    type={type}
                    id={name}
                    name={name}
                    className="appearance-none bg-transparent border-none outline-none p-0 m-0 w-full"
                />
            </div>

        </div>


    );
}

export default input;