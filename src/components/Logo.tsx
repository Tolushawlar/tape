import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo2.svg"
      alt="Logo"
      priority={true}
      width={100}
      height={50}
      className="min-w-[100px]"
    />
  );
};
