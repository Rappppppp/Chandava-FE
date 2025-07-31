import React, { useState } from "react";
import Icon from "@components/Icon";
import toast from "react-hot-toast";
import api from "@services/api";


interface FileInputProps {
    label: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxFiles?: number;
}

const FileInput = ({ label, name, onChange, maxFiles = 1 }: FileInputProps) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File[]>([]);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Only allow image files
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
        }

        // Limit file size to 2MB (2 * 1024 * 1024 = 2,097,152 bytes)
        const maxSizeInBytes = 2 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            toast.error("Image size must be less than or equal to 2MB.");
            return;
        }

        if (uploadedImage.length >= maxFiles) {
            toast.error(`You can only upload up to ${maxFiles} images.`);
            return;
        }

        const isDuplicate = uploadedImage.some(
            (f) => f.name === file.name && f.size === file.size
        );

        if (isDuplicate) {
            toast.error("You are uploading the same file.");
            return;
        }

        try {
            setUploading(true)
            const formData = new FormData();
            formData.append("file", file); // Use the field name expected by your backend

            const res = await api.post("/filepond", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status !== 201) {
                throw new Error("Failed to upload file");
            }
            toast.success(res.data.message);
            const updated = [...uploadedImage, file];
            setUploadedImage(updated);
            const fakeEvent = {
                target: {
                    name,
                    value: res.data.data.name,
                },
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            onChange?.(fakeEvent);
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while uploading the file.");

        } finally {
            setUploading(false)
            e.target.value = "";
        }


    };



    return (



        <label htmlFor={name} className="cursor-pointer">
            <p className="mb-2">{label}</p>
            <input type="file" name={name} id={name} className="hidden" onChange={handleFileInputChange} />
            <div className="flex flex-wrap gap-2 relative">
                {uploadedImage.map((image, index) => (
                    <div key={index} className="overflow-hidden border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                ))}

                <div className="border aspect-square w-[4.6875rem] border-gray-300 rounded-xl flex items-center justify-center">
                    {uploading ? (<Icon name="LoaderCircle" size={30} color="gray" className="animate-spin" />) : (<Icon name="ImageUp" size={30} color="gray" />)}

                </div>

            </div>
        </label>

    );
}

export default FileInput;