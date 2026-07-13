"use client";

import { useState, Suspense } from "react";
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

function LoginForm() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const redirectTo = new URLSearchParams(window.location.search).get("redirect");
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    setLoading(false);

    if (data) {
      toast.success("Logged in successfully!");
      if (redirectTo) {
        window.location.href = decodeURIComponent(redirectTo);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    }

    if (error) {
      toast.error(error?.message || "Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const redirectTo = new URLSearchParams(window.location.search).get("redirect");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo ? decodeURIComponent(redirectTo) : "/dashboard",
    });
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
        <h2 className="font-heading text-2xl font-medium text-center" style={{ color: "var(--card-foreground)" }}>
          Welcome back
        </h2>
        <p className="text-center text-sm mt-1 mb-5" style={{ color: "var(--muted-foreground)" }}>
          Login to manage your properties
        </p>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            name="password"
            type={isPasswordShow ? "text" : "password"}
            className="flex flex-col gap-1.5"
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
            <FieldError className="text-xs text-destructive" />
          </TextField>

       <Button
  type="submit"
  isDisabled={loading}
  className="w-full flex items-center justify-center py-2.5 rounded-xl overflow-hidden"
  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
>
  {loading ? (
    <span className="h-4 w-20 rounded-full bg-white/30 animate-pulse" />
  ) : (
    "Login"
  )}
</Button>

          <p className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--accent)" }} className="font-medium hover:underline">
              Register
            </Link>
          </p>
        </Form>

        <div className="flex justify-center items-center gap-3 my-4">
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

        <div className="flex flex-col gap-3">
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
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}