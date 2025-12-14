'use client';

import { IncidentReport } from '@/lib/types';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  User, 
  ChevronUp, 
  ChevronDown, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { useState } from 'react';
import { reportApi } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ReportCardProps {
  report: IncidentReport;
  detailed?: boolean;
}

export default function ReportCard({ report, detailed = false }: ReportCardProps) {
  const [upvotes, setUpvotes] = useState(report.upvotes);
  const [downvotes, setDownvotes] = useState(report.downvotes);
  const [isVoting, setIsVoting] = useState(false);

  const typeIcons = {
    harassment: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    theft: <Shield className="w-4 h-4 text-red-500" />,
    assault: <AlertTriangle className="w-4 h-4 text-red-600" />,
    'poor-lighting': <AlertTriangle className="w-4 h-4 text-orange-500" />,
    'road-damage': <AlertTriangle className="w-4 h-4 text-blue-500" />,
    other: <AlertTriangle className="w-4 h-4 text-gray-500" />,
  };

  const severityColors = {
    low: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-orange-500/20 text-orange-400',
    critical: 'bg-red-500/20 text-red-400',
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-yellow-500" />,
    verified: <CheckCircle className="w-4 h-4 text-green-500" />,
    resolved: <CheckCircle className="w-4 h-4 text-blue-500" />,
    'false-report': <XCircle className="w-4 h-4 text-red-500" />,
  };

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      const response = await reportApi.voteReport(report.id, voteType);
      if (response.success) {
        if (voteType === 'upvote') {
          setUpvotes(prev => prev + 1);
          toast.success('Upvoted!');
        } else {
          setDownvotes(prev => prev + 1);
          toast.success('Downvoted!');
        }
      }
    } catch {
      toast.error('Failed to vote');
    } finally {
      setIsVoting(false);
    }
  };

  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-xl p-4 hover:border-primary/30 border border-transparent transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-white/5">
            {typeIcons[report.type]}
          </div>
          <div>
            <h3 className="font-semibold text-white">{report.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {report.location}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {timeAgo(report.timestamp)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[report.severity]}`}>
            {report.severity}
          </span>
          <div className="p-1">
            {statusIcons[report.status]}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {report.description}
      </p>

      {/* Safe Spot Indicator */}
      {report.safeSpot && (
        <div className="mb-4 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="flex items-center space-x-2 text-green-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Verified Safe Spot</span>
          </div>
        </div>
      )}

      {/* Voting Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleVote('upvote')}
              disabled={isVoting}
              className="p-1.5 rounded-lg hover:bg-green-500/10 disabled:opacity-50 transition-colors group"
            >
              <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
            </button>
            <span className="font-semibold text-white min-w-[20px] text-center">
              {upvotes - downvotes}
            </span>
            <button
              onClick={() => handleVote('downvote')}
              disabled={isVoting}
              className="p-1.5 rounded-lg hover:bg-red-500/10 disabled:opacity-50 transition-colors group"
            >
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
          
          {detailed && (
            <>
              <div className="text-sm text-gray-400">
                {upvotes} up • {downvotes} down
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                <span>Anonymous</span>
              </div>
            </>
          )}
        </div>

        <Link
          href={`/report/${report.id}`}
          className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Link>
      </div>

      {/* Evidence Preview */}
      {detailed && report.evidence && report.evidence.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-2">
            {report.evidence.slice(0, 3).map((src, index) => (
              <div
                key={index}
                className="aspect-video rounded-lg bg-white/5 overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradien-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {index === 2 && report.evidence!.length > 3 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white font-semibold">+{report.evidence!.length - 3}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}