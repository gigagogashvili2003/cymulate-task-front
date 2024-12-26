import useAuthStore from '@/store/useAuthStore';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user } = useAuthStore();

    const isLoggedIn = Boolean(user);

    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-8 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-blue-600">Logo</span>
                    </div>

                    {!isLoggedIn && (
                        <Link to="auth">
                            <button className="text-gray-600 hover:text-blue-600">
                                <User className="h-5 w-5" />
                            </button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
