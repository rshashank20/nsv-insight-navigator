
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Play, Pause, Filter, AlertTriangle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const VideoMapViewer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filters, setFilters] = useState({
    cracks: true,
    rutting: true,
    roughness: true,
    high: true,
    medium: true,
    low: true
  });

  const distressData = [
    { id: 1, type: "Cracks", severity: "High", lat: 28.6139, lng: 77.2090, timestamp: "00:05:23", description: "Longitudinal crack detected" },
    { id: 2, type: "Rutting", severity: "Medium", lat: 28.6149, lng: 77.2100, timestamp: "00:07:45", description: "Wheel path rutting observed" },
    { id: 3, type: "Roughness", severity: "Low", lat: 28.6159, lng: 77.2110, timestamp: "00:09:12", description: "Minor surface irregularity" },
    { id: 4, type: "Cracks", severity: "High", lat: 28.6169, lng: 77.2120, timestamp: "00:11:30", description: "Transverse crack pattern" },
    { id: 5, type: "Rutting", severity: "Medium", lat: 28.6179, lng: 77.2130, timestamp: "00:13:55", description: "Progressive wheel rutting" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const filteredData = distressData.filter(item => {
    const typeMatch = filters[item.type.toLowerCase()] !== false;
    const severityMatch = filters[item.severity.toLowerCase()] !== false;
    return typeMatch && severityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Video & Map Analysis</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Dashboard Camera Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-4">
                        <Play className="h-16 w-16 mx-auto opacity-50" />
                      </div>
                      <p className="text-lg">Sample Dashboard Camera Video</p>
                      <p className="text-sm opacity-75">NH-1 Delhi-Chandigarh Highway</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1 bg-gray-600 h-2 rounded">
                        <div className="bg-blue-500 h-2 rounded w-1/3"></div>
                      </div>
                      <span className="text-white text-sm">05:23 / 15:45</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Route Map with Distress Markers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-200 rounded-lg h-96 overflow-hidden">
                  {/* Simulated Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-600">
                        <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-semibold">Interactive Map View</p>
                        <p className="text-sm">NH-1 Delhi-Chandigarh Highway</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Distress Markers */}
                  {filteredData.map((marker, index) => (
                    <div
                      key={marker.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getSeverityColor(marker.severity)}`}
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 2) * 20}%`
                      }}
                      onClick={() => setSelectedMarker(marker)}
                    >
                      <div className="w-full h-full rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Distress Type</h4>
                  <div className="space-y-2">
                    {["cracks", "rutting", "roughness"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters[type]}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, [type]: checked }))
                          }
                        />
                        <label htmlFor={type} className="text-sm capitalize">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Severity Level</h4>
                  <div className="space-y-2">
                    {["high", "medium", "low"].map((severity) => (
                      <div key={severity} className="flex items-center space-x-2">
                        <Checkbox
                          id={severity}
                          checked={filters[severity]}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, [severity]: checked }))
                          }
                        />
                        <label htmlFor={severity} className="text-sm capitalize">
                          {severity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Marker Details */}
            {selectedMarker && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Distress Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold">Type</p>
                    <p className="text-sm text-gray-600">{selectedMarker.type}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Severity</p>
                    <Badge variant={getSeverityBadgeVariant(selectedMarker.severity)}>
                      {selectedMarker.severity}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-semibold">Timestamp</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {selectedMarker.timestamp}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Description</p>
                    <p className="text-sm text-gray-600">{selectedMarker.description}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Coordinates</p>
                    <p className="text-sm text-gray-600">
                      {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Markers</span>
                    <span className="font-semibold">{filteredData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">High Severity</span>
                    <span className="font-semibold text-red-500">
                      {filteredData.filter(d => d.severity === "High").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Medium Severity</span>
                    <span className="font-semibold text-yellow-500">
                      {filteredData.filter(d => d.severity === "Medium").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Low Severity</span>
                    <span className="font-semibold text-green-500">
                      {filteredData.filter(d => d.severity === "Low").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMapViewer;
