import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trophy } from "lucide-react";
import { LeaderboardEntry } from "../../types/squares";

interface LeaderboardTableProps {
  gameMode: "type" | "click";
  entries: LeaderboardEntry[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  gameMode,
  entries,
}) => (
  <Card className="md:col-span-2">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Trophy className="h-6 w-6" />
        Leaderboard - {gameMode === "type" ? "Type Square" : "Find Square"}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>ELO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.user_name}</TableCell>
              <TableCell>{entry.time}s</TableCell>
              <TableCell>{entry.elo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
