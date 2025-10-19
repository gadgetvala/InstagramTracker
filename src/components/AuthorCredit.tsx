import { BookOpen, Github, Instagram, Linkedin } from 'lucide-react';

import { Card } from '@/components/ui/card';

interface SocialLink {
  name: string;
  url: string;
  icon: typeof Linkedin;
  bgColor: string;
  textColor?: string;
}

interface AuthorCreditProps {
  className?: string;
  compact?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gadgetvala',
    icon: Linkedin,
    bgColor: 'bg-[#0A66C2]',
    textColor: 'text-white',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/gadgetvala',
    icon: Github,
    bgColor: 'bg-foreground',
    textColor: 'text-background',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@gadgetvala',
    icon: BookOpen,
    bgColor: 'bg-[#000000]',
    textColor: 'text-white',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/gadgetvala',
    icon: Instagram,
    bgColor: 'bg-gradient-instagram',
    textColor: 'text-white',
  },
];

export function AuthorCredit({ className = '', compact = false }: AuthorCreditProps) {
  return (
    <Card className={`bg-gradient-to-br from-background to-muted/20 p-6 ${className}`}>
      <div className="space-y-4 text-center">
        <p className="text-sm font-medium text-foreground">Made with ❤️ by Gadgetvala</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 ${link.bgColor} ${link.textColor} transition-opacity hover:opacity-90`}
              aria-label={`Connect with Gadgetvala on ${link.name}`}
            >
              <link.icon className="h-4 w-4" />
              {!compact && <span className="text-sm font-medium">{link.name}</span>}
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
