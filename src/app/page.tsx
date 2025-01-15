"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface AgentResponse {
  code: string;
}

export default function AgentGenerator() {
  const [description, setDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [hasAccessToV2, setHasAccessToV2] = useState(false);

  const generateAgent = async (description: any) => {
    const options = {
      method: "POST",
      url: "https://api.perplexity.ai/chat/completions",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: "llama-3.1-sonar-huge-128k-online",
        messages: [
          {
            role: "system",
            content:
              "Generate ai16z Eliza agent code for Twitter based on the description.",
          },
          {
            role: "user",
            content: `Create an ai16z Twitter agent that: ${description}`,
          },
        ],
      },
    };

    try {
      setIsLoading(true);
      const response = await axios(options);
      setIsLoading(false);
      setGeneratedCode(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleReferralSubmit = () => {
    if (referralCode === "VALID_CODE") {
      // Replace 'VALID_CODE' with actual validation logic
      setHasAccessToV2(true);
      setShowPopup(false);
    } else {
      alert("Invalid referral code. Please try again.");
      setShowPopup(false);
    }
  };

  const handleclose = () => {
    // Replace 'VALID_CODE' with actual validation logic

    setShowPopup(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("click", handleClickOutside, true);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url("bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto max-w-3xl">
        {showPopup && (
          <div className="fixed inset-0 mx-auto flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              ref={popupRef}
              className="bg-white mx-auto items-center rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-2xl mx-auto text-center text-black font-bold mb-4">
                Do you have an invite code?
              </h3>
              <h3 className="text-xl mx-auto text-center text-orange-800 font-bold mb-4">
                Access our beta v2 which includes: <br /> + Single button deploy{" "}
                <br /> + github generator
              </h3>

              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter your invite code"
                className="w-full p-4 border border-gray-300 rounded-xl mb-4"
              />
              <button
                onClick={handleReferralSubmit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold transition-all duration-300 hover:from-yellow-600 hover:to-orange-600"
              >
                Access v2 Instead →
              </button>
              <button
                onClick={handleclose}
                className="w-full my-2 py-3 rounded-xl border border-slate-900 bg-gradient-to-r  text-black  font-semibold transition-all duration-300  "
              >
                No, I don't
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col text-center mb-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-yellow-200 mb-4 drop-shadow-lg animate-gradient">
            Rose16z
          </h1>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-yellow-200 mb-4 drop-shadow-lg">
            v.1.1
          </h2>
          <div className="flex flex-row mx-auto gap-4 shadow-  ">
            <a
              href="https://x.com/Rose16zsol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="twitter.png" alt="Logo 1" className="h-12 w-auto" />
            </a>
            <a
              href="https://github.com/Karimium0/RoseAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="gh.png" alt="Logo 2" className="h-12 w-auto" />
            </a>


          </div>
     <button
       className="text-xl mt-2 text-white underline font-extrabold bg-clip-text bg-gradient-to-r mb-4 drop-shadow-lg animate-gradient"
       onClick={() => setShowPopup(true)}
     >
       Early v2 Access
     </button>
     
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <TextField
            value={description}
            onChange={handleChange}
            placeholder="Example:  Autonomous ai agent Eliza. Tech-savvy smart and confident. She has dark hair, orange T-shirt and eyeglasses."
            textarea
          />

          <button
            onClick={() => generateAgent(description)}
            disabled={isLoading || !description}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-orange-200"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating...This may take a minute.
              </span>
            ) : (
              "Generate Agent"
            )}
          </button>
        </div>

        {generatedCode && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">
              Generated Instruction:
            </h2>
            <pre className="bg-gray-50 p-6 rounded-xl overflow-x-auto border border-orange-100">
              <code className="text-sm text-gray-800">{generatedCode}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold transition-all duration-300 hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-1 shadow-lg hover:shadow-orange-200"
            >
              Copy Instruction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface TextFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  textarea?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  textarea = false,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-6 mb-6 border-2 border-orange-100 rounded-xl text-gray-800 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-lg"
      rows={textarea ? 6 : 1}
    />
  );
};
