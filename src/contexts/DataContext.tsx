import { createContext, ReactNode, useContext, useState } from 'react';

export interface InstagramUser {
  url: string;
  username: string;
  timestamp?: number;
}

export interface InstagramData {
  followers: InstagramUser[];
  following: InstagramUser[];
  notFollowingBack: InstagramUser[];
  ignored: Set<string>;
  pending: InstagramUser[];
}

interface DataContextType {
  data: InstagramData | null;
  setData: (data: InstagramData) => void;
  addToIgnored: (username: string) => void;
  removeFromIgnored: (username: string) => void;
  importIgnoredUsers: (users: string[]) => void;
  clearIgnoredUsers: () => void;
  removeFromNotFollowing: (username: string) => void;
  removeFromPending: (username: string) => void;
  clearData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<InstagramData | null>(() => {
    const stored = localStorage.getItem('instagramData');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        ignored: new Set(parsed.ignored || []),
      };
    }
    return null;
  });

  const setData = (newData: InstagramData) => {
    setDataState(newData);
    localStorage.setItem(
      'instagramData',
      JSON.stringify({
        ...newData,
        ignored: Array.from(newData.ignored),
      })
    );
  };

  const addToIgnored = (username: string) => {
    if (!data) return;
    const newIgnored = new Set(data.ignored);
    newIgnored.add(username);
    const newData = { ...data, ignored: newIgnored };
    setData(newData);
  };

  const removeFromIgnored = (username: string) => {
    if (!data) return;
    const newIgnored = new Set(data.ignored);
    newIgnored.delete(username);
    const newData = { ...data, ignored: newIgnored };
    setData(newData);
  };

  const importIgnoredUsers = (users: string[]) => {
    if (!data) return;
    const newIgnored = new Set([...data.ignored, ...users]);
    const newData = { ...data, ignored: newIgnored };
    setData(newData);
  };

  const clearIgnoredUsers = () => {
    if (!data) return;
    const newData = { ...data, ignored: new Set<string>() };
    setData(newData);
  };

  const removeFromNotFollowing = (username: string) => {
    if (!data) return;
    const newNotFollowing = data.notFollowingBack.filter((user) => user.username !== username);
    const newIgnored = new Set(data.ignored);
    newIgnored.delete(username);
    const newData = {
      ...data,
      notFollowingBack: newNotFollowing,
      ignored: newIgnored,
    };
    setData(newData);
  };

  const removeFromPending = (username: string) => {
    if (!data) return;
    const newPending = data.pending.filter((user) => user.username !== username);
    const newData = { ...data, pending: newPending };
    setData(newData);
  };

  const clearData = () => {
    setDataState(null);
    localStorage.removeItem('instagramData');
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        addToIgnored,
        removeFromIgnored,
        importIgnoredUsers,
        clearIgnoredUsers,
        removeFromNotFollowing,
        removeFromPending,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
