import { Navigate } from 'react-router-dom';

import { Activity, Clock, TrendingUp, UserCheck, Users, UserX } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { BottomNav } from '@/components/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export default function DataVisualization() {
  const { data } = useData();

  if (!data) {
    return <Navigate to="/" replace />;
  }

  // Overview data for pie chart
  const overviewData = [
    { name: 'Followers', value: data.followers.length, color: COLORS[0] },
    { name: 'Following', value: data.following.length, color: COLORS[1] },
    {
      name: 'Not Following Back',
      value: data.notFollowingBack.filter((u) => !data.ignored.has(u.username)).length,
      color: COLORS[2],
    },
    { name: 'Pending', value: data.pending.length, color: COLORS[3] },
    { name: 'Ignored', value: data.ignored.size, color: COLORS[4] },
  ];

  // Comparison data
  const comparisonData = [
    {
      category: 'Total',
      Followers: data.followers.length,
      Following: data.following.length,
    },
  ];

  // Engagement ratio
  const engagementData = [
    {
      name: 'Followers',
      count: data.followers.length,
    },
    {
      name: 'Following',
      count: data.following.length,
    },
    {
      name: 'Not Following Back',
      count: data.notFollowingBack.filter((u) => !data.ignored.has(u.username)).length,
    },
    {
      name: 'Pending',
      count: data.pending.length,
    },
  ];

  // Timeline data (group by month if timestamps exist)
  const getTimelineData = () => {
    const followersWithTimestamp = data.followers.filter((f) => f.timestamp);
    const followingWithTimestamp = data.following.filter((f) => f.timestamp);

    if (followersWithTimestamp.length === 0 && followingWithTimestamp.length === 0) {
      return [];
    }

    const monthlyData: {
      [key: string]: { month: string; followers: number; following: number };
    } = {};

    [...followersWithTimestamp, ...followingWithTimestamp].forEach((user) => {
      if (user.timestamp) {
        const date = new Date(user.timestamp * 1000);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            month: date.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            }),
            followers: 0,
            following: 0,
          };
        }
      }
    });

    followersWithTimestamp.forEach((user) => {
      if (user.timestamp) {
        const date = new Date(user.timestamp * 1000);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey].followers++;
      }
    });

    followingWithTimestamp.forEach((user) => {
      if (user.timestamp) {
        const date = new Date(user.timestamp * 1000);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey].following++;
      }
    });

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  };

  const timelineData = getTimelineData();

  // Calculate metrics
  const followerRatio = data.followers.length / (data.following.length || 1);
  const engagementRate = ((data.followers.length / (data.following.length || 1)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <h1 className="bg-gradient-instagram bg-clip-text text-center text-2xl font-bold text-transparent">
            Data Visualization
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl space-y-6 px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.followers.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Following</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.following.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Follower Ratio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{followerRatio.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">followers per following</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{engagementRate}%</div>
              <p className="text-xs text-muted-foreground">follower to following ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Pie Chart - Account Overview */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Account Distribution</CardTitle>
              <CardDescription>Breakdown of your Instagram connections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={overviewData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {overviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart - Comparison */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Followers vs Following</CardTitle>
              <CardDescription>Direct comparison of your connections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Followers" fill={COLORS[0]} activeBar={false} />
                  <Bar dataKey="Following" fill={COLORS[1]} activeBar={false} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Detailed view of all user categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="count" fill={COLORS[2]} activeBar={false}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Timeline Chart */}
        {timelineData.length > 0 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Followers and following activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stackId="1"
                    stroke={COLORS[0]}
                    fill={COLORS[0]}
                  />
                  <Area
                    type="monotone"
                    dataKey="following"
                    stackId="2"
                    stroke={COLORS[1]}
                    fill={COLORS[1]}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Additional Metrics Line Chart */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Engagement Comparison</CardTitle>
            <CardDescription>Line chart showing relationship trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={COLORS[3]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[3], r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
