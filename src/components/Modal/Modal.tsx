import { Dialog, DialogPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'


interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    className?: string;
}


const Modal = ({ isOpen, setIsOpen, children, className }: ModalProps) => {

    return (

        <>
            <AnimatePresence>
                {isOpen && (
                    <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 "
                        />
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`space-y-4 bg-white p-12 rounded-2xl ${className} max-h-[90vh] overflow-y-auto`}
                            >
                                {children}
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
}

export default Modal;