import axios from 'axios';
import { IncidentReport, ApiResponse, StatsData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Report APIs
export const reportApi = {
  getAllReports: async (): Promise<ApiResponse<IncidentReport[]>> => {
    const response = await api.get('/reports');
    return response.data;
  },

  getReportById: async (id: string): Promise<ApiResponse<IncidentReport>> => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  submitReport: async (report: Omit<IncidentReport, 'id' | 'timestamp' | 'status'>): Promise<ApiResponse<IncidentReport>> => {
    const response = await api.post('/reports', report);
    return response.data;
  },

  voteReport: async (reportId: string, vote: 'upvote' | 'downvote'): Promise<ApiResponse<IncidentReport>> => {
    const response = await api.post(`/reports/${reportId}/vote`, { vote });
    return response.data;
  },

  getStats: async (): Promise<ApiResponse<StatsData>> => {
    const response = await api.get('/reports/stats');
    return response.data;
  },
};