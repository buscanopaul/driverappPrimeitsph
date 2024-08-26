import { useEffect, useState } from "react";

export const useFormattedTime = (timeString: string) => {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const formatTime = (time: string) => {
      const date = new Date(time);

      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    };

    setFormattedTime(formatTime(timeString));
  }, [timeString]);

  return formattedTime;
};
