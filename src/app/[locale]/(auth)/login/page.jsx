import { LoginForm } from "@/components/login-form";
import { APP_LOGO, APP_NAME, APP_NAME_KH } from "@/config/website-detail";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center justify-center h-10 rounded-md bg-background text-primary-foreground">
              <Image
                width={200}
                height={200}
                src={APP_LOGO}
                alt="Thnal Logo Image"
                className="w-auto h-full"
              />
            </div>
            <div>
              <p className="text-base font-bold max-w-26 text-primary">
                {APP_NAME_KH}
              </p>
              <p className="text-sm font-semibold max-w-26 text-primary">
                {APP_NAME}
              </p>
            </div>
          </a>
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative items-center justify-center hidden w-full h-full bg-muted lg:flex">
        <Image width={200} height={200} src={APP_LOGO} alt="Thnal Logo Image" />
      </div>
    </div>
  );
}
