import Image from "next/image";
import LoginForm from "../../_components/login-form";

const AuthPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full grid min-h-svh lg:grid-cols-2">
        <div className="bg-muted relative hidden lg:block">
          <Image
            src="/images/banner.jpg"
            alt="Image"
            width={500}
            height={500}
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            loading="eager"
          />
        </div>
        <div className="flex flex-col gap-4 p-2 md:p-10 max-h-screen overflow-y-auto bg-[#495974]/40">
          <div className="flex flex-1 items-center justify-center sm:border-2 sm:rounded-lg sm:shadow-lg bg-white px-6 md:px-0">
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
