import { removeFromLocalStorage, retrieveFromLocalStorage, saveToLocalStorage } from "@/utils/localStorageUtils";
import { createContext, useContext, useState, useEffect } from "react";

interface DemoContextType {
  demo: boolean;
  activateDemo: () => void;
  deactivateDemo: () => void;
}

const DemoContext = createContext<DemoContextType>({
  demo: false,
  activateDemo: () => {},
  deactivateDemo: () => {},
});

export const DEMO_KEY = "tripflow_demo_mode";

export const useDemo = () => useContext(DemoContext);

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const stored = retrieveFromLocalStorage<string>(DEMO_KEY) === "true";
    setDemo(stored);
  }, []);

  const activateDemo = () => {
    saveToLocalStorage<string>(DEMO_KEY, "true");
    setDemo(true);
  };

  const deactivateDemo = () => {
    removeFromLocalStorage(DEMO_KEY);
    setDemo(false);
  };

  return (
    <DemoContext.Provider value={{ demo, activateDemo, deactivateDemo }}>
      {children}
    </DemoContext.Provider>
  );
};
