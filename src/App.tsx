import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Home from "@/pages/Home.tsx";
import Layout from "@/components/Layout.tsx";
import Cards from "@/pages/Cards.tsx";
import CreateCard from "@/components/CreateCard.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Learn from "@/pages/Learn.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import Sets from "@/pages/Sets.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sets" element={<Sets />} />
        <Route path="sets/:id" element={<Cards />} />
        <Route path="card" element={<CreateCard />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/study/:id" element={<Learn />} />
    </>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
