import { useEffect, useState } from "react";

export const useFormattedNumber = (number: string): string => {
  const [formattedNumber, setFormattedNumber] = useState("");

  useEffect(() => {
    if (typeof number === "string") {
      let formattedString = number;

      // Handle integer numbers
      if (!formattedString.includes(".")) {
        formattedString = formattedString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      // Handle decimal numbers
      else {
        const parts = formattedString.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedString = parts.join(".");
      }

      setFormattedNumber(formattedString);
    }
  }, [number]);

  return formattedNumber;
};
