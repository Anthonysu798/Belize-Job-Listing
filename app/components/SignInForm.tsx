"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils/cn";
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
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

    const emailError = await validateEmail(email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrors((prev) => ({ ...prev, password: passwordError }));
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="relative z-10 m-[90px] max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
        <h2 className="font-bold text-xl text-neutral-800">
          Sign In to Belize Job Listing
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2">
          Please enter your credentials to sign in
        </p>

        <form className="my-8" onSubmit={handleSubmit} noValidate>
          <LabelInputContainer className="mb-5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && <p className="text-red-500 text-xs italic ml-2 mb-2">{errors.email}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={cn(errors.password && 'border-red-500')}
            />
            {errors.password && !errors.email && <p className="text-red-500 text-xs italic ml-2 mb-2">{errors.password}</p>}
          </LabelInputContainer>

          {error && <p className="text-red-500 text-xs italic ml-2 mb-3">{error}</p>}

          <button
            className="bg-gradient-to-br relative group/btn from-blue-900 to-pink-400 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Sign In &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

          <div className="mt-4 text-center">
            <span className="text-neutral-600">
            Don&apos;t have an account?{' '}
              <Link href="/auth/signup" legacyBehavior>
                <a className="text-blue-500 hover:underline">Sign Up</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
