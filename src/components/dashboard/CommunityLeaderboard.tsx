import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Dumbbell, Weight, TrendingUp, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardEntry {
  rank: number;
  username: string;
  value: number | string;
  isCurrentUser?: boolean;
}

interface ExerciseLeaderboard {
  exerciseName: string;
  unit: string;
  entries: LeaderboardEntry[];
}

interface CommunityLeaderboardProps {
  inCommunity: boolean;
}

const CommunityLeaderboard = ({ inCommunity }: CommunityLeaderboardProps) => {
  // Mock leaderboard data for "Platform" community - Individual exercise leaderboards
  // TODO: API call to fetch leaderboard data for each exercise
  // GET /api/communities/platform/leaderboards
  
  const liftingLeaderboards: ExerciseLeaderboard[] = [
    {
      exerciseName: "Squat",
      unit: "kg",
      entries: [
        { rank: 1, username: "PowerLifter", value: 180, isCurrentUser: false },
        { rank: 2, username: "IronWarrior", value: 175, isCurrentUser: false },
        { rank: 3, username: "FitMaster99", value: 165, isCurrentUser: false },
        { rank: 4, username: "Guest", value: 0, isCurrentUser: true },
      ]
    },
    {
      exerciseName: "Bench Press",
      unit: "kg",
      entries: [
        { rank: 1, username: "IronWarrior", value: 140, isCurrentUser: false },
        { rank: 2, username: "PowerLifter", value: 135, isCurrentUser: false },
        { rank: 3, username: "FitMaster99", value: 125, isCurrentUser: false },
        { rank: 4, username: "Guest", value: 0, isCurrentUser: true },
      ]
    },
    {
      exerciseName: "Deadlift",
      unit: "kg",
      entries: [
        { rank: 1, username: "PowerLifter", value: 220, isCurrentUser: false },
        { rank: 2, username: "IronWarrior", value: 205, isCurrentUser: false },
        { rank: 3, username: "FitMaster99", value: 195, isCurrentUser: false },
        { rank: 4, username: "Guest", value: 0, isCurrentUser: true },
      ]
    },
  ];

  const bodyweightLeaderboards: ExerciseLeaderboard[] = [
    {
      exerciseName: "Pull-ups",
      unit: "reps",
      entries: [
        { rank: 1, username: "FitMaster99", value: 45, isCurrentUser: false },
        { rank: 2, username: "CardioKing", value: 42, isCurrentUser: false },
        { rank: 3, username: "IronWarrior", value: 38, isCurrentUser: false },
        { rank: 4, username: "Guest", value: 0, isCurrentUser: true },
      ]
    },
    {
      exerciseName: "Push-ups",
      unit: "reps",
      entries: [
        { rank: 1, username: "FitMaster99", value: 85, isCurrentUser: false },
        { rank: 2, username: "CardioKing", value: 78, isCurrentUser: false },
        { rank: 3, username: "IronWarrior", value: 72, isCurrentUser: false },
        { rank: 4, username: "Guest", value: 0, isCurrentUser: true },
      ]
    },
  ];

  const cardioLeaderboards: ExerciseLeaderboard[] = [
    {
      exerciseName: "5K Run",
      unit: "min",
      entries: [
        { rank: 1, username: "CardioKing", value: "18:45", isCurrentUser: false },
        { rank: 2, username: "FitMaster99", value: "19:20", isCurrentUser: false },
        { rank: 3, username: "IronWarrior", value: "21:15", isCurrentUser: false },
        { rank: 4, username: "Guest", value: "—", isCurrentUser: true },
      ]
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-accent" />;
      case 2:
        return <Medal className="w-4 h-4 text-muted-foreground" />;
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return <span className="w-4 h-4 flex items-center justify-center text-xs font-semibold text-muted-foreground">{rank}</span>;
    }
  };

  const renderLeaderboard = (leaderboard: ExerciseLeaderboard) => (
    <div key={leaderboard.exerciseName} className="mb-6">
      <h4 className="font-semibold text-sm mb-3 text-muted-foreground">{leaderboard.exerciseName}</h4>
      <div className="space-y-2">
        {leaderboard.entries.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
              entry.isCurrentUser
                ? "bg-primary/10 border border-primary/30"
                : "bg-secondary/30"
            }`}
          >
            <div className="flex items-center gap-2">
              {getRankIcon(entry.rank)}
              <span className={`text-sm font-medium ${entry.isCurrentUser ? "text-primary" : ""}`}>
                {entry.username}
              </span>
              {entry.isCurrentUser && (
                <Badge variant="outline" className="text-xs py-0 h-5">You</Badge>
              )}
            </div>
            <span className="font-bold text-sm text-accent">
              {entry.value === 0 || entry.value === "—" ? "—" : `${entry.value}${leaderboard.unit}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (!inCommunity) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Personal Records</CardTitle>
          <CardDescription>You're not part of any community yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Join a community to see leaderboards and compete with other members!
            </p>
            <Badge variant="secondary">Track your PRs privately</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="w-5 h-5 text-accent" />
          Platform Leaderboards
        </CardTitle>
        <CardDescription>Top performers by exercise</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        <Tabs defaultValue="lifting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="lifting" className="text-xs gap-1">
              <Dumbbell className="w-3 h-3" />
              Lifting
            </TabsTrigger>
            <TabsTrigger value="bodyweight" className="text-xs gap-1">
              <Activity className="w-3 h-3" />
              Bodyweight
            </TabsTrigger>
            <TabsTrigger value="cardio" className="text-xs gap-1">
              <TrendingUp className="w-3 h-3" />
              Cardio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lifting" className="mt-0">
            {liftingLeaderboards.map(renderLeaderboard)}
          </TabsContent>

          <TabsContent value="bodyweight" className="mt-0">
            {bodyweightLeaderboards.map(renderLeaderboard)}
          </TabsContent>

          <TabsContent value="cardio" className="mt-0">
            {cardioLeaderboards.map(renderLeaderboard)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunityLeaderboard;
