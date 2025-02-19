import { LoginForm } from "@/components/login-form";
const Login = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background-principal p-6 md:p-10 w-full">
          <div className="w-full max-w-sm bg-background-principal">
            <LoginForm />
          </div>
        </div>
      )
};

export default Login;
