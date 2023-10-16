import React, { useState } from "react";
import icon from "../assets/rename.gif";

const Home = () => {
  // that state variables are to manage generated password, password length, character set options, and more.
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [copied, setCopied] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  // that "generatePassword" func: was Generates a password based on user choices and updates the state with the new password.
  const generatePassword = () => {
    const charset =
      (includeUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
      (includeLowercase ? "abcdefghijklmnopqrstuvwxyz" : "") +
      (includeNumbers ? "0123456789" : "") +
      (includeSpecialChars ? "!@#$%^&*()" : "");

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  // that "copyToClipboard" was Copies the generated password to the clipboard and provides a user-friendly "Copied" indicator.
  const copyToClipboard = async () => {
    try {
      // Request permission to write to the clipboard
      await navigator.clipboard.writeText(password);

      // Set the "Copied" indicator to true
      setCopied(true);

      // Reset the "Copied" indicator after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Unable to copy to clipboard:", err);
    }
  };

  // that "checkPasswordStrength" was Evaluates the strength of the generated password based on selected options and length.
  const checkPasswordStrength = (password) => {
    // Count the number of selected checkboxes
    const checkboxCount = [
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars,
    ].filter((isChecked) => isChecked).length;

    // checking condition to display ""Strong,Medium,Weak,Too Short" when user click checkbox"
    if (checkboxCount === 4) {
      setPasswordStrength("Strong");
    } else if (checkboxCount === 3) {
      setPasswordStrength("Medium");
    } else if (checkboxCount === 2) {
      setPasswordStrength("Weak");
    } else if (checkboxCount === 1) {
      setPasswordStrength("Weak");
    }
    if (password.length < 8) {
      setPasswordStrength("Too Short");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* for displaying animate from lottie */}
      <img src={icon} className="w-[10%]" />
      <h1 className="text-3xl font-bold mb-4">Password Generator</h1>

      {/* for displaying slider */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Password Length</h3>
        <div className="flex items-center">
          <p className="mr-2">{passwordLength}</p>
          <input
            type="range"
            min={5}
            max={30}
            value={passwordLength}
            onChange={(event) => setPasswordLength(event.currentTarget.value)}
            className="slider"
          />
        </div>
      </div>
      {/* for displaying Include Uppercase: */}
      <div className="mb-4">
        <label className="flex items-center">
          Include Uppercase:
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="ml-2"
          />
        </label>
      </div>
      {/*for displaying Include Lowercase:  */}
      <div className="mb-4">
        <label className="flex items-center">
          Include Lowercase:
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="ml-2"
          />
        </label>
      </div>
      {/* for displaying Include Numbers: */}
      <div className="mb-4">
        <label className="flex items-center">
          Include Numbers:
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="ml-2"
          />
        </label>
      </div>
      {/*for displaying  Include Special Characters:  */}
      <div className="mb-4">
        <label className="flex items-center">
          Include Special Characters:
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            className="ml-2"
          />
        </label>
      </div>
      {/* for displaying "Generate Password" button and its function  */}
      <button
        onClick={generatePassword}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Generate Password
      </button>
      {/* for generating Password */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Your Password:</h2>
        <input
          type="text"
          className="text-lg border border-gray-300 p-2 rounded-md"
          value={password}
          readOnly
        />

        {/* for displaying "Copy" button and its function  and checking condition */}
        <button
          onClick={copyToClipboard}
          className={`${
            copied ? "bg-green-700" : "bg-green-500"
          } text-white py-2 px-4 ml-3 rounded hover-bg-green-700 mt-2`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
        {/* for displaying "Strong,Medium,Weak,Too Short" with colour */}
        <div
          className={`text-sm mt-2 ${
            passwordStrength === "Strong"
              ? "text-green-500"
              : passwordStrength === "Medium"
              ? "text-orange-400"
              : passwordStrength === "Weak"
              ? "text-red-500"
              : passwordStrength === "Too Short"
              ? "text-red-500"
              : "text-gray-600"
          }`}
        >
          {passwordStrength}
        </div>
      </div>
    </div>
  );
};

export default Home;
