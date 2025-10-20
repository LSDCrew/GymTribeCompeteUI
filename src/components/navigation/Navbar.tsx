import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Community {
  id: string;
  name: string;
  memberCount: number;
  description: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDesc, setNewCommunityDesc] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [myCommunitiesOpen, setMyCommunitiesOpen] = useState(false);

  // Mock: Assume user is admin of "Platform" community
  const isAdmin = true;
  const adminCommunity = "Platform";

  // Mock data - replace with API calls
  const mockCommunities: Community[] = [
    { id: "1", name: "Platform", memberCount: 42, description: "Elite athletes pushing boundaries" },
    { id: "2", name: "CrossFit Warriors", memberCount: 128, description: "High-intensity functional fitness" },
    { id: "3", name: "Powerlifting Club", memberCount: 87, description: "Strength is everything" },
    { id: "4", name: "Calisthenics Masters", memberCount: 95, description: "Bodyweight movement excellence" },
  ];

  const myMockCommunities: Community[] = [
    { id: "1", name: "Platform", memberCount: 42, description: "Elite athletes pushing boundaries" },
  ];

  const filteredCommunities = mockCommunities.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCommunity = () => {
    if (newCommunityName.trim()) {
      toast.success(`Community "${newCommunityName}" created!`);
      setNewCommunityName("");
      setNewCommunityDesc("");
      setCreateDialogOpen(false);
      
      // TODO: API call to create community
      // POST /api/communities with { name, description }
    }
  };

  const handleJoinCommunity = (communityName: string) => {
    toast.success(`Join request sent to ${communityName}`);
    
    // TODO: API call to join community
    // POST /api/communities/:id/join
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold">Communities</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Admin Panel - Only show if user is admin */}
            {isAdmin && (
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate("/admin/community")}
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </Button>
            )}

            {/* Search Communities */}
            <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Search Communities</DialogTitle>
                  <DialogDescription>
                    Find and join fitness communities
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredCommunities.map((community) => (
                      <Card key={community.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{community.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {community.description}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">
                              {community.memberCount} members
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button
                            onClick={() => handleJoinCommunity(community.name)}
                            size="sm"
                          >
                            Request to Join
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Create Community */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Community</DialogTitle>
                  <DialogDescription>
                    Start your own fitness community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Community Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter community name"
                      value={newCommunityName}
                      onChange={(e) => setNewCommunityName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Describe your community"
                      value={newCommunityDesc}
                      onChange={(e) => setNewCommunityDesc(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCreateCommunity} className="w-full">
                    Create Community
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* My Communities */}
            <Dialog open={myCommunitiesOpen} onOpenChange={setMyCommunitiesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  My Communities
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>My Communities</DialogTitle>
                  <DialogDescription>
                    Communities you're a member of
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {myMockCommunities.map((community) => (
                    <Card key={community.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{community.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {community.description}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">
                            {community.memberCount} members
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;