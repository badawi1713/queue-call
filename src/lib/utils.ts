import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const units = [
  "",
  "1.mp3",
  "2.mp3",
  "3.mp3",
  "4.mp3",
  "5.mp3",
  "6.mp3",
  "7.mp3",
  "8.mp3",
  "9.mp3",
];
const tens = [
  "",
  "",
  "20.mp3",
  "30.mp3",
  "40.mp3",
  "50.mp3",
  "60.mp3",
  "70.mp3",
  "80.mp3",
  "90.mp3",
];
const specialTens = [
  "10.mp3",
  "11.mp3",
  "12.mp3",
  "13.mp3",
  "14.mp3",
  "15.mp3",
  "16.mp3",
  "17.mp3",
  "18.mp3",
  "19.mp3",
];

export const alphabets = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode("A".charCodeAt(0) + index)
);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertNumberToAudioFiles = (number: number): string[] => {
  if (number === 0) {
    return ["0.mp3"];
  }

  if (number === 100) {
    return ["100.mp3"];
  }

  if (number === 200) {
    return ["200.mp3"];
  }

  if (number === 300) {
    return ["300.mp3"];
  }

  if (number === 400) {
    return ["400.mp3"];
  }

  if (number === 500) {
    return ["500.mp3"];
  }

  if (number === 600) {
    return ["600.mp3"];
  }

  if (number === 700) {
    return ["700.mp3"];
  }

  if (number === 800) {
    return ["800.mp3"];
  }

  if (number === 900) {
    return ["900.mp3"];
  }

  const result = [];

  // Ratusan
  if (number >= 900 && number < 1000) {
    result.push("900.mp3");
    number %= 100;
  }

  if (number >= 800 && number < 900) {
    result.push("800.mp3");
    number %= 100;
  }

  if (number >= 700 && number < 800) {
    result.push("700.mp3");
    number %= 100;
  }

  if (number >= 600 && number < 700) {
    result.push("600.mp3");
    number %= 100;
  }

  if (number >= 500 && number < 600) {
    result.push("500.mp3");
    number %= 100;
  }

  if (number >= 400 && number < 500) {
    result.push("400.mp3");
    number %= 100;
  }

  if (number >= 300 && number < 400) {
    result.push("300.mp3");
    number %= 100;
  }

  if (number >= 200 && number < 300) {
    result.push("200.mp3");
    number %= 100;
  }

  if (number >= 100 && number < 200) {
    result.push("100.mp3");
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
