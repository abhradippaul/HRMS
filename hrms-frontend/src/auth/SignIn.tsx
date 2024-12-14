import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";

import { useNavigate, useSearchParams } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailVerfication =
    Boolean(searchParams.get("emailVerfication")) || false;
  const emailOtp = Boolean(searchParams.get("emailOtp")) || false;
  const forgotPassword = Boolean(searchParams.get("forgotPassword")) || false;

  return (
    <div className="min-h-dvh w-full flex items-center justify-center">
      <Card className="w-[450px] shadow-md">
        <CardHeader>
          {/* Logo */}
          <div className="mb-2">
            <img
              src={import.meta.env.VITE_LOGO}
              alt="Zoho Logo"
              className="h-10 object-cover"
            />
          </div>
          <CardTitle>
            <h2 className="text-xl font-semibold text-center mb-2">Sign in</h2>
          </CardTitle>
          <CardDescription>
            <p className="text-sm text-gray-500 text-center mb-8">
              to access People
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailVerfication || emailOtp}
          />
          {emailVerfication && (
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {emailOtp && (
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
          <Button
            variant="submit"
            onClick={() => {
              if (email) {
                if (emailOtp) {
                } else if (forgotPassword) {
                } else {
                  setSearchParams({
                    emailVerfication: "true",
                  });
                }
              }
            }}
          >
            {emailVerfication || emailOtp ? "Sign in" : "Verify Email"}
          </Button>

          {!(emailVerfication || emailOtp) && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don’t have a TIS account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contact Admin
                </a>
              </p>
            </div>
          )}
          {emailVerfication && (
            <div className="flex items-center justify-between">
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setSearchParams({
                    emailOtp: "true",
                  });
                }}
              >
                Sign in using email otp
              </p>
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setSearchParams({
                    forgotPassword: "true",
                  });
                }}
              >
                Forgot Password?
              </p>
            </div>
          )}
          {(emailVerfication || emailOtp) && (
            <h3
              className="cursor-pointer text-blue-600 hover:text-blue-700 underline"
              onClick={() => navigate(-1)}
            >
              Back
            </h3>
          )}
        </CardContent>

        <CardFooter>
          <div className="mt-8 text-xs text-gray-400 text-center">
            © 2025, TIS Pvt. Ltd. All Rights Reserved.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignIn;
