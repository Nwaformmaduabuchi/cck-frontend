"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { LoginFormValues ,loginSchema } from "@/lib/zod"
import { toast } from "sonner"
import Link from "next/link"
import { user_login_action } from "@/lib/actions"
import { useState } from "react"
import { StatusToast } from "./CustomerToasts"




export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
const [loading, setLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:""
    },
    mode:"onChange"
  })

  const onSubmit = async (data:LoginFormValues)=>{
    setLoading(true)
   const res = await user_login_action(data)
   setLoading(false)
   if (res.success) {
             toast.custom((t) => (
               <StatusToast
                 t={t} 
                 status="success" 
                 title="" 
                 message={"Login Successful"} 
               />
             ));
           } else {
             
             toast.custom((t) => (
               <StatusToast 
                 t={t} 
                 status="error" 
                 title="Failed" 
                 errorPayload={res.error} 
               />
             ));
           }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller 
              name="email"
              control={form.control}
              render={({field, fieldState}) =>(
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                    aria-invalid={fieldState.invalid}
                      {...field}
                      required
                    />
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
              )}
              />

              <Controller 
              name="password"
              control={form.control}
              render={({field, fieldState})=>(
                <Field data-invalid= {fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="flex flex-col items-center">
                    <Input 
                    aria-invalid={fieldState.invalid}
                    {...field}
                    required />
                    <Link className="ml-auto" href={"#"}>forgot password</Link>
                  </div>
                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
              )}
              />
              
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/auth/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}