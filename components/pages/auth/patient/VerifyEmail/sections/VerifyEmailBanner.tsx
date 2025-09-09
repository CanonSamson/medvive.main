import { Mail, AlertCircle, X, CheckCircle } from "lucide-react";
import { useState } from "react";

interface VerifyEmailBannerProps {
  reSendEmail: () => Promise<void>;
  setShowModal: (show: boolean) => void;
}

const VerifyEmailBanner = ({ reSendEmail, setShowModal }: VerifyEmailBannerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleResendEmail = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await reSendEmail();
      setEmailSent(true);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDismissed) return null;

  return (
    <div className="max-w-6xl mx-auto pb-4">
      <div className="mt-4 top-4 px-2">
        {/* Mobile Banner */}
        <div className="lg:hidden">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 shadow-lg">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-3 right-3 text-blue-200 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3 pr-6">
              <div className="flex-shrink-0 mt-0.5">
                {emailSent ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail size={14} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {emailSent ? "Email Sent!" : "Verify Your Email"}
                </h3>
                <p className="text-blue-100 text-xs leading-relaxed mb-3">
                  {emailSent
                    ? "Check your inbox and click the verification link to secure your account."
                    : "Please verify your email address to access all features and secure your account."}
                </p>

                {!emailSent && (
                  <button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={12} />
                        Resend Email
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Banner */}
        <div className="hidden lg:block">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 pr-8">
              <div className="flex-shrink-0">
                {emailSent ? (
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-semibold text-lg">
                    {emailSent
                      ? "Verification Email Sent!"
                      : "Email Verification Required"}
                  </h3>
                  {!emailSent && (
                    <AlertCircle size={18} className="text-yellow-300" />
                  )}
                </div>
                <p className="text-blue-100 mb-4 max-w-2xl">
                  {emailSent
                    ? "We've sent a verification link to your email address. Please check your inbox (and spam folder) and click the link to verify your account."
                    : "To ensure the security of your account and access all platform features, please verify your email address by clicking the verification link we'll send to your inbox."}
                </p>

                {!emailSent && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleResendEmail}
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          Sending Verification Email...
                        </>
                      ) : (
                        <>
                          <Mail size={16} />
                          Send Verification Email
                        </>
                      )}
                    </button>

                    <span className="text-blue-200 text-sm">
                      Didn&lsquo;t receive it? Check your spam folder or resend.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailBanner;