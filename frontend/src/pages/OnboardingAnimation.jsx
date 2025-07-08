
import React from 'react';
import Lottie from 'lottie-react';
import onboardingAnimation from '../assets/onboarding.json';

const OnboardingAnimation = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Lottie animationData={onboardingAnimation} loop={true} />
    </div>
  );
};

export default OnboardingAnimation;
