import z from 'zod'

const userValidation = z.object({
  username: z
    .string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username is required'
    })
    .min(1, { message: 'Username cannot be empty' }),

  userType: z.enum(['common', 'admin'], {
    invalid_type_error: 'User type must be either "common" or "admin"',
    required_error: 'User type is required'
  }),

  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is required'
    })
    .email({ message: 'Invalid email format' }),

  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required'
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password cannot exceed 20 characters' }),

  genre: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || ['male', 'female', 'other'].includes(val.toLowerCase()),
      {
        message: 'Genre must be either "male", "female", or "other"'
      }
    ),

  age: z
    .number({
      invalid_type_error: 'Age must be a number'
    })
    .int({ message: 'Age must be an integer' })
    .min(0, { message: 'Age cannot be negative' })
    .max(120, { message: 'Age must be realistic' })
    .optional(),

  address: z
    .string({
      invalid_type_error: 'Address must be a string'
    })
    .max(100, { message: 'Address cannot exceed 100 characters' })
    .optional(),

  phone: z
    .string({
      invalid_type_error: 'Phone must be a string'
    })
    .regex(/^\+?[0-9]{7,15}$/, { message: 'Invalid phone number format' })
    .optional(),

  city: z
    .string({
      invalid_type_error: 'City must be a string'
    })
    .optional(),

  country: z
    .string({
      invalid_type_error: 'Country must be a string'
    })
    .optional()
})

export const validateUser = (input) => {
  return userValidation.safeParse(input)
}
