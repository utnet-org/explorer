import Mock from 'mockjs';

const random = Mock.Random;

function generateData() {
  return Array.from({ length: 5 }, () => ({
    rank: random.integer(0, 5),
    miner: 'u0' + random.integer(10000000, 20000000),
    tag: random.cword('优特', 2, 5),
    effPower: random.float(0, 100, 2, 2),
    effPer: random.float(0, 50, 2, 2),
    dayReward: random.float(100, 1000, 2, 2),
    dayEff: random.float(0, 0.1, 2, 2),
    dayGrowth: random.float(0, 100, 2, 2),
  }));
}

Mock.mock('/api/power/rank', 'post', () => ({
  code: 200,
  data: generateData(),
}));
