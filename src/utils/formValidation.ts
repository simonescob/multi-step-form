import { z } from 'zod';

// Schema for Personal Info step
export const personalInfoSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
});

// Schema for Select Plan step
export const selectPlanSchema = z.object({
  plan: z.enum(['Arcade', 'Advanced', 'Pro'], {
    required_error: 'Please select a plan',
  }),
  billing: z.enum(['Monthly', 'Yearly']).optional(),
});

// Schema for Add-Ons step
export const addOnsSchema = z.object({
  addOns: z.object({
    service: z.boolean().optional(),
    storage: z.boolean().optional(),
    customization: z.boolean().optional(),
  }),
});

// Schema for the entire form (combined)
export const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...selectPlanSchema.shape,
  ...addOnsSchema.shape,
});

// Type for the entire form data
export type FormData = z.infer<typeof formSchema> & { billing?: 'Monthly' | 'Yearly' };