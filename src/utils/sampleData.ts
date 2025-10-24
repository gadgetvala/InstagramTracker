import { InstagramData, InstagramUser } from '@/contexts/DataContext';

// Generate sample Instagram users
const generateSampleUsers = (count: number, prefix: string): InstagramUser[] => {
  return Array.from({ length: count }, (_, i) => ({
    url: `https://www.instagram.com/${prefix}${i + 1}`,
    username: `${prefix}${i + 1}`,
    timestamp: Date.now() - Math.floor(Math.random() * 10000000000),
  }));
};

export const generateSampleData = (): InstagramData => {
  // Generate followers (150 users)
  const followers = generateSampleUsers(150, 'follower_user_');

  // Generate following (200 users)
  const following = [
    ...generateSampleUsers(100, 'mutual_friend_'), // These will be mutual (following back)
    ...generateSampleUsers(60, 'celebrity_'), // These won't follow back
    ...generateSampleUsers(30, 'brand_'), // These won't follow back
    ...generateSampleUsers(10, 'influencer_'), // These won't follow back
  ];

  // Generate pending requests (15 users)
  const pending = generateSampleUsers(15, 'pending_user_');

  // Add some mutual friends to followers
  const mutualFriends = generateSampleUsers(100, 'mutual_friend_');
  const allFollowers = [...followers, ...mutualFriends];

  // Calculate not following back (those we follow but don't follow us)
  const followerSet = new Set(allFollowers.map((f) => f.username));
  const notFollowingBack = following.filter((f) => !followerSet.has(f.username));

  return {
    followers: allFollowers,
    following,
    notFollowingBack,
    ignored: new Set(),
    pending,
  };
};
