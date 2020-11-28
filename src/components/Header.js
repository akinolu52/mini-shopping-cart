import logo from '../logo.png';

function Header() {
    return (
        <nav className="flex justify-between items-center mb-4 md:px-16 px-6 border-b border-gray-400">
            <ul className="flex items-center">
                <li className="md:mr-24 mr-5">
                    <img src={logo} alt='logo' className="md:w-48 w-10 md:h-20 h-8" />
                </li>
                <li className="md:mr-8 mr-2">Shop</li>
                <li>Learn</li>
            </ul>
            <ul className="flex">
                <li className="md:ml-0 ml-2">Account</li>
            </ul>
        </nav>
    );
}

export default Header;
