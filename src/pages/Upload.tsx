import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Upload as UploadIcon, TestTube2 } from 'lucide-react';
import { toast } from 'sonner';

import { AuthorCredit } from '@/components/AuthorCredit';
import { ExportInstructions } from '@/components/ExportInstructions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';
import { generateSampleData } from '@/utils/sampleData';
import { parseInstagramZip } from '@/utils/zipParser';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { data, setData } = useData();

  // Redirect to home if data already exists
  useEffect(() => {
    if (data) {
      navigate('/home', { replace: true });
    }
  }, [data, navigate]);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.zip')) {
      toast.error('Please select a valid ZIP file');
      return;
    }

    setIsProcessing(true);
    try {
      const data = await parseInstagramZip(file);
      setData(data);
      toast.success('Data loaded successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to parse data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleLoadSampleData = () => {
    setIsProcessing(true);
    try {
      const sampleData = generateSampleData();
      setData(sampleData);
      toast.success('Sample data loaded successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to load sample data');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in space-y-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-instagram">
            <UploadIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="bg-gradient-instagram bg-clip-text text-3xl font-bold text-transparent">
            Instagram Tracker
          </h1>
          <p className="text-muted-foreground">
            Upload your Instagram data to see who's not following you back
          </p>
        </div>

        <Card
          className={`border-2 border-dashed p-8 transition-all ${
            isDragging
              ? 'scale-105 border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="space-y-4 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Drop your Instagram data ZIP here</p>
              <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
            </div>
            <input
              type="file"
              accept=".zip"
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
              disabled={isProcessing}
            />
            <label htmlFor="file-input">
              <Button
                type="button"
                className="w-full bg-gradient-instagram hover:opacity-90"
                disabled={isProcessing}
                asChild
              >
                <span>{isProcessing ? 'Processing...' : 'Select ZIP File'}</span>
              </Button>
            </label>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleLoadSampleData}
              disabled={isProcessing}
            >
              <TestTube2 className="mr-2 h-4 w-4" />
              Load Sample Data
            </Button>
          </div>
        </Card>

        <ExportInstructions collapsible defaultOpen={false} />

        <AuthorCredit />
      </div>
    </div>
  );
}
