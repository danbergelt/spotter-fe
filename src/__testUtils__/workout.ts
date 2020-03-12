import moment from 'moment';

export const workout = {
  _id: 'id',
  date: moment()
    .startOf('week')
    .format('MMM DD YYYY'),
  title: 'mock workout',
  tags: [
    {
      _id: 'jfio2jf2890fj892jf928',
      tag: 'jfio2jf2890fj892jf928',
      color: 'red',
      content: 'tag content'
    }
  ],
  notes: 'Notes for workout',
  exercises: [
    { _id: 'foo', name: 'Exercise', weight: 100, sets: 1, reps: 1 },
    { _id: 'bar', name: 'Exercise2', weight: 200, sets: 2, reps: 2 }
  ],
  user: '5dd4a49f2f67ae62f99cec6b',
  createdAt: '2019-11-20T02:27:43.700Z',
  __v: 0
};
