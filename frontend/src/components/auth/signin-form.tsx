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

const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 character"),
  password: z.string().min(6, "Password must be at least 6 character"),
});

type SignInSchemaValues = z.infer<typeof signInSchema>;

export function SigninForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaValues>({
    resolver: zodResolver(signInSchema),
  });

  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInSchemaValues) => {
    const { username, password } = data;

    await signIn(username, password);
    navigate("/");
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
                  Sign In
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <div className="px-6 text-center">
                  You don't have an account?{" "}
                  <a href="/signup" className="underline underline-offset-4">
                    Sign up
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
