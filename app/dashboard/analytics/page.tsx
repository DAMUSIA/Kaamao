"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Briefcase,
  Users,
  Star,
  Calendar,
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  ThumbsUp,
  ChevronDown,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
);

// Define types
interface PeriodData {
  profileViews: { value: number; change: number; trend: string };
  serviceViews: { value: number; change: number; trend: string };
  interestedUsers: { value: number; change: number; trend: string };
  leads: number[];
  growth: number[];
  totalLeads: number;
  weeks: string[];
  months: string[];
}

interface ServiceData {
  name: string;
  description: string;
  views: number;
  leads: number;
  interested: number;
  rating: number;
}

interface RatingData {
  stars: number;
  count: number;
  percentage: number;
}

interface ProviderStats {
  servicesCreated: number;
  activeServices: number;
  pausedServices: number;
  completedJobs: number;
  memberSince: string;
}

interface BestPerformingService {
  name: string;
  description: string;
  views: number;
  leads: number;
  rating: number;
}

// Mock data for different periods
const periodData: Record<string, PeriodData> = {
  "7days": {
    profileViews: { value: 98, change: 12, trend: "up" },
    serviceViews: { value: 210, change: 15, trend: "up" },
    interestedUsers: { value: 14, change: 8, trend: "up" },
    leads: [4, 8, 10, 12, 14, 16, 18],
    growth: [5, 8, 12, 15, 18, 20, 22],
    totalLeads: 82,
    weeks: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  "30days": {
    profileViews: { value: 245, change: 18, trend: "up" },
    serviceViews: { value: 520, change: 22, trend: "up" },
    interestedUsers: { value: 32, change: 14, trend: "up" },
    leads: [4, 8, 10, 12],
    growth: [10, 15, 22, 28],
    totalLeads: 34,
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
    months: ["Jan", "Feb", "Mar", "Apr"],
  },
  "90days": {
    profileViews: { value: 680, change: 25, trend: "up" },
    serviceViews: { value: 1450, change: 30, trend: "up" },
    interestedUsers: { value: 89, change: 20, trend: "up" },
    leads: [4, 8, 10, 12, 15, 18, 22, 25, 28, 30, 32, 34],
    growth: [10, 12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 42],
    totalLeads: 238,
    weeks: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

// Rating distribution data
const ratingData: ChartData<"pie"> = {
  labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
  datasets: [
    {
      data: [20, 5, 2, 0, 0],
      backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"],
      borderWidth: 0,
    },
  ],
};

// Top areas data
const areasData: ChartData<"doughnut"> = {
  labels: ["Andheri West", "Goregaon", "Jogeshwari", "Versova"],
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
      borderWidth: 0,
    },
  ],
};

const analyticsData: {
  averageRating: { value: number; reviews: number };
  services: ServiceData[];
  ratings: RatingData[];
  providerStats: ProviderStats;
  bestPerformingService: BestPerformingService;
} = {
  averageRating: { value: 4.8, reviews: 27 },

  services: [
    {
      name: "Math Tutor",
      description: "Classes 6 - 10",
      views: 120,
      leads: 15,
      interested: 5,
      rating: 4.9,
    },
    {
      name: "Tailoring Service",
      description: "Stitching & Alterations",
      views: 80,
      leads: 10,
      interested: 4,
      rating: 4.7,
    },
    {
      name: "Home Cook",
      description: "Lunch & Dinner",
      views: 60,
      leads: 7,
      interested: 3,
      rating: 4.6,
    },
  ],

  ratings: [
    { stars: 5, count: 20, percentage: 74 },
    { stars: 4, count: 5, percentage: 19 },
    { stars: 3, count: 2, percentage: 7 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ],

  providerStats: {
    servicesCreated: 3,
    activeServices: 2,
    pausedServices: 1,
    completedJobs: 18,
    memberSince: "May 2026",
  },

  bestPerformingService: {
    name: "Math Tutor",
    description: "Classes 6 - 10",
    views: 120,
    leads: 15,
    rating: 4.9,
  },
};

// Chart options with proper typing - Fixed 'drawBorder' issue
const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "white",
      titleColor: "#1f2937",
      bodyColor: "#6b7280",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      padding: 10,
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: function (context: any) {
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#e5e7eb",
      },
      ticks: {
        stepSize: 5,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: "white",
      titleColor: "#1f2937",
      bodyColor: "#6b7280",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      padding: 10,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#e5e7eb",
      },
      ticks: {
        stepSize: 10,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

// Separate options for Pie and Doughnut charts
const pieChartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        padding: 15,
        font: { size: 11 },
      },
    },
    tooltip: {
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed as number;
          const total = (context.dataset.data as number[]).reduce(
            (a: number, b: number) => a + b,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

const doughnutChartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        padding: 15,
        font: { size: 11 },
      },
    },
    tooltip: {
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed as number;
          const total = (context.dataset.data as number[]).reduce(
            (a: number, b: number) => a + b,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentData = periodData[selectedPeriod as keyof typeof periodData];

  const periods = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
  ];

  // Leads chart data
  const leadsChartData: ChartData<"line"> = {
    labels: currentData.weeks,
    datasets: [
      {
        label: "Leads",
        data: currentData.leads,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  // Growth chart data
  const growthChartData: ChartData<"bar"> = {
    labels: currentData.months,
    datasets: [
      {
        label: "Growth",
        data: currentData.growth,
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              </div>
              <p className="text-gray-500 ml-11">
                Track your performance and grow your service
              </p>
            </div>

            {/* Period Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {periods.find((p) => p.value === selectedPeriod)?.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    {periods.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => {
                          setSelectedPeriod(period.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedPeriod === period.value
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <span
                className={`text-sm font-medium ${currentData.profileViews.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
              >
                {currentData.profileViews.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                ↑ {currentData.profileViews.change}% vs last period
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentData.profileViews.value.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Profile Views</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />↑{" "}
                {currentData.serviceViews.change}% vs last period
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentData.serviceViews.value.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Service Views</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />↑{" "}
                {currentData.interestedUsers.change}% vs last period
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentData.interestedUsers.value}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Interested Users</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {analyticsData.averageRating.value}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Average Rating ({analyticsData.averageRating.reviews} Reviews)
            </p>
          </div>
        </div>

        {/* Leads and Monthly Growth Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Leads / Interested Users Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Leads / Interested Users
              </h2>
              <span className="text-xs text-gray-400">
                This{" "}
                {selectedPeriod === "7days"
                  ? "Week"
                  : selectedPeriod === "30days"
                    ? "Month"
                    : "Year"}
              </span>
            </div>
            <div className="h-72">
              <Line data={leadsChartData} options={lineChartOptions} />
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700">
                You received{" "}
                <span className="font-bold text-blue-600">
                  {currentData.totalLeads} leads
                </span>{" "}
                this{" "}
                {selectedPeriod === "7days"
                  ? "week"
                  : selectedPeriod === "30days"
                    ? "month"
                    : "period"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Keep it up! Your profile is getting good attention.
              </p>
            </div>
          </div>

          {/* Monthly Growth Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Monthly Growth
              </h2>
              <span className="text-xs text-gray-400">
                This {selectedPeriod === "30days" ? "Month" : "Year"}
              </span>
            </div>
            <div className="h-72">
              <Bar data={growthChartData} options={barChartOptions} />
            </div>
            <div className="mt-4 bg-purple-50 rounded-lg p-4">
              <p className="text-gray-700">
                Total growth of{" "}
                <span className="font-bold text-purple-600">
                  {currentData.growth.reduce((a, b) => a + b, 0)}
                </span>{" "}
                this{" "}
                {selectedPeriod === "7days"
                  ? "week"
                  : selectedPeriod === "30days"
                    ? "month"
                    : "year"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Your business is growing steadily!
              </p>
            </div>
          </div>
        </div>

        {/* Service Performance Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900">
              Service Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leads
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interested
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analyticsData.services.map((service, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {service.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {service.description}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {service.views}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {service.leads}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">
                      {service.interested}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {service.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ratings Distribution - Pie Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ratings Distribution
            </h2>
            <div className="h-72">
              <Pie data={ratingData} options={pieChartOptions} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                Total Reviews:{" "}
                <span className="font-semibold text-gray-900">27</span>
              </p>
            </div>
          </div>

          {/* Top Areas - Doughnut Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top Areas
            </h2>
            <div className="h-72">
              <Doughnut data={areasData} options={doughnutChartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Provider Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Provider Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.providerStats.servicesCreated}
                </p>
                <p className="text-xs text-gray-500">Services Created</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.providerStats.activeServices}
                </p>
                <p className="text-xs text-gray-500">Active Services</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.providerStats.pausedServices}
                </p>
                <p className="text-xs text-gray-500">Paused Services</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.providerStats.completedJobs}
                </p>
                <p className="text-xs text-gray-500">Completed Jobs</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Member Since{" "}
                <span className="font-semibold text-gray-900">
                  {analyticsData.providerStats.memberSince}
                </span>
              </p>
            </div>
          </div>

          {/* Rating Bars */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ratings Breakdown
            </h2>
            <div className="space-y-4">
              {analyticsData.ratings.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-4">
                  <div className="w-20 flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">
                      {rating.stars}
                    </span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <div className="w-28 text-right">
                    <span className="text-sm text-gray-600">
                      {rating.count} ({rating.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Best Performing Service */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">
                  Best Performing Service
                </h2>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {analyticsData.bestPerformingService.name}
              </h3>
              <p className="text-blue-100">
                {analyticsData.bestPerformingService.description}
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {analyticsData.bestPerformingService.views}
                </p>
                <p className="text-xs text-blue-100">Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {analyticsData.bestPerformingService.leads}
                </p>
                <p className="text-xs text-blue-100">Leads</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <p className="text-2xl font-bold text-white">
                    {analyticsData.bestPerformingService.rating}
                  </p>
                </div>
                <p className="text-xs text-blue-100">Rating</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500/30">
            <p className="text-blue-100 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              Great work! Keep it up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
