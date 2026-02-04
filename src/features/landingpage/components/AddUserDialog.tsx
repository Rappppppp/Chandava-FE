'use client';

import React, { useState, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Plus, X, User, Mail, Lock, Phone, MapPin, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { register } from "@features/auth/services/auth";
import { useInput } from "@hooks/useInput";

// Shared classes for consistent styling
const inputClasses = "mt-1 block w-full rounded-lg border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500";

interface AddUserDialogProps {
  onUserAdded?: (user: any) => void;
}

export default function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, setValues, handleChange, errors, isValid } = useInput({
    first_name: { value: "", required: true, letters: true },
    last_name: { value: "", required: true, letters: true },
    nickname: { value: "", required: true },
    birthdate: { value: "", required: true },
    contact_number: { value: "", required: true, numbers: true },
    email: { value: "", required: true, email: true },
    address: { value: "", required: true, maxLength: 200 },
    password: { value: "", required: true, minLength: 8 },
    password_confirmation: { value: "", required: true, minLength: 8 },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    setIsLoading(true);

    try {
      await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
      const response = await register(values);
      
      if (response.success) {
        toast.success("User added successfully");
        setOpen(false);
        onUserAdded?.(response.user);
        // Reset Logic
        const resetObj = Object.keys(values).reduce((acc: any, key) => {
          acc[key] = { value: "" };
          return acc;
        }, {});
        setValues(resetObj);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95"
      >
        <Plus className="h-4 w-4" />
        Add User
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          {/* Backdrop with Fade transition */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
          >
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
              >
                <DialogPanel className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                  {/* Sticky Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div>
                      <DialogTitle className="text-lg font-bold text-gray-900">Add New User</DialogTitle>
                      <p className="text-xs text-gray-500">Create a new account for the system.</p>
                    </div>
                    <button onClick={() => setOpen(false)} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Form Body */}
                  <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="First Name" name="first_name" value={values.first_name.value} error={errors.first_name} onChange={handleChange} icon={<User className="h-4 w-4" />} />
                        <InputGroup label="Last Name" name="last_name" value={values.last_name.value} error={errors.last_name} onChange={handleChange} icon={<User className="h-4 w-4" />} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Nickname" name="nickname" value={values.nickname.value} error={errors.nickname} onChange={handleChange} />
                        <InputGroup label="Birthdate" name="birthdate" type="date" value={values.birthdate.value} error={errors.birthdate} onChange={handleChange} icon={<Calendar className="h-4 w-4" />} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Email Address" name="email" type="email" value={values.email.value} error={errors.email} onChange={handleChange} icon={<Mail className="h-4 w-4" />} />
                        <InputGroup label="Contact Number" name="contact_number" value={values.contact_number.value} error={errors.contact_number} onChange={handleChange} icon={<Phone className="h-4 w-4" />} />
                      </div>

                      <InputGroup label="Address" name="address" value={values.address.value} error={errors.address} onChange={handleChange} icon={<MapPin className="h-4 w-4" />} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Password" name="password" type="password" value={values.password.value} error={errors.password} onChange={handleChange} icon={<Lock className="h-4 w-4" />} />
                        <InputGroup label="Confirm Password" name="password_confirmation" type="password" value={values.password_confirmation.value} error={errors.password_confirmation} onChange={handleChange} icon={<Lock className="h-4 w-4" />} />
                      </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-[0.98]"
                      >
                        {isLoading ? 'Adding User...' : 'Add User'}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

/**
 * Reusable Input Component to keep the main form clean
 */
function InputGroup({ label, name, type = "text", value, error, onChange, icon }: any) {
  return (
    <div className="w-full">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 ml-1">
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${inputClasses} ${error ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'border-gray-200'}`}
      />
      {error && <p className="text-[11px] font-medium text-red-500 mt-1 ml-1 italic">{error}</p>}
    </div>
  );
}