import React from 'react';

const WelcomeComponent = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome user to Our Awesome App!</h1>
        <p className="text-lg mb-8">Start your amazing journey with us.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default WelcomeComponent;
