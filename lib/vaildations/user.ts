import * as z from 'zod';

export const UserValidation = z.object({
	profile_photo: z.string().url().nonempty(),
	name: z.string().min(3, 'Name is required').max(30, 'Name must be less than 30 characters'),
	username: z.string().min(3, 'Username is required').max(20, 'Username must be less than 20 characters'),
	bio: z.string().max(500, 'Bio must be less than 160 characters')
});
