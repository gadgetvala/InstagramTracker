import { Info } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

interface ExportInstructionsProps {
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export function ExportInstructions({
  collapsible = false,
  defaultOpen = false,
  className = '',
}: ExportInstructionsProps) {
  const InstructionsContent = () => (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">Follow these steps to get your data:</p>
      <ol className="list-inside list-decimal space-y-2 pl-2">
        <li>
          Open Instagram → <span className="font-medium text-foreground">Settings</span>
        </li>
        <li>
          Go to <span className="font-medium text-foreground">Accounts Center</span>
        </li>
        <li>
          Select{' '}
          <span className="font-medium text-foreground">Your information and permissions</span>
        </li>
        <li>
          Tap <span className="font-medium text-foreground">Download your information</span>
        </li>
        <li>
          Click <span className="font-medium text-foreground">Create export</span>
        </li>
        <li>
          Choose <span className="font-medium text-foreground">Instagram</span>
        </li>
        <li>
          Select <span className="font-medium text-foreground">Download to Device</span>
        </li>
        <li>
          Format: <span className="font-medium text-foreground">JSON</span>, Range:{' '}
          <span className="font-medium text-foreground">All Time</span>
        </li>
        <li>
          In Custom Information, select{' '}
          <span className="font-medium text-foreground">only Followers and Following</span>
        </li>
        <li>
          Click <span className="font-medium text-foreground">Export</span>
        </li>
        <li>Wait 20-30 minutes and download the ZIP file</li>
      </ol>
      <p className="rounded-md border border-border bg-muted p-3 pt-2 text-xs">
        💡 <strong className="text-foreground">Tip:</strong> Selecting only Followers and Following
        keeps the file size small and speeds up processing.
      </p>
    </div>
  );

  if (collapsible) {
    return (
      <Card className={`p-4 ${className}`}>
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultOpen ? 'instructions' : undefined}
          className="w-full"
        >
          <AccordionItem value="instructions" className="border-none">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2 text-left">
                <Info className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-semibold">How to Export Instagram Data</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <InstructionsContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Info className="h-5 w-5 text-primary" />
        How to Export Instagram Data
      </h2>
      <InstructionsContent />
    </Card>
  );
}
