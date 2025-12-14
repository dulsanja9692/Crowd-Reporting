import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, StatsData } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    // Mock stats data
    const stats: StatsData = {
      totalReports: 156,
      verifiedReports: 89,
      pendingReports: 42,
      averageResponseTime: '15 minutes',
      topHotspots: [
        'Colombo Fort',
        'Pettah Market',
        'Maradana Junction',
        'Bambalapitiya',
        'Nugegoda',
      ],
    };

    const response: ApiResponse<StatsData> = {
      success: true,
      data: stats,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to fetch statistics',
    };
    return NextResponse.json(response, { status: 500 });
  }
}