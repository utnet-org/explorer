import Mock from 'mockjs';

Mock.mock('/api/overview/info', 'post', {
    code: 200,
    data: {
        height: '@integer(0, 100000)',
        latestBlock: '@integer(10, 120)',
        totalPower: '@integer(10000, 50000)',
        activeMiner: '@integer(1000, 5000)',
        blockReward: '@float(0, 1, 3, 3)',
        dayAveReward: '@float(0, 1, 2, 2)',
        dayProduction: '@integer(10000, 100000)',
        dayMessage: '@integer(10000, 20000)',
        totalAccount: '@integer(5000, 10000)',
        aveBlockInterval: '@integer(10, 60)',
    },
});
