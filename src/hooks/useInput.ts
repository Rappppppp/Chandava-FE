import { useState, ChangeEvent } from "react";

interface Field<T> {
  value: T;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  numbers?: boolean;
  letters?: boolean;
}

type FormState<T> = {
  [K in keyof T]: Field<T[K]>;
};

type Errors<T> = { [K in keyof T]?: string };

export const useInput = <T extends Record<string, any>>(initialState: FormState<T>) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Errors<T>>({});

  const setDefaultValues = (incoming: any) => {
    setValues((prev) => {
      const updated = { ...prev } as any; // allow writes

      Object.keys(incoming).forEach((key) => {
        if (updated[key]) {
          updated[key] = {
            ...updated[key],
            value: incoming[key],
          };
        }
      });

      return updated;
    });
  };



  const validateField = (name: keyof T, field: Field<any>) => {
    const value = field.value.toString().trim();
    let errorMessage = "";

    const rules = {
      required: () => !value && "This field is required.",
      numbers: () => field.numbers && !/^\d+$/.test(value) && "Only numbers are allowed.",
      letters: () => field.letters && !/^[A-Za-z\s]+$/.test(value) && "Only letters are allowed.",
      minLength: () => field.minLength && value.length < field.minLength && `Must be at least ${field.minLength} characters.`,
      maxLength: () => field.maxLength && value.length > field.maxLength && `Must be at most ${field.maxLength} characters.`,
      email: () => field.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && "Invalid email format.",
      confirmPassword: () => name === "confirm_password" && value !== values.password.value && "Passwords do not match."
    };

    for (const rule in rules) {
      const result = rules[rule as keyof typeof rules]?.();
      if (result) {
        errorMessage = result;
        break; // Stop checking after the first validation failure
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
    validateField(name as keyof T, { ...values[name], value });
  };

  const reset = () => {
    setValues(initialState);
  }

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => {
      const prevField = prev[name];
      const prevArray = Array.isArray(prevField?.value)
        ? (prevField.value as (string | number)[])
        : [];

      const isAlreadySelected = prevArray.includes(value);
      const updatedArray = isAlreadySelected
        ? prevArray.filter((item) => item !== value)
        : [...prevArray, value];

      return {
        ...prev,
        [name]: {
          ...prevField,
          value: updatedArray,
        },
      };
    });
  };
  const isValid = () => Object.values(errors).every((error) => !error);

  const getPayload = <T extends Record<string, { value: any }>>(values: T) => {
    const payload: Record<string, any> = {};

    for (const key in values) {
      payload[key] = values[key].value;
    }

    return payload;
  };

  return { values, handleChange, errors, isValid, setValues, handleArrayChange, getPayload, reset, setDefaultValues }; // ✅ Now includes `setValues`
};
