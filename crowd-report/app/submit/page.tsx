'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import IncidentForm from '@/components/IncidentForm';

import toast from 'react-hot-toast';

export default function SubmitReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Report submitted successfully!');
    } catch {
      toast.error('Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl">
          <AlertTriangle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">Report an Incident</h1>
        <p className="text-gray-300">
          Help keep your community safe by reporting safety concerns
        </p>
      </div>

      {/* Form Container */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Steps */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Submission Guide</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-sm text-gray-300">Select incident type and location</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <p className="text-sm text-gray-300">Add details and evidence</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <p className="text-sm text-gray-300">Review and submit</p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="p-4 rounded-xl bg-danger/10 border border-danger/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-danger" />
                <h4 className="font-semibold text-danger">Emergency Notice</h4>
              </div>
              <p className="text-sm text-gray-300">
                For immediate danger or emergency situations, please contact emergency services first.
              </p>
              <button className="mt-3 w-full py-2 bg-danger/20 hover:bg-danger/30 text-danger rounded-lg transition-colors">
                Call Emergency: 119
              </button>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <IncidentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-sm text-gray-400"
      >
        <p>All reports are anonymous by default. Your privacy is protected.</p>
      </motion.div>
    </motion.div>
  );
}