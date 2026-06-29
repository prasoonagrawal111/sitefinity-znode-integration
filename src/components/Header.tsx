import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreSession } from '../hooks/useStoreSession';
import {
  accountMenu,
  displayName,
  goToStoreLogin,
  goToStoreSearch,
  storeLogout,
} from '../services/storeSession';

function Header() {
  const navigate = useNavigate();
  const { loading, user } = useStoreSession();

  const [term, setTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close the account dropdown on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToStoreSearch(term);
  };

  return (
    <>
      <header className="top-bar">
        <div className="top-content">
          <button
            type="button"
            className="logo-button"
            aria-label="Go to home page"
            onClick={() => navigate('/')}
          >
            <div className="logo" aria-label="site logo">
              HW
            </div>
          </button>

          <form className="search-form" role="search" onSubmit={onSearchSubmit}>
            <input
              className="search-field"
              type="text"
              placeholder="Search by Part # or Name"
              aria-label="Search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit" className="search-button" aria-label="Submit search">
              Search
            </button>
          </form>

          <div className="account-area" ref={accountRef}>
            {loading ? (
              <span className="account-loading" aria-hidden="true" />
            ) : user ? (
              <>
                <button
                  type="button"
                  className="account-button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  {displayName(user)}
                  <span className="account-caret" aria-hidden="true" />
                </button>
                {menuOpen && (
                  <ul className="account-dropdown" role="menu">
                    {accountMenu.map((item) => (
                      <li key={item.href} role="none">
                        <a className="account-link" href={item.href} role="menuitem">
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li role="none">
                      <button
                        type="button"
                        className="account-link account-logout"
                        role="menuitem"
                        onClick={() => {
                          setMenuOpen(false);
                          storeLogout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <button type="button" className="login-button" onClick={goToStoreLogin}>
                Login
              </button>
            )}
          </div>

          <div className="cart-area" aria-label="cart icon">
            <span className="cart-icon" aria-hidden="true" />
            <span>Cart</span>
          </div>
        </div>
      </header>

      <nav className="menu-bar">
        <ul className="menu-list">
          <li className="menu-item">
            <button
              type="button"
              className="menu-button"
              onClick={() => navigate('/product')}
            >
              Departments
            </button>
          </li>
          <li className="menu-item">About</li>
          <li className="menu-item">Brands</li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
