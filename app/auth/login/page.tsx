import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Loading Login Form...</p>}>
    <LoginForm />
    </Suspense>
  );
}

export default LoginPage;