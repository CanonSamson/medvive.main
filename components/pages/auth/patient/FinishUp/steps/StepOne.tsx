"use client";
import InputField from "@/components/custom/InputField";
import GenderSelect from "@/components/custom/GenderSelect";
import DateInput from "@/components/custom/DateInput";
import PhoneInputField from "@/components/custom/PhoneInputField";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState,  } from "react";
import mixpanel from "mixpanel-browser";
import { auth } from "@/firebase-config";
import { firebaseDatabaseService } from "@/services/firebase/databaseService";

interface StepOneProps {
  step: number;
  setStep: (step: number) => void;
}

interface FormValues {
  preferredName: string;
  gender: string;
  dateofbirth: string;
  phoneNumber: string;
}

export const validationSchema = yup.object().shape({
  preferredName: yup
    .string()
    .min(2, "Preferred name must be at least 2 characters")
    .max(50, "Preferred name must be less than 50 characters")
    .required("Preferred name is required"),
  gender: yup.string().required("Gender is required"),
  dateofbirth: yup
    .string()
    .required("Date of Birth is required")
    .test("age", "You must be at least 13 years old", function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 13;
    }),
  phoneNumber: yup
    .string()
    // .matches(/^[+]?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .required("Mobile number is required"),
});

const StepOne = ({ step, setStep }: StepOneProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const userId = auth.currentUser?.uid as string;

  // Update the continue button onClick with validation
  const handleContinue = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log("Form submitted with values:", values);

      await firebaseDatabaseService.updateDB("patients", userId, {
        gender: values.gender,
        dateofbirth: values.dateofbirth,
        phoneNumber: values.phoneNumber,
        preferredName: values?.preferredName,
      });

      await Promise.all([
        firebaseDatabaseService.createDB("BookingChat", userId, {
          chats: [],
        }),
        firebaseDatabaseService.createDB("notifications", userId, {
          data: [],
        }),
        firebaseDatabaseService.createDB("consultations", userId, {
          data: [],
        }),
        firebaseDatabaseService.createDB("endedconsultations", userId, {
          data: [],
        }),
      ]);

      mixpanel.track("profile_updated", {
        gender: values.gender,
        dateofbirth: values.dateofbirth,
      });
      setStep(2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const {
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleBlur,
    values,
    handleSubmit,
  } = useFormik<FormValues>({
    initialValues: {
      preferredName: "",
      gender: "",
      dateofbirth: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: handleContinue,
  });

  console.log(errors, "errors");
  return (
    <div className={`flex font-poppins text-[14px] font-semibold bg-primary`}>
      <div className=" tablet:max-w-[500px] tablet:mx-auto flex flex-col absolute tablet:static w-full pt-10 tablet:py-[32px] tablet:px-[32px] h-[100dvh] tablet:h-fit bg-primary tablet:bg-white tablet:rounded-md tablet:w-[500px]">
        <div className="text-white tablet:text-black flex flex-col px-4 tablet:px-0 gap-4 pb-4">
          <div className="flex flex-col gap-[11px]">
            <h1 className=" text-[24px] font-bold tablet:text-[#404040]">
              Tell us about yourself
            </h1>
            <span className="font-normal text-[16px] tablet:text-[#909090]">
              Let&apos;s personalize your experience{" "}
            </span>
            <p className="font-normal text-[16px] tablet:text-[#404040]">
              Step <span className="font-semibold text-[16px]">{step}</span> of{" "}
              <span className="text-[16px]">3</span>
            </p>
          </div>
        </div>

        <div className=" p-4 py-7 tablet:p-0  w-full flex-1 bg-white tablet:bg-none">
          <div className=" mt-7 relative z-[2] grid gap-4">
            <InputField
              label="preferred Name"
              name="preferredName"
         
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.preferredName}
              required
              error={touched.preferredName && errors?.preferredName ? String(errors.preferredName) : undefined}
              placeholder="what should we call you?"
            />
            <GenderSelect
     
              value={values.gender}
              onChange={(value: string) => setFieldValue("gender", value)}
              label="Gender"
              Error={touched.gender && errors?.gender ? String(errors.gender) : undefined}
            />

            <DateInput
              label="Date of Birth"
              name="dateofbirth"
              required
              Error={touched.dateofbirth && errors?.dateofbirth ? String(errors.dateofbirth) : undefined}
              value={values.dateofbirth}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <PhoneInputField
              label="Mobile Number"
              name="phoneNumber"
              id="phoneNumber"
              Error={touched.phoneNumber && errors?.phoneNumber ? String(errors.phoneNumber) : undefined}
              value={values.phoneNumber}
              onChange={(value: string | undefined) => setFieldValue("phoneNumber", value || "")}
              onBlur={handleBlur}
              placeholder="Mobile Number"
            />

            <div className={` mt-4`}>
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading}
                type="submit"
                className={` justify-around
                  x px-5 text-white bg-primary hover:bg-primary-dark rounded-[12px]
                   mx-auto  h-[52px] font-normal text-[16px] transition-colors duration-300  flex items-center w-full`}
              >
                <span className=" font-medium">
                  {isLoading ? "Loading" : "Continue"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
