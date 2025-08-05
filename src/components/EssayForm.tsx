// src/components/EssayForm.tsx
'use client';
import { useState } from 'react';

interface EssayFormProps {
  onSubmit: (essay: string, prompt: string) => void;
  isLoading: boolean;
}

export default function EssayForm({ onSubmit, isLoading }: EssayFormProps) {
  const [essay, setEssay] = useState('');
  const [prompt, setPrompt] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEssay(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (essay.trim() && prompt.trim()) {
      onSubmit(essay, prompt);
    }
  };

  const isValidEssay = essay.trim().length > 50 && wordCount <= 1000;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Your College Essay</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Essay Prompt Input */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Essay Prompt/Question
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Paste your college essay prompt or question here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            required
          />
        </div>

        {/* Essay Text Input */}
        <div>
          <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
            Your Essay
          </label>
          <textarea
            id="essay"
            value={essay}
            onChange={handleEssayChange}
            placeholder="Paste your college essay here for AI-powered feedback..."
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={15}
            required
          />
          
          {/* Word Count & Guidelines */}
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className={`${wordCount > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
              {wordCount} words {wordCount > 1000 && '(exceeds 1000 word limit)'}
            </span>
            <span className="text-gray-400">
              Minimum 50 words
            </span>
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">What you will get:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Detailed feedback on structure and flow</li>
            <li>• Suggestions for stronger word choices</li>
            <li>• Tips to make your story more compelling</li>
            <li>• Grammar and style improvements</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValidEssay || isLoading}
          className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors ${
            isValidEssay && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing your essay...
            </div>
          ) : (
            'Get AI Feedback'
          )}
        </button>
      </form>
    </div>
  );
}