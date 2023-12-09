import Mock from 'mockjs';

const random = Mock.Random;

function generateData() {
  return Array.from({ length: 5 }, () => ({
    height: random.integer(3000000, 4000000),
    latest: random.integer(10, 120).toString(),
    ids: Array.from({ length: 3 }, () => 'utility......' + random.word(4, 4)),
    miners: Array.from(
      { length: 3 },
      () => 'u0' + random.integer(10000000, 20000000),
    ),
    tags: Array.from({ length: 3 }, () => random.cword('优特', 2, 5)),
    msgs: Array.from({ length: 3 }, () => random.integer(1, 100)),
    rewards: Array.from({ length: 3 }, () => random.float(10, 20, 2, 2)),
  }));
}

Mock.mock('/api/block/info', 'post', () => ({
  code: 200,
  data: generateData(),
}));
