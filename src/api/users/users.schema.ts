import { z } from 'zod'

export const userSchemaDto = z.object({
    name: z.string().max(20).transform(username => username.trim().toLowerCase()),
    email: z.string().email(),
    password: z.string()
})

export const followSchema = z.object({
    followeeId: z.string()
})

export type User = z.infer<typeof userSchemaDto>
export type Follow = z.infer<typeof followSchema>