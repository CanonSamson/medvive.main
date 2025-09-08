import mixpanel from "mixpanel-browser";
import { usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Type definitions
interface MixPanelContextType {
  mixpanel: typeof mixpanel | null;
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
}

interface MixPanelProviderProps {
  children: ReactNode;
}

// Context for Mixpanel
const MixPanelContext = createContext<MixPanelContextType | undefined>(undefined);

const MixPanelProvider: React.FC<MixPanelProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Only initialize mixpanel on the client side
    if (typeof window !== "undefined" && !isInitialized) {
      const mixPanelKey = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "";
      mixpanel.init(mixPanelKey, { debug: true });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    const handleRouteChange = (): void => {
      if (isInitialized && typeof window !== "undefined") {
        mixpanel.track_pageview();
      }
    };

    handleRouteChange();

    return () => {
      // Any cleanup can be done here if necessary
    };
  }, [pathname, searchParams, isInitialized]);

  const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
    if (isInitialized && typeof window !== "undefined") {
      mixpanel.track(eventName, properties);
    }
  };

  return (
    <MixPanelContext.Provider
      value={{ mixpanel: isInitialized ? mixpanel : null, trackEvent }}
    >
      {children}
    </MixPanelContext.Provider>
  );
};

function useMixPanel(): MixPanelContextType {
  const context = useContext(MixPanelContext);
  if (context === undefined) {
    throw new Error("MixPanelContext must be used within a MixPanelProvider");
  }
  return context;
}

export { MixPanelProvider, useMixPanel };
export type { MixPanelContextType, MixPanelProviderProps };
