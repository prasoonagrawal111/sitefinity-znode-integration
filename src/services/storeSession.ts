// Integration with the Next.js webstore mounted at `/store` (same origin).
//
// Golden rules (see react-app.md):
//  - Always use RELATIVE `/store/...` URLs — never hardcode the host.
//  - Never read the session cookie in JS (it's HttpOnly). Use the BFF.
//  - Same-origin fetch sends cookies by default; if set, use "same-origin".

export type StoreUser = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  emailAddress?: string;
  email?: string;
  [key: string]: unknown;
};

/** Navigate to the webstore search results for a term. */
export function goToStoreSearch(term: string): void {
  const q = (term || '').trim();
  if (!q) return;
  window.location.href = `/store/search/search-term/${encodeURIComponent(q)}`;
}

/** Send the user to the webstore login, returning to the current shell page after. */
export function goToStoreLogin(): void {
  const returnUrl = window.location.href; // current React page (absolute, same-origin)
  window.location.href = `/store/login?returnUrl=${encodeURIComponent(returnUrl)}`;
}

/**
 * Read the webstore session from the BFF.
 * Returns the user object when logged in, or null when logged out / on error.
 */
export async function getStoreSession(): Promise<StoreUser | null> {
  try {
    const res = await fetch('/store/api/auth/session', {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json(); // {} when logged out, { user, expires } when logged in
    return data && data.user ? (data.user as StoreUser) : null;
  } catch {
    return null;
  }
}

/** Best-effort display name for a logged-in user. */
export function displayName(user: StoreUser | null): string {
  if (!user) return '';
  return (
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.userName ||
    user.emailAddress ||
    user.email ||
    'My Account'
  );
}

/** Sign out of the webstore (next-auth needs a CSRF token), then refresh the header. */
export async function storeLogout(): Promise<void> {
  // 1) get a CSRF token (also sets the csrf cookie)
  const csrfRes = await fetch('/store/api/auth/csrf', {
    credentials: 'same-origin',
    cache: 'no-store',
  });
  const { csrfToken } = await csrfRes.json();

  // 2) sign out
  await fetch('/store/api/auth/signout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'same-origin',
    body: new URLSearchParams({ csrfToken, json: 'true' }).toString(),
  });

  // 3) refresh header state on the current shell page
  window.location.reload();
}

/** Account dropdown menu — mirrors the webstore's "My Account" menu. */
export const accountMenu: { label: string; href: string }[] = [
  { label: 'Dashboard', href: '/store/account/dashboard' },
  { label: 'Order History', href: '/store/account/order/list' },
  { label: 'Wishlist', href: '/store/account/wishlist' },
  { label: 'Return Orders', href: '/store/account/return-order' },
  { label: 'Pending Orders', href: '/store/account/pending-order/list' },
  { label: 'Pending Payments', href: '/store/account/pending-payment/list' },
  { label: 'Quotes', href: '/store/account/quote/list' },
  { label: 'Vouchers / Gift Cards', href: '/store/account/voucher/list' },
  { label: 'Order Templates', href: '/store/account/order-templates/list' },
  { label: 'Saved Carts', href: '/store/account/saved-cart/list' },
  { label: 'Address Book', href: '/store/account/address-book' },
  { label: 'Edit Profile', href: '/store/account/edit-profile' },
  { label: 'Review History', href: '/store/account/review-history' },
];
