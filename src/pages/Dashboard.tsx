import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Play, 
  MessageSquare, 
  Clock,
  Target,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">AI</span>
              </div>
              <span className="font-bold text-xl">InterviewPro</span>
            </Link>
            <Link to="/interview">
              <Button variant="hero">New Interview</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-primary/10 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                  <p className="text-3xl font-bold text-primary">8.5/10</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                  <p className="text-3xl font-bold text-primary">85%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="text-3xl font-bold text-primary">12:34</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Filler Words</p>
                  <p className="text-3xl font-bold text-primary">7</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <Card className="shadow-card border-primary/10 animate-fade-in">
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <CardDescription>Your performance across key interview skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Communication Clarity</span>
                      <span className="text-sm font-medium text-primary">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Confidence & Tone</span>
                      <span className="text-sm font-medium text-primary">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Response Quality</span>
                      <span className="text-sm font-medium text-primary">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Speech Pace</span>
                      <span className="text-sm font-medium text-primary">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Body Language</span>
                      <span className="text-sm font-medium text-primary">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Feedback */}
            <Card className="shadow-card border-primary/10 animate-fade-in">
              <CardHeader>
                <CardTitle>AI-Generated Feedback</CardTitle>
                <CardDescription>Personalized recommendations to improve your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="strengths">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="strengths">Strengths</TabsTrigger>
                    <TabsTrigger value="improvements">Areas to Improve</TabsTrigger>
                  </TabsList>
                  <TabsContent value="strengths" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex gap-3 p-3 rounded-lg bg-gradient-card border border-primary/10">
                        <Target className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Clear Communication</p>
                          <p className="text-sm text-muted-foreground">
                            Your responses were well-structured and easy to follow. You maintained excellent eye contact throughout.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 rounded-lg bg-gradient-card border border-primary/10">
                        <Target className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Confident Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            You demonstrated strong confidence with a steady voice and appropriate pauses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="improvements" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex gap-3 p-3 rounded-lg bg-gradient-card border border-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Reduce Filler Words</p>
                          <p className="text-sm text-muted-foreground">
                            Try to minimize words like "um" and "like". Practice pausing instead when you need time to think.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 rounded-lg bg-gradient-card border border-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Add More Examples</p>
                          <p className="text-sm text-muted-foreground">
                            Support your answers with specific examples from your experience to make them more compelling.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Recording */}
            <Card className="shadow-card border-primary/10 animate-fade-in">
              <CardHeader>
                <CardTitle>Interview Recording</CardTitle>
                <CardDescription>Review your complete interview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <Button variant="hero" size="lg" className="rounded-full w-16 h-16">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Recording
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card border-primary/10 animate-fade-in">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Speech Rate</span>
                    <Badge variant="secondary">145 WPM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Questions Answered</span>
                    <Badge variant="secondary">5/5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Response Time</span>
                    <Badge variant="secondary">2:30</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sentiment</span>
                    <Badge variant="secondary">Positive 😊</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="shadow-card border-primary/10 animate-fade-in">
              <CardContent className="pt-6 space-y-3">
                <Button variant="hero" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Link to="/interview" className="block">
                  <Button variant="secondary" className="w-full">
                    Practice Again
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
