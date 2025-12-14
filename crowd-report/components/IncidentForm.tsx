'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Shield,
  Wrench,
  Zap,
  X
} from 'lucide-react';

interface FormData {
  type: string;
  title: string;
  description: string;
  location: string;
  severity: string;
  coordinates?: { lat: number; lng: number };
  evidence: string[];
  anonymous: boolean;
}

interface IncidentFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const incidentTypes = [
  { id: 'harassment', label: 'Harassment', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-yellow-500' },
  { id: 'theft', label: 'Theft', icon: <Shield className="w-5 h-5" />, color: 'text-red-500' },
  { id: 'assault', label: 'Assault', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-red-600' },
  { id: 'poor-lighting', label: 'Poor Lighting', icon: <Zap className="w-5 h-5" />, color: 'text-orange-500' },
  { id: 'road-damage', label: 'Road Damage', icon: <Wrench className="w-5 h-5" />, color: 'text-blue-500' },
  { id: 'other', label: 'Other', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-gray-500' },
];

const severityLevels = [
  { id: 'low', label: 'Low', color: 'bg-green-500' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { id: 'high', label: 'High', color: 'bg-orange-500' },
  { id: 'critical', label: 'Critical', color: 'bg-red-500' },
];

export default function IncidentForm({ onSubmit, isSubmitting }: IncidentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    type: '',
    title: '',
    description: '',
    location: '',
    severity: 'medium',
    evidence: [],
    anonymous: true,
  });

  const [currentLocation, setCurrentLocation] = useState<string>('');

  const handleChange = (
    field: keyof FormData, 
    value: string | boolean | { lat: number; lng: number } | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.title || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          handleChange('coordinates', { lat: latitude, lng: longitude });
          
          // Reverse geocoding would go here
          handleChange('location', 'Current Location (detected)');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newEvidence = Array.from(files).map(file => URL.createObjectURL(file));
      handleChange('evidence', [...formData.evidence, ...newEvidence]);
    }
  };

  const removeImage = (index: number) => {
    const newEvidence = [...formData.evidence];
    newEvidence.splice(index, 1);
    handleChange('evidence', newEvidence);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Incident Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Incident Type *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {incidentTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleChange('type', type.id)}
              className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all ${
                formData.type === type.id
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={type.color}>
                {type.icon}
              </div>
              <span className="text-sm font-medium text-white">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-white placeholder-gray-400"
            placeholder="Brief description of the incident"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-white placeholder-gray-400 min-h-[120px]"
            placeholder="Provide detailed information about what happened..."
            required
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location *
        </label>
        <div className="flex space-x-3">
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none text-white placeholder-gray-400"
            placeholder="Enter location or address"
            required
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            className="px-4 py-3 rounded-xl bg-accent/20 text-accent hover:bg-accent/30 transition-colors flex items-center space-x-2"
          >
            <MapPin className="w-5 h-5" />
            <span>Use Current</span>
          </button>
        </div>
        {currentLocation && (
          <p className="mt-2 text-sm text-accent">
            Coordinates: {currentLocation}
          </p>
        )}
      </div>

      {/* Severity */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Severity Level
        </label>
        <div className="flex space-x-3">
          {severityLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleChange('severity', level.id)}
              className={`flex-1 p-3 rounded-xl flex items-center justify-center space-x-2 ${
                formData.severity === level.id
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${level.color}`} />
              <span className="text-white font-medium">{level.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Evidence (Optional)
        </label>
        <div className="space-y-4">
          {/* Image Preview */}
          {formData.evidence.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {formData.evidence.map((src, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video rounded-lg bg-white/5 overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <label className="block">
            <div className="p-8 rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors cursor-pointer text-center">
              <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-300 mb-1">Click to upload photos/videos</p>
              <p className="text-sm text-gray-400">PNG, JPG, MP4 up to 10MB</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Anonymous Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
        <div>
          <p className="text-white font-medium">Submit Anonymously</p>
          <p className="text-sm text-gray-400">Your identity will not be revealed</p>
        </div>
        <button
          type="button"
          onClick={() => handleChange('anonymous', !formData.anonymous)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.anonymous ? 'bg-primary' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.anonymous ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-gradien-to-r from-primary to-accent text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Submitting Report...</span>
          </div>
        ) : (
          'Submit Report'
        )}
      </motion.button>
    </form>
  );
}