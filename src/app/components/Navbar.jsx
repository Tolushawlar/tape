import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-[120px] py-[10px] bg-transparent text-white sweet-sans ">
            <div className="flex space-x-4">
                <a href="#" className="hover:underline sweet-sans">Men</a>
                <a href="#" className="hover:underline">Women</a>
                <a href="#" className="hover:underline">Accessories</a>
            </div>

            <div className="text-2xl"><Image src="/logo.svg" width={100} height={100} alt="logo" /></div>

            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Blog</a>
                <a href="#" className="hover:underline">Search</a>
                <a href="#" className="hover:underline">Cart</a>
            </div>
        </nav>
    );
};

export default Navbar