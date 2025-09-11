'use client'
import { useState, useEffect, useMemo } from 'react'
import Button from '@/components/custom/Button'
import CustomSelect from '@/components/custom/CustomSelect'
import TextArea from '@/components/custom/TextArea'
import { useSettingModal } from '@/context/model-settings'
import { IoClose } from 'react-icons/io5'

const symptoms = [
  'Headaches',
  'Joint pain',
  'Cough',
  'Abdominal Pain',
  'Vaginal Discharge',
  'Heart Burn',
  'Elevated Blood Pressure',
  'Headaches',
  'Cramps',
  'Fever',
  'Penile Discharge',
  'Waist Pain',
  'Others'
]

const HowYouFeel = () => {
  const { closeModal, updateModalData, modalData } = useSettingModal()
  const [errors, setErrors] = useState<{
    selectedSymptoms?: string
    otherSymptoms?: string
    duration?: string
    moreDetails?: string
  }>({})
  const moreDetails = modalData?.bookDoctorModal?.moreDetails || ''
  const duration = modalData?.bookDoctorModal?.duration || ''
  const otherSymptoms = modalData?.bookDoctorModal?.otherSymptoms || ''
  const selectedSymptoms = useMemo(
    (): string[] => modalData?.bookDoctorModal?.selectedSymptoms || [],
    [modalData?.bookDoctorModal]
  )

  const durationOptions = [
    { value: '1-2 days', label: '1-2 days' },
    { value: '3-7 days', label: '3-7 days' },
    { value: '1-2 weeks', label: '1-2 weeks' },
    { value: '2-4 weeks', label: '2-4 weeks' },
    { value: 'More than a month', label: 'More than a month' }
  ]

  // Validation function
  const validateForm = () => {
    const newErrors: typeof errors = {}

    // Validate that at least one symptom is selected or other symptoms is filled
    if (selectedSymptoms.length === 0 && !otherSymptoms.trim()) {
      newErrors.selectedSymptoms =
        'Please select at least one symptom or describe other symptoms'
    }

    // Validate duration is selected
    if (!duration) {
      newErrors.duration = 'Please select the duration of your symptoms'
    }

    // Optional: Validate other symptoms if "Others" is selected
    if (selectedSymptoms.includes('Others') && !otherSymptoms.trim()) {
      newErrors.otherSymptoms = 'Please describe your other symptoms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if form has any errors
  const hasErrors = Object.keys(errors).length > 0

  // Clear specific error when user starts typing/selecting
  useEffect(() => {
    if (
      errors.selectedSymptoms &&
      (selectedSymptoms.length > 0 || otherSymptoms.trim())
    ) {
      setErrors(prev => ({ ...prev, selectedSymptoms: undefined }))
    }
  }, [selectedSymptoms, otherSymptoms, errors.selectedSymptoms])

  useEffect(() => {
    if (errors.duration && duration) {
      setErrors(prev => ({ ...prev, duration: undefined }))
    }
  }, [duration, errors.duration])

  useEffect(() => {
    if (errors.otherSymptoms && otherSymptoms.trim()) {
      setErrors(prev => ({ ...prev, otherSymptoms: undefined }))
    }
  }, [otherSymptoms, errors.otherSymptoms])

  const setSelectedSymptoms = (value: string[]) => {
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      selectedSymptoms: value
    })
  }

  const toggleSymptom = (symptom: string) => {
    const prev = selectedSymptoms || []
    const newSelectedSymptoms = prev.includes(symptom)
      ? prev.filter(s => s !== symptom)
      : [...prev, symptom]
    setSelectedSymptoms(newSelectedSymptoms)
  }

  const handleContinue = () => {
    if (!validateForm()) {
      return // Don't continue if validation fails
    }

    // Handle form submission logic here
    console.log({
      selectedSymptoms,
      otherSymptoms,
      duration,
      moreDetails
    })

    // Move to next step
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      step: 2
    })
  }

  const setMoreDetails = (value: string) => {
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      moreDetails: value
    })
  }
  const setDuration = (value: string) => {
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      duration: value
    })
  }
  const setOtherSymptoms = (value: string) => {
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      otherSymptoms: value
    })
  }
  const handleSkip = () => {
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      step: 2
    })
  }

  return (
    <>
      <div className='p-5 mt-5 flex-shrink-0'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h2 className='font-black text-[24px] text-[#1D1C1D]'>
              Tell us how you feel
            </h2>
            <p className='text-gray-600 text-sm'>What are your symptoms</p>
          </div>
          <button
            className='text-gray-400 hover:text-gray-600 duration-500 transition-colors'
            onClick={() => closeModal('bookDoctorModal')}
          >
            <IoClose size={25} />
          </button>
        </div>
      </div>

      <div className='px-5 pb-5'>
        {/* Symptom Selection */}
        <div className='mb-6'>
          <div className='flex flex-wrap gap-3'>
            {symptoms.map((symptom, index) => (
              <button
                key={index}
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
          {errors.selectedSymptoms && (
            <p className='text-red-500 text-sm mt-2'>
              {errors.selectedSymptoms}
            </p>
          )}
        </div>

        {/* Other Symptoms */}
        <div className='mb-6'>
          <TextArea
            label='Other Symptoms'
            value={otherSymptoms}
            onChange={e => setOtherSymptoms(e.target.value)}
            placeholder='Make a list of any symptom not listed above'
            rows={3}
            error={errors.otherSymptoms}
          />
        </div>

        {/* Duration of Symptoms */}
        <div className='mb-6'>
          <CustomSelect
            label='Duration of Symptoms'
            value={duration}
            onChange={value => setDuration(value)}
            options={durationOptions}
            placeholder='Select'
            optionPlaceHolder='Select duration'
            selectTriggerClassName='bg-white   border border-divider rounded-[10px] min-h-[50px] h-[50px]'
            error={errors.duration}
          />
        </div>

        {/* More Details */}
        <div className='mb-6'>
          <TextArea
            label='More Details'
            value={moreDetails}
            onChange={e => setMoreDetails(e.target.value)}
            placeholder='Provide more details'
            rows={3}
            error={errors.moreDetails}
          />
        </div>

        {/* Action Buttons */}
        <div className='mt-6 flex flex-col gap-3 pb-5'>
          <Button
            onClick={handleContinue}
            text='Continue'
            className={`rounded-lg py-3 font-medium transition-colors duration-200 ${
              hasErrors
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-primary hover:bg-blue-700 text-white'
            }`}
            disabled={hasErrors}
          />
          <button
            onClick={handleSkip}
            className='text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors duration-200'
          >
            Skip
          </button>
        </div>
      </div>
    </>
  )
}

export default HowYouFeel
