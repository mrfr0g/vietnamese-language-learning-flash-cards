export function filterData(audioBuffer: AudioBuffer, samples: number = 100) {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  return filteredData;
}

export function normalizeData(filteredData): Array<number> {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
}

export function parseData(audioBuffer: AudioBuffer): Array<number> {
  return normalizeData(filterData(audioBuffer));
}

// Trim until first instance of number not 0
export function trimFront(data: Array<number>): Array<number> {
  const firstNonZero = data.findIndex((n) => n !== 0);
  return data.slice(firstNonZero);
}
