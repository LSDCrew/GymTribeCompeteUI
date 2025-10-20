import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Dumbbell, Activity, Footprints } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiftingSection from "@/components/dashboard/LiftingSection";
import BodyweightSection from "@/components/dashboard/BodyweightSection";
import CardioSection from "@/components/dashboard/CardioSection";
import CommunityLeaderboard from "@/components/dashboard/CommunityLeaderboard";
import Navbar from "@/components/navigation/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("lifting");

  // Mock user data
  const user = JSON.parse(localStorage.getItem("user") || '{"username": "Guest"}');
  const inCommunity = true; // Mock: user is in "Platform" community

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
              <p className="text-sm text-muted-foreground">Track your fitness progress</p>
            </div>
          </div>
          {inCommunity && (
            <div className="flex items-center gap-2 text-sm bg-primary/10 px-4 py-2 rounded-lg">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary">Platform Community</span>
            </div>
          )}
        </div>
      </header>

      {/* Communities Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl">Performance Tracking</CardTitle>
                <CardDescription className="text-base">
                  Log your exercises and view your personal records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-12">
                    <TabsTrigger value="lifting" className="text-base gap-2">
                      <Dumbbell className="w-4 h-4" />
                      Lifting
                    </TabsTrigger>
                    <TabsTrigger value="bodyweight" className="text-base gap-2">
                      <Activity className="w-4 h-4" />
                      Bodyweight
                    </TabsTrigger>
                    <TabsTrigger value="cardio" className="text-base gap-2">
                      <Footprints className="w-4 h-4" />
                      Cardio
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="lifting" className="mt-8">
                    <LiftingSection />
                  </TabsContent>

                  <TabsContent value="bodyweight" className="mt-8">
                    <BodyweightSection />
                  </TabsContent>

                  <TabsContent value="cardio" className="mt-8">
                    <CardioSection />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <CommunityLeaderboard inCommunity={inCommunity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;