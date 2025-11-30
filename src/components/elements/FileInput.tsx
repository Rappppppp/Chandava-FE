import React, { useState } from "react";
import Icon from "@components/Icon";
import toast from "react-hot-toast";
import api from "@services/api";
import Tesseract from "tesseract.js";


interface FileInputProps {
    label: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxFiles?: number;
    isForGcash?: boolean;
    minimumAmount?: number;
}

const FileInput = ({ label, name, onChange, maxFiles = 1, isForGcash = false, minimumAmount = 0 }: FileInputProps) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File[]>([]);




    const processOCRText = (text: string) => {
        // Step 1: check if "GCash" exists
        if (!text.toLowerCase().includes("gcash")) {
            throw new Error("GCash not found in receipt ❌");
        }

        // Step 2: find the amount (looks for numbers like 400.00 or 1,234.56)
        const amountRegex = /(?:Amount|Total Amount sent)[^\d]*([\d,]+\.\d{2})/i;
        const match = text.match(amountRegex);

        if (!match) {
            throw new Error("Amount not found in receipt ❌");
        }

        // Clean the amount (remove commas, parse to number if needed)
        const amount = parseFloat(match[1].replace(/,/g, ""));

        if (Number(amount) < minimumAmount) {
            throw new Error(`The receipt amount is less than the minimum amount of ${minimumAmount} ❌`);
        }

        return { amount };
    };


    // Utility: extract text + validate
    const extractAndValidateGcash = (file: File): Promise<number> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async () => {
                try {
                    const base64Image = reader.result as string;
                    const result = await Tesseract.recognize(base64Image, "eng");

                    const { amount } = processOCRText(result.data.text);
                    resolve(amount); // ✅ success → return amount
                } catch (err) {
                    reject(err); // ❌ validation failed → reject
                }
            };

            reader.onerror = () => reject(new Error("Failed to read file"));

            reader.readAsDataURL(file);
        });
    };



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

            if (isForGcash) {
                const amount = await extractAndValidateGcash(file);
                console.log("Valid GCash amount:", amount);
            }

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
        } catch (error: any) {
            console.error(error);

            const message =
                error?.message || String(error) || "An error occurred while uploading the file.";

            toast.error(message);
        }
        finally {
            setUploading(false)
            e.target.value = "";
        }


    };



    return (



        <>
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

        </>

    );
}

export default FileInput;