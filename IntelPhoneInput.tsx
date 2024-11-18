// It is a common component for the user to to get the country code list 
// already imlemented and you can use it for use propose



import React, { FC, useEffect, useRef, useState } from "react";
import IntlTelInput, { IntlTelInputRef } from "intl-tel-input/react";
import "intl-tel-input/styles";

interface IntlPhoneInputProps {
  phoneNumber?: string;
  dialCode?: string;
  initialCountry?: string;
  isPhoneValid: null | boolean;
  setIsPhoneValid: React.Dispatch<React.SetStateAction<null | boolean>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setDialCode: React.Dispatch<React.SetStateAction<string>>;
}

const IntlPhoneInput: FC<IntlPhoneInputProps> = ({
  initialCountry = "in",
  phoneNumber = "",
  setPhoneNumber,
  isPhoneValid = null,
  setIsPhoneValid,
  setDialCode,
  dialCode = "",
}) => {
  // const [dialCode, setDialCode] = useState("");
  const intlTelInputRef = useRef<IntlTelInputRef>(null);
  const inputClass =
    phoneNumber && isPhoneValid === true
      ? "success"
      : phoneNumber && isPhoneValid === false
      ? "error"
      : "";

  // Update phone number and dial code separately

  const handleNumberChange = (fullNumber: string) => {
    const instance = intlTelInputRef.current?.getInstance();
    const selectedDialCode = `+${
      instance?.getSelectedCountryData()?.dialCode || ""
    }`; // Add + sign
    const purePhoneNumber = fullNumber.replace(selectedDialCode, "").trim();
    setPhoneNumber(purePhoneNumber); // Set only the phone number without the dial code
    setDialCode(selectedDialCode); // Set the dial code independently
  };

  return (
    <div className={`wd-100 intel-input-main ${inputClass}`}>
      <IntlTelInput
        ref={intlTelInputRef} // Attach ref directly to IntlTelInput
        initialValue={phoneNumber}
        onChangeNumber={handleNumberChange}
        onChangeValidity={setIsPhoneValid}
        initOptions={{
          initialCountry,
          // autoPlaceholder: "polite",
          customPlaceholder: function (
            selectedCountryPlaceholder,
            selectedCountryData
          ) {
            // console.log(
            //   "selectedCountryPlaceholder",
            //   selectedCountryPlaceholder
            // );
            return "Enter mobile number";
          },
          validationNumberType: "MOBILE",
          strictMode: true,
          containerClass: "custom-input",
          separateDialCode: true,
          fixDropdownWidth: true,
          loadUtilsOnInit:
            "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
        }}
      />
    </div>
  );
};

export default IntlPhoneInput;
