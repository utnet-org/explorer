import Mock from 'mockjs';

Mock.mock('/api/price', 'get', {
    code: 200,
    data: {
        price: '@integer(20, 50)',
    },
});

export default Mock;