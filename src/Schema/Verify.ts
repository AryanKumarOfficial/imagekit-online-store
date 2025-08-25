import {z} from "zod";

export const VerifySchema = z.object({
    email: z.email({message: "Please enter a valid email address."})
})

export type VerifyType = z.infer<typeof VerifySchema>
