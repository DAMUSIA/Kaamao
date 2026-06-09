"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Briefcase,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  User,
  GraduationCap,
  Scissors,
  Utensils,
  Baby,
  Sparkles,
  Award,
  TrendingUp,
  MoreHorizontal,
  Palette,
  Wrench,
  Car,
  Dumbbell,
  Music,
  Camera,
  X,
  ShoppingCart,
  CheckCircle,
  Plus,
} from "lucide-react";

// Types
interface ServiceProvider {
  id: number;
  name: string;
  role: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  distance: string;
  experience: string;
  price: string;
  priceUnit: string;
  availableToday: boolean;
  isTopRated?: boolean;
}

// Cart Item Type
interface CartItem {
  id: number;
  name: string;
  role: string;
  price: string;
  priceUnit: string;
  quantity: number;
}

// Category Config Type
interface CategoryConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  gradient: string;
  providerCount: number;
}

// Mock Data
const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Math Tutor",
    category: "Tutor",
    rating: 4.8,
    reviews: 28,
    description:
      "Expert in Mathematics for classes 6-10. I make learning easy and fun.",
    distance: "2.1 km",
    experience: "5 yrs",
    price: "300",
    priceUnit: "hour",
    availableToday: true,
    isTopRated: true,
  },
  {
    id: 2,
    name: "Sunita Tailor",
    role: "Tailoring & Stitching",
    category: "Tailor",
    rating: 4.6,
    reviews: 16,
    description:
      "Specialized in blouse stitching, alterations and custom tailoring.",
    distance: "1.8 km",
    experience: "7 yrs",
    price: "250",
    priceUnit: "hour",
    availableToday: true,
  },
  {
    id: 3,
    name: "Anjali Home Cook",
    role: "Home Cook",
    category: "Home Cook",
    rating: 4.9,
    reviews: 35,
    description:
      "Homemade vegetarian food. North Indian, South Indian & Jain food available.",
    distance: "2.5 km",
    experience: "3 yrs",
    price: "200",
    priceUnit: "meal",
    availableToday: true,
    isTopRated: true,
  },
  {
    id: 4,
    name: "Kavita Singh",
    role: "Professional Cleaner",
    category: "Cleaner",
    rating: 4.7,
    reviews: 42,
    description:
      "Deep cleaning, regular housekeeping, and sanitization services.",
    distance: "3.2 km",
    experience: "6 yrs",
    price: "350",
    priceUnit: "hour",
    availableToday: false,
  },
  {
    id: 5,
    name: "Neha Verma",
    role: "Baby Care Specialist",
    category: "Babysitter",
    rating: 4.9,
    reviews: 51,
    description: "Experienced with newborns and toddlers. CPR certified.",
    distance: "1.5 km",
    experience: "4 yrs",
    price: "400",
    priceUnit: "hour",
    availableToday: true,
    isTopRated: true,
  },
  {
    id: 6,
    name: "Meera Kapoor",
    role: "Beauty Artist",
    category: "Beauty",
    rating: 4.8,
    reviews: 37,
    description:
      "Makeup, hairstyling, bridal services, and skincare treatments.",
    distance: "4.0 km",
    experience: "8 yrs",
    price: "500",
    priceUnit: "session",
    availableToday: false,
    isTopRated: true,
  },
  {
    id: 7,
    name: "Rajesh Carpenter",
    role: "Carpenter",
    category: "Others",
    rating: 4.5,
    reviews: 12,
    description:
      "Expert in furniture repair, custom woodwork, and home renovations.",
    distance: "3.0 km",
    experience: "10 yrs",
    price: "400",
    priceUnit: "hour",
    availableToday: true,
  },
  {
    id: 8,
    name: "Suman Painter",
    role: "Painter",
    category: "Others",
    rating: 4.4,
    reviews: 9,
    description: "Professional painting services for homes and offices.",
    distance: "4.2 km",
    experience: "6 yrs",
    price: "350",
    priceUnit: "hour",
    availableToday: false,
  },
];

// Category colors and icons
const categoryConfig: Record<string, CategoryConfig> = {
  Tutor: {
    icon: GraduationCap,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    gradient: "from-purple-500 to-purple-600",
    providerCount: 45,
  },
  Tailor: {
    icon: Scissors,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    gradient: "from-pink-500 to-pink-600",
    providerCount: 32,
  },
  "Home Cook": {
    icon: Utensils,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    gradient: "from-orange-500 to-orange-600",
    providerCount: 28,
  },
  Babysitter: {
    icon: Baby,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    gradient: "from-blue-500 to-blue-600",
    providerCount: 38,
  },
  Cleaner: {
    icon: Sparkles,
    color: "text-green-600",
    bgColor: "bg-green-50",
    gradient: "from-green-500 to-green-600",
    providerCount: 52,
  },
  Beauty: {
    icon: Award,
    color: "text-red-600",
    bgColor: "bg-red-50",
    gradient: "from-red-500 to-red-600",
    providerCount: 41,
  },
  Electrician: {
    icon: Wrench,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    gradient: "from-yellow-500 to-yellow-600",
    providerCount: 23,
  },
  Plumber: {
    icon: Wrench,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    gradient: "from-cyan-500 to-cyan-600",
    providerCount: 19,
  },
  Driver: {
    icon: Car,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    gradient: "from-indigo-500 to-indigo-600",
    providerCount: 31,
  },
  Trainer: {
    icon: Dumbbell,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    gradient: "from-emerald-500 to-emerald-600",
    providerCount: 27,
  },
  Musician: {
    icon: Music,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    gradient: "from-rose-500 to-rose-600",
    providerCount: 15,
  },
  Photographer: {
    icon: Camera,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    gradient: "from-violet-500 to-violet-600",
    providerCount: 34,
  },
  Artist: {
    icon: Palette,
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    gradient: "from-fuchsia-500 to-fuchsia-600",
    providerCount: 22,
  },
  Others: {
    icon: Plus,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    gradient: "from-gray-500 to-gray-600",
    providerCount: 45,
  },
};

const mainCategories = [
  "Tutor",
  "Tailor",
  "Home Cook",
  "Babysitter",
  "Cleaner",
  "Beauty",
];
const additionalCategories = [
  "Electrician",
  "Plumber",
  "Driver",
  "Trainer",
  "Musician",
  "Photographer",
  "Artist",
  "Others",
];
const allCategories = [...mainCategories, ...additionalCategories];
const priceRanges = [
  "Below ₹300",
  "₹300 - ₹600",
  "₹600 - ₹1000",
  "Above ₹1000",
];
const distanceOptions = [
  "Within 1 km",
  "Within 3 km",
  "Within 5 km",
  "Within 10 km",
];

export default function FindServicePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showAllFilterCategories, setShowAllFilterCategories] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "topRated">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Handle category checkbox change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setActiveTab("all");
  };

  // Add to cart
  const addToCart = (provider: ServiceProvider) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === provider.id);
      if (existing) {
        return prev.map((item) =>
          item.id === provider.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: provider.id,
          name: provider.name,
          role: provider.role,
          price: provider.price,
          priceUnit: provider.priceUnit,
          quantity: 1,
        },
      ];
    });
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + parseInt(item.price) * item.quantity,
      0,
    );
  };

  // Handle checkout
  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
      setShowCart(false);
    }, 3000);
  };

  // Filter providers
  const filteredProviders = serviceProviders.filter((provider) => {
    if (
      searchQuery &&
      !provider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !provider.role.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(provider.category)
    )
      return false;
    if (selectedPriceRange) {
      const price = parseInt(provider.price);
      if (selectedPriceRange === "Below ₹300" && price > 300) return false;
      if (selectedPriceRange === "₹300 - ₹600" && (price < 300 || price > 600))
        return false;
      if (
        selectedPriceRange === "₹600 - ₹1000" &&
        (price < 600 || price > 1000)
      )
        return false;
      if (selectedPriceRange === "Above ₹1000" && price < 1000) return false;
    }
    if (selectedDistance) {
      const distance = parseFloat(provider.distance);
      const maxDistance = parseInt(selectedDistance.split(" ")[1]);
      if (distance > maxDistance) return false;
    }
    if (selectedRating && provider.rating < selectedRating) return false;
    if (availabilityFilter && !provider.availableToday) return false;
    return true;
  });

  const topRatedProviders = serviceProviders.filter(
    (provider) => provider.rating >= 4.8,
  );
  const displayedProviders =
    activeTab === "all" ? filteredProviders : topRatedProviders;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSelectedDistance(null);
    setSelectedRating(null);
    setAvailabilityFilter(false);
    setSearchQuery("");
  };

  const handleCategoryClick = (categoryName: string) => {
    handleCategoryChange(categoryName);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRange ||
    selectedDistance ||
    selectedRating ||
    availabilityFilter;
  const displayedFilterCategories = showAllFilterCategories
    ? allCategories
    : mainCategories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Gradient and Cart Icon */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="inline-block">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Find Services
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-3">
              Find trusted local service providers near you
            </p>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
              />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Categories</h2>
              <p className="text-sm text-gray-500 mt-1">
                Browse by service type
              </p>
            </div>
            <button
              onClick={() => setShowMoreCategories(!showMoreCategories)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {showMoreCategories ? (
                <>
                  <X className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <MoreHorizontal className="w-4 h-4" />
                  View More Categories
                </>
              )}
            </button>
          </div>

          {/* Main Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mainCategories.map((category) => {
              const config = categoryConfig[category];
              const Icon = config?.icon || Award;
              const isSelected = selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? "shadow-lg ring-2 ring-blue-500 ring-offset-2"
                      : "hover:shadow-md"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${config?.gradient || "from-gray-500 to-gray-600"} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`p-4 text-center ${isSelected ? config?.bgColor || "bg-blue-50" : "bg-white"} border border-gray-200 rounded-xl`}
                  >
                    <div
                      className={`${config?.bgColor || "bg-gray-50"} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon
                        className={`w-6 h-6 ${config?.color || "text-gray-600"}`}
                      />
                    </div>
                    <h3
                      className={`font-semibold text-sm ${isSelected ? config?.color || "text-blue-600" : "text-gray-900"}`}
                    >
                      {category}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {config?.providerCount || 24} providers
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Additional Categories */}
          {showMoreCategories && (
            <div className="mt-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="text-sm font-medium text-gray-500">
                  More Categories
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {additionalCategories.map((category) => {
                  const config = categoryConfig[category];
                  const Icon = config?.icon || Award;
                  const isSelected = selectedCategories.includes(category);

                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`group rounded-lg transition-all duration-300 hover:scale-105 ${
                        isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""
                      }`}
                    >
                      <div
                        className={`p-3 text-center ${isSelected ? config?.bgColor || "bg-blue-50" : "bg-white"} border border-gray-200 rounded-lg`}
                      >
                        <div
                          className={`${config?.bgColor || "bg-gray-50"} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2`}
                        >
                          <Icon
                            className={`w-5 h-5 ${config?.color || "text-gray-600"}`}
                          />
                        </div>
                        <h3
                          className={`text-xs font-medium ${isSelected ? config?.color || "text-blue-600" : "text-gray-700"}`}
                        >
                          {category}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {config?.providerCount || 20} providers
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === "all"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Providers
              {activeTab === "all" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("topRated")}
              className={`pb-3 px-1 font-medium transition-colors relative flex items-center gap-1 ${
                activeTab === "topRated"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Award className="w-4 h-4" />
              Top Rated Providers
              {activeTab === "topRated" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedCategories.length +
                    (selectedPriceRange ? 1 : 0) +
                    (selectedDistance ? 1 : 0) +
                    (selectedRating ? 1 : 0) +
                    (availabilityFilter ? 1 : 0)}
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${isMobileFilterOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Filters Panel */}
          <div
            className={`
            lg:w-80 flex-shrink-0
            ${isMobileFilterOpen ? "block" : "hidden lg:block"}
          `}
          >
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20 shadow-sm">
              <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter with Checkboxes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2.5">
                  {displayedFilterCategories.map((category) => {
                    const config = categoryConfig[category];
                    const Icon = config?.icon;
                    const isChecked = selectedCategories.includes(category);

                    return (
                      <label
                        key={category}
                        className={`flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-all ${
                          isChecked ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCategoryChange(category)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        {Icon && (
                          <div
                            className={`${config?.bgColor || "bg-gray-100"} p-1.5 rounded-full`}
                          >
                            <Icon
                              className={`w-4 h-4 ${config?.color || "text-gray-600"}`}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                            {category}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            ({config?.providerCount || 20})
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Others Checkbox */}
                <div className="mt-2">
                  <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Others")}
                      onChange={() => handleCategoryChange("Others")}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <div className="bg-gray-100 p-1.5 rounded-full">
                      <Plus className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                        Others
                      </span>
                      <span className="text-xs text-gray-400 ml-2">(45)</span>
                    </div>
                  </label>
                </div>

                {/* View More/Less button */}
                {allCategories.length > mainCategories.length && (
                  <button
                    onClick={() =>
                      setShowAllFilterCategories(!showAllFilterCategories)
                    }
                    className="text-blue-600 text-sm mt-3 font-medium hover:text-blue-700 flex items-center gap-1 transition-colors"
                  >
                    {showAllFilterCategories ? (
                      <>
                        <X className="w-3 h-3" />
                        View Less
                      </>
                    ) : (
                      <>
                        <MoreHorizontal className="w-3 h-3" />
                        View More Categories ({additionalCategories.length}{" "}
                        more)
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 cursor-pointer group p-1 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range}
                        onChange={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === range ? null : range,
                          )
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Distance</h4>
                <div className="space-y-2">
                  {distanceOptions.map((distance) => (
                    <label
                      key={distance}
                      className="flex items-center gap-2 cursor-pointer group p-1 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="distance"
                        checked={selectedDistance === distance}
                        onChange={() =>
                          setSelectedDistance(
                            selectedDistance === distance ? null : distance,
                          )
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {distance}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer group p-1 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() =>
                          setSelectedRating(
                            selectedRating === rating ? null : rating,
                          )
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {rating}+
                        </span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                <label className="flex items-center gap-2 cursor-pointer group p-1 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={availabilityFilter}
                    onChange={() => setAvailabilityFilter(!availabilityFilter)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    Available Today
                  </span>
                </label>
              </div>

              {/* Selected Categories Summary */}
              {selectedCategories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">
                    Selected categories:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {cat}
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="flex-1">
            {/* Popular Categories - Smaller Section */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    Popular Categories
                  </h2>
                </div>
                <button className="text-blue-600 text-xs hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {mainCategories.map((category) => {
                  const config = categoryConfig[category];
                  const Icon = config?.icon;
                  const isSelected = selectedCategories.includes(category);

                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {Icon && <Icon className="w-3 h-3" />}
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-500 text-sm">
                Found{" "}
                <span className="font-semibold text-gray-900">
                  {displayedProviders.length}
                </span>{" "}
                service providers
              </p>
            </div>

            {/* Service Providers List */}
            <div className="space-y-4">
              {displayedProviders.map((provider) => (
                <div
                  key={provider.id}
                  className={`bg-white rounded-xl border p-5 hover:shadow-lg transition-all duration-300 relative ${
                    provider.isTopRated
                      ? "border-yellow-300 shadow-sm"
                      : "border-gray-200"
                  }`}
                >
                  {provider.isTopRated && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Award className="w-3 h-3" />
                      Top Rated
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-7 h-7 text-blue-600" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {provider.name}
                          </h3>
                          <p className="text-blue-600 font-medium text-sm">
                            {provider.role}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">
                            ₹{provider.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            / {provider.priceUnit}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900 text-sm">
                            {provider.rating}
                          </span>
                        </div>
                        <span className="text-gray-300 text-xs">•</span>
                        <span className="text-gray-500 text-sm">
                          ({provider.reviews} reviews)
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {provider.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{provider.distance} away</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{provider.experience} experience</span>
                        </div>
                        {provider.availableToday && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-600 font-medium">
                              Available Today
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => addToCart(provider)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all transform hover:scale-105"
                        >
                          Add to Cart
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {displayedProviders.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No services found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowCart(false)}
            />
            <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col animate-slideIn">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">{item.role}</p>
                          <p className="text-blue-600 font-semibold text-sm mt-1">
                            ₹{parseInt(item.price) * item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹{calculateTotal()}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Checkout Success Modal */}
        {checkoutSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideUp z-50">
            <CheckCircle className="w-5 h-5" />
            <span>Order placed successfully!</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
