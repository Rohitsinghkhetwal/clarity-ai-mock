
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Brain, BarChart3, Zap, MessageSquare, TrendingUp, CheckCircle2, ArrowRight, Play } from "lucide-react"

export function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Intelligent questions tailored to your target role and company",
      details:
        "Our AI analyzes job descriptions and generates role-specific interview questions that match real-world scenarios.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mic,
      title: "Voice Interview",
      description: "AI voice asks questions with real-time transcription",
      details: "Natural voice interaction with real-time speech-to-text transcription for seamless interview practice.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Filler Word Analysis",
      description: 'Track and eliminate filler words like "um", "uh", "like"',
      details:
        "Get detailed analytics on filler word usage and receive personalized tips to improve your speaking clarity.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analysis",
      description: "Live feedback on pace, tone, and confidence",
      details: "Monitor your speaking pace, vocal tone, and confidence levels as you answer questions in real-time.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageSquare,
      title: "Question Tracking",
      description: "Keep track of all questions and your responses",
      details: "Review your complete interview history with timestamps and performance metrics for each question.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Zap,
      title: "AI Feedback",
      description: "Comprehensive feedback and improvement suggestions",
      details:
        "Receive detailed AI-generated feedback highlighting strengths and areas for improvement with actionable tips.",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      {/* <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">InterviewAI</span>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
        </div>
      </header> */}

      {/* Hero Section */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Master Your Interviews with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Practice with AI-powered interviews tailored to your target role and company. Get real-time feedback and
            track your progress.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Play className="w-4 h-4" />
              Start Interview
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      
      </section> */}

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need to ace your interviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group cursor-pointer border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 p-6"
                onClick={() => setActiveFeature(index)}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>

        {/* Feature Detail */}
        <Card className="border border-border/50 p-8 bg-gradient-to-br from-card to-muted/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${features[activeFeature].color} p-3 mb-6`}>
                {(() => {
                  const Icon = features[activeFeature].icon
                  return <Icon className="w-full h-full text-white" />
                })()}
              </div>
              <h3 className="text-3xl font-bold mb-4">{features[activeFeature].title}</h3>
              <p className="text-lg text-muted-foreground mb-6">{features[activeFeature].details}</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-xl blur-2xl" />
              <img
                src={`/.jpg?height=400&width=400&query=${features[activeFeature].title} feature visualization`}
                alt={features[activeFeature].title}
                className="relative rounded-xl border border-border/50 w-full h-auto"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Interviews Completed", value: "50K+" },
            { label: "Success Rate", value: "94%" },
            { label: "Average Score Improvement", value: "+35%" },
            { label: "Active Users", value: "10K+" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border border-border/50 p-6 text-center hover:border-accent/50 transition-colors"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Select Role & Company",
              description: "Choose your target position and company to get tailored questions",
            },
            {
              step: "2",
              title: "Start Interview",
              description: "Listen to AI-generated questions and respond naturally",
            },
            {
              step: "3",
              title: "Real-Time Analysis",
              description: "Get instant feedback on filler words, pace, and tone",
            },
            {
              step: "4",
              title: "Review & Improve",
              description: "Access detailed reports and track your progress over time",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              {index < 3 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-accent to-transparent" />
              )}
              <Card className="border border-border/50 p-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Analysis Demo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border border-border/50 p-12">
          <h2 className="text-3xl font-bold mb-8">Real-Time Analysis in Action</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Filler Word Detection",
                items: ['Detects "um", "uh", "like"', "Tracks frequency", "Provides alternatives"],
              },
              {
                icon: TrendingUp,
                title: "Speaking Metrics",
                items: ["Pace analysis", "Tone detection", "Confidence scoring"],
              },
              {
                icon: CheckCircle2,
                title: "Quality Scoring",
                items: ["Answer relevance", "Completeness check", "Overall performance"],
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-card border border-border/50 rounded-lg p-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((subitem, subindex) => (
                      <li key={subindex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of candidates who have improved their interview skills with InterviewAI
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  )
}
