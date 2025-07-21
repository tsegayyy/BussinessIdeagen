import React from 'react';
import { Lightbulb, Sliders, BrainCircuit } from 'lucide-react';

const steps = [
  {
    icon: <Lightbulb size={48} className="text-gray-600 group-hover:text-white transition-colors duration-300" />,
    title: 'Input Your Details',
    description: 'Tell us about your interests, skills, and how much you\'re willing to invest in your future business venture.',
  },
  {
    icon: <Sliders size={48} className="text-gray-600 group-hover:text-white transition-colors duration-300" />,
    title: 'AI Analysis',
    description: 'Our advanced AI system thoroughly analyzes your profile to match the most suitable business opportunities for you.',
  },
  {
    icon: <BrainCircuit size={48} className="text-gray-600 group-hover:text-white transition-colors duration-300" />,
    title: 'Get Personalized Ideas',
    description: 'Receive carefully curated business ideas perfectly tailored to your profile, complete with market insights and trends.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-28 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-20 text-gray-900"> {/* Changed to dark gray/black */}
          How Infinity Business Ideas Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group rounded-3xl p-12 min-h-[420px] flex flex-col bg-white
                         text-gray-600 shadow-lg hover:shadow-2xl transition-all duration-500
                         border border-gray-200 hover:border-transparent relative overflow-hidden
                         hover:bg-gradient-to-br hover:from-[#07021B]/80 hover:to-[#0F13F6]/80
                         hover:backdrop-blur-sm hover:text-white
                         before:absolute before:inset-0 
                         before:bg-[radial-gradient(circle_at_center,_#0F13F6_0%,_transparent_70%)] 
                         before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-30"
            >
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
                <div className="w-24 h-24 flex items-center justify-center rounded-full mb-10 mx-auto
                              bg-gray-100 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-center group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-500 group-hover:text-white/90 text-center leading-relaxed px-4 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;