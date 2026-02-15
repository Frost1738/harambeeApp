import React from "react";
import Link from "next/link";
import {
  Users,
  UserCircle,
  Heart,
  Star,
  Award,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { getContributions } from "../apiServices/getFunctions";

const ContributorsPage = async ({ searchParams }) => {
  const { target } = await searchParams;
  const contributors = await getContributions();

  const goalAmount = target ? parseInt(target) : 10000;

  // the total amount
  const totalAmount = contributors.reduce((sum, item) => sum + item.amount, 0);

  // threshold ya highest contributors (5% of goal amount)
  const threshold = goalAmount * 0.05;

  // Get top supporters (those who contributed more than 5% of goal)
  const topSupporterIds = contributors
    .filter((c) => c.amount > threshold)
    .map((c) => c.id);

  const topSupportersCount = topSupporterIds.length;

  // Spliting contributors into columns for layout
  const columnSize = Math.ceil(contributors.length / 3);
  const columns = {
    first: contributors.slice(0, columnSize),
    second: contributors.slice(columnSize, columnSize * 2),
    third: contributors.slice(columnSize * 2),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* return home Button  */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 sm:space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors group text-sm sm:text-base"
          >
            <div className="p-1 sm:p-1.5 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </div>
            <span className="font-medium">Back home</span>
          </Link>
        </div>
      </div>

      {/* Header  */}
      <div className="bg-white border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-indigo-100 rounded-full mb-2 sm:mb-4">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-indigo-600 fill-current" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
              Our Amazing Contributors
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              A heartfelt thank you to everyone who made this possible
            </p>
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 bg-indigo-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              <span className="text-xs sm:text-sm text-indigo-700">
                Fundraising Goal: ${goalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {/* Total Contributors */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="p-2 sm:p-2.5 md:p-3 bg-indigo-100 rounded-lg sm:rounded-xl">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Total Contributors
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {contributors.length}
                </p>
              </div>
            </div>
          </div>

          {/* Top Supporters */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="p-2 sm:p-2.5 md:p-3 bg-yellow-100 rounded-lg sm:rounded-xl">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-600 fill-current" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Top Supporters
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {topSupportersCount}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">
                  &gt; ${threshold.toLocaleString()} (5%)
                </p>
              </div>
            </div>
          </div>

          {/* Total Raised */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="p-2 sm:p-2.5 md:p-3 bg-green-100 rounded-lg sm:rounded-xl">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Total Raised
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-indigo-100 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="p-2 sm:p-2.5 md:p-3 bg-purple-100 rounded-lg sm:rounded-xl">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Goal Progress
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {Math.round((totalAmount / goalAmount) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center">
                <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-1.5 sm:mr-2 md:mr-3 flex-shrink-0" />
                <span className="truncate">Contributors Wall of Fame</span>
              </h2>
              <span className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                {contributors.length} people · {topSupportersCount} top ⭐
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {/* Column 1 */}
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {columns.first.map((contributor) => {
                  const isTopSupporter = topSupporterIds.includes(
                    contributor.id,
                  );
                  return (
                    <div
                      key={contributor.id}
                      className={`group flex flex-col xs:flex-row items-start xs:items-center justify-between p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl transition-all hover:shadow-md ${
                        isTopSupporter
                          ? "bg-yellow-50 hover:bg-yellow-100 border border-yellow-200"
                          : "bg-gray-50 hover:bg-indigo-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 w-full xs:w-auto">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-sm sm:text-base ${
                            isTopSupporter
                              ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                              : "bg-gradient-to-br from-indigo-500 to-purple-500"
                          }`}
                        >
                          {contributor.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-sm sm:text-base font-medium ${
                              isTopSupporter ? "text-gray-900" : "text-gray-800"
                            } group-hover:text-indigo-700 transition-colors flex items-center truncate`}
                          >
                            <span className="truncate">{contributor.name}</span>
                            {isTopSupporter && (
                              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-1 sm:ml-1.5 md:ml-2 text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            ${contributor.amount}
                          </span>
                        </div>
                      </div>
                      {isTopSupporter && (
                        <span className="text-[10px] sm:text-xs bg-yellow-200 text-yellow-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium mt-1 xs:mt-0">
                          Top 5%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Column 2 */}
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {columns.second.map((contributor) => {
                  const isTopSupporter = topSupporterIds.includes(
                    contributor.id,
                  );
                  return (
                    <div
                      key={contributor.id}
                      className={`group flex flex-col xs:flex-row items-start xs:items-center justify-between p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl transition-all hover:shadow-md ${
                        isTopSupporter
                          ? "bg-yellow-50 hover:bg-yellow-100 border border-yellow-200"
                          : "bg-gray-50 hover:bg-purple-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 w-full xs:w-auto">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-sm sm:text-base ${
                            isTopSupporter
                              ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                              : "bg-gradient-to-br from-purple-500 to-pink-500"
                          }`}
                        >
                          {contributor.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-sm sm:text-base font-medium ${
                              isTopSupporter ? "text-gray-900" : "text-gray-800"
                            } group-hover:text-purple-700 transition-colors flex items-center truncate`}
                          >
                            <span className="truncate">{contributor.name}</span>
                            {isTopSupporter && (
                              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-1 sm:ml-1.5 md:ml-2 text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            ${contributor.amount}
                          </span>
                        </div>
                      </div>
                      {isTopSupporter && (
                        <span className="text-[10px] sm:text-xs bg-yellow-200 text-yellow-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium mt-1 xs:mt-0">
                          Top 5%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Column 3 */}
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {columns.third.map((contributor) => {
                  const isTopSupporter = topSupporterIds.includes(
                    contributor.id,
                  );
                  return (
                    <div
                      key={contributor.id}
                      className={`group flex flex-col xs:flex-row items-start xs:items-center justify-between p-3 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl transition-all hover:shadow-md ${
                        isTopSupporter
                          ? "bg-yellow-50 hover:bg-yellow-100 border border-yellow-200"
                          : "bg-gray-50 hover:bg-pink-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 w-full xs:w-auto">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-sm sm:text-base ${
                            isTopSupporter
                              ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                              : "bg-gradient-to-br from-pink-500 to-orange-500"
                          }`}
                        >
                          {contributor.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-sm sm:text-base font-medium ${
                              isTopSupporter ? "text-gray-900" : "text-gray-800"
                            } group-hover:text-pink-700 transition-colors flex items-center truncate`}
                          >
                            <span className="truncate">{contributor.name}</span>
                            {isTopSupporter && (
                              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-1 sm:ml-1.5 md:ml-2 text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            ${contributor.amount}
                          </span>
                        </div>
                      </div>
                      {isTopSupporter && (
                        <span className="text-[10px] sm:text-xs bg-yellow-200 text-yellow-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium mt-1 xs:mt-0">
                          Top 5%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-center px-4">
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-sm border border-indigo-100">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-500 fill-current" />
            <span className="text-xs sm:text-sm md:text-base text-gray-700 whitespace-nowrap">
              {contributors.length} people · {topSupportersCount} top 5% ⭐
            </span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-500 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorsPage;
