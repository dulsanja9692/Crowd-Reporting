'use client';

import { useEffect, useState } from 'react';
import ReportCard from '@/components/ReportCard';
import StatsCard from '@/components/StatsCard';
import MapView from '@/components/MapView';
import { reportApi } from '@/lib/api';
import { IncidentReport, StatsData } from '@/lib/types';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportsRes, statsRes] = await Promise.all([
        reportApi.getAllReports(),
        reportApi.getStats(),
      ]);

      if (reportsRes.success) {
        setReports(reportsRes.data || []);
      }

      if (statsRes.success) {
        setStats(statsRes.data || null);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 border-4 border-accent/30 border-t-accent rounded-full animate-spin delay-150" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text">
          Community Safety Network
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Real-time incident reporting and safety monitoring powered by citizens of Sri Lanka
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Reports"
            value={stats?.totalReports.toString() || "0"}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="primary"
            trend="+12%"
          />
          <StatsCard
            title="Verified Reports"
            value={stats?.verifiedReports.toString() || "0"}
            icon={<TrendingUp className="w-6 h-6" />}
            color="safe"
            trend="+8%"
          />
          <StatsCard
            title="Community Users"
            value="1,245"
            icon={<Users className="w-6 h-6" />}
            color="accent"
            trend="+23%"
          />
          <StatsCard
            title="Avg Response Time"
            value={stats?.averageResponseTime || "15 min"}
            icon={<Clock className="w-6 h-6" />}
            color="warning"
            trend="-5%"
          />
        </div>
      </motion.div>

      {/* Map & Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Live Safety Heatmap</h2>
            <div className="h-[400px] rounded-xl overflow-hidden">
              <MapView reports={reports} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Recent Reports</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {reports.slice(0, 5).map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* All Reports Section */}
      <motion.div variants={itemVariants}>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold gradient-text">All Incident Reports</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
                Sort
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} detailed />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}