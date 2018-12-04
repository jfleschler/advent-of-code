const parseInput = input => {
  return input
    .split("\n")
    .map(line => {
      const date = line.match(/\[(.+)\]/)[1];
      const guard = line.match(/Guard #([0-9]+) begins shift/);
      const wakeUp = /wakes/.test(line);
      const startSleep = /falls/.test(line);
      return {
        date: new Date(date),
        guard: guard ? guard[1] : undefined,
        startSleep,
        wakeUp
      };
    })
    .sort((g1, g2) => g1.date - g2.date);
};

const buildGuards = input => {
  const guards = {};

  let id, startSleep;
  input.forEach(line => {
    if (line.guard) {
      id = line.guard;
    }
    if (line.startSleep) {
      startSleep = line.date;
    }
    if (line.wakeUp) {
      const totalSleep = line.date.getMinutes() - startSleep.getMinutes();

      if (guards[id]) {
        guards[id].totalSleep += totalSleep;
      } else {
        guards[id] = {
          totalSleep,
          sleeping: {}
        };
      }

      for (let i = startSleep.getMinutes(); i < line.date.getMinutes(); i++) {
        if (guards[id].sleeping[i]) {
          guards[id].sleeping[i] += 1;
        } else {
          guards[id].sleeping[i] = 1;
        }
      }
    }
  });
  return guards;
};

export const solvePart1 = input => {
  input = parseInput(input);
  const guards = buildGuards(input);

  let targetGuard;
  let totalSleep = 0;
  let maxMinute = 0;
  Object.keys(guards).forEach(id => {
    const guard = guards[id];
    if (guard.totalSleep > totalSleep) {
      targetGuard = id;
      totalSleep = guard.totalSleep;

      let maxCount = 0;
      Object.keys(guard.sleeping).forEach(minute => {
        const count = guard.sleeping[minute];
        if (count > maxCount) {
          maxMinute = minute;
          maxCount = count;
        }
      });
    }
  });
  return targetGuard * maxMinute;
};

export const solvePart2 = input => {
  input = parseInput(input);
  const guards = buildGuards(input);

  let targetGuard;
  let maxMinute = 0;
  let maxCount = 0;

  Object.keys(guards).forEach(id => {
    const guard = guards[id];
    Object.keys(guard.sleeping).forEach(minute => {
      const count = guard.sleeping[minute];
      if (count > maxCount) {
        targetGuard = id;
        maxMinute = minute;
        maxCount = count;
      }
    });
  });
  return targetGuard * maxMinute;
};
