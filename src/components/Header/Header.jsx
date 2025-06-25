import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, BlogLogo, LogoutBtn } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();


  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Profile', slug: '/profile', active: authStatus }
  ];


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
            {authStatus ? <LogoutBtn/> : null}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;