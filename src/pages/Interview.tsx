import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Mic, Pause, Square, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Interview = () => {
  const location = useLocation();
  const { role, company } = location.state || {};

  const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [confidence] = useState(75);
  const [fillerWords] = useState(3);
  const [progress] = useState(40);

  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [transcription, setTransscription] = useState("");
  const [InterviewData, setInterviewData] = useState(null);
  const [questionReady, setQuestionReady] = useState(null);


  const userIdData = localStorage.getItem("user");
  const userId = JSON.parse(userIdData);


  const playAudio = () => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }
};




  useEffect(() => {
    socketRef.current = io("http://localhost:8000", {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connection", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    // socket.emit("join-interview", {
    //   userId: "jdfsdfj",
    // });

    socket.on('recording-started', () => {
      console.log("Recording started ===")

    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      // setInterviewStatus('Disconnected');
    });

    socket.on("question-ready", (data) => {
      console.log("this is the data", data);
      setQuestionReady(data);
    });

    socket.on("interview-ended", (data) => {
      console.log("Interview ended:", data);
      // setInterviewStatus('Interview Ended');
    });

    socket.on("interview-completed", (data) => {
      console.log("this is the data", data);
    });

    socket.on('transcription-update', (data) => {
      console.log("Transcription update", data)
    })

    socket.on('interview-completed', (data) => {
      console.log("interview completed", data)
    })

    return () => {
      if (socket) {
        socket.off("connection");
        socket.off("join-interview");

        socket.disconnect();
      }
    };
  }, []);

  const handleStartInterview = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/start`,
        {
          company,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      setInterviewData(result);
      
      console.log("Result", result);
      if (socketRef.current) {
        socketRef.current.emit("join-interview", {
          sessionId: result.session.id,
          userId: userId.id,
        });
      }
    } catch (err) {
      console.log("Something went wrong while starting interview", err);
    }
  };

  useEffect(() => {
    if(!InterviewData?.session?.id) {
      handleStartInterview();
    } 
  }, []);

  //bug in the function

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(!isRecording)

      mediaRecorder.ondataavailable = (event) => {
        console.log("this is event .data size", event.data.size)
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            socketRef.current.emit('audio-chunk', {
              audioData: reader.result,
              sessionId:InterviewData.session.id
            });
            socketRef.current.emit('start-recording', {
              sessionId:InterviewData.session.id
            })
          };

          reader.readAsArrayBuffer(event.data);
        }
      };
    }catch(err) {
      console.log("Something went wrong", err);
    }
  }

  const handleNextFunction = async () => {
    socketRef.current.emit('skip-question', {
      sessionId: InterviewData.session.id 
    })

  }

  // fetch the sessionId when the user press the next question

  //fetch the session id from the backend
  // pass it to backend

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
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Question {questionReady?.questionNumber} of{" "}
                {questionReady?.totalQuestions}
              </Badge>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  End Interview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            <Card className="overflow-hidden shadow-card border-primary/10">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-24 w-24 text-primary/40" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive" className="animate-pulse-glow">
                      <div className="w-2 h-2 bg-white rounded-full mr-2" />
                      Recording
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Current Question</h2>
                  <audio
                    ref={audioRef}
                    src={questionReady?.question.audioUrl}
                    onEnded={() => setIsPlaying(false)}
                  />
                  <Button variant="ghost" size="sm" onClick={playAudio}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Repeat
                  </Button>
                </div>
                <p className="text-lg text-muted-foreground">
                  {questionReady?.question?.questionText}
                </p>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Time remaining: {Math.floor((5 - progress / 20) * 60)} seconds
                </p>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                variant={isRecording ? "secondary" : "hero"}
                size="lg"
                onClick={startRecording}
              >
                {isRecording ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Start Speaking
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={handleNextFunction}>
                <SkipForward className="h-5 w-5 mr-2" />
                Next Question
              </Button>
              <Button variant="destructive" size="lg">
                <Square className="h-5 w-5 mr-2" />
                End
              </Button>
            </div>
          </div>

          {/* Real-time Feedback Sidebar */}
          <div className="space-y-6">
            {/* Transcription */}
            <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg">Live Transcription</h3>
                <div className="bg-secondary/30 rounded-lg p-4 min-h-[120px] max-h-[200px] overflow-y-auto">
                  <p className="text-sm text-muted-foreground italic">
                    Your speech will appear here in real-time...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Meter */}
            <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Confidence Level</h3>
                  <Badge variant="secondary">{confidence}%</Badge>
                </div>
                <Progress value={confidence} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold">Sentiment Analysis</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">😊</div>
                    <p className="text-sm text-muted-foreground">Positive</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filler Words Counter */}
            <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold">Filler Words Detected</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {fillerWords}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total count this session
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>"Um"</span>
                    <Badge variant="secondary">2x</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>"Like"</span>
                    <Badge variant="secondary">1x</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speech Pace */}
            <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold">Speech Pace</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    145
                  </div>
                  <p className="text-sm text-muted-foreground">
                    words per minute
                  </p>
                </div>
                <Badge variant="secondary" className="w-full justify-center">
                  Optimal Range: 140-160 WPM
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
