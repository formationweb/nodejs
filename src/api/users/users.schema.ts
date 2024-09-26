import { z } from "zod"

export const userSchema = z.object({
    name: z.string().max(20).transform(username => username.trim().toLowerCase()),
    email: z.string().email(),
    password: z.string()
})

export const followSchema = z.object({
    followeeId: z.string()
})

export type Follow = z.infer<typeof followSchema>
export type User = z.infer<typeof userSchema>