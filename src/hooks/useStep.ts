import React, { useState } from 'react'

export default function useStep() {
  const [step, setStep] = useState<number>(0)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return {
    step,
    setStep,
    handleNext,
    handleBack,
  }
}
