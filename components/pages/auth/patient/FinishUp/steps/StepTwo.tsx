"use client";
import InputWithDropdown from "@/components/custom/InputWithDropdown";
import { auth } from "@/firebase-config";
import { firebaseDatabaseService } from "@/services/firebase/databaseService";
import { useFormik } from "formik";
import mixpanel from "mixpanel-browser";
import { useState,  } from "react";
import * as yup from "yup";

interface StepTwoProps {
  step: number;
  setStep: (step: number) => void;
  handleUnitChange?: (type: string, unit: string) => void;
}

interface FormValues {
  weight: string;
  height: string;
  weightUnit: string;
  heightUnit: string;
}

interface Units {
  weight: string;
  height: string;
}

interface UnitOptions {
  weight: string[];
  height: string[];
}

const validationSchema = yup.object().shape({
  weight: yup
    .number()
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  height: yup
    .number()
    .positive("Height must be a positive number")
    .required("Height is required"),
});

const StepTwo = ({ step, setStep, handleUnitChange }: StepTwoProps) => {
  const userId = auth.currentUser?.uid as string;
  const [isLoading, setLoading] = useState<boolean>(false);

  const [units, setUnits] = useState<Units>({
    weight: "kg",
    height: "cm",
  });

  const unitOptions: UnitOptions = {
    weight: ["kg", "lbs"],
    height: ["cm", "ft"],
  };

  const {
    errors,
    touched,
    handleChange,
    setFieldValue,
    values,
    handleSubmit,
    isValid,
    dirty,
  } = useFormik<FormValues>({
    initialValues: {
      weight: "",
      height: "",
      weightUnit: "kg",
      heightUnit: "cm",
    },
    validationSchema,
    onSubmit: () => handleContinue(),
  });

  const handleContinue = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log("Form submitted with values:", values);

      await firebaseDatabaseService.updateDB("patients", userId, {
        weight: values.weight || "",
        height: values.height || "",
        weightUnit: values.weightUnit || "kg",
        heightUnit: values.heightUnit || "cm",
      });

      mixpanel.track("profile_updated", {
        weight: values.weight ? values.weight : "",
        height: values.height ? values.height : "",
      });
      setStep(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async (): Promise<void> => {
    try {
      firebaseDatabaseService.updateDB("patients", userId, {
        updateProfileLater: true,
        weightUnit: "kg",
        heightUnit: "cm",
      });

      setStep(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChangeWrapper = (type: string, unit: string): void => {
    if (type === "weight") {
      setUnits((prev) => ({ ...prev, weight: unit }));
      setFieldValue("weightUnit", unit);
    } else if (type === "height") {
      setUnits((prev) => ({ ...prev, height: unit }));
      setFieldValue("heightUnit", unit);
    }
    if (handleUnitChange) handleUnitChange(type, unit);
  };

  return (
    <div className={`flex font-poppins text-[14px] font-semibold bg-primary`}>
      <div className=" tablet:max-w-[500px] tablet:mx-auto flex flex-col absolute tablet:static w-full pt-10 tablet:py-[32px] tablet:px-[32px] h-[100dvh] tablet:h-fit bg-primary tablet:bg-white tablet:rounded-md tablet:w-[500px]">
        <div className="text-white tablet:text-black flex flex-col px-4 tablet:px-0 gap-4 pb-4">
          <div className="flex flex-col gap-[11px]">
            <h1 className=" text-[24px] font-bold tablet:text-[#404040]">
              Log personal health data
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

        <form
          onSubmit={handleSubmit}
          className=" p-4 py-7 tablet:p-0  w-full flex-1 bg-white tablet:bg-none"
        >
          <div className=" mt-7 relative z-[2] grid gap-4">
            <div>
              <InputWithDropdown
                label="Weight"
                id="weight"
                value={values.weight}
                onChange={handleChange}
                placeholder="enter weight"
                selectedUnit={units?.weight || "kg"}
                onUnitChange={(unit: string) => handleUnitChangeWrapper("weight", unit)}
                units={unitOptions?.weight || ["kg", "lbs"]}
                inputType="number"
                Error={touched.weight && errors?.weight ? String(errors.weight) : undefined}
              />
            </div>

            <div>
              <InputWithDropdown
                label="Height"
                id="height"
                value={values.height}
                onChange={handleChange}
                placeholder="enter height"
                selectedUnit={units?.height || "cm"}
                onUnitChange={(unit: string) => handleUnitChangeWrapper("height", unit)}
                units={unitOptions?.height || ["cm", "ft"]}
                inputType="number"
                Error={touched.height && errors?.height ? String(errors.height) : undefined}
              />
            </div>

            <div className={` mt-4 flex flex-col gap-2`}>
              <button
                onClick={() => handleSubmit()}
                type="button"
                disabled={!isValid && dirty}
                className={`justify-around x px-5 text-white rounded-[12px] mx-auto h-[52px] font-normal text-[16px] transition-colors duration-300 flex items-center w-full ${
                  !isValid && dirty
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-dark"
                }`}
              >
                <span className=" font-medium">
                  {" "}
                  {isLoading ? "Loading" : "Continue"}
                </span>
              </button>
              <button
                onClick={handleSkip}
                type="button"
                className={` justify-around
                  x px-5 text-black bg-white hover:bg-[#fafafa] rounded-[12px]
                   mx-auto  h-[52px] font-normal text-[16px] transition-colors duration-300  flex items-center w-full`}
              >
                <span className=" font-medium">Skip</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepTwo;
