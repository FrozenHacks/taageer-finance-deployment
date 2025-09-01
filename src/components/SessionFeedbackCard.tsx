import React, { useState } from "react";
import { Star } from "lucide-react";

interface SessionFeedbackCardProps {
  onSubmit: (data: { rating: number; feedback: string }) => void;
  imageSrc?: string;
}

const SessionFeedbackCard: React.FC<SessionFeedbackCardProps> = ({
  onSubmit,
  imageSrc = "/placeholder-feedback-icon.png",
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onSubmit({ rating, feedback });
    setRating(0);
    setFeedback("");
    setIsSubmitting(false);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-8 pb-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
            <img
              src={imageSrc}
              alt="Feedback"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Session Feedback
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Please rate your experience below
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3, 4].map((starIndex) => {
            const isFilled =
              hoveredStar !== null
                ? starIndex <= hoveredStar
                : starIndex < rating;

            return (
              <button
                key={starIndex}
                onClick={() => handleStarClick(starIndex)}
                onMouseEnter={() => setHoveredStar(starIndex)}
                onMouseLeave={() => setHoveredStar(null)}
                className="p-1 transition-transform duration-150 hover:scale-110 focus:outline-none rounded"
                aria-label={`Rate ${starIndex + 1} stars`}
              >
                <Star
                  size={28}
                  className={`transition-colors duration-200 ${
                    isFilled
                      ? "fill-[#FBBF24] text-[#FBBF24]"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label
            htmlFor="feedback-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Feedback
          </label>
          <textarea
            id="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#067CAC] focus:ring-offset-2 text-sm sm:text-base
                        bg-[linear-gradient(160.41deg,#067CAC_-5.15%,#09347A_87.35%)] hover:opacity-90 disabled:opacity-60
                        shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </span>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </div>
    </div>
  );
};

export default SessionFeedbackCard;
