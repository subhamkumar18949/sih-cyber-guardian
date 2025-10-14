import React from 'react';

// --- ICONS for Feature Cards ---
const FiLayoutDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;
const FiCpuFeature = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const FiHash = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>;
const FiLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
// ✅ New Icon for the fifth card
const FiShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;

// --- ✅ Data for the Feature Cards (Now with 5 items) ---
const features = [
  {
    icon: <FiLayoutDashboard />,
    title: 'Unified Dashboard',
    description: 'A single, intuitive interface to submit text, images, and videos for comprehensive analysis.',
  },
  {
    icon: <FiCpuFeature />,
    title: 'Multi-Modal AI Engine',
    description: 'Our core AI analyzes content for deepfakes, AI-generated text, and harmful toxicity.',
  },
  {
    icon: <FiHash />,
    title: 'Content Hashing',
    description: 'We create a unique SHA256 fingerprint for all submitted content to ensure its integrity.',
  },
  {
    icon: <FiLink />,
    title: 'Blockchain Audit Trail',
    description: 'Every analysis result is stored on a distributed ledger, creating a secure and immutable record.',
  },
  {
    icon: <FiShield />,
    title: 'Privacy-First Approach',
    description: 'Analyze content with confidence. Your submissions are processed securely without permanent storage.',
  },
];


// --- The Main Page Component ---
const Features = () => {
  return (
    // Main container with a transparent background and relative positioning for pseudo-elements
    <div className="relative bg-transparent w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-white font-sans overflow-hidden">

      {/* --- ATTRACTIVE BACKGROUND ELEMENT --- */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-radial-gradient from-blue-900/50 via-sky-950/10 to-transparent -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto text-center z-10">

        {/* --- Tagline --- */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-6 animate-fade-in-down">
          Securing Digital Truth, On-Chain.
        </h1>

        {/* --- Introduction Section --- */}
        <div className="mb-20 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl font-bold text-sky-100 mb-2">The Cyber Guardian Platform</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            In an era of digital manipulation, verifying content authenticity is paramount. Our platform provides a transparent, unchangeable source of truth.
          </p>
        </div>

        {/* --- BIGGER Feature Cards in a 3-COLUMN Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-animate bg-sky-950/40 backdrop-blur-md border border-sky-800/60 rounded-xl p-8 flex flex-col items-start text-left hover:border-sky-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-700/20 cursor-pointer min-h-[320px]"
              style={{ animationDelay: `${400 + index * 150}ms` }} // Staggered animation delay
            >
              <div className="bg-sky-800/50 p-4 rounded-lg mb-5">
                <div className="w-9 h-9 text-sky-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* --- CALL TO ACTION SECTION --- */}
        <div className="mt-24 text-center animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
           <h3 className="text-2xl font-bold text-white mb-4">Ready to Analyze with Confidence?</h3>
           <p className="text-gray-400 mb-8 max-w-xl mx-auto">
             Join us in building a more transparent digital world. Get started now and see the power of decentralized verification.
           </p>
           {/* ✅ Updated to an <a> tag linking to the root path */}
           <a
             href="/analysis"
             className="inline-block bg-gradient-to-r from-sky-800 to-sky-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
           >
             Go to Analyzer
           </a>
        </div>

      </div>

      {/* --- CSS for Animations --- */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .card-animate {
            opacity: 0;
            animation: fadeInUp 0.7s ease-out forwards;
        }
        .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Features;