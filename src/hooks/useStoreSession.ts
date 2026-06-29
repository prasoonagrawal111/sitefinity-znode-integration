import { useEffect, useState } from 'react';
import { getStoreSession, StoreUser } from '../services/storeSession';

type StoreSessionState = {
  loading: boolean;
  user: StoreUser | null;
};

/**
 * Reads the webstore session on mount via the BFF.
 * Because login is a full navigation away and back, a mount-time read covers
 * the post-login state — just make sure the header isn't cached across the trip.
 */
export function useStoreSession(): StoreSessionState {
  const [state, setState] = useState<StoreSessionState>({ loading: true, user: null });

  useEffect(() => {
    let alive = true;
    getStoreSession().then((user) => {
      if (alive) setState({ loading: false, user });
    });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
