import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Search, Terminal } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, path }: { icon: any, title: string, description: string, path: string }) {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(path)}
      className="card hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
        <Icon className="h-6 w-6 text-secondary" />
      </div>
      <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
      <p className="text-text-muted">{description}</p>
    </div>
  );
}

export default function FeaturesPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Terminal,
      title: 'Tech Score Analysis',
      description: 'Evaluate your technical profile against industry standards',
      path: '/results'
    },
    {
      icon: Search,
      title: 'Role Matcher',
      description: 'Compare your skills with job requirements',
      path: '/job-matcher'
    },
    {
      icon: Code,
      title: 'Tech Opportunities',
      description: 'Discover cutting-edge positions in software development',
      path: '/job-recommendations'
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Terminal className="w-8 h-8 text-secondary" />
          <h1 className="text-4xl font-bold text-center text-text">
            Developer Tools
          </h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}