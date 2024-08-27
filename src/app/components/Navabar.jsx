const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-transparent text-white">
            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Men</a>
                <a href="#" className="hover:underline">Women</a>
                <a href="#" className="hover:underline">Accessories</a>
            </div>

            <div className="text-2xl">Logo</div>

            <div className="flex space-x-4">
                <a href="#" className="hover:underline">Blog</a>
                <a href="#" className="hover:underline">Search</a>
                <a href="#" className="hover:underline">Cart</a>
            </div>
        </nav>
    );
};

export default Navbar