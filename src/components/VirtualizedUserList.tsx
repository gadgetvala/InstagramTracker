import { useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';
import { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { UserCard } from '@/components/UserCard';
import type { InstagramUser } from '@/contexts/DataContext';

interface VirtualizedUserListProps {
  users: InstagramUser[];
  emptyIcon: LucideIcon;
  emptyMessage: string;
  showIgnoreButton?: boolean;
  showRemoveButton?: boolean;
  onIgnore?: (username: string) => void;
  onRemove?: (username: string) => void;
}

export function VirtualizedUserList({
  users,
  emptyIcon: EmptyIcon,
  emptyMessage,
  showIgnoreButton,
  showRemoveButton,
  onIgnore,
  onRemove,
}: VirtualizedUserListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 92,
    overscan: 5,
  });

  if (users.length === 0) {
    return (
      <Card className="p-8 text-center">
        <EmptyIcon className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-280px)] overflow-auto"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];
          return (
            <div
              key={user.username}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                paddingBottom: '12px',
              }}
            >
              <UserCard
                user={user}
                showIgnoreButton={showIgnoreButton}
                showRemoveButton={showRemoveButton}
                onIgnore={() => onIgnore?.(user.username)}
                onRemove={() => onRemove?.(user.username)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
