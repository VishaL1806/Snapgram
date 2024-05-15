import { z } from "zod"

export const SignUpFormValidation = z.object({
    name : z.string().min(2,{message : "Too short!!"}),
    username: z.string().min(2).max(50), 
    email: z.string().email(),
    password: z.string().min(8,
        {message : "Too short!!"}).max(50),
  })

export const SignInFormValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8,
        {message : "Too short!!"}).max(50),
  })

export const PostFormValidation = z.object({
    caption : z.string().min(5,{message:"Too Shortt!!"}).max(2100 ,{message:"Too Longgg!!"}),
    file : z.custom<File[]>(),
    location : z.string().min(2).max(100),
    tags : z.string()
  })