"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { AnimatedButton } from "@/app/components/ui/animated-button";
import { cn } from "@/app/utils/cn";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { IconMail, IconLock, IconArrowRight } from '@tabler/icons-react';
import { motion } from "framer-motion";

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = async (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!email.includes('@') || !email.includes('.')) {
      return 'Email must contain "@" and "."';
    }
    
    // Check if email exists in the database
    const response = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!data.exists) {
      return 'User does not exist, please sign up.';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Please enter your password';
    }
    return '';
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase
    setEmail(value);
    const emailError = await validateEmail(value);
    setErrors((prev) => ({ ...prev, email: emailError }));
    setError(''); // Clear the main error message
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    setError(''); // Clear the main error message
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const emailError = await validateEmail(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      setIsLoading(false);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Card className="relative z-10 w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Belize Job Listing account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <LabelInputContainer>
              <Label htmlFor="email" className="flex items-center gap-2">
                <IconMail size={16} />
                Email Address
              </Label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={cn(errors.email && 'border-red-500')}
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs ml-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password" className="flex items-center gap-2">
                <IconLock size={16} />
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={cn(errors.password && 'border-red-500')}
                disabled={isLoading}
              />
              {errors.password && !errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs ml-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </LabelInputContainer>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg bg-red-50 border border-red-200"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            <AnimatedButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <IconArrowRight size={18} />
                </>
              )}
            </AnimatedButton>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-500">or</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-neutral-600 text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
