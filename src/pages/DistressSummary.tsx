
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, AlertTriangle, MapPin, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";

const DistressSummary = () => {
  const summaryData = {
    totalDistresses: 847,
    highSeverity: 23,
    mediumSeverity: 156,
    lowSeverity: 668,
    totalKm: 45.2,
    averagePerKm: 18.7
  };

  const distressTypeData = [
    { type: "Cracks", count: 425, percentage: 50.2 },
    { type: "Rutting", count: 285, percentage: 33.6 },
    { type: "Roughness", count: 137, percentage: 16.2 }
  ];

  const severityData = [
    { name: "High", value: 23, color: "#ef4444" },
    { name: "Medium", value: 156, color: "#eab308" },
    { name: "Low", value: 668, color: "#22c55e" }
  ];

  const kmDistressData = [
    { km: "0-5", distresses: 89, high: 3, medium: 15, low: 71 },
    { km: "5-10", distresses: 92, high: 2, medium: 18, low: 72 },
    { km: "10-15", distresses: 76, high: 1, medium: 12, low: 63 },
    { km: "15-20", distresses: 98, high: 4, medium: 22, low: 72 },
    { km: "20-25", distresses: 84, high: 2, medium: 16, low: 66 },
    { km: "25-30", distresses: 79, high: 3, medium: 14, low: 62 },
    { km: "30-35", distresses: 91, high: 2, medium: 19, low: 70 },
    { km: "35-40", distresses: 88, high: 3, medium: 17, low: 68 },
    { km: "40-45", distresses: 85, high: 3, medium: 16, low: 66 }
  ];

  const detailedData = [
    { km: "0.5", type: "Longitudinal Crack", severity: "High", length: "15m", confidence: "95%" },
    { km: "1.2", type: "Wheel Path Rutting", severity: "Medium", length: "8m", confidence: "87%" },
    { km: "2.1", type: "Surface Roughness", severity: "Low", length: "12m", confidence: "92%" },
    { km: "3.4", type: "Transverse Crack", severity: "High", length: "6m", confidence: "89%" },
    { km: "4.7", type: "Edge Rutting", severity: "Medium", length: "10m", confidence: "84%" },
    { km: "5.9", type: "Alligator Crack", severity: "High", length: "4m", confidence: "96%" },
    { km: "7.2", type: "Potholes", severity: "High", length: "2m", confidence: "98%" },
    { km: "8.5", type: "Surface Deformation", severity: "Medium", length: "7m", confidence: "82%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Distress Summary Report</h1>
          <Button className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{summaryData.totalDistresses}</div>
              <div className="text-sm text-gray-600">Total Distresses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{summaryData.highSeverity}</div>
              <div className="text-sm text-gray-600">High Severity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{summaryData.mediumSeverity}</div>
              <div className="text-sm text-gray-600">Medium Severity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{summaryData.lowSeverity}</div>
              <div className="text-sm text-gray-600">Low Severity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{summaryData.totalKm}</div>
              <div className="text-sm text-gray-600">Total KM</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{summaryData.averagePerKm}</div>
              <div className="text-sm text-gray-600">Avg/KM</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Distress Distribution by KM */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Distress Distribution by KM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={kmDistressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="km" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="high" stackId="a" fill="#ef4444" name="High" />
                  <Bar dataKey="medium" stackId="a" fill="#eab308" name="Medium" />
                  <Bar dataKey="low" stackId="a" fill="#22c55e" name="Low" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Severity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Severity Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Type-wise Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Type-wise Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {distressTypeData.map((item, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{item.count}</div>
                  <div className="text-lg font-semibold mb-1">{item.type}</div>
                  <div className="text-sm text-gray-600">{item.percentage}% of total</div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Distress Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Detailed Distress Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">KM Mark</th>
                    <th className="text-left py-3 px-2">Distress Type</th>
                    <th className="text-left py-3 px-2">Severity</th>
                    <th className="text-left py-3 px-2">Length</th>
                    <th className="text-left py-3 px-2">Confidence</th>
                    <th className="text-left py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{row.km}</td>
                      <td className="py-3 px-2">{row.type}</td>
                      <td className="py-3 px-2">
                        <Badge 
                          variant={
                            row.severity === "High" ? "destructive" : 
                            row.severity === "Medium" ? "secondary" : 
                            "secondary"
                          }
                          className={
                            row.severity === "High" ? "bg-red-100 text-red-800" :
                            row.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }
                        >
                          {row.severity}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">{row.length}</td>
                      <td className="py-3 px-2">{row.confidence}</td>
                      <td className="py-3 px-2">
                        <Button variant="ghost" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DistressSummary;
