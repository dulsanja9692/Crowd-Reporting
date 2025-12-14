import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, IncidentReport } from '@/lib/types';

// Mock database
let mockReports = [
  {
    id: '1',
    upvotes: 15,
    downvotes: 2,
    // ... other fields
  },
  // ... more reports
];

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { vote } = body;

    // Find report
    const reportIndex = mockReports.findIndex(r => r.id === id);
    if (reportIndex === -1) {
      const response: ApiResponse<never> = {
        success: false,
        error: 'Report not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Update votes
    if (vote === 'upvote') {
      mockReports[reportIndex].upvotes += 1;
    } else if (vote === 'downvote') {
      mockReports[reportIndex].downvotes += 1;
    }

    const response: ApiResponse<IncidentReport> = {
      success: true,
      data: mockReports[reportIndex],
      message: 'Vote recorded successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to process vote',
    };
    return NextResponse.json(response, { status: 500 });
  }
}