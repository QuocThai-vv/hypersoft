import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Booking from "@/pages/Booking";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Confirmation from "@/pages/Confirmation";
import Blog from "@/pages/Blog";
import Article from "@/pages/Article";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";

function AppContent() {
  const location = useLocation();
  const noShellPages = ["/login"];
  const showShell = !noShellPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-ink-base text-text-primary relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-radial-accent opacity-90" aria-hidden />
      <div
        className="pointer-events-none fixed -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,119,6,0.55), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -bottom-40 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244,184,96,0.5), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col min-h-screen">
        {showShell && <Header />}
        <main className={`flex-1 relative ${showShell ? "pb-safe" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </main>
        {showShell && <Footer className="hidden lg:block" />}
        {showShell && <BottomNavigation />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
