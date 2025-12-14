'use client';

import { useRef, useState } from 'react';
import { IncidentReport } from '@/lib/types';
import { MapPin, AlertTriangle, Shield } from 'lucide-react';

interface MapViewProps {
  reports: IncidentReport[];
}

export default function MapView({ reports }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);

  // This is a placeholder for actual map implementation
  // In production, you would use Google Maps, Leaflet, or Mapbox

  const getIconColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'theft': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-xl bg-gradien-to-br from-gray-900 to-black relative overflow-hidden"
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Map Markers */}
        <div className="relative w-full h-full">
          {reports.map((report, index) => {
            // Generate random positions for demo (in production, use actual coordinates)
            const left = 20 + (index * 15) % 70;
            const top = 20 + (index * 25) % 70;

            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group ${
                  selectedReport?.id === report.id ? 'z-10' : 'z-0'
                }`}
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                {/* Marker */}
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border-2 ${
                    report.severity === 'critical' ? 'border-red-500' :
                    report.severity === 'high' ? 'border-orange-500' :
                    report.severity === 'medium' ? 'border-yellow-500' :
                    'border-green-500'
                  } flex items-center justify-center transition-transform group-hover:scale-125`}>
                    <div className={getIconColor(report.severity)}>
                      {getIcon(report.type)}
                    </div>
                  </div>
                  
                  {/* Pulse Animation */}
                  <div className={`absolute inset-0 rounded-full animate-ping ${
                    report.severity === 'critical' ? 'bg-red-500/30' :
                    report.severity === 'high' ? 'bg-orange-500/30' :
                    report.severity === 'medium' ? 'bg-yellow-500/30' :
                    'bg-green-500/30'
                  }`} />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="glass-card rounded-lg p-3 min-w-[200px]">
                    <p className="font-semibold text-white text-sm">{report.title}</p>
                    <p className="text-xs text-gray-300 mt-1">{report.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        report.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        report.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        report.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {report.severity}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-card rounded-xl p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Severity Legend</h4>
          <div className="space-y-2">
            {[
              { label: 'Critical', color: 'bg-red-500' },
              { label: 'High', color: 'bg-orange-500' },
              { label: 'Medium', color: 'bg-yellow-500' },
              { label: 'Low', color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-xs text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Report Panel */}
        {selectedReport && (
          <div className="absolute top-4 right-4 glass-card rounded-xl p-4 max-w-sm">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-2 right-2 p-1 rounded-lg hover:bg-white/10"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-2 pr-6">{selectedReport.title}</h3>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{selectedReport.location}</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{selectedReport.description}</p>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedReport.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                selectedReport.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                selectedReport.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {selectedReport.severity}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(selectedReport.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}