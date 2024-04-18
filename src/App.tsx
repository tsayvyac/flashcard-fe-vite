import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Home from "@/pages/Home.tsx";
import Layout2 from "@/components/Layout.tsx";
import Sets from "@/pages/Sets.tsx";
import Cards from "@/pages/Cards.tsx";
import CreateCard from "@/components/CreateCard.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import Learn from "@/pages/Learn.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout2 />}>
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
