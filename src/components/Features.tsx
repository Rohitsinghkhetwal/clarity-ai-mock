import { Brain, LineChart, MessageSquare, Mic, TrendingUp, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Video,
    title: "Real-Time Video Analysis",
    description: "AI analyzes your body language, facial expressions, and presentation skills during the interview."
  },
  {
    icon: Mic,
    title: "Speech Recognition",
    description: "Advanced speech-to-text technology transcribes and analyzes your responses in real-time."
  },
  {
    icon: Brain,
    title: "AI-Powered Feedback",
    description: "Get instant, actionable feedback on your answers, tone, and overall interview performance."
  },
  {
    icon: MessageSquare,
    title: "Filler Word Detection",
    description: "Track and reduce filler words like 'um', 'uh', and 'like' to improve your communication."
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Detailed metrics on confidence, clarity, pace, and sentiment to track your improvement."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your growth over time with comprehensive analytics and personalized recommendations."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Powerful Features to{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Boost Your Skills
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform provides everything you need to master your interview skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-card animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
