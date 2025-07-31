
interface SelectProps {
    options: OptionPropsGlobalInterface[];
    name: string;
    label: string;
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, name, label, value, onChange }: SelectProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white border border-gray-300 rounded-lg outline-none shadow-none ring-0 focus:border-primary focus:ring-0 px-3 py-2">
                <option value="">Select</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>

        </div>
    );
}

export default Select;