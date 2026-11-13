"use client";

import * as React from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignupFormValues, signupSchema } from "@/lib/zod";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { user_register_action } from "@/lib/actions";
import { StatusToast } from "./CustomerToasts";
import { toast } from "sonner";



export function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {

  const [show, setShow] =React.useState(false);
  const [showp, setShowp] =React.useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode:"all"
  });

  async function onSubmit(data: SignupFormValues) {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const res = await user_register_action(payload);
    if (res.success) {
             toast.custom((t) => (
               <StatusToast
                 t={t} 
                 status="success" 
                 title="Success" 
                 message={res.message} 
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
    <Card {...props}>
      <CardHeader>
        <CardTitle className="space-y-4 text-center">
          <div className="flex justify-center">
            <Image
              src="/cck-icon1.png"
              alt="CCK Logo"
              className="w-auto h-auto"
              loading="eager"
              placeholder="empty"
              width={50}
              height={50}
            />
          </div>

          <h1>Create an account</h1>
        </CardTitle>

        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Full Name
                  </FieldLabel>

                  <Input
                    {...field}
                    id="name"
                    placeholder="John Doe"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                  />

                  <FieldDescription>
                    We&apos;ll use this to contact you.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                  />
                  <InputGroupAddon align={"inline-end"}>
                  {show ? <Eye onClick={()=>setShow(prev =>!prev)}/> : <EyeOff  onClick={()=>setShow(prev =>!prev)}/>}
                  </InputGroupAddon>
                  </InputGroup>

                  <FieldDescription>
                    Must be at least 4 characters.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <InputGroup>
                  <InputGroupInput
                    {...field}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    type={showp ? "text" : "password"}
                  />
                  <InputGroupAddon align={"inline-end"}>
                  {showp ? <Eye onClick={()=>setShowp(prev =>!prev)}/> : <EyeOff  onClick={()=>setShowp(prev =>!prev)}/>}
                  </InputGroupAddon>
                  </InputGroup>
                  

                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Field>
              <Button type="submit">
                Create Account
              </Button>

              <Button
                variant="outline"
                type="button"
              >
                Sign up with Google
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href="/auth/login">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
