// src/app/essay-feedback/page.tsx
'use client';
import { useState } from 'react';
import EssayForm from '@/components/EssayForm';

interface FeedbackResponse {
  feedback: string;
  wordCount: number;
  timestamp: string;
}

export default function EssayFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEssaySubmit = async (essay: string, prompt: string) => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await fetch('/api/submit-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essay, prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get feedback');
      }

      const data: FeedbackResponse = await response.json();
      setFeedback(data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('feedback-results')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setFeedback(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Essay Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant, detailed feedback on your college essays from our AI counselor. 
            Improve your writing and increase your chances of admission.
          </p>
        </div>

        {/* Essay Form */}
        {!feedback && (
          <EssayForm onSubmit={handleEssaySubmit} isLoading={isLoading} />
        )}

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error generating feedback
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setError(null)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Results */}
        {feedback && (
          <div id="feedback-results" className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your Essay Feedback
                  </h2>
                  <p className="text-gray-600">
                    Generated on {new Date(feedback.timestamp).toLocaleDateString()} • {feedback.wordCount} words
                  </p>
                </div>
                <button
                  onClick={handleStartOver}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Another Essay
                </button>
              </div>

              {/* Feedback Content */}
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {feedback.feedback}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
                <button
                  onClick={() => window.print()}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Print Feedback
                </button>
                <button
                  onClick={() => {
                    const text = `Essay Feedback - Generated on ${new Date(feedback.timestamp).toLocaleDateString()}\n\n${feedback.feedback}`;
                    navigator.clipboard.writeText(text);
                    alert('Feedback copied to clipboard!');
                  }}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        {!feedback && !isLoading && (
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">AI-Powered</div>
                <p className="text-gray-600">Advanced AI trained on thousands of successful college essays</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">Instant Results</div>
                <p className="text-gray-600">Get detailed feedback in under 30 seconds</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">Expert Quality</div>
                <p className="text-gray-600">Feedback comparable to professional college counselors</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}