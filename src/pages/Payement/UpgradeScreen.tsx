// src/pages/UpgradeScreen.tsx
import { Component, createSignal } from "solid-js";
// @ts-ignore
import { openUrl } from "@tauri-apps/plugin-opener";

// Define the plan types and billing cycles
type BillingCycle = 'monthly' | 'quarterly' | 'yearly';
type PlanType = 'essential' | 'professional' | 'enterprise';

const UpgradeScreen: Component = () => {
  // State for the selected billing cycle
  const [billingCycle, setBillingCycle] = createSignal<BillingCycle>('monthly');

  // Function to calculate price based on plan and cycle
  const getPrice = (baseMonthlyPrice: number, cycle: BillingCycle): number => {
    const discounts = { monthly: 1, quarterly: 0.9, yearly: 0.7 }; // 0% off monthly, 10% off quarterly, 30% off yearly
    const multiplier = { monthly: 1, quarterly: 3, yearly: 12 };
    return Math.round(baseMonthlyPrice * multiplier[cycle] * discounts[cycle]);
  };

  // Function to handle plan selection
  const handleSelectPlan = async (planName: PlanType) => {
    console.log("User selected plan:", planName, "on", billingCycle(), "billing");
    const url = `http://localhost:3000/pricing?plan=${planName}&cycle=${billingCycle()}`;
    try {
      await openUrl(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  // Function to handle developer API link (different from a plan)
  const handleDeveloperApi = async () => {
    console.log("User is interested in Developer API");
    // Open documentation or a signup form for the API/developer program
    try {
      await openUrl('http://localhost:3000/developers');
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  return (
    <main class="w-full min-h-screen flex flex-col items-center py-12 bg-gradient-to-br from-gray-900 to-gray-800 px-6">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
        <p class="text-gray-300 max-w-2xl mx-auto">Select the perfect plan to unlock powerful features and grow your business with our comprehensive tools.</p>

        {/* Billing Cycle Toggle */}
        <div class="mt-8 flex justify-center bg-gray-800 rounded-xl p-1 w-fit mx-auto border border-gray-700 shadow-lg">
          {(['monthly', 'quarterly', 'yearly'] as BillingCycle[]).map((cycle) => (
            <button
              classList={{
                'px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300': true,
                'bg-primary text-white shadow-md': billingCycle() === cycle,
                'text-gray-400 hover:text-white hover:bg-gray-700': billingCycle() !== cycle
              }}
              onClick={() => setBillingCycle(cycle)}
            >
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
            </button>
          ))}
        </div>
        <p class="text-sm text-[#48D1CC] mt-4">
          {billingCycle() === 'yearly' && '🎉 Save 30% with yearly billing!'}
          {billingCycle() === 'quarterly' && '💰 Save 10% with quarterly billing!'}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-12 items-center">
        {/* Essential Plan Card */}
        <div class="bg-gradient-to-b from-gray-800 to-gray-900    rounded-2xl p-8 border-2 border-bgTeal/30 flex flex-col shadow-xl hover:shadow-teal/20 transition-all duration-300 hover:-translate-y-1">
          <div class="mb-6">
            <div class="w-12 h-12 rounded-lg bg-bgTeal/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-bgTeal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">Essential</h2>
            <p class="text-gray-400">Perfect for small businesses getting started</p>
          </div>
          <p class="text-4xl font-bold text-white my-6">
            {getPrice(29, billingCycle())} DT
            <span class="text-sm text-gray-400 font-normal">/{billingCycle().replace('ly', '')}</span>
          </p>
          <ul class="text-gray-300 flex-1 mb-8 space-y-3">
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgTeal/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgTeal" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Basic Inventory & Sales</li>
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgTeal/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgTeal" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>1 User Account</li>
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgTeal/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgTeal" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Email Support</li>
            <li class="flex items-center text-gray-500"><div class="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>AI Insights</li>
            <li class="flex items-center text-gray-500"><div class="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>Website Integration</li>
          </ul>
          <button 
            onClick={() => handleSelectPlan('essential')}
            class="bg-bgTeal hover:bg-teal-500 text-gray-900 py-3 px-6 rounded-xl font-semibold transition-all duration-300 mt-auto shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>

        {/* Professional Plan Card - Highlighted */}
        <div class="relative rounded-2xl overflow-hidden flex flex-col z-10 shadow-2xl border-2 border-white  transform scale-105">
          <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-ray-900 opacity-90"></div>
          <div class="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-bl-lg shadow-md">
            MOST POPULAR
          </div>
          <div class="relative z-10 p-8 flex flex-col h-full">
            <div class="mb-6">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">Professional</h2>
              <p class="text-gray-100">For growing businesses that need more power</p>
            </div>
            <p class="text-4xl font-bold text-white my-6">
              {getPrice(79, billingCycle())} DT
              <span class="text-sm text-gray-200 font-normal">/{billingCycle().replace('ly', '')}</span>
            </p>
            <ul class="text-gray-100 flex-1 mb-8 space-y-3">
              <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Everything in Essential</li>
              <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Unlimited Users</li>
              <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>AI Insights & Analytics</li>
              <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Connect 1 Website</li>
              <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Priority Support</li>
            </ul>
            <button 
              onClick={() => handleSelectPlan('professional')}
              class="bg-primary text-primary py-3 px-6 rounded-xl font-semibold transition-all duration-300 mt-auto shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-secondary"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Enterprise Plan Card */}
        <div class="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-bgOrange/30 flex flex-col shadow-xl hover:shadow-orange/20 transition-all duration-300 hover:-translate-y-1">
          <div class="mb-6">
            <div class="w-12 h-12 rounded-lg bg-bgOrange/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-bgOrange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">Enterprise</h2>
            <p class="text-gray-400">For large businesses with complex needs</p>
          </div>
          <p class="text-4xl font-bold text-white my-6">
            {getPrice(149, billingCycle())} DT
            <span class="text-sm text-gray-400 font-normal">/{billingCycle().replace('ly', '')}</span>
          </p>
          <ul class="text-gray-300 flex-1 mb-8 space-y-3">
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgOrange/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgOrange" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Everything in Professional</li>
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgOrange/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgOrange" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Multi-Location Management</li>
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgOrange/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgOrange" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Unlimited Website Integrations</li>
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgOrange/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgOrange" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Custom Reporting</li>
            <li class="flex items-center"><div class="w-5 h-5 rounded-full bg-bgOrange/20 flex items-center justify-center mr-3"><svg class="w-3 h-3 text-bgOrange" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>Dedicated Account Manager</li>
          </ul>
          <button 
            onClick={() => handleSelectPlan('enterprise')}
            class="bg-bgOrange hover:bg-bgOrange/90 text-gray-900 py-3 px-6 rounded-xl font-semibold transition-all duration-300 mt-auto shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Developer API Link */}
      <div class="text-center border-t border-gray-700 pt-12 w-full max-w-2xl">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4 border border-gray-700">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-3">For Developers</h2>
        <p class="text-gray-300 mb-6 max-w-xl mx-auto">Build custom solutions and integrate with your own applications using our powerful API and developer tools.</p>
        <button 
          onClick={handleDeveloperApi}
          class="inline-flex items-center p-2 text-primary hover:text-secondary font-medium group transition-colors duration-300"
        >
          Explore Developer API Documentation
          <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </main>
  );
};

export default UpgradeScreen;