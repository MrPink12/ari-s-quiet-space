import { ArrowLeft, Users, Clock, MessageSquare, TrendingUp, Trash2 } from "lucide-react";
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
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Totala sessioner
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 denna vecka</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Genomsnittlig tid
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11 min</div>
            <p className="text-xs text-muted-foreground">Per session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Meddelanden idag
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Från 28 sessioner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avslutningsgrad
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Fullföljda sessioner</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Senaste sessioner</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Användare</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Längd</TableHead>
                <TableHead>Antal frågor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.user}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>{session.questions}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        session.status === "Avslutad"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {session.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
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
      <Card>
        <CardHeader>
          <CardTitle>Systemloggar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            {mockLogs.map((log, index) => (
              <div
                key={index}
                className={`flex gap-4 p-2 rounded ${
                  log.type === "warning"
                    ? "bg-yellow-50 dark:bg-yellow-900/20"
                    : "bg-muted/50"
                }`}
              >
                <span className="text-muted-foreground">{log.time}</span>
                <span
                  className={`uppercase text-xs font-bold ${
                    log.type === "warning" ? "text-yellow-600" : "text-blue-600"
                  }`}
                >
                  {log.type}
                </span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
