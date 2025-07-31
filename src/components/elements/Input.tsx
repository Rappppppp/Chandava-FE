
interface InputProps {
    label: string;
    placeholder?: string;
    type?: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    error?: string;
    required?: boolean;
}

const Input = ({ label, placeholder, type = "text", name, onChange, value, error, required = false }: InputProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                id={name}
                type={type}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2" 
                required={required}
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
}

export default Input;