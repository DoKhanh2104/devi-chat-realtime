import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const signUpSchema = z.object({
  lastname: z.string().min(1, "Last Name is required"),
  firstname: z.string().min(1, "First Name is required"),
  username: z.string().min(3, "Username must be at least 3 character"),
  email: z.email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 character"),
});

type SignUpSchemaValues = z.infer<typeof signUpSchema>;

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaValues>({
    resolver: zodResolver(signUpSchema),
  });

  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpSchemaValues) => {
    const { username, email, password, firstname, lastname } = data;

    await signUp(username, password, email, firstname, lastname);
    navigate("/signin");
  };

  return (
    <Card className="border-secondary" {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Display name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm" htmlFor="lastName">
                  Last Name
                </Label>
                <Input id="lastName" type="text" {...register("lastname")} />
                {errors.firstname && (
                  <p className="text-destructive text-sm">
                    {errors.lastname?.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="block text-sm" htmlFor="firstName">
                  First Name
                </Label>
                <Input id="firstName" type="text" {...register("firstname")} />
                {errors.firstname && (
                  <p className="text-destructive text-sm">
                    {errors.firstname?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <Label className="block text-sm" htmlFor="username">
                Username
              </Label>
              <Input id="username" type="text" {...register("username")} />
              {errors.username && (
                <p className="text-destructive text-sm">
                  {errors.username?.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label className="block text-sm" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="devi@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="block text-sm" htmlFor="password">
                Password
              </Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-destructive text-sm">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex flex-col gap-3">
                {/* Btn sign up */}
                <Button disabled={isSubmitting} type="submit">
                  Sign Up
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <div className="px-6 text-center">
                  Already have an account?{" "}
                  <a href="/signin" className="underline underline-offset-4">
                    Sign in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
