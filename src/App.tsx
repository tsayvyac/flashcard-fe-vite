import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/context/theme-provider.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { AuthProvider } from "@/components/context/auth-provider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
