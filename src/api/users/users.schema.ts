import { z } from "zod"

export const userSchema = z.object({
    name: z.string().max(20).transform(username => username.trim().toLowerCase()),
    email: z.string().email()
})

export type User = z.infer<typeof userSchema>