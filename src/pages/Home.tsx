import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Clock, Download, Trash2, Upload, UserCheck, UserMinus, Users, UserX } from 'lucide-react';
import { toast } from 'sonner';

import { BottomNav } from '@/components/BottomNav';
import { SearchAndSort } from '@/components/SearchAndSort';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCard } from '@/components/UserCard';
import { VirtualizedUserList } from '@/components/VirtualizedUserList';
import { useData } from '@/contexts/DataContext';
import type { InstagramUser } from '@/contexts/DataContext';

export default function Home() {
  const {
    data,
    addToIgnored,
    removeFromIgnored,
    importIgnoredUsers,
    clearIgnoredUsers,
    removeFromNotFollowing,
    removeFromPending,
  } = useData();
  const [activeTab, setActiveTab] = useState('followers');
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('username-asc');

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const handleExportJSON = (users: InstagramUser[], tabName: string) => {
    const jsonData = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instagram-${tabName}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${tabName} exported as JSON successfully`);
  };

  const handleExportCSV = (users: InstagramUser[], tabName: string) => {
    const headers = ['Username', 'Timestamp'];
    const rows = users.map((user) => [
      user.username,
      user.timestamp ? new Date(user.timestamp * 1000).toISOString() : 'N/A',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instagram-${tabName}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${tabName} exported as CSV successfully`);
  };

  const handleExportIgnored = () => {
    const ignoredUsers = Array.from(data.ignored);
    const jsonData = JSON.stringify(ignoredUsers, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instagram-ignored-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Ignored users exported successfully');
  };

  const handleImportIgnored = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const ignoredUsers = JSON.parse(text);
        if (Array.isArray(ignoredUsers)) {
          importIgnoredUsers(ignoredUsers);
          toast.success('Ignored users imported successfully');
        } else {
          toast.error('Invalid file format');
        }
      } catch (error) {
        toast.error('Failed to import file');
      }
    };
    input.click();
  };

  const handleClearIgnored = () => {
    clearIgnoredUsers();
    toast.success('Ignored list cleared');
  };

  const notFollowingFiltered = data.notFollowingBack.filter(
    (user) => !data.ignored.has(user.username)
  );

  const ignoredUsers = data.notFollowingBack.filter((user) => data.ignored.has(user.username));

  const filterAndSortUsers = (users: InstagramUser[]) => {
    let filtered = users;

    // Filter by search
    if (searchValue) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortValue) {
      case 'username-asc':
        sorted.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'username-desc':
        sorted.sort((a, b) => b.username.localeCompare(a.username));
        break;
      case 'time-newest':
        sorted.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        break;
      case 'time-oldest':
        sorted.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        break;
    }

    return sorted;
  };

  const tabs = useMemo(() => {
    const filteredFollowers = filterAndSortUsers(data.followers);
    const filteredFollowing = filterAndSortUsers(data.following);
    const filteredNotFollowing = filterAndSortUsers(notFollowingFiltered);
    const filteredIgnored = filterAndSortUsers(ignoredUsers);
    const filteredPending = filterAndSortUsers(data.pending);

    return [
      {
        value: 'followers',
        label: 'Followers',
        icon: Users,
        count: data.followers.length,
        filteredCount: filteredFollowers.length,
        users: filteredFollowers,
      },
      {
        value: 'following',
        label: 'Following',
        icon: UserCheck,
        count: data.following.length,
        filteredCount: filteredFollowing.length,
        users: filteredFollowing,
      },
      {
        value: 'not-following',
        label: 'Not Following',
        icon: UserX,
        count: notFollowingFiltered.length,
        filteredCount: filteredNotFollowing.length,
        users: filteredNotFollowing,
        showIgnore: true,
      },
      {
        value: 'ignored',
        label: 'Ignored',
        icon: UserMinus,
        count: ignoredUsers.length,
        filteredCount: filteredIgnored.length,
        users: filteredIgnored,
        showRemove: true,
      },
      {
        value: 'pending',
        label: 'Pending',
        icon: Clock,
        count: data.pending.length,
        filteredCount: filteredPending.length,
        users: filteredPending,
        showRemoveButton: true,
      },
    ];
  }, [data, searchValue, sortValue, notFollowingFiltered, ignoredUsers]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto max-w-2xl px-4 py-4">
          <h1 className="bg-gradient-instagram bg-clip-text text-center text-2xl font-bold text-transparent">
            Instagram Tracker
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="scrollbar-hide sticky top-0 z-40 -mx-4 w-full overflow-x-auto border-b border-border bg-background px-4 pb-2">
            <TabsList className="inline-flex w-max min-w-full justify-start gap-2 bg-muted p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-gradient-instagram data-[state=active]:text-white"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  <span className="ml-1 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground dark:bg-muted">
                    {searchValue || sortValue !== 'username-asc'
                      ? `${tab.filteredCount}/${tab.count}`
                      : tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="animate-fade-in space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row">
                <SearchAndSort
                  searchValue={searchValue}
                  onSearchChange={setSearchValue}
                  sortValue={sortValue}
                  onSortChange={setSortValue}
                />
                {tab.users.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleExportJSON(tab.users, tab.label)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      JSON
                    </Button>
                    <Button
                      onClick={() => handleExportCSV(tab.users, tab.label)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      CSV
                    </Button>
                  </div>
                )}
              </div>
              {tab.value === 'ignored' && ignoredUsers.length > 0 && (
                <div className="mb-4 flex gap-2">
                  <Button
                    onClick={handleExportIgnored}
                    variant="outline"
                    className="flex flex-1 items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button
                    onClick={handleImportIgnored}
                    variant="outline"
                    className="flex flex-1 items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Import
                  </Button>
                  <Button
                    onClick={handleClearIgnored}
                    variant="outline"
                    className="flex flex-1 items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              )}
              <VirtualizedUserList
                users={tab.users}
                emptyIcon={tab.icon}
                emptyMessage="No users in this category"
                showIgnoreButton={tab.showIgnore}
                showRemoveButton={tab.showRemove || tab.showRemoveButton}
                onIgnore={(username) => addToIgnored(username)}
                onRemove={(username) => {
                  if (tab.value === 'ignored') {
                    removeFromNotFollowing(username);
                  } else if (tab.value === 'pending') {
                    removeFromPending(username);
                  }
                }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
}
