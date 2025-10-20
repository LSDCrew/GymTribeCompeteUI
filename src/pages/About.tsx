import { Button } from "@/components/ui/button";
import { Users, Trophy, TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Gym Community Tracker
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join fitness communities and compete with members on gym performance.
              Track your personal records and climb the leaderboards.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/register")}
                className="shadow-accent"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Communities</h3>
              <p className="text-muted-foreground">
                Request to join existing fitness communities or create your own.
                Each community has an admin who manages member approvals.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
              <p className="text-muted-foreground">
                Log your lifting PRs, bodyweight exercise reps, and cardio performance.
                Add custom exercises to fit your training style.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Progress</h3>
              <p className="text-muted-foreground">
                See your personal records displayed clearly across all exercise categories.
                Track your improvement over time.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compete & Compare</h3>
              <p className="text-muted-foreground">
                See how you stack up against community members on leaderboards.
                Turn your fitness journey into friendly competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Categories Section */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Three Performance Categories
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Track your fitness across multiple domains to get a complete picture of your athletic performance
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4">🏋️ Lifting</h3>
              <p className="text-muted-foreground mb-4">
                Track your maximum lifts for compound movements like squat, bench press, and deadlift.
                Add custom exercises too.
              </p>
              <div className="text-sm text-muted-foreground">
                Examples: Squat, Bench Press, Deadlift, Overhead Press
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4">💪 Bodyweight</h3>
              <p className="text-muted-foreground mb-4">
                Log the maximum number of reps for bodyweight exercises like push-ups, pull-ups, and dips.
              </p>
              <div className="text-sm text-muted-foreground">
                Examples: Push-ups, Pull-ups, Dips, Muscle-ups
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4">🏃 Cardio</h3>
              <p className="text-muted-foreground mb-4">
                Record your best times and distances for cardio activities like running, cycling, and swimming.
              </p>
              <div className="text-sm text-muted-foreground">
                Examples: 5K Run, 400m Sprint, 100m Swim
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Track Your Progress?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join a community and start competing, or track your personal records privately.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="shadow-accent"
          >
            Start Tracking Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;