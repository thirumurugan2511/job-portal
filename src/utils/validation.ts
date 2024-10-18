// src/utils/validation.ts
export const validateEmail = (email: string) => {
    // Your email validation logic here
    return /\S+@\S+\.\S+/.test(email);
};
