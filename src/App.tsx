import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Home from "@/pages/Home.tsx";
import Layout2 from "@/pages/Layout.tsx";
import Sets from "@/pages/Sets.tsx";
import Cards from "@/pages/Cards.tsx";
import CreateCard from "@/pages/CreateCard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout2 />}>
      <Route index element={<Home />} />
      <Route path="sets" element={<Sets />} />
      <Route path="sets/:id" element={<Cards />} />
      <Route path="card" element={<CreateCard />} />
    </Route>
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
