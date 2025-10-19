import { Copy, User, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InstagramUser } from '@/contexts/DataContext';

interface UserCardProps {
  user: InstagramUser;
  showIgnoreButton?: boolean;
  showRemoveButton?: boolean;
  onIgnore?: () => void;
  onRemove?: () => void;
}

export function UserCard({
  user,
  showIgnoreButton,
  showRemoveButton,
  onIgnore,
  onRemove,
}: UserCardProps) {
  const handleCopyUsername = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(user.username);
    toast.success('Username copied!');
  };

  return (
    <Card
      className="flex animate-fade-in items-center justify-between p-4 transition-shadow hover:cursor-pointer hover:shadow-md"
      onClick={() => window.open(user.url, '_blank')}
    >
      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-instagram">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-card-foreground">{user.username}</p>
          {user.timestamp && (
            <p className="text-xs text-muted-foreground">
              {new Date(user.timestamp * 1000).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyUsername}
          className="text-muted-foreground hover:text-foreground"
        >
          <Copy className="h-4 w-4" />
        </Button>

        {showIgnoreButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onIgnore?.();
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <UserMinus className="h-4 w-4" />
          </Button>
        )}

        {showRemoveButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            Remove
          </Button>
        )}
      </div>
    </Card>
  );
}
