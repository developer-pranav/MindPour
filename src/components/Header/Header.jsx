import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, BlogLogo } from '../index';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout logic
  const handleLogout = () => {
    authService.logout()
      .then(() => dispatch(logout()))
      .catch((error) => console.error("Logout failed", error));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <Container>
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
          <Link to="/" className="flex items-center justify-center gap-2">
            <BlogLogo width="140px" />
          </Link>

          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 sm:justify-center items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-sm sm:text-base text-gray-700 hover:text-blue-600 px-3 py-2 transition-all duration-200 rounded-full hover:bg-blue-100 cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                >
                  👤
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;