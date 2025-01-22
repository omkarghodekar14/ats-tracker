import React from 'react';
import { Code, Terminal, Briefcase } from 'lucide-react';

function JobRecommendations() {
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      description: 'Join our innovative team building scalable cloud-native applications using React, Node.js, and AWS. Help architect and implement robust solutions for enterprise clients.',
      requiredSkills: ['React', 'Node.js', 'AWS', 'TypeScript', 'System Design'],
      salaryRange: '$120,000 - $180,000',
    },
    {
      id: 2,
      title: 'DevOps Engineer',
      description: 'Lead our infrastructure automation initiatives, implementing CI/CD pipelines and maintaining cloud infrastructure using modern DevOps practices.',
      requiredSkills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
      salaryRange: '$130,000 - $170,000',
    },
    {
      id: 3,
      title: 'AI/ML Engineer',
      description: 'Develop and deploy machine learning models to solve complex business problems, working with cutting-edge AI technologies and large-scale data systems.',
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Data Science'],
      salaryRange: '$140,000 - $190,000',
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Code className="w-8 h-8 text-secondary" />
          <h1 className="text-4xl font-bold text-text">
            Tech Opportunities
          </h1>
        </div>
        
        <div className="space-y-6">
          {mockJobs.map((job) => (
            <div key={job.id} className="card hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Terminal className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-text mb-3">
                    {job.title}
                  </h2>
                  <p className="text-text-muted mb-4">{job.description}</p>
                  
                  <div className="bg-background rounded-lg p-4 mb-4 border border-white/5">
                    <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-lg font-semibold text-accent">
                    {job.salaryRange}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobRecommendations;