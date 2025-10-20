import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Shield, Check, X, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface JoinRequest {
  id: string;
  username: string;
  email: string;
  requestDate: string;
  userStats: {
    totalPRs: number;
    joinedDaysAgo: number;
  };
}

const CommunityAdmin = () => {
  const navigate = useNavigate();
  
  // Mock data - assume user is admin of "Platform" community
  const communityName = "Platform";
  const [pendingRequests, setPendingRequests] = useState<JoinRequest[]>([
    {
      id: "1",
      username: "NewAthlete21",
      email: "newathlete@example.com",
      requestDate: "2025-01-15",
      userStats: { totalPRs: 8, joinedDaysAgo: 5 }
    },
    {
      id: "2",
      username: "FitnessJunkie",
      email: "fitness@example.com",
      requestDate: "2025-01-14",
      userStats: { totalPRs: 15, joinedDaysAgo: 12 }
    },
    {
      id: "3",
      username: "GymRat2025",
      email: "gymrat@example.com",
      requestDate: "2025-01-13",
      userStats: { totalPRs: 3, joinedDaysAgo: 2 }
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
  const [actionType, setActionType] = useState<"approve" | "deny" | null>(null);

  const handleApprove = (request: JoinRequest) => {
    setSelectedRequest(request);
    setActionType("approve");
  };

  const handleDeny = (request: JoinRequest) => {
    setSelectedRequest(request);
    setActionType("deny");
  };

  const confirmAction = () => {
    if (!selectedRequest || !actionType) return;

    // Remove from pending list
    setPendingRequests(pendingRequests.filter(req => req.id !== selectedRequest.id));

    if (actionType === "approve") {
      toast.success(`${selectedRequest.username} has been approved to join ${communityName}`);
      // TODO: API call to approve request
      // POST /api/communities/:communityId/requests/:requestId/approve
    } else {
      toast.success(`${selectedRequest.username}'s request has been denied`);
      // TODO: API call to deny request
      // POST /api/communities/:communityId/requests/:requestId/deny
    }

    setSelectedRequest(null);
    setActionType(null);
  };

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Admin Panel
              </h1>
              <p className="text-sm text-muted-foreground">{communityName} Community</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-2">
            <Users className="w-3 h-3" />
            42 members
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending Requests</CardDescription>
                <CardTitle className="text-3xl">{pendingRequests.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Members</CardDescription>
                <CardTitle className="text-3xl">42</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Approved This Week</CardDescription>
                <CardTitle className="text-3xl">8</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pending Join Requests
              </CardTitle>
              <CardDescription>
                Review and manage membership requests for your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                  <p className="text-sm text-muted-foreground">
                    All caught up! New requests will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {getInitials(request.username)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{request.username}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {formatDate(request.requestDate)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {request.email}
                              </p>
                              <div className="flex gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Total PRs:</span>
                                  <span className="font-semibold ml-1">{request.userStats.totalPRs}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Member for:</span>
                                  <span className="font-semibold ml-1">{request.userStats.joinedDaysAgo} days</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(request)}
                              className="gap-1"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeny(request)}
                              className="gap-1 text-destructive hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                              Deny
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "Approve Request?" : "Deny Request?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "approve" ? (
                <>
                  Are you sure you want to approve <strong>{selectedRequest?.username}</strong> to join {communityName}?
                  They will be able to see leaderboards and compete with other members.
                </>
              ) : (
                <>
                  Are you sure you want to deny <strong>{selectedRequest?.username}</strong>'s request to join {communityName}?
                  They will be notified of this decision.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              {actionType === "approve" ? "Approve" : "Deny"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommunityAdmin;