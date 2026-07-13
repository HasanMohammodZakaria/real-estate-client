"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";

const RegisterPage = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image || undefined,
    });
    setLoading(false);

    if (data) {
      toast.success("Account created successfully!");
      router.push("/dashboard");
      router.refresh();
    }

    if (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Card
        className="w-full max-w-sm sm:max-w-md p-6 rounded-2xl shadow-md"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--card-foreground)",
        }}
      >
        <h2
          className="font-heading text-2xl font-medium text-center"
          style={{ color: "var(--card-foreground)" }}
        >
          Create your account
        </h2>

        <p
          className="text-center text-sm mt-1 mb-5"
          style={{ color: "var(--muted-foreground)" }}
        >
          Join{" "}
          <span style={{ color: "var(--accent)" }} className="font-medium">
            EstateHub
          </span>{" "}
          to list and explore properties
        </p>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Full Name</Label>
            <Input placeholder="John Doe" className="w-full" />
            <FieldError className="text-xs text-destructive" />
          </TextField>

          <TextField name="image" type="url" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Profile Image URL (optional)</Label>
            <Input placeholder="https://example.com/photo.jpg" className="w-full" />
            <FieldError className="text-xs text-destructive" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium">Email</Label>
            <Input placeholder="john@example.com" className="w-full" />
            <FieldError className="text-xs text-destructive" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type={isPasswordShow ? "text" : "password"}
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
              if (!/[0-9]/.test(value)) return "Password must contain at least one number";
              return null;
            }}
          >
            <Label className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Input placeholder="Enter your password" className="w-full pr-10" />
              <span
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--muted-foreground)" }}
                onClick={() => setIsPasswordShow((v) => !v)}
              >
                {isPasswordShow ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Must be at least 8 characters with 1 uppercase and 1 number
            </p>
            <FieldError className="text-xs text-destructive" />
          </TextField>

          <Button
  type="submit"
  isDisabled={loading}
  className="w-full flex items-center justify-center py-2.5 rounded-xl mt-1 overflow-hidden"
  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
>
  {loading ? (
    <span className="h-4 w-32 rounded-full bg-white/30 animate-pulse" />
  ) : (
    "Create Account"
  )}
</Button>
        </Form>

        <p className="text-center text-sm mt-4" style={{ color: "var(--muted-foreground)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent)" }} className="font-medium hover:underline">
            Login
          </Link>
        </p>

        <div className="flex justify-center items-center gap-3 mt-5">
          <div className="flex-1">
            <Separator />
          </div>
          <p className="text-xs whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>
            Or
          </p>
          <div className="flex-1">
            <Separator />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-2 py-2.5"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
            }}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </Button>

          <Button
            className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-2 py-2.5"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
            }}
          >
            <FaFacebook size={18} color="#1877F2" />
            <span>Continue with Facebook</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;