import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const units = [
  "",
  "1.wav",
  "2.wav",
  "3.wav",
  "4.wav",
  "5.wav",
  "6.wav",
  "7.wav",
  "8.wav",
  "9.wav",
];
const tens = [
  "",
  "",
  "20.wav",
  "30.wav",
  "40.wav",
  "50.wav",
  "60.wav",
  "70.wav",
  "80.wav",
  "90.wav",
];
const specialTens = [
  "10.wav",
  "11.wav",
  "12.wav",
  "13.wav",
  "14.wav",
  "15.wav",
  "16.wav",
  "17.wav",
  "18.wav",
  "19.wav",
];
const hundreds = ["", "ratus.wav"];
// const thousands = ["", "ribu.wav"];

export const alphabets = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode("A".charCodeAt(0) + index)
);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertNumberToAudioFiles = (number: number): string[] => {
  if (number === 0) {
    return ["0.wav"];
  }

  if (number === 100) {
    return ["100.wav"];
  }

  const result = [];

  // >= 200
  if (number >= 200) {
    const hundredsDigit = Math.floor(number / 100);
    result.push(...convertNumberToAudioFiles(hundredsDigit));
    result.push(...hundreds);
    number %= 100;
  }

  // > 100 && < 200
  if (number >= 100 && number < 200) {
    result.push("100.wav");
    number %= 100;
  }

  // Puluhan dan Satuan
  if (number >= 10 && number <= 19) {
    result.push(specialTens[number - 10]);
  } else {
    const tensDigit = Math.floor(number / 10);
    if (tensDigit > 0) {
      result.push(tens[tensDigit]);
    }
    const unitsDigit = number % 10;
    if (unitsDigit > 0) {
      result.push(units[unitsDigit]);
    }
  }

  return result;
};
