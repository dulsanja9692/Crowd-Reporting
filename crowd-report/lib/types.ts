export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'harassment' | 'theft' | 'assault' | 'poor-lighting' | 'road-damage' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'verified' | 'resolved' | 'false-report';
  timestamp: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  evidence?: string[]; // URLs to images/videos
  safeSpot?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  reputation: number;
  reportsSubmitted: number;
  verified: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface StatsData {
  totalReports: number;
  verifiedReports: number;
  pendingReports: number;
  averageResponseTime: string;
  topHotspots: string[];
}