import React from 'react';

// Custom Lightning SVG component
const LightningIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const PromptLibrary = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <span className="text-yellow-500 text-xl font-mono">&gt;_</span>
          <a href="#" className="mx-4 text-yellow-500">Prompts</a>
          <div className="flex items-center">
            <a href="#" className="mx-2">Tools</a>
            <a href="#" className="mx-2">Products</a>
            <a href="#" className="mx-2">Pricing</a>
            <a href="#" className="mx-2">Contact Us</a>
            <a href="#" className="mx-2">Blog</a>
          </div>
        </div>
        <div className="flex items-center">
          <a href="#" className="mx-2">Log out</a>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center ml-4">
            <span className="text-black text-2xl">😎</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="w-24">
            <img 
              src="/api/placeholder/96/96"
              alt="God of Prompt Logo"
              className="w-full"
            />
          </div>
          <div className="w-12 text-yellow-500">
            <LightningIcon />
          </div>
        </div>

        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4">
            The Biggest AI
            <div className="inline-block bg-purple-900 px-6 py-2 rounded-xl mx-2">
              Prompt Library
            </div>
          </h1>
          <p className="text-xl mb-8">by God of Prompt</p>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the best AI prompts for ChatGPT & Midjourney designed
            to supercharge your business and boost your productivity.
          </p>
        </div>

        {/* AI Tools */}
        <div className="flex justify-center gap-4 mb-20">
          <div className="bg-black px-6 py-3 rounded-full flex items-center">
            <img 
              src="/api/placeholder/24/24"
              alt="ChatGPT Logo"
              className="w-6 h-6 mr-2"
            />
            <span>ChatGPT</span>
          </div>
          <div className="bg-black px-6 py-3 rounded-full flex items-center">
            <img 
              src="/api/placeholder/24/24"
              alt="Midjourney Logo"
              className="w-6 h-6 mr-2"
            />
            <span>Midjourney</span>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Prompt Library Categories:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sales Card */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">📈</span>
                <h3 className="text-xl font-bold">Sales</h3>
                <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">New</span>
              </div>
            </div>
            {/* Education Card */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">📚</span>
                <h3 className="text-xl font-bold">Education</h3>
                <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">New</span>
              </div>
            </div>
            {/* Marketing Card */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">📢</span>
                <h3 className="text-xl font-bold">Marketing</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Prompt Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 border border-gray-700 hover:bg-gray-900 transition-colors">
            <span className="text-xl">✨</span>
            Custom Prompt?
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptLibrary;