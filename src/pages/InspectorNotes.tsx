
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PenTool, MapPin, Save, Plus, Search, Calendar, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const InspectorNotes = () => {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    location: "",
    priority: "Medium"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const existingNotes = [
    {
      id: 1,
      title: "Severe Cracking at KM 5.2",
      content: "Multiple longitudinal cracks observed. Immediate attention required for safety. Weather conditions: Clear, dry. Traffic volume: Heavy during inspection.",
      location: "NH-1, KM 5.2",
      timestamp: "2024-01-15 10:30 AM",
      inspector: "Inspector A. Kumar",
      priority: "High",
      tags: ["Urgent", "Safety", "Cracks"]
    },
    {
      id: 2,
      title: "Routine Maintenance Required",
      content: "Minor surface irregularities noted. Scheduled maintenance recommended within next quarter. No immediate safety concerns.",
      location: "NH-1, KM 12.7",
      timestamp: "2024-01-15 11:45 AM",
      inspector: "Inspector B. Singh",
      priority: "Low",
      tags: ["Maintenance", "Routine"]
    },
    {
      id: 3,
      title: "Rutting Pattern Analysis",
      content: "Progressive rutting pattern in right wheel path. Monitoring required. May be related to heavy vehicle traffic. Consider load restrictions.",
      location: "NH-1, KM 18.9",
      timestamp: "2024-01-15 2:15 PM",
      inspector: "Inspector C. Sharma",
      priority: "Medium",
      tags: ["Rutting", "Traffic", "Monitoring"]
    },
    {
      id: 4,
      title: "Bridge Approach Inspection",
      content: "Bridge approach shows signs of settlement. Joint sealing needs attention. Coordinate with bridge maintenance team.",
      location: "NH-1, KM 25.4 - Bridge Approach",
      timestamp: "2024-01-15 3:30 PM",
      inspector: "Inspector A. Kumar",
      priority: "High",
      tags: ["Bridge", "Settlement", "Coordination"]
    }
  ];

  const filteredNotes = existingNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) {
      toast({
        title: "Incomplete Note",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Note Saved",
      description: "Your inspection note has been saved successfully.",
    });

    // Reset form
    setNewNote({
      title: "",
      content: "",
      location: "",
      priority: "Medium"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Inspector Notes & Comments</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* New Note Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenTool className="mr-2 h-5 w-5" />
                  Add New Note
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="note-title">Title</Label>
                  <Input
                    id="note-title"
                    placeholder="Enter note title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="note-location">Location (Optional)</Label>
                  <Input
                    id="note-location"
                    placeholder="e.g., NH-1, KM 15.5"
                    value={newNote.location}
                    onChange={(e) => setNewNote(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="note-priority">Priority</Label>
                  <select
                    id="note-priority"
                    className="w-full p-2 border rounded-md"
                    value={newNote.priority}
                    onChange={(e) => setNewNote(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="note-content">Note Content</Label>
                  <Textarea
                    id="note-content"
                    placeholder="Enter your inspection notes, observations, recommendations..."
                    rows={6}
                    value={newNote.content}
                    onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleSaveNote} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </Button>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Tag Current Location
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search notes..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes List */}
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {note.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {note.timestamp}
                          </div>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(note.priority)}>
                        {note.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{note.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="mr-1 h-4 w-4" />
                        {note.inspector}
                      </div>
                      <div className="flex space-x-2">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-1 h-4 w-4" />
                        View on Map
                      </Button>
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredNotes.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <PenTool className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notes Found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? "No notes match your search criteria." : "Start by adding your first inspection note."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorNotes;
