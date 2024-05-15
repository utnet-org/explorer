import Mock from 'mockjs';

Mock.mock('/api/price', 'get', {
  code: 200,
  data: {
    price: '@float(0.003, 0.004, 3, 5)',
    amount: '@float(1, 2, 2, 2)',
  },
});

export default Mock;
