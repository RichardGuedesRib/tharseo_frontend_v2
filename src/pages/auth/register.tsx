import { RegisterForm } from "@/components/form-register";

const Register = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background-principal p-6 md:p-10 w-full">
          <div className="w-full max-w-sm bg-background-principal">
            <RegisterForm />
          </div>
        </div>
      )
};

export default Register;
