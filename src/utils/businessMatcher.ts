import { BusinessIdea, UserProfile, GeneratedIdea } from '../types/business';
import { businessIdeas } from '../data/businessIdeas';

export class BusinessMatcher {
  static generateIdeas(profile: UserProfile): GeneratedIdea[] {
    const matchedIdeas = businessIdeas
      .map(idea => ({
        ...idea,
        matchScore: this.calculateMatchScore(idea, profile),
        personalizedNotes: this.generatePersonalizedNotes(idea, profile)
      }))
      .filter(idea => idea.matchScore > 0.3)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    return matchedIdeas;
  }

  private static calculateMatchScore(idea: BusinessIdea, profile: UserProfile): number {
    let score = 0;
    let maxScore = 0;

    // Budget compatibility (30% weight)
    const budgetWeight = 0.3;
    maxScore += budgetWeight;
    if (profile.budget >= idea.minBudget && profile.budget <= idea.maxBudget * 1.5) {
      score += budgetWeight;
    } else if (profile.budget >= idea.minBudget * 0.7) {
      score += budgetWeight * 0.7;
    }

    // Location compatibility (20% weight)
    const locationWeight = 0.2;
    maxScore += locationWeight;
    if (idea.locationTypes.includes(profile.location)) {
      score += locationWeight;
    }

    // Skills match (25% weight)
    const skillsWeight = 0.25;
    maxScore += skillsWeight;
    const skillMatches = idea.skills.filter(skill => 
      profile.skills.includes(skill) || profile.interests.includes(skill)
    ).length;
    const skillScore = skillMatches / Math.max(idea.skills.length, 1);
    score += skillsWeight * skillScore;

    // Experience level (15% weight)
    const experienceWeight = 0.15;
    maxScore += experienceWeight;
    const experienceMatch = this.getExperienceMatch(idea.difficulty, profile.experience);
    score += experienceWeight * experienceMatch;

    // Interest alignment (10% weight)
    const interestWeight = 0.1;
    maxScore += interestWeight;
    const categoryInterest = profile.interests.some(interest => 
      idea.category.toLowerCase().includes(interest.toLowerCase()) ||
      idea.title.toLowerCase().includes(interest.toLowerCase()) ||
      idea.description.toLowerCase().includes(interest.toLowerCase())
    );
    if (categoryInterest) {
      score += interestWeight;
    }

    return Math.min(score / maxScore, 1);
  }

  private static getExperienceMatch(difficulty: string, experience: string): number {
    const difficultyMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    const experienceMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
    
    const diffLevel = difficultyMap[difficulty as keyof typeof difficultyMap];
    const expLevel = experienceMap[experience as keyof typeof experienceMap];
    
    if (diffLevel === expLevel) return 1;
    if (Math.abs(diffLevel - expLevel) === 1) return 0.8;
    return 0.5;
  }

  private static generatePersonalizedNotes(idea: BusinessIdea, profile: UserProfile): string[] {
    const notes: string[] = [];

    // Budget-specific notes
    if (profile.budget > idea.maxBudget) {
      notes.push(`Your budget allows for premium equipment and faster scaling opportunities.`);
    } else if (profile.budget < idea.minBudget * 1.2) {
      notes.push(`Consider starting smaller or seeking additional funding to meet recommended budget.`);
    }

    // Location-specific notes
    if (profile.location === 'urban' && idea.locationTypes.includes('urban')) {
      notes.push(`Urban location provides high customer density and networking opportunities.`);
    } else if (profile.location === 'rural' && idea.locationTypes.includes('online')) {
      notes.push(`Online business model overcomes rural location limitations effectively.`);
    }

    // Skills-based notes
    const matchingSkills = idea.skills.filter(skill => profile.skills.includes(skill));
    if (matchingSkills.length > 0) {
      notes.push(`Your ${matchingSkills.join(' and ')} skills give you a strong foundation for this business.`);
    }

    // Experience notes
    if (profile.experience === 'beginner' && idea.difficulty === 'Beginner') {
      notes.push(`Perfect starter business with manageable complexity and learning curve.`);
    } else if (profile.experience === 'advanced' && idea.difficulty === 'Advanced') {
      notes.push(`Leverages your experience for a high-potential, sophisticated business opportunity.`);
    }

    return notes;
  }
}