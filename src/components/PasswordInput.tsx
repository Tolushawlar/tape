import { forwardRef, useState } from "react";
import { Eye, EyeOffIcon } from "lucide-react";

import { Input, InputProps } from "@/components/ui/input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
      <div className="relative">
        <Input
          className={className}
          type={showPassword ? "text" : "password"}
          {...props}
          ref={ref}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
        >
          {showPassword ? (
            <EyeOffIcon className="size-5 dark:text-green-50 " />
          ) : (
            <Eye className="size-5 dark:text-green-50" />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
