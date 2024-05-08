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
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/context/auth-provider.tsx";
import { ErrorStateRegister, registrationSchema } from "@/util/validation.ts";
import { Register } from "@/api/LearnerService.ts";
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-misused-promises */

function RegisterPage() {
  const [errors, setErrors] = useState<Partial<ErrorStateRegister>>({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registrationSchema.validate(formData, { abortEarly: false });
      const form: Register = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      register(form).catch((error) => {
        setErrors({
          ...errors,
          ["existence"]: error.response.data.message,
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
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.existence && (
              <small className="text-destructive">{errors.existence}</small>
            )}
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  onChange={handleChange}
                />
                {errors.username && (
                  <small className="text-destructive">{errors.username}</small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-destructive">{errors.email}</small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={handleChange} />
                {errors.password && (
                  <small className="text-destructive">{errors.password}</small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <small className="text-destructive">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
