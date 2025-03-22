import React from 'react';
import DashboardLayout from './DashboardLayout';
import CountdownTimer from '../shared/CountdownTimer';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[770px] mx-auto">
        {/* Pre-enrollee Banner */}
        <PreEnrolleeBanner />
        
        {/* System Overview */}
        <SystemOverview />
        
        {/* Two Goals Section */}
        <GoalsSection />
        
        {/* Action Boxes */}
        <ActionBoxes />
      </div>
    </DashboardLayout>
  );
};

const PreEnrolleeBanner = () => (
  <div className="bg-white rounded-lg p-6 mb-8">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">
        Congratulations Kevin!
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Your <span className="text-green-600 font-bold">FREE TEMPORARY PRE-ENROLLEE</span> Position is in!
      </p>
      <CountdownTimer />
      <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg">
        Lock in Your Position
      </button>
    </div>
  </div>
);

const SystemOverview = () => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold mb-6">
      The <span className="text-[#00A0DC]">MOST POWERFUL SYSTEM</span> in the Industry
    </h2>
    <p className="text-lg text-gray-700">
      With the most exciting compensation plan in the industry, breakthrough products 
      that are changing lives, incredible leadership and support, and THIS, the most 
      powerful system in the industry that is breaking records.
    </p>
  </section>
);

const GoalsSection = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6">
      At Talk Fusion, we have two goals
    </h2>
    <div className="grid grid-cols-2 gap-8">
      <GoalCard 
        icon="certificate"
        text="To help you get healthy and stay healthy with the highest quality products at prices anyone can afford!"
      />
      <GoalCard 
        icon="graph"
        text="To help you make money easier and faster than any other company in the industry!"
      />
    </div>
  </section>
);

const GoalCard = ({ icon, text }) => (
  <div className="bg-white rounded-lg p-6 shadow">
    <div className={`w-12 h-12 mb-4 ${icon === 'certificate' ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
      {/* Icon */}
    </div>
    <p className="text-gray-700">{text}</p>
  </div>
);

const ActionBoxes = () => (
  <section className="grid grid-cols-3 gap-6">
    <ActionBox 
      title="Learn About our Products"
      link="/products"
      image="/product-image.png"
    />
    <ActionBox 
      title="Learn How to Earn Extra Income"
      link="/payplan"
      image="/income-image.png"
    />
    <ActionBox 
      title="Get Started Now"
      link="/join"
      isJoinButton
    />
  </section>
);

const ActionBox = ({ title, link, image, isJoinButton }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="text-right">→</div>
    </div>
    <div className="p-4 bg-gray-50">
      {isJoinButton ? (
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Join!
        </button>
      ) : (
        <img src={image} alt={title} className="w-full" />
      )}
    </div>
  </div>
);

export default DashboardHome; 