import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Spinner from "@components/Spinner";

interface ConfirmModalProps {
    title: string;
    fnLoading?: boolean;
    closeButton?: boolean | string;
    mainButton?: boolean | string;
    variant?: "primary" | "warning" | "danger"; // New prop for color variants
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    buttonFn: () => void;
    children?: ReactNode;
}

// Color variants for buttons
const buttonVariants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
    danger: "bg-red-500 hover:bg-red-600 text-white",
};

const ConfirmModal = ({
    title,
    fnLoading = false,
    closeButton = false,
    mainButton = false,
    buttonFn,
    variant = "primary", // Default variant
    isOpen,
    setIsOpen,
    children,
}: ConfirmModalProps) => {

    const handleClose = () => {
        if (fnLoading) return;
        setIsOpen(false);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog static open={isOpen} onClose={() => handleClose()} className="relative z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30"
                    />
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                        <DialogPanel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-lg space-y-4 bg-white p-12 rounded-2xl flex flex-col items-center justify-center"
                        >
                            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                            <div className="text-gray-500">{children}</div>
                            <div className="flex gap-4 justify-center bg-white">
                                {closeButton && (
                                    <button
                                        className="px-5 py-2 rounded-full text-black cursor-pointer bg-gray-200 hover:bg-gray-300"
                                        onClick={() => handleClose()}
                                    >
                                        {closeButton}
                                    </button>
                                )}

                                {mainButton && (
                                    <button
                                        className={` px-5 py-2 rounded-full cursor-pointer transition ${buttonVariants[variant]}`}
                                        onClick={() => buttonFn()}
                                    >
                                        {fnLoading ? (
                                            <div className="flex gap-2">
                                                <Spinner />
                                                <p className="text-sm">Loading</p>
                                            </div>
                                        ) : (
                                            mainButton
                                        )}
                                    </button>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
