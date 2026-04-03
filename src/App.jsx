// @ts-nocheck
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import PageNotFound from './lib/PageNotFound';

import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Surveying from './pages/services/Surveying';
import RenewableEnergy from './pages/services/RenewableEnergy';
import Infrastructure from './pages/services/Infrastructure';
import Environment from './pages/services/Environment';
import OilGas from './pages/services/OilGas';
import Training from './pages/Training';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Fleet from './pages/Fleet';
import ClientPortal from './pages/ClientPortal';

function App() {
  return (
    <LanguageProvider>
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/surveying" element={<Surveying />} />
            <Route path="/services/renewable-energy" element={<RenewableEnergy />} />
            <Route path="/services/infrastructure" element={<Infrastructure />} />
            <Route path="/services/environmental" element={<Environment />} />
            <Route path="/services/oil-gas" element={<OilGas />} />
            <Route path="/training" element={<Training />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/portal" element={<ClientPortal />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
    </LanguageProvider>
  )
}

export default App