
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Video, CheckCircle, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const DataUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [selectedFiles, setSelectedFiles] = useState({
    data: null,
    video: null
  });
  const { toast } = useToast();

  const handleFileUpload = (type: "data" | "video", file: File) => {
    setSelectedFiles(prev => ({ ...prev, [type]: file }));
    
    // Simulate upload process
    setUploadStatus("uploading");
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          toast({
            title: "Upload Successful",
            description: `${file.name} has been uploaded successfully.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const sampleData = [
    { km: "0.5", distressType: "Cracks", severity: "High", confidence: "95%" },
    { km: "1.2", distressType: "Rutting", severity: "Medium", confidence: "87%" },
    { km: "2.1", distressType: "Roughness", severity: "Low", confidence: "92%" },
    { km: "3.4", distressType: "Cracks", severity: "High", confidence: "89%" },
    { km: "4.7", distressType: "Rutting", severity: "Medium", confidence: "84%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Data Upload & Processing</h1>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* NSV Data Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  NSV Data Report Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="data-file">Upload NSV Report (CSV, Excel, JSON)</Label>
                  <div className="mt-2">
                    <Input
                      id="data-file"
                      type="file"
                      accept=".csv,.xlsx,.xls,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("data", file);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                {selectedFiles.data && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{selectedFiles.data.name}</span>
                    {uploadStatus === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                )}
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your NSV data file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: CSV, Excel (.xlsx/.xls), JSON
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Video Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Dashboard Camera Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="video-file">Upload Video File</Label>
                  <div className="mt-2">
                    <Input
                      id="video-file"
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("video", file);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                {selectedFiles.video && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Video className="h-4 w-4" />
                    <span>{selectedFiles.video.name}</span>
                    {uploadStatus === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                )}
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600">
                    Upload dashboard camera video for synchronized analysis
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: MP4, AVI, MOV, WebM
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {uploadStatus === "uploading" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading and processing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview & Processing */}
          <div className="space-y-6">
            {/* Processing Status */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Parsing</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Geo-tagging</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video Synchronization</span>
                    {uploadStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Map Generation</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Data Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Data Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">KM</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Severity</th>
                        <th className="text-left py-2">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{row.km}</td>
                          <td className="py-2">{row.distressType}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              row.severity === "High" ? "bg-red-100 text-red-800" :
                              row.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            }`}>
                              {row.severity}
                            </span>
                          </td>
                          <td className="py-2">{row.confidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                disabled={uploadStatus !== "success"}
                onClick={() => window.location.href = "/video-map"}
              >
                View on Map
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = "/distress-summary"}
              >
                View Summary Report
              </Button>
            </div>

            {/* Upload Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upload Instructions</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-600 space-y-2">
                <p>• NSV data should include GPS coordinates, distress type, and severity</p>
                <p>• Video files should be synchronized with data timestamps</p>
                <p>• Maximum file size: 500MB for videos, 50MB for data files</p>
                <p>• Supported coordinate systems: WGS84, UTM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
