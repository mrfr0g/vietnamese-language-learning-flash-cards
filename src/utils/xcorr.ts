// Fork from https://github.com/adblockradio/xcorr/blob/master/xcorr.js to remove png junk

import { FFT } from "dsp.js";

export function xcorr(sig1: Array<number>, sig2: Array<number>) {
  if (sig1.length !== sig2.length) {
    throw new Error(
      `Xcorr: signal have different lengths ${sig1.length} vs ${sig2.length}`
    );
  }

  if (sig1.length % 2 !== 0 || sig1.length === 0) {
    throw new Error("Xcorr: signals do no seem to be 16-bit PCM.");
  }

  // samples in each signal
  const l = sig1.length;

  // compute RMS
  const rms1 = Math.sqrt(
    sig1.reduce((rms, sample) => rms + Math.pow(sample, 2), 0) / l
  );
  const rms2 = Math.sqrt(
    sig2.reduce((rms, sample) => rms + Math.pow(sample, 2), 0) / l
  );

  // arbitrary sampling rate
  const SAMPLING_RATE = 1;

  const fft1 = new FFT(l, SAMPLING_RATE);
  fft1.forward(sig1);

  const fft2 = new FFT(l, SAMPLING_RATE);
  fft2.forward(sig2);

  const realp = new Array(l)
    .fill(0)
    .map((_, i) => fft1.real[i] * fft2.real[i] + fft1.imag[i] * fft2.imag[i]);
  const imagp = new Array(l)
    .fill(0)
    .map((_, i) => -fft1.real[i] * fft2.imag[i] + fft2.real[i] * fft1.imag[i]);
  // note we have taken the complex conjugate of fft2.

  const fftp = new FFT(l, SAMPLING_RATE);
  const xcorr = fftp
    .inverse(realp, imagp)
    .map((coef) => coef / rms1 / rms2 / l); // normalize the module of xcorr to [0, 1]

  // index of the max amplitude of xcorr
  const iMax = xcorr.reduce(
    (indexTemporaryMax, testCoef, indexTestCoef) =>
      Math.abs(testCoef) > Math.abs(xcorr[indexTemporaryMax])
        ? indexTestCoef
        : indexTemporaryMax,
    0
  );

  return {
    xcorr,
    xcorrMax: xcorr[iMax],
    iMax: iMax < l / 2 ? iMax : iMax - l, // have iMax relative to index 0
  };
}
