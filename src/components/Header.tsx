import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreSession } from '../hooks/useStoreSession';
import {
  accountMenu,
  departments,
  displayName,
  goToStoreLogin,
  goToStoreSearch,
  storeLogout,
} from '../services/storeSession';

/** Close a dropdown on outside-click / Escape while it is open. */
function useDismiss(
  open: boolean,
  ref: React.RefObject<HTMLElement | null>,
  close: () => void
) {
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, ref, close]);
}

function Header() {
  const navigate = useNavigate();
  const { loading, user } = useStoreSession();

  const [term, setTerm] = useState('');
  const [logoOk, setLogoOk] = useState(true);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  useDismiss(accountOpen, accountRef, () => setAccountOpen(false));

  const [deptOpen, setDeptOpen] = useState(false);
  const deptRef = useRef<HTMLLIElement>(null);
  useDismiss(deptOpen, deptRef, () => setDeptOpen(false));

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToStoreSearch(term);
  };

  return (
    <header className="store-header">
      {/* Tier 1 — utility bar */}
      <div className="utility-bar">
        {/* <span className="utility-link">Quick Order</span> */}
        <a className="utility-link" href="/store/order/list">
          Track Order
        </a>
        {/* <div className="locale" aria-label="Language: English">
          <span className="locale-badge">en</span>
          <span className="locale-caret" aria-hidden="true" />
        </div> */}
      </div>

      {/* Tier 2 — logo / search / actions */}
      <div className="header-main">
        <button
          type="button"
          className="logo-button"
          aria-label="Go to home page"
          onClick={() => navigate('/')}
        >
          {logoOk ? (
            <img
              className="logo-img"
              src="/store/_next/static/media/no-image.610b4c69.png"
              alt="logo"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="logo" aria-label="site logo">
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <rect x="2.5" y="3.5" width="19" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="9" r="1.8" fill="currentColor" />
                <path d="M4 19l5-5 4 3 3-3 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
          )}
        </button>

        <form className="search-form" role="search" onSubmit={onSearchSubmit}>
          <button type="submit" className="search-icon-button" aria-label="search icon">
            <svg viewBox="0 0 30 30" height="20" width="20" aria-hidden="true">
              <path
                d="M19.427 20.427c-1.39 0.99-3.090 1.573-4.927 1.573-4.694 0-8.5-3.806-8.5-8.5s3.806-8.5 8.5-8.5c4.694 0 8.5 3.806 8.5 8.5 0 1.837-0.583 3.537-1.573 4.927l5.585 5.585c0.55 0.55 0.546 1.431-0 1.976l-0.023 0.023c-0.544 0.544-1.431 0.546-1.976 0l-5.585-5.585zM14.5 20c3.59 0 6.5-2.91 6.5-6.5s-2.91-6.5-6.5-6.5c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5v0z"
                fill="#757575"
              />
            </svg>
          </button>
          <input
            className="search-field"
            type="text"
            placeholder="Search by Part # or Name"
            aria-label="search box"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </form>

        <div className="header-actions">
          <div className="account-area" ref={accountRef}>
            {loading ? (
              <span className="account-loading" aria-hidden="true" />
            ) : user ? (
              <>
                <button
                  type="button"
                  className="account-button"
                  aria-haspopup="true"
                  aria-expanded={accountOpen}
                  onClick={() => setAccountOpen((open) => !open)}
                >
                  {displayName(user)}
                  <span className="account-caret" aria-hidden="true" />
                </button>
                {accountOpen && (
                  <ul className="dropdown account-dropdown" role="menu">
                    {accountMenu.map((item) => (
                      <li key={item.href} role="none">
                        <a className="dropdown-link" href={item.href} role="menuitem">
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li role="none">
                      <button
                        type="button"
                        className="dropdown-link account-logout"
                        role="menuitem"
                        onClick={() => {
                          setAccountOpen(false);
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
              <button type="button" className="signin-button" onClick={goToStoreLogin}>
                Sign In
              </button>
            )}
          </div>

          <a className="cart-link" href="/store/cart" aria-label="Go to cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </a>
        </div>
      </div>

      {/* Tier 3 — navigation */}
      <nav className="menu-bar">
        <ul className="menu-list">
          <li className="menu-item menu-item--dropdown" ref={deptRef}>
            <button
              type="button"
              className="menu-button"
              aria-haspopup="true"
              aria-expanded={deptOpen}
              onClick={() => setDeptOpen((open) => !open)}
            >
              Departments
              <span className="menu-caret" aria-hidden="true" />
            </button>
            {deptOpen && (
              <ul className="dropdown dept-dropdown" role="menu">
                {departments.map((item) => (
                  <li key={item.href} role="none">
                    <a className="dropdown-link" href={item.href} role="menuitem">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="menu-item">
            <button type="button" className="menu-button" onClick={() => navigate('/about')}>
              About
            </button>
          </li>
          <li className="menu-item">
            <a className="menu-button menu-link" href="/store/brand/list">
              Brands
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
