import Icon from "@components/Icon";
import { icons } from "lucide-react";

interface InputProps {
    icon: keyof typeof icons;
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    

}


const Input = ({ icon, name, label, type = "text", value, onChange, error, required = false }: InputProps) => {
    return (

        <div className="relative mb-3">
            <label htmlFor={name} className="">{label}</label>
            <div className="flex gap-3 border p-2 rounded-xl mt-1 border-white/40">
                <Icon name={icon} size={30} color="#fff" />
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="appearance-none bg-transparent border-none outline-none p-0 m-0 w-full"
                    required={required}
                    style={{
                        colorScheme: "light dark", // Ensures compatibility with both themes
                        WebkitTextFillColor: "currentColor", // Keeps text color consistent
                        WebkitAppearance: "none", // Resets default styling
                      }}
                />
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            

        </div>


    );
}

export default Input;