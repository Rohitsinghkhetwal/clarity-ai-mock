import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Mic, Pause, Square, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useStore from "@/Store/Store";

const Interview = () => {
  const location = useLocation();
  const { setCompletionData } = useStore();
  const navigate = useNavigate();
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
  const [transcription, setTranscription] = useState("");
  console.log("transcription is here ===> ", transcription)
  const [InterviewData, setInterviewData] = useState<any>(null);
  console.log("this is the Interview data ", InterviewData)

  // console.log("INTERVIEW DATA ", InterviewData?.session?.currentQuestion);
  const [questionReady, setQuestionReady] = useState<any>(null);
  const [currentquestionIndex , setcurrentquestionIndex] = useState(0)

  const totalQuestion = questionReady?.totalQuestions


  const progressBar = ((currentquestionIndex + 1) / totalQuestion) * 100

  // console.log("question ", questionReady?.question?.questionText);

  console.log("transcription here ==> ")

  const userIdData = localStorage.getItem("user");
  const userId = JSON.parse(userIdData || "{}");

  // const playAudio = async () => {
  //   console.log("Playing audio");
  //   if (audioRef.current) {
  //     try {
  //       if (isPlaying) {
  //         audioRef.current.pause();
  //         setIsPlaying(false);
  //       } else {
  //         if (audioRef.current.readyState < 2) {
  //           audioRef.current.load();
  //         }
  //         await audioRef.current.play();
  //         setIsPlaying(true);
  //       }
  //     } catch (error: any) {
  //       console.error("Audio playback error:", error);
  //       if (error.name === "AbortError") {
  //         try {
  //           audioRef.current.load();
  //           await audioRef.current.play();
  //           setIsPlaying(true);
  //         } catch (retryError) {
  //           console.error("Retry failed:", retryError);
  //           setIsPlaying(false);
  //         }
  //       } else {
  //         setIsPlaying(false);
  //       }
  //     }
  //   }
  // };

  const speakText = (text: any) => {
    console.log("clicked  ____")
    if (!("speechSynthesis" in window)) {
      alert("Speech faild !");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1; 
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance)
  };

  // speech when interview started 

  useEffect(() => {
    speakText(questionReady?.question?.questionText)

  },[questionReady])

  useEffect(() => {
    socketRef.current = io("http://localhost:8000", {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("recording-started", () => {
      console.log("Recording started from server");
    });

    socket.on("question-ready", (data) => {
      console.log("Question ready:", data);
      setQuestionReady(data);
    });

    socket.on("interview-ended", (data) => {
      console.log("Interview ended:", data);
    });

    socket.on("interview-completed", (data) => {
      console.log("Interview completed:", data);
      setCompletionData(data);
    });

    // Handle all possible transcription event names
    socket.on("transcription", (data) => {
      console.log("Transcription received:", data);
      handleTranscriptionUpdate(data);
    });

    socket.on("transcription-update", (data) => {
      console.log("Transcription update:", data);
      handleTranscriptionUpdate(data);
    });

    socket.on("transcript", (data) => {
      console.log("Transcript:", data);
      handleTranscriptionUpdate(data);
    });

    socket.on("error", (data) => {
      console.error("Socket error:", data);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("recording-started");
        socket.off("question-ready");
        socket.off("interview-ended");
        socket.off("interview-completed");
        socket.off("transcription");
        socket.off("transcription-update");
        socket.off("transcript");
        socket.off("error");
        socket.disconnect();
      }
    };
  }, []);

  // Handle transcription updates
  const handleTranscriptionUpdate = (data: any) => {
    let text = "";

    if (typeof data === "string") {
      text = data;
    } else if (data?.text) {
      text = data.text;
    } else if (data?.transcript) {
      text = data.transcript;
    } else if (data?.results) {
      // AWS Transcribe format
      const transcripts = data.results.transcripts;
      if (transcripts && transcripts.length > 0) {
        text = transcripts[0].transcript;
      }
    }

    if (text) {
      setTranscription((prev) => (prev ? `${prev} ${text}` : text));
    }
  };

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

      console.log("Interview started:", result);

      if (socketRef.current) {
        socketRef.current.emit("join-interview", {
          sessionId: result.session.id,
          userId: userId.id,
        });
      }
    } catch (err) {
      console.error("Failed to start interview:", err);
      alert("Failed to start interview. Please try again.");
    }
  };

  useEffect(() => {
    if (!InterviewData?.session?.id) {
      handleStartInterview();
    }
  }, []);

 
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)({
        sampleRate: 16000, // AWS expects 16kHz
      });

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e: any) => {
        const input = e.inputBuffer.getChannelData(0);
        const buffer = new ArrayBuffer(input.length * 2);
        const view = new DataView(buffer);

        for (let i = 0; i < input.length; i++) {
          let s = Math.max(-1, Math.min(1, input[i]));
          view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }

        // Send raw PCM16 audio to backend
        socketRef.current?.emit("audio-chunk", {
          audioData: buffer,
          sessionId: InterviewData.session.id,
        });
      };

      // Notify backend we're starting transcription
      socketRef.current?.emit("start-recording", {
        sessionId: InterviewData.session.id,
        sampleRate: 16000,
      });

      setIsRecording(true);
      console.log("🎙️ Started streaming PCM audio to backend");
    } catch (err) {
      console.error("Microphone error:", err);
    }
  }

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("Track stopped:", track.kind);
      });
      streamRef.current = null;
    }

    setIsRecording(false);

    socketRef.current?.emit("stop-recording", {
      sessionId: InterviewData.session.id,
    });
  };

  const handleNextFunction = async () => {
    // Clear transcription for next question
    if(currentquestionIndex < totalQuestion - 1) {
      setcurrentquestionIndex(prev => prev + 1)
    }
    setTranscription("");

    // Stop current recording
    stopRecording();

    socketRef.current?.emit("skip-question", {
      sessionId: InterviewData.session.id,
    });
  };

  const endInterView = async () => {
    try {
      // Stop recording
      stopRecording();

      // Emit end-interview event
      socketRef.current?.emit("end-interview", {
        sessionId: InterviewData.session.id,
      });

      // Small delay to ensure event is sent
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Disconnect socket
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    } catch (error) {
      console.error("Error ending interview:", error);
    } finally {
      navigate("/dashboard");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  //fetching the api in the app for the submitting the answer and calling the api

  //when we will complete the interview so we will call the complete interview api and 
  
  const submitAnswer = async() => {
    try {
      const token = localStorage.getItem('token')
      const sessionId = InterviewData?.session?.id
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/interview/${sessionId}/answer`, {
        answer: transcription
      },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log("RESPONSE ", response)

    }catch(err) {
      console.error("Failed to submit answer")
      alert("Failed to submit answer:")

    }

  }

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
              <Badge
                variant={isConnected ? "secondary" : "destructive"}
                className="text-sm"
              >
                {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Question {questionReady?.questionNumber || 1} of{" "}
                {questionReady?.totalQuestions || "?"}
              </Badge>
              <Button variant="destructive" size="sm" onClick={endInterView}>
                End Interview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            {/* <Card className="overflow-hidden shadow-card border-primary/10 bg-red-300">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-24 w-24 text-primary/40" />
                  </div>
                  {isRecording && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="animate-pulse-glow">
                        <div className="w-2 h-2 bg-white rounded-full mr-2" />
                        Recording
                      </Badge>
                    </div>
                  )}
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
            </Card> */}

            <Card className="overflow-hidden shadow-card border-primary/10">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="absolute inset-0 overflow-y-auto p-6">
                    <div className="text-primary/90 whitespace-pre-wrap">
                      {transcription || (
                        <div className="flex items-center justify-center h-full text-primary/40">
                          Transcription will appear here...
                        </div>
                      )}
                    </div>
                  </div>
                  {isRecording && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="destructive"
                        className="animate-pulse-glow"
                      >
                        <div className="w-2 h-2 bg-white rounded-full mr-2" />
                        Recording
                      </Badge>
                    </div>
                  )}
                  {/* <div className="absolute bottom-4 right-4 flex gap-2">
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
                  </div> */}
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
                    src={questionReady?.question?.audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    onError={(e) => {
                      console.error("Audio error:", e);
                      setIsPlaying(false);
                    }}
                  />
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => speakText(questionReady?.question?.questionText)}
                    
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    {isPlaying ? "Playing..." : "Repeat"}
                  </Button>
                </div>
                <p className="text-lg text-muted-foreground">
                  {questionReady?.question?.questionText ||
                    "Loading question..."}
                </p>
                <Progress value={progressBar} className="h-2" />
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
                disabled={!InterviewData?.session?.id}
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
              <Button variant="outline" size="lg" onClick={submitAnswer}>
                Submit Answer

              </Button>

              {/* We have to disable this button when all the question will be completed and mark as done */}
              <Button
                variant="outline"
                size="lg"
                onClick={handleNextFunction}
                disabled={!InterviewData?.session?.id}
              >
                <SkipForward className="h-5 w-5 mr-2" />
                Next Question
              </Button>
             
            </div>
            {/* <div className=" flex items-center justify-center">
              <Button variant="destructive" size="lg" onClick={endInterView}>
                <Square className="h-5 w-5 mr-2" />
                End
              </Button>

            </div> */}

             
          </div>

          {/* Real-time Feedback Sidebar */}
          <div className="space-y-6">
            {/* Transcription */}
            {/* <Card className="shadow-card border-primary/10">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center justify-between">
                  Live Transcription
                  {isRecording && (
                    <Badge variant="secondary" className="animate-pulse">
                      Listening...
                    </Badge>
                  )}
                </h3>
                <div className="bg-secondary/30 rounded-lg p-4 min-h-[120px] max-h-[200px] overflow-y-auto">
                  {transcription ? (
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {transcription}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      {isRecording
                        ? "Start speaking... Your speech will appear here in real-time"
                        : "Your speech will appear here in real-time"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card> */}

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
