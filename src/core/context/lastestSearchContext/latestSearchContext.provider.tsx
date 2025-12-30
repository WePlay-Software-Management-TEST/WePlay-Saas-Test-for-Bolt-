import React, { useEffect, useReducer } from 'react';
import { LatestSearchContext } from './latestSearchContext.consumer';
import produce from 'immer';
import { Cache } from 'aws-amplify';
import { type LatestSearchReducerAction } from './latestSearchContext.models';
import { includes } from 'lodash';

const reducerLatestSearch = (prevState: string[], action: LatestSearchReducerAction): void => {
  switch (action.type) {
    case 'append':
      if (action.query === '') break;
      if (action.query === undefined) break;
      if (action?.query?.length <= 1) break;
      if (includes(prevState.slice(0, 3), action.query)) break;

      Cache.setItem('latestSearchCache', [action.query, ...prevState ?? []]);
      prevState.unshift(action.query ?? '');
      break;
    case 'clear':
      prevState.splice(0, prevState.length);
      Cache.clear();
      break;
    case 'init':
      prevState.splice(0, prevState.length);
      prevState.push(...action.arrayOfQuery ?? []);
      break;
  }
};

export const LatestSearchProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [latestSearch, setLatestSearch] = useReducer(produce(reducerLatestSearch), []);
  useEffect(() => {
    const latestSearchCacheResults: string[] | null = Cache.getItem('latestSearchCache');

    if (latestSearchCacheResults === null) Cache.setItem('latestSearchCache', []);

    setLatestSearch({ type: 'init', arrayOfQuery: latestSearchCacheResults ?? [] });
  }, []);

  return (<LatestSearchContext.Provider value={{ latestSearch, setLatestSearch }}>
    {children}
    </LatestSearchContext.Provider>);
};
