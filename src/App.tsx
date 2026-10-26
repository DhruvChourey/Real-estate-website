import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import { EnquiryModalProvider } from './context/EnquiryModalContext';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FavouritesDrawer } from './components/common/FavouritesDrawer';
import { EnquiryModal } from './components/common/EnquiryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { LocationsPage } from './pages/LocationsPage';
import { JournalPage } from './pages/JournalPage';
import { JournalArticlePage } from './pages/JournalArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export function App() {
  return (
    <BrowserRouter>
      <FavouritesProvider>
        <EnquiryModalProvider>
          <SmoothScroll>
            <div className="min-h-screen flex flex-col bg-parchment-50 text-charcoal selection:bg-bronze-light/30 selection:text-charcoal-950 font-sans">
              <Header />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/properties" element={<PropertiesPage />} />
                  <Route path="/properties/:slug" element={<PropertyDetailPage />} />
                  <Route path="/locations" element={<LocationsPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:slug" element={<JournalArticlePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />

              {/* Slide-over Drawers & Modals */}
              <FavouritesDrawer />
              <EnquiryModal />
            </div>
          </SmoothScroll>
        </EnquiryModalProvider>
      </FavouritesProvider>
    </BrowserRouter>
  );
}

export default App;
