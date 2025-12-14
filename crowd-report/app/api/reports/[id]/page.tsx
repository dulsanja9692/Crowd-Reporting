'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  User, 
  ChevronLeft,
  AlertTriangle,
  Shield,
  CheckCircle,
  Eye,
  Share2,
  Flag
} from 'lucide-react';
import { reportApi } from '@/lib/api';
import { IncidentReport } from '@/lib/types';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ReportDetailsPage() {
  const params = useParams();
  const [report, setReport] = useState<IncidentReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedReports, setRelatedReports] = useState<IncidentReport[]>([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await reportApi.getReportById(params.id as string);
        if (response.success && response.data) {
          setReport(response.data);
          // Fetch related reports
          const relatedRes = await reportApi.getAllReports();
          if (relatedRes.success && response.data) {
            setRelatedReports(
              relatedRes.data?.filter(r => 
                r.id !== params.id && 
                r.location === response.data?.location
              ).slice(0, 3) || []
            );
          }
        }
      } catch {
        toast.error('Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: report?.title,
        text: report?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleReport = () => {
    toast('Report submitted for review', {
      icon: '🚨',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Report Not Found</h1>
        <p className="text-gray-400 mb-6">The requested report does not exist.</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/80 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{report.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400 mt-2">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {report.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(report.timestamp).toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Anonymous User
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleReport}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Details Card */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Incident Details</h2>
            <p className="text-gray-300 whitespace-pre-line">
              {report.description}
            </p>
            
            {/* Evidence Section */}
            {report.evidence && report.evidence.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Evidence</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {report.evidence.map((src, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-lg bg-white/5 overflow-hidden relative group cursor-pointer"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Statistics Card */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Report Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{report.upvotes}</div>
                <p className="text-sm text-gray-400">Upvotes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-300 mb-2">{report.downvotes}</div>
                <p className="text-sm text-gray-400">Downvotes</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {Math.round((report.upvotes / (report.upvotes + report.downvotes || 1)) * 100)}%
                </div>
                <p className="text-sm text-gray-400">Credibility</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {report.status === 'verified' ? '✓' : '⋯'}
                </div>
                <p className="text-sm text-gray-400">Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Report Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Type</span>
                <span className="text-white font-medium capitalize">{report.type.replace('-', ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Severity</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  report.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                  report.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  report.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {report.severity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Verification</span>
                <div className="flex items-center space-x-2">
                  {report.status === 'verified' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-500 font-medium">Verified</span>
                    </>
                  ) : (
                    <span className="text-yellow-500 font-medium">Pending</span>
                  )}
                </div>
              </div>
              {report.safeSpot && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Safe Spot</span>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 font-medium">Verified</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Reports */}
          {relatedReports.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Related Incidents</h3>
              <div className="space-y-4">
                {relatedReports.map((relatedReport) => (
                  <Link
                    key={relatedReport.id}
                    href={`/report/${relatedReport.id}`}
                    className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <p className="text-white font-medium text-sm mb-1">{relatedReport.title}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{relatedReport.location}</span>
                      <span>{new Date(relatedReport.timestamp).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Safety Tips */}
          <div className="glass-card rounded-2xl p-6 bg-gradien-to-br from-primary/10 to-accent/10">
            <h3 className="text-lg font-semibold text-white mb-4">Safety Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary text-sm">1</span>
                </div>
                <p className="text-sm text-gray-300">Avoid poorly lit areas at night</p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary text-sm">2</span>
                </div>
                <p className="text-sm text-gray-300">Share your location with trusted contacts</p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary text-sm">3</span>
                </div>
                <p className="text-sm text-gray-300">Report suspicious activity immediately</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}