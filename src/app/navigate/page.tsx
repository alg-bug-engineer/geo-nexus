'use client';

import React, { useState, useMemo } from 'react';
import { categories, navItems } from '@/data/navigation';
import NavigationCard from '@/components/NavigationCard';
import { Search } from 'lucide-react';

const NavigatePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = useMemo(() => {
    return navItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">AI 工具导航</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">发现和探索最好用的人工智能工具</p>
        </header>

        {/* Search and Filter Section */}
        <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 mb-8">
            <div className="max-w-4xl mx-auto">
                 {/* Search Input */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="在「AI办公工具」中搜索"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                        activeCategory === 'all'
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                    >
                        全部标签
                    </button>
                    {categories.map((category) => (
                        <button
                        key={category.key}
                        onClick={() => setActiveCategory(category.key)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                            activeCategory === category.key
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        >
                        {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Tools Grid */}
        {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
                <NavigationCard key={item.title} item={item} />
            ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">没有找到匹配的工具。</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default NavigatePage;

