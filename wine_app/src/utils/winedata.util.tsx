import { WineData } from "../App";

function roundToThreeDecimalPlaces(number: number): number {
  return Number(number.toFixed(3));
}

function getGroupedData(data: WineData[]): Record<number, WineData[]> {
  const groupedData: Record<number, WineData[]> = {};

  for (const wine of data) {
    const alcoholClass = wine.Alcohol;

    if (!groupedData[alcoholClass]) {
      groupedData[alcoholClass] = [];
    }

    groupedData[alcoholClass].push(wine);
  }

  return groupedData;
}

function calculateMean(data: number[]): number {
  const sum = data.reduce((acc, num) => acc + num, 0);
  return sum / data.length;
}

function calculateMode(data: number[]): number[] {
  const numCountMap: Record<number, number> = {};
  let maxCount = 0;
  let modes: number[] = [];

  for (const num of data) {
    if (numCountMap[num]) {
      numCountMap[num]++;
    } else {
      numCountMap[num] = 1;
    }

    if (numCountMap[num] > maxCount) {
      maxCount = numCountMap[num];
      modes = [roundToThreeDecimalPlaces(num)];
    } else if (numCountMap[num] === maxCount) {
      modes.push(roundToThreeDecimalPlaces(num));
    }
  }

  return modes;
}

function calculateMedian(data: number[]): number {
  const sortedNumbers = data.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    // If the array has an even number of elements, take the average of the two middle values
    const middleValues = [
      sortedNumbers[middleIndex - 1],
      sortedNumbers[middleIndex],
    ];
    return calculateMean(middleValues);
  } else {
    // If the array has an odd number of elements, return the middle value
    return sortedNumbers[middleIndex];
  }
}

export function formatWineData(wineData: WineData[], wineProperty: string) {
  const result = [];
  const wineDataGroupedByAlchohol = getGroupedData(wineData);

  for (const alcoholClass in wineDataGroupedByAlchohol) {
    const data: number[] = wineDataGroupedByAlchohol[alcoholClass].map(
      (value) => {
        const property = value[wineProperty];

        //converting the non-number types to number for mean,median,mode calculations
        return typeof property === "string" ? parseFloat(property) : property;
      }
    );

    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const mode = calculateMode(data);

    result.push({
      class: alcoholClass,
      mean_value: roundToThreeDecimalPlaces(mean),
      median_value: roundToThreeDecimalPlaces(median),
      mode_value: mode,
    });
  }

  return result;
}

export const formatGamaData = (wineData: WineData[]) => {
  const gammaData = wineData.map((record) => {
    const numberAsh =
      typeof record.Ash === "string" ? parseFloat(record.Ash) : record.Ash;
    const numberHue =
      typeof record.Hue === "string" ? parseFloat(record.Hue) : record.Hue;

    const Gamma = (numberAsh * numberHue) / record.Magnesium;

    return { ...record, Gamma };
  });

  return formatWineData(gammaData, "Gamma");
};
