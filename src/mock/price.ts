import Mock from 'mockjs';

Mock.mock('/api/price', 'get', {
    code: 200,
    data: {
        price: '@float(0.1, 0.9, 4, 6)',
        amount: '@float(0, 1, 2, 2)',
    },
});

export default Mock;