import React, { useState } from 'react';
import { UserProfile } from '../types/business';
import { DollarSign, MapPin, User, Clock, Briefcase } from 'lucide-react';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>({
    budget: 5000,
    interests: [],
    skills: [],
    location: 'urban',
    experience: 'beginner',
    timeCommitment: 'part-time',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const interestOptions = [
    'technology', 'marketing', 'food', 'fitness', 'education', 'arts', 'finance',
    'healthcare', 'travel', 'fashion', 'real estate', 'consulting', 'entertainment',
    'environment', 'social media', 'writing', 'photography', 'music',
  ];

  const skillOptions = [
    'programming', 'marketing', 'sales', 'design', 'writing', 'teaching',
    'customer service', 'social media', 'analytics', 'project management',
    'communication', 'leadership', 'problem solving', 'creativity', 'organization',
    'cooking', 'fitness', 'crafting', 'photography', 'video editing',
  ];

  const handleArrayChange = (field: 'interests' | 'skills', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-[#0F13F6] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">What's your budget?</h3>
              <p className="text-gray-600">How much can you invest to start your business?</p>
            </div>
            <div className="space-y-4">
              <input
                type="range"
                min="500"
                max="200000"
                step="500"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-[#0F13F6]">
                  ${formData.budget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>$500</span>
                <span>$200,000+</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-[#0F13F6] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Where are you located?</h3>
              <p className="text-gray-600">Your location affects business opportunities</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'urban', label: 'Urban/City', desc: 'High population density' },
                { value: 'suburban', label: 'Suburban', desc: 'Residential areas' },
                { value: 'rural', label: 'Rural', desc: 'Countryside/small towns' },
                { value: 'online', label: 'Online Only', desc: 'Location independent' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, location: option.value as any }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.location === option.value
                      ? 'border-gradient-to-r from-[#0F13F6] to-[#3B82F6] bg-gradient-to-r from-[#0F13F6]/20 to-[#3B82F6]/20'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium text-[#07021B]">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-[#0F13F6] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">What are your interests?</h3>
              <p className="text-gray-600">Select areas you're passionate about</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleArrayChange('interests', interest)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-gradient-to-r from-[#0F13F6] to-[#3B82F6] bg-gradient-to-r from-[#0F13F6] to-[#3B82F6] text-white'
                      : 'border-gray-300 text-[#07021B] hover:border-gray-400'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Briefcase className="h-12 w-12 text-[#0F13F6] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">What are your skills?</h3>
              <p className="text-gray-600">Select your existing skills and abilities</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleArrayChange('skills', skill)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    formData.skills.includes(skill)
                      ? 'border-gradient-to-r from-[#0F13F6] to-[#3B82F6] bg-gradient-to-r from-[#0F13F6] to-[#3B82F6] text-white'
                      : 'border-gray-300 text-[#07021B] hover:border-gray-400'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="h-12 w-12 text-[#0F13F6] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Final details</h3>
              <p className="text-gray-600">Tell us about your experience and time commitment</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, experience: level as any }))}
                      className={`p-3 rounded-lg border font-medium transition-all ${
                        formData.experience === level
                          ? 'border-gradient-to-r from-[#0F13F6] to-[#3B82F6] bg-gradient-to-r from-[#0F13F6]/30 to-[#3B82F6]/30 text-[#07021B]'
                          : 'border-gray-300 text-[#07021B] hover:border-gray-400'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Commitment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'part-time', label: 'Part-time', desc: 'Evenings & weekends' },
                    { value: 'full-time', label: 'Full-time', desc: 'Primary focus' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, timeCommitment: option.value as any }))}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        formData.timeCommitment === option.value
                          ? 'border-gradient-to-r from-[#0F13F6] to-[#3B82F6] bg-gradient-to-r from-[#0F13F6]/30 to-[#3B82F6]/30 text-[#07021B]'
                          : 'border-gray-300 text-[#07021B] hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-[#07021B]">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-[#0F13F6]">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-[#0F13F6] to-[#3B82F6]"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-[#07021B] hover:bg-gray-200'
            }`}
          >
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              type="submit"
              className="px-8 py-2 bg-gradient-to-r from-[#0F13F6] to-[#3B82F6] text-white rounded-lg font-medium hover:from-[#1015ff] hover:to-[#60a5fa] transition-all transform hover:scale-105"
            >
              Generate Ideas
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-gradient-to-r from-[#0F13F6] to-[#3B82F6] text-white rounded-lg font-medium hover:from-[#1015ff] hover:to-[#60a5fa] transition-all"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
