"use client";

import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { AnimatedButton } from "@/app/components/ui/animated-button";
import { cn } from "@/app/utils/cn";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { IconMail, IconLock, IconUser, IconPhone, IconCalendar, IconArrowRight } from '@tabler/icons-react';
import { motion } from "framer-motion";

export function SignupFormDemo() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('501+');
  const [dobInput, setDobInput] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Helper function to check if a field exists
  const checkIfExists = async (field: string, value: string) => {
    try {
      const response = await fetch('/api/auth/checkExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, value }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking field existence:', error);
      return false;
    }
  };

  // Validation functions
  const validateEmail = async (email: string) => {
    email = email.toLowerCase();
    if (!email.includes('@') || !email.includes('.')) {
      return 'Email must contain "@" and "."';
    }
    const exists = await checkIfExists('email', email);
    if (exists) {
      return 'Email already in use';
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

  const validatePhone = async (phone: string) => {
    const phonePattern = /^501\+\d{7}$/;
    if (!phonePattern.test(phone)) {
      return 'Phone number must be in the format 501+XXXXXXX';
    }
    const exists = await checkIfExists('phone', phone);
    if (exists) {
      return 'Phone number already in use';
    }
    return '';
  };

  const validateDob = (dob: string) => {
    const parsedDob = parseDate(dob);
    if (!parsedDob || isNaN(parsedDob.getTime())) {
      return 'Invalid date format. Please use YYYY/MM/DD.';
    }
    if (parsedDob > new Date() || parsedDob < new Date("1960-01-01")) {
      return 'Date must be between 1960 and today.';
    }
    return '';
  };
  
  const parseDate = (input: string): Date | null => {
    const parts = input.split('/');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  const validateGender = (gender: string) => {
    if (!gender) {
      return 'Gender is required';
    }
    return '';
  };

  const validateConfirmEmail = (confirmEmail: string) => {
    if (confirmEmail.toLowerCase() !== email.toLowerCase()) {
      return 'Emails do not match';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setEmail(value);
    const errorMessage = await validateEmail(value);
    setErrors((prev) => ({ ...prev, email: errorMessage }));
    setError(''); // Clear the main error message
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setConfirmEmail(value);
    setErrors((prev) => ({ ...prev, confirmEmail: validateConfirmEmail(value) }));
    setError(''); // Clear the main error message
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    setError(''); // Clear the main error message
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
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

  const handlePhoneChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    let value = '501+' + inputValue.slice(3); // Ensure the prefix "501+" remains
    if (value.length <= 11) { // Ensure max length is 11 (501+XXXXXXX)
      setPhone(value);
      const errorMessage = await validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: errorMessage }));
    }
    setError(''); // Clear the main error message
  };

  const handleDobInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 8) {
      value = value.slice(0, 8); // Limit to 8 digits (YYYYMMDD)
    }
    
    let formattedValue = value;
    if (value.length > 4) {
      formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}`;
    }
    if (value.length > 6) {
      formattedValue = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`;
    }
  
    setDobInput(formattedValue);
    setErrors((prev) => ({ ...prev, dob: validateDob(formattedValue) }));
    setError(''); // Clear the main error message
  };

  const handleDobChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy/MM/dd");
      setDobInput(formattedDate);
      setDob(date);
      setErrors((prev) => ({ ...prev, dob: validateDob(formattedDate) }));
      setCalendarVisible(false); // Hide the calendar after selecting a date
      setError(''); // Clear the main error message
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGender(value);
    setErrors((prev) => ({ ...prev, gender: validateGender(value) }));
    setError(''); // Clear the main error message
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const newErrors = {
      email: await validateEmail(email),
      confirmEmail: validateConfirmEmail(confirmEmail),
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
      phone: await validatePhone(phone),
      dob: validateDob(dobInput),
      gender: validateGender(gender),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName, phone, dob: dobInput, gender }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('User created successfully. Redirecting to sign-in...');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } else {
      setError(data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
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

      <Card className="relative z-10 w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Join Belize Job Listing to find your dream job
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="firstname" className="flex items-center gap-2">
                  <IconUser size={16} />
                  First Name
                </Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={cn(errors.firstName && 'border-red-500')}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="lastname" className="flex items-center gap-2">
                  <IconUser size={16} />
                  Last Name
                </Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={cn(errors.lastName && 'border-red-500')}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </LabelInputContainer>
            </div>
            {/* Email Fields */}
            <div className="grid md:grid-cols-2 gap-4">
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
                <Label htmlFor="confirmEmail" className="flex items-center gap-2">
                  <IconMail size={16} />
                  Confirm Email
                </Label>
                <Input
                  id="confirmEmail"
                  placeholder="you@example.com"
                  type="email"
                  value={confirmEmail}
                  onChange={handleConfirmEmailChange}
                  className={cn(errors.confirmEmail && 'border-red-500')}
                  disabled={isLoading}
                />
                {errors.confirmEmail && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.confirmEmail}
                  </motion.p>
                )}
              </LabelInputContainer>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <IconLock size={16} />
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={cn(errors.password && 'border-red-500')}
                  disabled={isLoading}
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <IconLock size={16} />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={cn(errors.confirmPassword && 'border-red-500')}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </LabelInputContainer>
            </div>
            {/* Phone and DOB */}
            <div className="grid md:grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <IconPhone size={16} />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="501+XXXXXXX"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={cn(errors.phone && 'border-red-500')}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="dob" className="flex items-center gap-2">
                  <IconCalendar size={16} />
                  Date of Birth
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="dob"
                    placeholder="YYYY/MM/DD"
                    type="text"
                    value={dobInput}
                    onChange={handleDobInputChange}
                    className={cn(errors.dob && 'border-red-500', 'flex-1')}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("text-left font-normal", !dob && "text-muted-foreground")}
                    onClick={() => setCalendarVisible(!calendarVisible)}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </div>
                {calendarVisible && (
                  <div className="mt-2 p-3 border rounded-lg bg-white shadow-lg">
                    <Calendar
                      mode="single"
                      selected={dob ?? undefined}
                      onSelect={handleDobChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      defaultMonth={new Date(2000, 0, 1)}
                      initialFocus
                    />
                  </div>
                )}
                {errors.dob && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs ml-1"
                  >
                    {errors.dob}
                  </motion.p>
                )}
              </LabelInputContainer>
            </div>

            {/* Gender */}
            <LabelInputContainer>
              <Label className="mb-2">Gender</Label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">Female</span>
                </label>
              </div>
              {errors.gender && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs ml-1 mt-1"
                >
                  {errors.gender}
                </motion.p>
              )}
            </LabelInputContainer>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg bg-red-50 border border-red-200"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-lg bg-green-50 border border-green-200"
              >
                <p className="text-green-600 text-sm text-center font-medium">{success}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <AnimatedButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating account...
                </>
              ) : (
                <>
                  Sign Up
                  <IconArrowRight size={18} />
                </>
              )}
            </AnimatedButton>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-500">or</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-neutral-600 text-sm">
                Already have an account?{' '}
                <Link
                  href="/auth/signin"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Sign In
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
