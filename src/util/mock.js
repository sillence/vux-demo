import Mock from'mockjs';
var Random = Mock.Random;
Random.first();
Random.id();
Mock.mock('http://data.com/newslist', {
  success: '1',
  'result|0-100': [{
    id:'@id',
    name:'@first',
    status: '@integer(1, 3)',
    create_time: '@time'
  }]
});
export default Mock
