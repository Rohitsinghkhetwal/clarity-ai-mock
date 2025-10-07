import { CheckCircle, FileText, Video, BarChart } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Choose Interview Type",
    description: "Select from various job roles and industries to practice relevant interview scenarios."
  },
  {
    icon: Video,
    title: "Start Your Interview",
    description: "Answer AI-generated questions while the system analyzes your responses in real-time."
  },
  {
    icon: CheckCircle,
    title: "Receive Instant Feedback",
    description: "Get immediate insights on your performance, including tone, pace, and content quality."
  },
  {
    icon: BarChart,
    title: "Track Your Progress",
    description: "Review detailed analytics and watch your skills improve over time with personalized recommendations."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and see improvement in days
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-accent transform -translate-y-1/2" style={{ width: 'calc(100% - 200px)', margin: '0 100px' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center space-y-4 animate-fade-in relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow relative z-10">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-20">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
