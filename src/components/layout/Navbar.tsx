import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ProfileDropdown } from '../navigation/ProfileDropdown';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { NAVBAR_MENU } from '@/constants/navigation';

export const Navbar: React.FC = () => {
  const { isAuthenticated, demoLogin } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthPage = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password', '/role-selection'].includes(location.pathname);

  const handleDemoSignIn = (role: 'learner' | 'expert' | 'admin' = 'learner') => {
    demoLogin(role);
    setShowDemoMenu(false);
    setIsMobileMenuOpen(false);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-dark-800'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16.5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-all">
              E
            </span>
            <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              Expertise<span className="text-primary-600 dark:text-primary-400">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-8">
              {NAVBAR_MENU.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800 hover:text-gray-700 dark:hover:text-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                  Join Free
                </Button>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Sparkles className="w-4 h-4 text-accent-500 animate-pulse" />}
                    className="text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-950/20"
                    onClick={() => setShowDemoMenu(!showDemoMenu)}
                  >
                    Demo
                  </Button>
                  {showDemoMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-850 rounded-xl shadow-lg border border-gray-100 dark:border-dark-700 py-2 z-50 animate-fade-in">
                      <button onClick={() => handleDemoSignIn('learner')} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 flex items-center gap-2">
                        <span>🎓</span> Learner Login
                      </button>
                      <button onClick={() => handleDemoSignIn('expert')} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 flex items-center gap-2">
                        <span>👨‍🏫</span> Expert Login
                      </button>
                      <button onClick={() => handleDemoSignIn('admin')} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 flex items-center gap-2">
                        <span>🛡️</span> Admin Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggle}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800 focus:outline-none"
            >
              {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800 focus:outline-none"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Menu"
        position="right"
      >
        <div className="flex flex-col gap-6 pt-4 h-full">
          {!isAuthPage && (
            <div className="flex flex-col gap-4">
              {NAVBAR_MENU.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-800 dark:text-gray-250 py-2 border-b border-gray-100 dark:border-dark-700/50 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-auto">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Button variant="primary" fullWidth onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}>
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button variant="outline" fullWidth onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}>
                  Sign In
                </Button>
                <Button variant="primary" fullWidth onClick={() => { setIsMobileMenuOpen(false); navigate('/register'); }}>
                  Join Free
                </Button>
                <div className="border-t border-gray-100 dark:border-dark-700 pt-3">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Demo Login</p>
                  <div className="flex flex-col gap-2">
                    <Button variant="secondary" fullWidth size="sm" onClick={() => handleDemoSignIn('learner')}>
                      🎓 Learner
                    </Button>
                    <Button variant="secondary" fullWidth size="sm" onClick={() => handleDemoSignIn('expert')}>
                      👨‍🏫 Expert
                    </Button>
                    <Button variant="secondary" fullWidth size="sm" onClick={() => handleDemoSignIn('admin')}>
                      🛡️ Admin
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Navbar;
