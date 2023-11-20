import Mock from 'mockjs';

const random = Mock.Random;

function generateData() {
    return Array.from({ length: 5 }, () => ({
        rank: Mock.Random.integer(0, 5),
        name: Mock.Random.name(),
        trans: Mock.Random.integer(0, 50),
        transPer: Mock.Random.float(-50, 200, 2, 2),
        uniAddr: Mock.Random.integer(0, 50),
        uniAddrPer: Mock.Random.float(-10, 200, 2, 2),
        locked: Mock.Random.integer(0, 50),
        lockedPer: Mock.Random.float(-50, 200, 2, 2),
        tvl: Mock.Random.integer(0, 50),
        tvlPer: Mock.Random.float(-50, 200, 2, 2),
        tvlRatio: Mock.Random.float(0, 50, 2, 2)
    }));
}

Mock.mock('/api/eco/info', 'post', () => ({
    code: 200,
    data: generateData(),
    // 'data|5': [{
    //     rank: random.integer(0, 5),
    //     name: random.name(),
    //     trans: random.integer(0, 50),
    //     transPer: random.float(-50, 200, 2, 2),
    //     uniAddr: random.integer(0, 50),
    //     uniAddrPer: random.float(-10, 200, 2, 2),
    //     locked: random.integer(0, 50),
    //     lockedPer: random.float(-50, 200, 2, 2),
    //     tvl: random.integer(0, 50),
    //     tvlPer: random.float(-50, 200, 2, 2),
    //     tvlRatio: random.float(0, 50, 2, 2)
    // }],
}));
