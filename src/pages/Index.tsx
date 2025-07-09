
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Camera, FileText, BarChart3, PenTool } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      title: "Video & Map Analysis",
      description: "Real-time visualization of road conditions with geo-tagged markers"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "Data Upload",
      description: "Upload NSV reports and dashboard camera footage for analysis"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Distress Summary",
      description: "Comprehensive analysis of pavement distress patterns and severity"
    },
    {
      icon: <PenTool className="h-8 w-8 text-orange-600" />,
      title: "Inspector Notes",
      description: "Add annotations and comments for detailed inspection records"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              NSV Inspection Dashboard
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced real-time visualization platform for Network Survey Vehicle (NSV) reports. 
            Monitor, analyze, and manage pavement distress data with integrated video analysis 
            and geospatial mapping for efficient road infrastructure management.
          </p>
          
          <Button 
            onClick={() => navigate("/video-map")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
          >
            Start Inspection
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Real-time Dashboard Statistics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">847</div>
              <div className="text-gray-600">Total Inspections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">23</div>
              <div className="text-gray-600">High Severity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">156</div>
              <div className="text-gray-600">Medium Severity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">668</div>
              <div className="text-gray-600">Low Severity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
