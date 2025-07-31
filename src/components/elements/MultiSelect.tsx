interface OptionProps {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface MultiSelectProps {
    label: string;
    name: string;
    options: OptionProps[];
    values?: (string | number)[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultiSelect = ({ options, name, label, values = [], onChange }: MultiSelectProps) => {
    return (
        <div >
            <h2 className="font-semibold text-gray-700 mb-2">{label}</h2>
            <div className="grid grid-cols-2 gap-2">
                {
                    options.map((option, index) => (
                        <label key={`${name}-${option.value}-${index}`} htmlFor={`${name}-${option.value}`} className="flex items-center gap-2">
                            <input
                                onChange={onChange}
                                name={name}
                                id={`${name}-${option.value}`}
                                value={option.value}
                                type="checkbox"
                                defaultChecked={values?.includes(option.value) ?? false}
                                className="form-checkbox text-primary h-5 w-5" />
                            <span className="text-gray-700">{option.label}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default MultiSelect;