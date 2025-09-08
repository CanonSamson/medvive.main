import Image from "next/image";

interface OnboardProps {
  heading: string;
  text: string;
  image: string;
  index: number;
  onboardingPage: number | null;
  setOnboardingPage: (page: number | null) => void;
}

const Onboard = ({
  heading,
  text,
  image,
  index,
  onboardingPage,
  setOnboardingPage,
}: OnboardProps) => {
  return (
    <div
      // style={{ height: " -webkit-fill-available" }}
      className={`${
        onboardingPage == index + 1 ? " flex" : " hidden "
      }  px-4 w-full h-dvh justify-evenly items-center gap-auto flex-col`}
    >
      <div className="text-center flex flex-col justify-center items-center">
        {/* <div className="   fixed top-0 z-10 grid grid-cols-2 right-0 w-full">
          <button
            onClick={() => {
              if (index - 1 >= 0) setOnboardingPage((prev) => prev - 1);
            }}
            className=" flex h-screen h-[100dvh] w-full"
          />
          <button
            onClick={() => {
              if (index + 1 != 3) setOnboardingPage((prev) => prev + 1);
              else setOnboardingPage(null);
            }}
            className=" flex  h-screen h-[100dvh] w-full"
          />
        </div> */}
        <Image
          src={image}
          width={1000}
          height={280}
          className="w-[90%] mx-auto duration-700"
          priority
          alt={text}
        />
      </div>

      <div className="flex flex-col gap-10 w-full justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center w-full text-center">
          <h1 className="font-bold text-[#2C2C2C] text-[32px] w-[full] leading-[44px]">
            {heading}
          </h1>
          <span className=" duration-700 text-[18px] text-[#424242]">
            {text}
          </span>
        </div>

        <div className=" flex items-center gap-2 justify-center">
          {[1, 2, 3].map((num) => (
            <span
              key={num}
              className={`${
                onboardingPage === num
                  ? "bg-primary w-[40px]"
                  : "bg-gray-400 w-[8px]"
              } duration-700 flex h-[8px] rounded-lg`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 w-full justify-center items-center">
          <button
            onClick={() => {
              if (index + 1 != 3) {
                setOnboardingPage((onboardingPage || 0) + 1);
              } else {
                setOnboardingPage(null);
              }
            }}
            className={`justify-center text-white px-5 hover:bg-primary-dark duration-300 bg-primary py-4 rounded-xl mx-auto flex items-center transition-colors w-full`}
          >
            <span className=" font-medium text-[20px]">
              {index + 1 == 3 ? "Continue" : "Next"}
            </span>
          </button>
          <button
            onClick={() => {
              setOnboardingPage(null);
            }}
            className={`justify-center py-3 rounded-xl mx-auto flex items-center w-full`}
          >
            <span className="font-medium text-primary text-[16px] hover:text-primary-dark">
              Skip
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
