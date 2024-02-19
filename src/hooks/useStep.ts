import { useState } from 'react'

export default function useStep (): {
  step: number
  setStep: (number: number) => void
  handleNext: () => void
  handleBack: () => void
} {
  const [step, setStep] = useState<number>(0)

  const handleNext = (): void => {
    setStep(step + 1)
  }

  const handleBack = (): void => {
    setStep(step - 1)
  }

  return {
    step,
    setStep,
    handleNext,
    handleBack
  }
}
