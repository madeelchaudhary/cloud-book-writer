"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import Eye from "@/components/ui/Eye";
import EyeOff from "@/components/ui/EyeOff";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/actions/auth.action";
import { RegisterSchema } from "@/lib/validation";

interface Props {
  redirectUrl: string;
}

const defaultFields = [
  {
    name: "email",
    labelText: "Email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "password",
    labelText: "Password",
    type: "password",
    placeholder: "Password",
    hint: "Password must be at least 8 characters",
  },
  {
    name: "confirmPassword",
    labelText: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
  },
];

const RegisterForm = ({ redirectUrl }: Props) => {
  const [error, setError] = useState<string | null | undefined>(null);
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signInPage = "/login";

  const { push } = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    setError(null);

    const res = await registerUser(values);

    if (res.status === "success") {
      setMessage(res.message);
      setIsLoading(false);
      setTimeout(() => {
        push(redirectUrl);
      }, 500);
      return;
    }

    if (res.status === "error") {
      setError(res.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "w-full shadow-xl p-8 md:p-16 rounded-xl max-w-sm md:max-w-md lg:max-w-lg"
        )}
      >
        <div className="text-center mb-4">
          <h2 className="font-semibold text-2xl mb-1">Sign Up</h2>
          <p className="text-gray-500 text-sm font-normal">
            Be part of our community 🎉
          </p>
        </div>

        {message && (
          <p className="text-green-500 text-sm text-center">{message}</p>
        )}

        <Form {...form}>
          <form
            className={cn("py-4 space-y-5 w-full")}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {defaultFields.map((item) => (
              <FormField
                key={item.name}
                name={item.name as any}
                control={form.control}
                render={({ field }: any) => (
                  <FormItem>
                    {item.labelText && <FormLabel>{item.labelText}</FormLabel>}
                    {item.name === "password" ||
                    item.name === "confirmPassword" ? (
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={item.placeholder}
                            {...field}
                          />
                        </FormControl>
                        {item.name === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        )}
                      </div>
                    ) : (
                      <FormControl>
                        <Input
                          type={item.type}
                          placeholder={item.placeholder}
                          {...field}
                        />
                      </FormControl>
                    )}
                    {item.hint && (
                      <FormDescription>{item.hint}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              variant="default"
              className={cn(
                "text-white w-full focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 text-center flex transition-colors"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}{" "}
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link className="text-blue-400 hover:underline" href={signInPage}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
