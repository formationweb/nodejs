import { z } from 'zod'

export const userSchemaDto = z.object({
    name: z.string().max(20).transform(username => username.trim().toLowerCase()),
    email: z.string().email()
})

export const followSchema = z.object({
    followerId: z.number().int().positive(),
    followeeId: z.number().int().positive()
})

export type User = z.infer<typeof userSchemaDto>
export type Follow = z.infer<typeof followSchema>