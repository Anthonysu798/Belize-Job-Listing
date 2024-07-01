"use client";

import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils/cn";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

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
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Validation functions
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

  const validatePhone = (phone: string) => {
    const phonePattern = /^501\+\d{7}$/;
    if (!phonePattern.test(phone)) {
      return 'Phone number must be in the format 501+XXXXXXX';
    }
    return '';
  };

  const validateDob = (dob: string) => {
    const parsedDate = parseDate(dob);
    if (!parsedDate || isNaN(parsedDate.getTime())) {
      return 'Invalid date format. Please use YYYY/MM/DD.';
    }
    if (parsedDate > new Date() || parsedDate < new Date("1960-01-01")) {
      return 'Date must be between 1960 and today.';
    }
    return '';
  };

  // Parse date from input
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
    if (confirmEmail !== email) {
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    setError(''); // Clear the main error message
  };

  const handleConfirmEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    let value = '501+' + inputValue.slice(3); // Ensure the prefix "501+" remains
    if (value.length <= 11) { // Ensure max length is 11 (501+XXXXXXX)
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
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

    const newErrors = {
      email: validateEmail(email),
      confirmEmail: validateConfirmEmail(confirmEmail),
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
      phone: validatePhone(phone),
      dob: validateDob(dobInput),
      gender: validateGender(gender),
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
      body: JSON.stringify({ email, password, firstName, lastName, phone, dob: dobInput, username, gender }),
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
            <Label htmlFor="confirmEmail">Confirm Email</Label>
            <Input
              id="confirmEmail"
              placeholder="Confirm your email"
              type="email"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              className={cn(errors.confirmEmail ? 'border-red-500' : 'border-gray-300')}
            />
            {errors.confirmEmail && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.confirmEmail}</p>}
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
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={cn(errors.confirmPassword ? 'border-red-500' : 'border-gray-300')}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.confirmPassword}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              className={cn(errors.phone ? 'border-red-500' : 'border-gray-300')}
            />
            {errors.phone && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.phone}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
  <Label htmlFor="dob">Date of Birth</Label>
  <div className="flex items-center space-x-2">
    <Input
      id="dob"
      placeholder="YYYY/MM/DD"
      type="text"
      value={dobInput}
      onChange={handleDobInputChange}
      className={cn(errors.dob ? 'border-red-500' : 'border-gray-300')}
    />
    <Button
      variant={"outline"}
      className={cn("text-left font-normal", !dob && "text-muted-foreground")}
      onClick={() => setCalendarVisible(!calendarVisible)}
    >
      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    </Button>
  </div>
  {calendarVisible && (
    <Calendar
      mode="single"
      selected={dob ?? undefined}  // Ensure selected is Date | undefined
      onSelect={handleDobChange}    // Ensure onSelect handler handles Date | undefined
      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
      defaultMonth={new Date(2000, 0, 1)} // Set the default month to January 2000
      initialFocus
    />
  )}
  {errors.dob && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.dob}</p>}
</LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Gender</Label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs italic mt-1 ml-3">{errors.gender}</p>}
          </LabelInputContainer>

          {error && <p className="text-red-500 text-xs italic ml-3 mt-2 mb-3">{error}</p>}
          {success && <p className="text-green-500 text-center text-xs italic ml-3 mt-2 mb-2">{success}</p>}

          <button
            className="bg-gradient-to-br relative group/btn from-blue-900 to-pink-400 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
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
              <span className="text-neutral-700 text-sm">
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
