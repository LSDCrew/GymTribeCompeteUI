import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Timer, Gauge, Footprints, Waves, Bike } from "lucide-react";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

interface CardioActivity {
  name: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  type: "time" | "distance";
}

const CardioSection = () => {
  const [activities, setActivities] = useState<CardioActivity[]>([
    { name: "5K Run", value: "", unit: "minutes", icon: Footprints, type: "time" },
    { name: "400m Sprint", value: "", unit: "seconds", icon: Gauge, type: "time" },
    { name: "100m Swim", value: "", unit: "seconds", icon: Waves, type: "time" },
    { name: "10K Cycle", value: "", unit: "minutes", icon: Bike, type: "time" },
  ]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [valueInput, setValueInput] = useState("");

  const handleUpdateActivity = () => {
    if (selectedActivity && valueInput) {
      setActivities(
        activities.map((activity) =>
          activity.name === selectedActivity
            ? { ...activity, value: valueInput }
            : activity
        )
      );
      const activity = activities.find((a) => a.name === selectedActivity);
      toast.success(`${selectedActivity} PR updated: ${valueInput} ${activity?.unit}`);
      setSelectedActivity(null);
      setValueInput("");
      
      // TODO: API call to update cardio PR
      // PUT /api/exercises/cardio/:activityId with { value: valueInput }
    }
  };

  return (
    <div className="space-y-8">
      {/* Update Activity Section */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="space-y-4">
          <Label htmlFor="value" className="text-base font-semibold">Update Activity PR</Label>
          <div className="flex gap-3">
            <select
              className="flex-1 h-11 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedActivity || ""}
              onChange={(e) => {
                setSelectedActivity(e.target.value);
                const act = activities.find((a) => a.name === e.target.value);
                setValueInput(act?.value || "");
              }}
            >
              <option value="">Select activity</option>
              {activities.map((act) => (
                <option key={act.name} value={act.name}>
                  {act.name}
                </option>
              ))}
            </select>
            <Input
              id="value"
              type="number"
              step="0.01"
              placeholder={
                selectedActivity
                  ? activities.find((a) => a.name === selectedActivity)?.unit
                  : "Value"
              }
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              className="w-32"
              disabled={!selectedActivity}
            />
            <Button onClick={handleUpdateActivity} disabled={!selectedActivity}>
              Save PR
            </Button>
          </div>
        </div>
      </Card>

      {/* Personal Records Display */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Personal Records</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.name} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{activity.name}</h4>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {activity.value ? `${activity.value} ${activity.unit}` : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="p-5 bg-muted/50">
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <Timer className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span><strong>Tip:</strong> Record your best times or distances for each activity. Lower times for time-based activities are better!</span>
        </p>
      </Card>
    </div>
  );
};

export default CardioSection;
