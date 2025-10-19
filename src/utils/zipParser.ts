import JSZip from 'jszip';

import { InstagramData, InstagramUser } from '@/contexts/DataContext';

interface FollowerData {
  string_list_data?: Array<{
    href: string;
    value: string;
    timestamp?: number;
  }>;
}

interface FollowingData {
  relationships_following?: Array<{
    title: string;
    string_list_data?: Array<{
      href: string;
      timestamp?: number;
    }>;
  }>;
}

interface PendingRequestData {
  relationships_follow_requests_sent?: Array<{
    string_list_data?: Array<{
      href: string;
      value: string;
      timestamp?: number;
    }>;
  }>;
}

export async function parseInstagramZip(file: File): Promise<InstagramData> {
  const zip = await JSZip.loadAsync(file);

  // Files path inside the zip
  const followersPath = 'connections/followers_and_following/followers_1.json';
  const followingPath = 'connections/followers_and_following/following.json';
  const pendingPath = 'connections/followers_and_following/pending_follow_requests.json';

  const followersFile = zip.file(followersPath);
  const followingFile = zip.file(followingPath);
  const pendingFile = zip.file(pendingPath);

  if (!followersFile || !followingFile) {
    throw new Error(
      'Invalid Instagram data. Please ensure the zip contains followers and following JSON files.'
    );
  }

  const followersText = await followersFile.async('text');
  const followingText = await followingFile.async('text');
  const pendingText = pendingFile ? await pendingFile.async('text') : null;

  let followersData: FollowerData[];
  let followingData: FollowingData;
  let pendingData: PendingRequestData;

  try {
    followersData = JSON.parse(followersText);
    followingData = JSON.parse(followingText);
    pendingData = pendingText ? JSON.parse(pendingText) : null;
  } catch (error) {
    throw new Error('Invalid JSON format in followers or following files.');
  }

  // Parse followers
  const followers: InstagramUser[] = (followersData || []).map((item) => {
    const info = item.string_list_data[0];
    return {
      url: info.href,
      username: info.value,
      timestamp: info.timestamp,
    };
  });

  // Parse following
  const following: InstagramUser[] = [];
  if (followingData.relationships_following) {
    followingData.relationships_following.forEach((rel) => {
      const info = rel.string_list_data[0];

      following.push({
        username: rel.title,
        url: info.href,
        timestamp: info.timestamp,
      });
    });
  }

  // Parse Pending Follow Request
  const pendingRequest: InstagramUser[] = (
    pendingData.relationships_follow_requests_sent || []
  ).map((item) => {
    const info = item.string_list_data[0];
    return {
      url: info.href,
      username: info.value,
      timestamp: info.timestamp,
    };
  });

  // Calculate not following back
  const followerSet = new Set(followers.map((f) => f.username));
  const notFollowingBack = following.filter((f) => !followerSet.has(f.username));

  return {
    followers,
    following,
    notFollowingBack,
    ignored: new Set(),
    pending: pendingRequest,
  };
}
