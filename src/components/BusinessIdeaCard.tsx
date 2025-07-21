import React, { useState } from 'react';
import { GeneratedIdea } from '../types/business';
import { TrendingUp, Clock, MapPin, Star, ChevronDown, ChevronUp, Heart } from 'lucide-react';

interface BusinessIdeaCardProps {
  idea: GeneratedIdea;
  onSave?: (idea: GeneratedIdea) => void;
  isSaved?: boolean;
}

const BusinessIdeaCard: React.FC<BusinessIdeaCardProps> = ({ idea, onSave, isSaved = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{idea.title}</h3>
              {onSave && (
                <button
                  onClick={() => onSave(idea)}
                  className={`p-1 rounded-full transition-colors ${
                    isSaved 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
            <p className="text-gray-600 mb-3">{idea.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(idea.difficulty)}`}>
                {idea.difficulty}
              </span>
              <div className="flex items-center gap-1 text-gray-500">
                <Star className="h-4 w-4" />
                <span className={`font-medium ${getMatchScoreColor(idea.matchScore)}`}>
                  {Math.round(idea.matchScore * 100)}% match
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Revenue</span>
            </div>
            <p className="text-green-600 font-semibold">{idea.revenue}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Time to Start</span>
            </div>
            <p className="text-blue-600 font-semibold">{idea.timeToStart}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Budget Range</span>
            </div>
            <p className="text-purple-600 font-semibold">
              ${idea.minBudget.toLocaleString()} - ${idea.maxBudget.toLocaleString()}
            </p>
          </div>
        </div>

        {idea.personalizedNotes.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h4 className="font-medium text-blue-900 mb-2">Personalized Insights</h4>
            <ul className="space-y-1">
              {idea.personalizedNotes.map((note, index) => (
                <li key={index} className="text-blue-800 text-sm flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-blue-800 hover:text-blue-900 font-medium transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More Details'}
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Getting Started</h4>
              <ol className="space-y-2">
                {idea.steps.map((step, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-green-700 mb-2">Pros</h4>
                <ul className="space-y-1">
                  {idea.pros.map((pro, index) => (
                    <li key={index} className="flex items-center text-sm text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-700 mb-2">Cons</h4>
                <ul className="space-y-1">
                  {idea.cons.map((con, index) => (
                    <li key={index} className="flex items-center text-sm text-red-700">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-3 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Market Size</h4>
                <p className="text-sm text-gray-600">{idea.marketSize}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessIdeaCard;