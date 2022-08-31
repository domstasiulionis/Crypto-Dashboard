import { createContext, useState, useEffect } from "react";

const SidebarIconContext = createContext();

export function SidebarIconProvider({ children }) {
  const [activeIcon, setActiveIcon] = useState(
    () => sessionStorage.getItem("icon") || "home"
  );

  useEffect(() => {
    sessionStorage.setItem("icon", activeIcon);
  }, [activeIcon]);

  return (
    <SidebarIconContext.Provider value={{ activeIcon, setActiveIcon }}>
      {children}
    </SidebarIconContext.Provider>
  );
}

export default SidebarIconContext;
