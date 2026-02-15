"use client";

import React, { useState, useTransition } from "react";
import {
  Users,
  TrendingUp,
  Award,
  Calendar,
  ChevronUp,
  DollarSign,
  UserCircle,
  Star,
  Target,
  Flame,
  Edit2,
  Check,
  X,
  Plus,
  AlertTriangle,
  Power,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddContributorModal from "./modal";
import { endContributions } from "@/app/apiServices/serverActions";

const ContributionsPage = ({ contributions }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [goalAmount, setGoalAmount] = useState(10000);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoalAmount, setTempGoalAmount] = useState(goalAmount);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Calculates totals and stats from server data
  const totalAmount =
    contributions?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const contributorCount = contributions?.length || 0;
  const averageAmount =
    contributorCount > 0 ? Math.round(totalAmount / contributorCount) : 0;
  const topContribution =
    contributorCount > 0 ? Math.max(...contributions.map((c) => c.amount)) : 0;
  const topContributor =
    contributorCount > 0
      ? contributions.reduce((max, item) =>
          max.amount > item.amount ? max : item,
        )
      : { name: "N/A", amount: 0, avatar: "👤" };
  const remainingAmount = goalAmount - totalAmount;
  const progressPercentage =
    contributorCount > 0 ? (totalAmount / goalAmount) * 100 : 0;

  // Handle goal edit
  const handleSaveGoal = () => {
    setGoalAmount(tempGoalAmount);
    setIsEditingGoal(false);
  };

  const handleCancelGoal = () => {
    setTempGoalAmount(goalAmount);
    setIsEditingGoal(false);
  };

  // Handle successful contributor addition
  const handleAddSuccess = () => {
    setIsModalOpen(false);
    router.refresh(); // Refresh to get fresh data from server
  };

  // Handles end fundraiser
  const handleEndFundraiser = async () => {
    startTransition(async () => {
      try {
        const result = await endContributions();

        if (result.success) {
          setIsEndModalOpen(false);
          router.refresh();
        } else {
          alert("Failed to end fundraiser: " + result.message);
        }
      } catch (error) {
        alert("An error occurred while ending the fundraiser");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header  */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              <div className="p-2 sm:p-3 bg-indigo-100 rounded-xl sm:rounded-2xl flex-shrink-0">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1 sm:flex-initial">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                  let&apos;s Fundraise
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1 truncate">
                  Together we can make a difference! 🌟
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex items-center space-x-2 bg-indigo-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex-1 sm:flex-initial">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-indigo-700 truncate">
                  {currentDate}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-1.5 sm:space-x-2 transition-colors shadow-md flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">Add</span>
              </button>
              {contributions && contributions.length > 0 && (
                <button
                  onClick={() => setIsEndModalOpen(true)}
                  disabled={isPending}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-1.5 sm:space-x-2 transition-colors shadow-md flex-shrink-0 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                  <Power className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">
                    {isPending ? "Ending..." : "End"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Main Progress Card  */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-indigo-100 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
          {/* Prominent Goal Display */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            {isEditingGoal ? (
              <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="number"
                    value={tempGoalAmount}
                    onChange={(e) => setTempGoalAmount(Number(e.target.value))}
                    className="flex-1 text-2xl sm:text-3xl font-bold text-indigo-600 border-2 border-indigo-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 w-full"
                    min="1"
                    step="100"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveGoal}
                      className="flex-1 sm:flex-initial p-2 sm:p-3 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                    <button
                      onClick={handleCancelGoal}
                      className="flex-1 sm:flex-initial p-2 sm:p-3 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg sm:rounded-xl p-3 sm:p-4 gap-3">
                <div className="w-full sm:w-auto">
                  <span className="text-xs sm:text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                    Fundraising Goal
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600">
                      ${goalAmount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setIsEditingGoal(true)}
                      className="p-1.5 sm:p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </button>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <span className="text-xs sm:text-sm text-gray-500">
                    Raised so far
                  </span>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    ${totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
              <span>Progress</span>
              <span className="font-semibold">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Remaining Amount */}
          <div className="bg-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium text-orange-700">
                Still needed:
              </span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-orange-600">
              ${Math.max(remainingAmount, 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats Grid  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          {/* Total Contributions */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                12%
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">
              Total Contributions
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              ${totalAmount.toLocaleString()}
            </p>
          </div>

          {/* Contributors */}
          <Link
            href={{
              pathname: "/contributors",
              query: { target: goalAmount },
            }}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md hover:bg-cyan-400 transition-all block"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                View All
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">
              Total Contributors
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {contributorCount}
            </p>
          </Link>

          {/* Average Contribution */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">
              Average Contribution
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              ${averageAmount}
            </p>
          </div>

          {/* Top Contribution */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">
              Top Contribution
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              ${topContribution}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
              by {topContributor?.name}
            </p>
          </div>
        </div>

        {/* Main Content Grid  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Contributors List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                  <UserCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-gray-600 flex-shrink-0" />
                  <span className="truncate">Contributors Breakdown</span>
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center space-x-1 transition-colors flex-shrink-0"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 sm:max-h-[500px] overflow-y-auto">
                {contributions && contributions.length > 0 ? (
                  contributions
                    .sort((a, b) => b.amount - a.amount)
                    .map((contribution, index) => (
                      <div
                        key={contribution.id}
                        className="px-3 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center text-base sm:text-xl">
                              {contribution.avatar}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 flex items-center truncate">
                                <span className="truncate">
                                  {contribution.name}
                                </span>
                                {index === 0 && (
                                  <Star className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-yellow-400 fill-current flex-shrink-0" />
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right pl-10 sm:pl-0">
                            <p className="text-base sm:text-lg font-bold text-gray-900">
                              ${contribution.amount}
                            </p>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-1.5 sm:mt-2 w-full bg-gray-200 rounded-full h-1 sm:h-1.5">
                          <div
                            className="bg-indigo-600 h-1 sm:h-1.5 rounded-full"
                            style={{
                              width: `${(contribution.amount / topContribution) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="px-4 sm:px-6 py-8 sm:py-12 text-center text-gray-500 text-sm sm:text-base">
                    No contributors yet. Be the first to add one!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Top Contributor Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h3 className="text-sm sm:text-base font-semibold">
                  🏆 Top Contributor
                </h3>
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  {topContributor?.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-bold truncate">
                    {topContributor?.name}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">
                    ${topContributor?.amount} total
                  </p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
                <p className="text-xs sm:text-sm text-white/80">
                  Leading the way! 🌟
                </p>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-4">
                Quick Stats
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Goal:</span>
                  <span className="font-medium">
                    ${goalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Raised:</span>
                  <span className="font-medium">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-orange-600">
                    ${Math.max(remainingAmount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 sm:pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Contributors:</span>
                    <span className="font-medium">{contributorCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-sm sm:text-base text-gray-600">
            {remainingAmount > 0
              ? `✨ Only $${remainingAmount.toLocaleString()} more to reach our goal! Every contribution helps.`
              : "🎉 We did it! Thank you everyone for your amazing support!"}
          </p>
        </div>
      </div>

      {/* Add Contributor Modal */}
      <AddContributorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {/* End Fundraiser Confirmation Modal */}
      {isEndModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                End Fundraiser?
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to end this fundraiser? This action will:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Delete all {contributorCount} contributions</li>
                <li>Remove all contributor data</li>
                <li>Reset the fundraiser to empty state</li>
              </ul>
              <p className="text-red-500 font-medium mt-3 text-sm">
                ⚠️ This action cannot be undone!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEndModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleEndFundraiser}
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Ending...
                  </>
                ) : (
                  "Yes, End Fundraiser"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionsPage;
