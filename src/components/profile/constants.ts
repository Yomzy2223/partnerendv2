import { ReactNode } from "react";
import {z,  ZodType } from 'zod';

export const ProfileSchema = z.object({
    location: z.string().min(2, { message: 'Location cannot be empty' }),
    name: z.string().min(3, { message: 'Full name is required' }),
    email: z
    .string()
    .email("Enter a valid email")
    .nonempty("Enter your email address"),
    phoneNumber: z.string().min(10, { message: 'Phone number is required' }),
    payRange: z.string().min(1, { message: 'Pay range is required' }),
});

export interface ProfileInput {
    id?: string; 
    name: string;
    label:string;
    type:string;
    textInputProp?: Record<string, any>;
    selectProp?: Record<string, any>;
    fileProp?: Record<string, any>;
    selectOptions?: string[];
}

// export type profileType = z.infer<typeof ProfileSchema>;

export interface ProfileProps {
    children: ReactNode;
    formInfo: ProfileInput[];
    defaultValues?: Record<string, any>;
    formSchema: ZodType<any, any, any>;
    onFormSubmit: (values: any) => void;
}