import Mock from 'mockjs';

Mock.mock('/api/home/info', 'post', {
    code: 200,
    data: {
        height: '@integer(0, 10000)',
        totalPower: '@integer(100, 10000)',
    },
});
