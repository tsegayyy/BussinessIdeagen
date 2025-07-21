import React, { useState } from 'react';
import { GeneratedIdea } from '../types/business';
import BusinessIdeaCard from './BusinessIdeaCard';
import { ArrowLeft, Filter, SortAsc } from 'lucide-react';

interface ResultsViewProps {
  ideas: GeneratedIdea[];
  onBack: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ ideas, onBack }) => {
  const [savedIdeas, setSavedIdeas] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'match' | 'budget' | 'revenue'>('match');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const handleSaveIdea = (idea: GeneratedIdea) => {
    setSavedIdeas(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idea.id)) {
        newSet.delete(idea.id);
      } else {
        newSet.add(idea.id);
      }
      return newSet;
    });
  };

  const filteredAndSortedIdeas = ideas
    .filter(idea => filterDifficulty === 'all' || idea.difficulty === filterDifficulty)
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'budget':
          return a.minBudget - b.minBudget;
        case 'revenue':
          // Simple revenue comparison based on first number in revenue string
          const aRevenue = parseInt(a.revenue.replace(/[^0-9]/g, ''));
          const bRevenue = parseInt(b.revenue.replace(/[^0-9]/g, ''));
          return bRevenue - aRevenue;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Form
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="match">Best Match</option>
                <option value="budget">Lowest Budget</option>
                <option value="revenue">Highest Revenue</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Personalized Business Ideas
          </h2>
          <p className="text-gray-600">
            We found {filteredAndSortedIdeas.length} business ideas tailored to your profile
          </p>
        </div>

        {savedIdeas.size > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">
              Saved Ideas ({savedIdeas.size})
            </h3>
            <p className="text-purple-700 text-sm">
              You've saved {savedIdeas.size} idea{savedIdeas.size !== 1 ? 's' : ''} for later review.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedIdeas.map((idea) => (
            <BusinessIdeaCard
              key={idea.id}
              idea={idea}
              onSave={handleSaveIdea}
              isSaved={savedIdeas.has(idea.id)}
            />
          ))}
        </div>

        {filteredAndSortedIdeas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No business ideas match your current filters.
            </p>
            <button
              onClick={() => {
                setFilterDifficulty('all');
                setSortBy('match');
              }}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsView;