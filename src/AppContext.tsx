import React, { useState } from 'react';

interface AppContext {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const appContextDefault: AppContext = {
  isMenuOpen: false,
  toggleMenu: () => {},
};

const AppContext = React.createContext<AppContext>(appContextDefault);

const AppProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(appContextDefault.isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const value: AppContext = {
    isMenuOpen,
    toggleMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = (): AppContext => React.useContext(AppContext);

export { AppContext, AppProvider, useApp };
