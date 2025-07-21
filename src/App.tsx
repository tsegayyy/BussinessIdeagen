import React, { useState } from 'react';
import Header from './components/Header';
import UserProfileForm from './components/UserProfileForm';
import ResultsView from './components/ResultsView';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer'; // Import the Footer component
import { UserProfile, GeneratedIdea } from './types/business';
import { BusinessMatcher } from './utils/businessMatcher';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);

  const handleProfileSubmit = (profile: UserProfile) => {
    const ideas = BusinessMatcher.generateIdeas(profile);
    setGeneratedIdeas(ideas);
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow">
        {currentView === 'form' ? (
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Perfect Business Opportunity
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Answer a few questions about your interests, skills, and budget, and our AI will generate 
                personalized business ideas tailored just for you.
              </p>
            </div>

            <UserProfileForm onSubmit={handleProfileSubmit} />

            <div className="mt-16">
              <HowItWorks />
            </div>
          </div>
        ) : (
          <ResultsView ideas={generatedIdeas} onBack={handleBackToForm} />
        )}
      </main>

      <Footer /> {/* Add Footer component here */}
    </div>
  );
}

export default App;