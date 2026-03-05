import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Newblog from "./pages/Newblog.jsx";
import Allblogs from "./pages/Allblogs.jsx";
import Editblog from "./pages/Editblog.jsx";
import Profile from "./pages/Profile.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Myblog from "./pages/Myblog.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl="/all"
      afterSignUpUrl="/all"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/new" element={<Newblog />} />
          <Route path="/all" element={<Allblogs />} />
          <Route path="/edit/:id" element={<Editblog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myblog" element={<Myblog />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);