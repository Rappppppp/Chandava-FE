import { FC } from "react";


const ContactUsForm = () => {
    return (
        <form autoComplete="off">
            <div className="flex md:gap-3 flex-col md:flex-row">
                <Input
                    name="first_name"
                    placeholder="First Name"
                    required
                />
                <Input
                    name="last_name"
                    placeholder="Last Name"
                    required
                />
            </div>

            <Input
                type="email"
                name="email"
                placeholder="Email Address"
                required
            />

            <Input
                name="subject"
                placeholder="Subjct"
                required
            />

            <TextArea
                name="message"
                placeholder="Message"
                required
            />

            <button className="border w-full py-3 text-white bg-primary rounded-lg cursor-pointer hover:bg-primary/90 transition-all" type="button">
                Submit Form
            </button>

        </form>
    );
}


interface InputProps {
    type?: string;
    name: string;
    placeholder: string;
    required?: boolean;
}


const Input: FC<InputProps> = ({ type = "text", name, placeholder, required = false }) => {
    return (
        <div className="w-full mb-3">
            <label className="text-sm text-gray-500" htmlFor={name}>{placeholder} {required && <span className="text-red-500">*</span>}</label>
            <input
                type={type}
                name={name}
                id={name}
                className="w-full appearance-none border border-gray-300 bg-transparent outline-none shadow-none px-3 py-2 m-0 focus:ring-0 text-gray-600 rounded-lg text-sm md:text-base"
                required={required}
            />
        </div>

    )
}

const TextArea: FC<InputProps> = ({  name, placeholder, required = false }) => {
    return (
        <div className="w-full mb-3">
            <label className="text-sm text-gray-500" htmlFor={name}>{placeholder} {required && <span className="text-red-500">*</span>}</label>
            <textarea
                name={name}
                id={name}
                className="w-full appearance-none border border-gray-300 bg-transparent outline-none shadow-none px-3 py-2 m-0 focus:ring-0 text-gray-600 rounded-lg text-sm md:text-base"
                required={required}
            />
        </div>

    )
}

export default ContactUsForm;