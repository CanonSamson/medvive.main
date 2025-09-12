'use client'
import { useMemo } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
  'Cramps',
  'Fever',
  'Penile Discharge',
  'Waist Pain',
  'Others'
]

// Yup validation schema
const validationSchema = Yup.object().shape({
  selectedSymptoms: Yup.array()
    .of(Yup.string())
    .test(
      'symptoms-or-other',
      'Please select at least one symptom or describe other symptoms',
      function (value) {
        const { otherSymptoms } = this.parent
        return (
          (value && value.length > 0) || (otherSymptoms && otherSymptoms.trim())
        )
      }
    ),
  otherSymptoms: Yup.string().test(
    'required-if-others-selected',
    'Please describe your other symptoms',
    function (value) {
      const { selectedSymptoms } = this.parent
      if (selectedSymptoms && selectedSymptoms.includes('Others')) {
        return Boolean(value && value.trim())
      }
      return true
    }
  ),
  duration: Yup.string().required(
    'Please select the duration of your symptoms'
  ),
  moreDetails: Yup.string()
})

const HowYouFeel = () => {
  const { closeModal, updateModalData, modalData } = useSettingModal()

  const initialValues = useMemo(
    () => ({
      selectedSymptoms: modalData?.bookDoctorModal?.selectedSymptoms || [],
      otherSymptoms: modalData?.bookDoctorModal?.otherSymptoms || '',
      duration: modalData?.bookDoctorModal?.duration || '',
      moreDetails: modalData?.bookDoctorModal?.moreDetails || ''
    }),
    [modalData?.bookDoctorModal]
  )

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      // Update modal data with form values
      updateModalData('bookDoctorModal', {
        ...modalData.bookDoctorModal,
        ...values
      })

      console.log(values)

      // Move to next step
      updateModalData('bookDoctorModal', {
        ...modalData.bookDoctorModal,
        ...values,
        step: 2
      })
    }
  })

  const toggleSymptom = (symptom: string) => {
    const currentSymptoms = values.selectedSymptoms || []
    const newSelectedSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter((s: string) => s !== symptom)
      : [...currentSymptoms, symptom]
    setFieldValue('selectedSymptoms', newSelectedSymptoms)
  }

  const handleSkip = () => {
    updateModalData('bookDoctorModal', {
      ...modalData.bookDoctorModal,
      step: 2
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='p-5 mt-5 flex-shrink-0'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h2 className='font-black text-[24px] text-[#1D1C1D]'>
              Tell us how you feel
            </h2>
            <p className='text-gray-600 text-sm'>What are your symptoms</p>
          </div>
          <button
            type='button'
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
                type='button'
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  values.selectedSymptoms.includes(symptom)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
          {errors.selectedSymptoms && touched.selectedSymptoms && (
            <p className='text-red-500 text-sm mt-2'>
              {errors.selectedSymptoms as string}
            </p>
          )}
        </div>

        {/* Other Symptoms */}
        <div className='mb-6'>
          <TextArea
            label='Other Symptoms'
            value={values.otherSymptoms}
            onChange={handleChange}
            name='otherSymptoms'
            placeholder='Make a list of any symptom not listed above'
            rows={3}
            error={touched.otherSymptoms && (errors.otherSymptoms as string)}
          />
        </div>

        {/* Duration of Symptoms */}
        <div className='mb-6'>
          <CustomSelect
            label='Duration of Symptoms'
            placeholder='Select duration'
            value={values.duration}
            onChange={value => setFieldValue('duration', value)}
            options={[
              { value: 'less-than-week', label: 'Less than a week' },
              { value: '1-2-weeks', label: '1-2 weeks' },
              { value: '2-4-weeks', label: '2-4 weeks' },
              { value: 'more-than-month', label: 'More than a month' }
            ]}
            onBlur={handleBlur}
            selectTriggerClassName='bg-white   border border-divider rounded-[10px] min-h-[50px] h-[50px]'
            error={touched?.duration && (errors.duration as string)}
          />
        </div>

        {/* More Details */}
        <div className='mb-6'>
          <TextArea
            label='More Details'
            value={values.moreDetails}
            onChange={handleChange}
            name='moreDetails'
            placeholder='Provide more details'
            rows={3}
            error={
              touched.moreDetails && typeof errors.moreDetails === 'string'
                ? errors.moreDetails
                : false
            }
          />
        </div>

        {/* Action Buttons */}
        <div className='mt-6 flex flex-col gap-3 pb-5'>
          <Button
            type='button'
            onClick={() => handleSubmit()}
            text='Continue'
            className={`rounded-lg py-3 font-medium transition-colors duration-200 `}
          />
          <button
            type='button'
            onClick={handleSkip}
            className='text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors duration-200'
          >
            Skip
          </button>
        </div>
      </div>
    </form>
  )
}

export default HowYouFeel
