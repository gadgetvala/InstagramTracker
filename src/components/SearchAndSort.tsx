import { ArrowUpDown, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchAndSortProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
}

export function SearchAndSort({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: SearchAndSortProps) {
  return (
    <div className="mb-4 flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          placeholder="Search username..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={sortValue} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="username-asc">Username A-Z</SelectItem>
          <SelectItem value="username-desc">Username Z-A</SelectItem>
          <SelectItem value="time-newest">Newest First</SelectItem>
          <SelectItem value="time-oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
