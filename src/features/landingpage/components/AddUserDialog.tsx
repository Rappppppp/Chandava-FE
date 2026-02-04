'use client';

import React from "react"

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { register } from "@features/auth/services/auth";
import { useInput } from "@hooks/useInput";

interface AddUserDialogProps {
  onUserAdded?: (user: any) => void;
}

export default function AddUserDialog({ onUserAdded }: AddUserDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nickname: '',
    birthdate: '',
    contact_number: '',
    email: '',
    address: '',
    password: '',
    password_confirmation: '',
  });

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
       await axios.get(`${import.meta.env.VITE_BE_BASE_URL}/sanctum/csrf-cookie`, {
                withCredentials: true,
            });

            const response = await register(values);
            if (response.success) {
                toast.success("Registration successful");

                setValues({
                  first_name: { value: "" },
                  last_name: { value: "" },
                  nickname: { value: "" },
                  birthdate: { value: "" },
                  contact_number: { value: "" },
                  email: { value: "" },
                  address: { value: "" },
                  password: { value: "" },
                  password_confirmation: { value: "" },
                });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
    } catch (error: any) {
      console.error('Error adding user:', error);
      toast.error(error.response?.data?.message || 'Server error. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add User
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 transition-opacity" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
                  <p className="mt-1 text-sm text-gray-600">Fill in the details to add a new user to the system</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[calc(80vh-150px)] overflow-y-auto">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-900">First Name *</label>
                    <input
                      id="first_name"
                      name="first_name"
                      value={values.first_name.value}
                      onChange={handleChange}
                      className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.first_name && <p className="text-sm text-red-500 mt-1">{errors.first_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-900">Last Name *</label>
                    <input
                      id="last_name"
                      name="last_name"
                      value={values.last_name.value}
                      onChange={handleChange}
                      className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.last_name && <p className="text-sm text-red-500 mt-1">{errors.last_name}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-gray-900">Nickname *</label>
                  <input
                    id="nickname"
                    name="nickname"
                    value={values.nickname.value}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nickname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.nickname && <p className="text-sm text-red-500 mt-1">{errors.nickname}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-900">Birthdate *</label>
                    <input
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={values.birthdate.value}
                      onChange={handleChange}
                      className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.birthdate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.birthdate && <p className="text-sm text-red-500 mt-1">{errors.birthdate}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact_number" className="block text-sm font-medium text-gray-900">Contact Number *</label>
                    <input
                      id="contact_number"
                      name="contact_number"
                      value={values.contact_number.value}
                      onChange={handleChange}
                      className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contact_number ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.contact_number && (
                      <p className="text-sm text-red-500 mt-1">{errors.contact_number}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email.value}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address *</label>
                  <input
                    id="address"
                    name="address"
                    value={values.address.value}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password *</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password.value}
                      onChange={handleChange}
                      className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-900">Confirm Password *</label>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      value={values.password_confirmation.value}
                      onChange={handleChange}
                      className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password_confirmation && (
                      <p className="text-sm text-red-500 mt-1">{errors.password_confirmation}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Adding User...' : 'Add User'}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
