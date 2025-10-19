import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DataVisualization from './pages/DataVisualization';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Upload from './pages/Upload';

const App = () => (
  <ThemeProvider>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/home" element={<Home />} />
            <Route path="/visualize" element={<DataVisualization />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </ThemeProvider>
);

export default App;
