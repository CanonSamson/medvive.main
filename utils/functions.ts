import moment from "moment";

// Interface for user object
interface User {
  fullName?: string;
}

// Interface for consultation object
interface Consultation {
  consultationId: string;
}

// Interface for timestamp object (Firebase Timestamp)
interface Timestamp {
  toMillis(): number;
}

export const updateGreeting = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Good morning";
  else if (currentHour >= 12 && currentHour < 18) return "Good afternoon";
  else return "Good evening";
};

export function getNameInitials(fullName: string): string {
  const fullnameArray = fullName.split(" ");

  if (fullnameArray.length >= 2) {
    const firstNameInitial = fullnameArray[0][0];
    const lastNameInitial = fullnameArray[1][0];

    return `${firstNameInitial}`;
  } else {
    return `${fullnameArray[0][0]} `;
  }
}

export function calculateAge(birthDateString: string): number {
  if (!birthDateString) {
    throw new Error("Invalid birth date: Birth date is empty.");
  }

  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid birth date: Birth date is not a valid date.");
  }

  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const months = currentDate.getMonth() - birthDate.getMonth();
  const days = currentDate.getDate() - birthDate.getDate();

  // Adjust age if the current month is earlier than the birth month
  if (months < 0 || (months === 0 && days < 0)) {
    age--;
  }

  return age;
}

// Function to get the doctor's first name
export function getUserFirstName(user: User): string {
  if (!user?.fullName) return "";
  const nameParts = user?.fullName?.split(" ");
  return nameParts.length > 0 ? nameParts[0] : user.fullName;
}

export function getFirstName(fullName: string): string {
  if (!fullName) return "";
  const nameParts = fullName.split(" ");
  return nameParts.length > 0 ? nameParts[0] : fullName;
}

export const getWeek = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export function secondsToTimeFormat(seconds: number): string {
  const date = new Date(0);
  date.setSeconds(seconds);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 0 as 12

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${ampm}`;
  return formattedTime;
}

export function findConsultation(
  consultationP: Consultation[],
  consultationD: Consultation[],
  consultationId: string
): { foundPatientIndex: number; foundDocIndex: number } {
  const patientConsultations = [...consultationP]; // Make a copy of the array
  const doctorConsultations = [...consultationD]; // Make a copy of the array

  const docbooking = doctorConsultations.find(
    (i) => i.consultationId === consultationId
  );
  const foundDocIndex = doctorConsultations.indexOf(docbooking!);

  const userbooking = patientConsultations.find(
    (i) => i.consultationId === consultationId
  );
  const foundPatientIndex = patientConsultations.indexOf(userbooking!);

  return { foundPatientIndex, foundDocIndex };
}

export function nanosecondsToDate(nanoseconds: number): Date {
  // Convert nanoseconds to milliseconds (1 nanosecond = 0.000001 millisecond)
  const milliseconds = nanoseconds * 0.000001;

  // Create a Date object with the milliseconds value
  const date = new Date(milliseconds);

  return date;
}

export function secondsToDate(seconds: number): string {
  // Convert seconds to milliseconds (1 second = 1000 milliseconds)
  const milliseconds = seconds * 1000;

  // Create a Date object with the milliseconds value
  const date = new Date(milliseconds);

  return formatDate(date);
}

export function formatTimeFromString(timestamp: string): string {
  // Create a new Date instance using the provided timestamp
  const date = new Date(timestamp);

  // Get the timestamp in milliseconds
  const milliseconds = date.getTime();

  // Create a new Date object with the milliseconds value
  const newDate = new Date(milliseconds);

  return formatDate(newDate);
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString(undefined, options);
}

export const formatTimestamp = (timestamp: Timestamp): string => {
  // Convert timestamp to milliseconds and create a Date object
  const date = new Date(timestamp.toMillis());

  // Format the date to include hours and minutes
  const timeString = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  // Determine if it's AM or PM
  const amOrPm = date.getHours() >= 12 ? "pm" : "am";

  // Extract the hours and minutes from the timeString
  const [hours, minutes] = timeString.split(":");

  // Combine hours, minutes, and AM/PM
  return `${hours}:${minutes}${amOrPm}`;
};

export const formatTime = (date: Date | string): string => {
  const timeString = moment(date).format("h:mm A");

  return timeString;
};

export function stringToformatDate(inputDate: string): string {
  // Parse the input date string
  const date = new Date(inputDate);

  // Get the month, day, year, hour, and minute
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = ("0" + date.getMinutes()).slice(-2);
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  if (hour > 12) {
    hour -= 12;
  }

  // Format the date in the desired format
  const formattedDate = `${month} ${day}, ${year} ${hour}:${minute} ${period}`;

  return formattedDate;
}

// Example usage
// const inputDateString = "Fri Feb 16 2024 04:56:23 GMT+0100 (West Africa Standard Time)";
// const formattedDate = formatDate(inputDateString);
// console.log(formattedDate); // Output: Feb 16 2024 04:56 PM
