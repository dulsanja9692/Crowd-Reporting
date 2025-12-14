import { NextRequest, NextResponse } from 'next/server';
import { IncidentReport, ApiResponse } from '@/lib/types';

// Mock data (replace with actual database)
const mockReports: IncidentReport[] = [
  {
    id: '1',
    title: 'Harassment near bus halt',
    description: 'Group of men being verbally abusive near the main bus stop',
    location: 'Kolpitiya, Colombo 03',
    coordinates: { lat: 6.8947, lng: 79.8530 },
    type: 'harassment',
    severity: 'medium',
    status: 'verified',
    timestamp: new Date().toISOString(),
    userId: 'user123',
    upvotes: 15,
    downvotes: 2,
    safeSpot: false,
  },
  // Add more mock reports...
];

export async function GET() {
  try {
    const response: ApiResponse<IncidentReport[]> = {
      success: true,
      data: mockReports,
    };
    return NextResponse.json(response);
  } catch {
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to fetch reports',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newReport: IncidentReport = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
      status: 'pending',
      upvotes: 0,
      downvotes: 0,
    };
    
    mockReports.unshift(newReport);
    
    const response: ApiResponse<IncidentReport> = {
      success: true,
      data: newReport,
      message: 'Report submitted successfully',
    };
    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: ApiResponse<never> = {
      success: false,
      error: 'Failed to submit report',
    };
    return NextResponse.json(response, { status: 500 });
  }
}