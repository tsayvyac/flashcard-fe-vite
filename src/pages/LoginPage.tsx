import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/context/auth-provider.tsx";
import { FormEvent, useState } from "react";
import { ErrorStateLogin, loginSchema } from "@/util/validation.ts";
import { Login } from "@/api/LearnerService.ts";
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-misused-promises */

function LoginPage() {
  const [errors, setErrors] = useState<Partial<ErrorStateLogin>>({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      const form: Login = {
        username: formData.username,
        password: formData.password,
      };
      login(form).catch((error) => {
        setErrors({
          ...errors,
          ["serverError"]:
            error.response.data !== ""
              ? error.response.data.message
              : "Incorrect login or password",
        });
      });
    } catch (error: any) {
      const temp: Record<string, any> = {};
      error.inner.forEach((err: any) => {
        temp[err.path] = err.message;
      });

      setErrors(temp);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username and password below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.serverError && (
              <small className="text-destructive">{errors.serverError}</small>
            )}
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  onChange={handleChange}
                />
                {errors.username && (
                  <small className="text-destructive">{errors.username}</small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={handleChange} />
                {errors.password && (
                  <small className="text-destructive">{errors.password}</small>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
