// src/app/page.tsx
import Link from 'next/link';

// Jainam from Mac: 10/17/25, I am trying to learn how my code works in more detail. I am back! Right now I want to figure
// out how all the files are structured together to make the final product.

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-[Montserrat]">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6 md:px-12 lg:px-24">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Blueprint.AI</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your
                <span className="text-blue-500 block"> College Essays</span>
                with AI-Powered Feedback
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get personalized, intelligent feedback on your college essays. Jainam&apos;s AI analyzes your writing 
                for structure, clarity, and impact, helping you craft compelling applications that stand out.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth/signup">
                  <button className="bg-[#0F2D52] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-[#1a4a7a] hover:-translate-y-0.5 w-full sm:w-auto">
                    Sign up — 3 free reviews
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button className="border-2 border-[#0F2D52] text-[#0F2D52] font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto">
                    I already have an account
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Detailed analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Incredibly quick</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 AI feedback</span>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Essay Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Structure & Flow</span>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Excellent</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Content Quality</span>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">Very Good</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Grammar</span>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Perfect</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                  <div className="text-gray-600">Overall Score</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Blueprint.AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jainam&apos;s AI-powered platform provides the same quality feedback as expensive human counselors, 
              but faster and more affordable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Blueprint AI analyzes your essay structure, tone, and impact, providing detailed feedback on how to improve your narrative.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Get comprehensive feedback in under 30 seconds. No more waiting days or weeks for human reviewers to respond.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-[1.02]">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Students using this service see dramatic improvements in their essay quality and college acceptance rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:px-12 lg:px-24 bg-[#0F2D52]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your College Application?
          </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who have already improved their essays with Blueprint.AI. 
            Get started with your first essay review completely free.
          </p>
          <Link href="/essay-feedback">
            <button className="bg-white text-[#0F2D52] font-bold py-4 px-10 rounded-lg text-lg transition-all duration-200 shadow-lg hover:bg-gray-100 hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-[1.02] ring-0 hover:ring-2 hover:ring-white/70 hover:ring-offset-2 hover:ring-offset-[#0F2D52]">
              Get Started Today - It&apos;s Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 md:px-12 lg:px-24 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white">Blueprint.AI</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="mb-2">© 2025 Blueprint.AI. All rights reserved.</p>
              <p className="text-sm">Helping students achieve their college dreams.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}