import { useNavigate } from 'react-router-dom';

import { Info, Moon, Sun, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { AuthorCredit } from '@/components/AuthorCredit';
import { BottomNav } from '@/components/BottomNav';
import { ExportInstructions } from '@/components/ExportInstructions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useData } from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { data, clearData } = useData();
  const navigate = useNavigate();

  const handleClearData = () => {
    clearData();
    toast.success('Data cleared successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <h1 className="bg-gradient-instagram bg-clip-text text-center text-2xl font-bold text-transparent">
            Settings
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl animate-fade-in space-y-4 px-4 py-6">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </Card>

        {data && (
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Data</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Data</p>
                  <p className="text-sm text-muted-foreground">
                    {data.followers.length} followers, {data.following.length} following
                  </p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your Instagram data from this app. You'll
                      need to upload a new ZIP file to use the tracker again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData}>Clear Data</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        )}

        <ExportInstructions />

        <Card className="bg-gradient-to-br from-background to-muted/20 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Info className="h-5 w-5 text-primary" />
            About
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Instagram Tracker helps you identify accounts that don't follow you back. All data is
              processed and stored locally on your device.
            </p>
            <p>
              This app works completely offline and respects your privacy. No data is sent to any
              servers.
            </p>
            <div className="border-t border-border pt-3">
              <p className="text-center text-xs">Version 1.0.0</p>
            </div>
          </div>
        </Card>

        <AuthorCredit />
      </main>

      <BottomNav />
    </div>
  );
}
