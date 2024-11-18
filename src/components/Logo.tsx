import Image from "next/image";

export const Logo = ({ type = "home" }: { type?: "home" | "dashboard" }) => {
  return (
    <Image
      src={`/${type === "home" ? "logo2.svg" : "logo.svg"}`}
      alt="Logo"
      priority={true}
      width={100}
      height={50}
      className="min-w-[100px]"
    />
  );
};
