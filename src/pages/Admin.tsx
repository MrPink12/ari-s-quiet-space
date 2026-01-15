import { ArrowLeft, Users, Clock, MessageSquare, TrendingUp, Trash2, Database, Brain, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AriLogo } from "@/components/ari/AriLogo";
import ariBackground from "@/assets/ari-background.jpg";

// Mock data - later this will come from a database
const mockSessions = [
  { id: 1, user: "Anna", date: "2026-01-15", duration: "12 min", questions: 24, status: "Avslutad" },
  { id: 2, user: "Erik", date: "2026-01-15", duration: "8 min", questions: 16, status: "Avslutad" },
  { id: 3, user: "Maria", date: "2026-01-14", duration: "15 min", questions: 32, status: "Avslutad" },
  { id: 4, user: "Johan", date: "2026-01-14", duration: "5 min", questions: 10, status: "Avbruten" },
  { id: 5, user: "Lisa", date: "2026-01-13", duration: "20 min", questions: 45, status: "Avslutad" },
];

const mockLogs = [
  { time: "14:32:15", type: "info", message: "Session startad för användare Anna" },
  { time: "14:44:20", type: "info", message: "Session avslutad för användare Anna" },
  { time: "14:25:00", type: "warning", message: "Lång svarstid från AI (3.2s)" },
  { time: "14:10:45", type: "info", message: "Session startad för användare Erik" },
  { time: "14:18:30", type: "info", message: "Session avslutad för användare Erik" },
];

export default function Admin() {
  return (
    <div 
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url(${ariBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" asChild className="text-foreground/70 hover:text-foreground hover:bg-white/10">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <AriLogo size="sm" variant="light" language="sv" />
          <h1 className="text-xl font-semibold text-foreground/90">Admin Dashboard</h1>
        </div>
        
        {/* Status Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full ari-glass">
            <Server className="h-4 w-4 text-foreground/70" />
            <span className="text-sm text-foreground/70">Backend</span>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full ari-glass">
            <Brain className="h-4 w-4 text-foreground/70" />
            <span className="text-sm text-foreground/70">LLM</span>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full ari-glass">
            <Database className="h-4 w-4 text-foreground/70" />
            <span className="text-sm text-foreground/70">Databas</span>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="ari-glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Totala sessioner
            </CardTitle>
            <Users className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <p className="text-xs text-foreground/50">+12 denna vecka</p>
          </CardContent>
        </Card>

        <Card className="ari-glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Genomsnittlig tid
            </CardTitle>
            <Clock className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">11 min</div>
            <p className="text-xs text-foreground/50">Per session</p>
          </CardContent>
        </Card>

        <Card className="ari-glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Sessioner idag
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">28</div>
            <p className="text-xs text-foreground/50">342 frågor totalt</p>
          </CardContent>
        </Card>

        <Card className="ari-glass border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">
              Avslutningsgrad
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">92%</div>
            <p className="text-xs text-foreground/50">Fullföljda sessioner</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card className="mb-8 ari-glass border-white/20">
        <CardHeader>
          <CardTitle className="text-foreground/90">Senaste sessioner</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-foreground/70">Användare</TableHead>
                <TableHead className="text-foreground/70">Datum</TableHead>
                <TableHead className="text-foreground/70">Längd</TableHead>
                <TableHead className="text-foreground/70">Antal frågor</TableHead>
                <TableHead className="text-foreground/70">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map((session) => (
                <TableRow key={session.id} className="border-white/10">
                  <TableCell className="font-medium text-foreground">{session.user}</TableCell>
                  <TableCell className="text-foreground/80">{session.date}</TableCell>
                  <TableCell className="text-foreground/80">{session.duration}</TableCell>
                  <TableCell className="text-foreground/80">{session.questions}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        session.status === "Avslutad"
                          ? "bg-green-500/20 text-green-700 dark:text-green-400"
                          : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {session.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground/50 hover:text-destructive hover:bg-white/10"
                      onClick={() => console.log("Delete session", session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Logs */}
      <Card className="ari-glass border-white/20">
        <CardHeader>
          <CardTitle className="text-foreground/90">Systemloggar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            {mockLogs.map((log, index) => (
              <div
                key={index}
                className={`flex gap-4 p-2 rounded ${
                  log.type === "warning"
                    ? "bg-yellow-500/10"
                    : "bg-white/10"
                }`}
              >
                <span className="text-foreground/50">{log.time}</span>
                <span
                  className={`uppercase text-xs font-bold ${
                    log.type === "warning" ? "text-yellow-600" : "text-blue-500"
                  }`}
                >
                  {log.type}
                </span>
                <span className="text-foreground/80">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
