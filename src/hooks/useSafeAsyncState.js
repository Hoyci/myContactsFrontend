import {
  useCallback, useState,
} from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useIsMounted();

  const setSafeAsynsState = useCallback((data) => {
    if (isMounted()) {
      setState(data);
    }
  });

  return [state, setSafeAsynsState];
}
