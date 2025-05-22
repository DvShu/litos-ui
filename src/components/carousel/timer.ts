export type AutoPlayTimerT = {
  start: () => void;
  stop: () => void;
};

export default function autoPlayTimer(
  callback: () => void,
  duration = 3000
): AutoPlayTimerT {
  let lastTime = 0;
  let running = false;
  let rafId: number | null = null;

  function start() {
    if (!running) {
      running = true;
      lastTime = 0; // 重置时间基准
      rafId = requestAnimationFrame(loop);
    }
  }

  function stop() {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function loop(timestamp: number) {
    if (!running) return;
    if (!lastTime) lastTime = timestamp;
    if (timestamp - lastTime >= duration) {
      callback();
      lastTime = timestamp;
    }
    rafId = requestAnimationFrame(loop);
  }

  return {
    start,
    stop,
  };
}
