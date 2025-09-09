import {
  CheckCircle,
} from "lucide-react";

const EmailVerified = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-md mx-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email Verified!</h3>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified.
          </p>
          <button
            onClick={handleClose}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
