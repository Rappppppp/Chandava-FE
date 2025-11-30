import { useState } from "react";
import { FC } from "react";
import { useInput } from "@hooks/useInput";
import { AxiosError } from "axios"
import toast from "react-hot-toast";
import { ContactUsService } from "@features/landingpage/services/ContactUsService";
// import DefaultLoader from "@components/loaders/DefaultLoader";
import { Loader2 } from "lucide-react";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const { values, handleChange, isValid, getPayload, reset } = useInput({
        first_name: { value: "", required: true },
        last_name: { value: "", required: true },
        email: { value: "", required: true },
        subject: { value: "", required: true },
        message: { value: "", required: true },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid()) return;
        try {
            setLoading(true);
            await ContactUsService.store(getPayload(values));
            toast.success("Inquiry submitted successfully");
            reset();
        } catch (error) {

            if (error instanceof AxiosError) {
                toast.error(error?.response?.data.message)
                return;
            }
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex md:gap-3 flex-col md:flex-row">
                <Input
                    value={values.first_name.value}
                    onChange={handleChange}
                    name="first_name"
                    placeholder="First Name"
                    required
                />
                <Input
                    value={values.last_name.value}
                    onChange={handleChange}
                    name="last_name"
                    placeholder="Last Name"
                    required
                />
            </div>

            <Input
                value={values.email.value}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email Address"
                required
            />

            <Input
                value={values.subject.value}
                onChange={handleChange}
                name="subject"
                placeholder="Subject"
                required
            />

            <TextArea
                value={values.message.value}
                onChange={handleChange}
                name="message"
                placeholder="Message"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="border w-full py-3 text-white text-center flex justify-center bg-primary rounded-lg cursor-pointer hover:bg-primary/90 transition-all">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send"}
            </button>

        </form>
    );
}


interface InputProps {
    type?: string;
    name: string;
    placeholder: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
}


const Input: FC<InputProps> = ({ type = "text", name, placeholder, required = false, onChange, value }) => {
    return (
        <div className="w-full mb-3">
            <label className="text-sm text-gray-500" htmlFor={name}>{placeholder} {required && <span className="text-red-500">*</span>}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                id={name}
                className="w-full appearance-none border border-gray-300 bg-transparent outline-none shadow-none px-3 py-2 m-0 focus:ring-0 text-gray-600 rounded-lg text-sm md:text-base"
                required={required}
            />
        </div>

    )
}

const TextArea: FC<InputProps> = ({ name, placeholder, required = false, onChange, value }) => {
    return (
        <div className="w-full mb-3">
            <label className="text-sm text-gray-500" htmlFor={name}>{placeholder} {required && <span className="text-red-500">*</span>}</label>
            <textarea
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                className="w-full appearance-none border border-gray-300 bg-transparent outline-none shadow-none px-3 py-2 m-0 focus:ring-0 text-gray-600 rounded-lg text-sm md:text-base"
                required={required}
            />
        </div>

    )
}

export default ContactUsForm;