import must from '../types/must';

const measurements: Partial<Record<string, ReturnType<typeof process.hrtime>>> = {};

const startPerformanceMeasure = (id: string): void => {
  measurements[id] = process.hrtime();
};

const finishPerformanceMeasure = (id: string, reportThresholdMs?: number): void => {
  must(id);
  const measurement = measurements[id];
  if (measurement == null) throw new Error(`Measurement ${id} not started`);
  const finish = process.hrtime(measurement);
  const ms = finish[0] * 1000 + finish[1] / 1000000;
  if (reportThresholdMs === undefined || ms >= reportThresholdMs) {
    console.info(
      `Task "${id}" took ${ms.toString()}ms${
        typeof reportThresholdMs === 'number'
          ? ` (threshold ${reportThresholdMs.toString()}ms)`
          : ''
      }`,
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete measurements[id];
};

export { startPerformanceMeasure, finishPerformanceMeasure };
