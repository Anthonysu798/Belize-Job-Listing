"use client";

import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils/cn";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export function SignupFormDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateEmail = (email: string) => {
    if (!email.includes('@') || !email.includes('.')) {
      return 'Email must contain "@" and "."';
    }
    return '';
  };

  const validateFirstName = (firstName: string) => {
    if (!firstName) {
      return 'First Name is required';
    }
    if (firstName.length > 25) {
      return 'First Name must be less than 25 characters';
    }
    return '';
  };

  const validateLastName = (lastName: string) => {
    const pattern = /^[A-Za-z]+$/;
    if (!lastName) {
      return 'Last Name is required';
    }
    if (!pattern.test(lastName)) {
      return 'Last Name must contain only letters';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
    if (!passwordPattern.test(password)) {
      return 'Password must include an uppercase letter, a lowercase letter, a digit, a special symbol, and be over 4 characters.';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    setError(''); // Clear the main error message
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    setError(''); // Clear the main error message
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setErrors((prev) => ({ ...prev, firstName: validateFirstName(value) }));
    setError(''); // Clear the main error message
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setErrors((prev) => ({ ...prev, lastName: validateLastName(value) }));
    setError(''); // Clear the main error message
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const newErrors = {
      email: validateEmail(email),
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      password: validatePassword(password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('User created successfully. Redirecting to sign-in...');
      // Redirect to the sign-in form after a short delay
      setTimeout(() => {
        router.push('/auth/signin');
      }, 4000); // 4 seconds delay
    } else {
      setError(data.message);
    }
  };

  return (
    <>
    <div className="mt-[90px] max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
      <h2 className="font-bold text-xl text-neutral-800 ">
        Welcome to Belize Job Listing
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2">
        Please fill your credentials to sign up for an account with us
      </p>

      <form className="my-8" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Enter your first name"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              className={cn(errors.firstName ? 'border-red-500' : 'border-gray-300')}
            />
            {errors.firstName && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.firstName}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Enter your last name"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className={cn(errors.lastName ? 'border-red-500' : 'border-gray-300')}
            />
            {errors.lastName && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.lastName}</p>}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={cn(errors.email ? 'border-red-500' : 'border-gray-300')}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.email}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={cn(errors.password ? 'border-red-500' : 'border-gray-300')}
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.password}</p>}
        </LabelInputContainer>

        {error && <p className="text-red-500  text-xs italic ml-3 mt-2 mb-3">{error}</p>}
        {success && <p className="text-green-500 text-center text-xs italic ml-3 mt-2 mb-2">{success}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-blue-900 to-pink-400 block  w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-200"
            type="button"
            onClick={() => signIn('google')}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-80" />
            <span className="text-neutral-700text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          
        </div>
        <div className="mt-4 text-center">
          <span className="text-neutral-600">
            Have an account already?{' '}
            <Link href="/auth/signin" legacyBehavior>
              <a className="text-blue-500 hover:underline">Sign In</a>
            </Link>
          </span>
        </div>
      </form>
    </div>
    </>
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
