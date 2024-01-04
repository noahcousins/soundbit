import Welcome from '@/components/onboarding/welcome';
import Next from '@/components/onboarding/next';
import Handle from '@/components/onboarding/handle';
import { ArrowLeft } from 'lucide-react';
// import { AnimatePresence } from 'framer-motion';

export const revalidate = 0;

export default function OnboardingNext() {
  return <Next key="next" />;
}
