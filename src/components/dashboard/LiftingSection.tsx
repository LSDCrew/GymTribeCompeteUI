import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Dumbbell, Weight, TrendingUp, Activity } from "lucide-react";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

interface Exercise {
  name: string;
  weight: number;
  icon: LucideIcon;
}

const LiftingSection = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "Squat", weight: 0, icon: Dumbbell },
    { name: "Bench Press", weight: 0, icon: Weight },
    { name: "Deadlift", weight: 0, icon: TrendingUp },
    { name: "Overhead Press", weight: 0, icon: Activity },
  ]);
  const [customExercise, setCustomExercise] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [weightInput, setWeightInput] = useState("");

  const handleAddCustomExercise = () => {
    if (customExercise.trim()) {
      setExercises([...exercises, { name: customExercise, weight: 0, icon: Dumbbell }]);
      setCustomExercise("");
      toast.success(`Added ${customExercise} to your exercises`);
      
      // TODO: API call to save custom exercise
      // POST /api/exercises/lifting with { name: customExercise }
    }
  };

  const handleUpdateWeight = () => {
    if (selectedExercise && weightInput) {
      const weight = parseFloat(weightInput);
      setExercises(
        exercises.map((ex) =>
          ex.name === selectedExercise ? { ...ex, weight } : ex
        )
      );
      toast.success(`${selectedExercise} PR updated: ${weight}kg`);
      setSelectedExercise(null);
      setWeightInput("");
      
      // TODO: API call to update exercise PR
      // PUT /api/exercises/lifting/:exerciseId with { weight }
    }
  };

  return (
    <div className="space-y-8">
      {/* Update Weight Section */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="space-y-4">
          <Label htmlFor="weight" className="text-base font-semibold">Update Exercise PR</Label>
          <div className="flex gap-3">
            <select
              className="flex-1 h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedExercise || ""}
              onChange={(e) => {
                setSelectedExercise(e.target.value);
                const ex = exercises.find((ex) => ex.name === e.target.value);
                setWeightInput(ex?.weight.toString() || "");
              }}
            >
              <option value="">Select exercise</option>
              {exercises.map((ex) => (
                <option key={ex.name} value={ex.name}>
                  {ex.name}
                </option>
              ))}
            </select>
            <Input
              id="weight"
              type="number"
              step="0.5"
              placeholder="Weight (kg)"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-32"
              disabled={!selectedExercise}
            />
            <Button onClick={handleUpdateWeight} disabled={!selectedExercise}>
              Save PR
            </Button>
          </div>
        </div>
      </Card>

      {/* Personal Records Display */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Personal Records</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {exercises.map((exercise) => {
            const IconComponent = exercise.icon;
            return (
              <Card key={exercise.name} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{exercise.name}</h4>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {exercise.weight > 0 ? `${exercise.weight}kg` : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Custom Exercise */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label htmlFor="custom" className="text-base font-semibold">Add Custom Exercise</Label>
          <div className="flex gap-3">
            <Input
              id="custom"
              placeholder="Exercise name"
              value={customExercise}
              onChange={(e) => setCustomExercise(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddCustomExercise} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiftingSection;
