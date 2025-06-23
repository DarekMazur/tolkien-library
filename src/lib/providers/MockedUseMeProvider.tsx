import React, { createContext, useContext } from 'react';

export interface MockedUser {
  id: string;
  avatar: string;
  email: string;
  emailVerified: boolean;
  userName: string;
  isBanned: boolean;
  role: { id: string; name: string };
}

export interface MockedUseMeContextType {
  user: MockedUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const MockedUseMeContext = createContext<MockedUseMeContextType | null>(null);

export const MockedUseMeProvider = ({
  value,
  children,
}: {
  value: MockedUseMeContextType;
  children: React.ReactNode;
}) => <MockedUseMeContext.Provider value={value}>{children}</MockedUseMeContext.Provider>;

export const useMe = (): MockedUseMeContextType => {
  const ctx = useContext(MockedUseMeContext);
  if (!ctx) throw new Error('useMe must be used within a MockedUseMeProvider');
  return ctx;
};
