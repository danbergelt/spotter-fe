import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const mockWorkoutRes = {
  data: {
    workouts: [
      {
        _id: 'jfi289f289fj9jf289jf9',
        date: moment()
          .startOf('week')
          .format('MMM DD YYYY'),
        title: 'Workout FOR TESTING',
        tags: [
          {
            _id: 'jfio2jf2890fj892jf928',
            tag: 'jfio2jf2890fj892jf928',
            color: 'red',
            content: 'tag'
          },
          {
            _id: 'jfio2jf28guyguygjf928',
            tag: 'jfio2jf28guyguygjf928',
            color: 'blue',
            content: 'tag2'
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
      },
      {
        _id: 'jfi289f28guygguyf289jf9',
        date: moment()
          .startOf('week')
          .format('MMM DD YYYY'),
        title: 'leg day',
        tags: [
          {
            _id: 'jfio2jiuhyi90fj892jf928',
            tag: 'jfio2jf2890fj892jf928',
            color: 'red',
            content: 'tag'
          },
          {
            _id: 'jfio2jf2878787guygjf928',
            tag: 'jfio2jf28guyguygjf928',
            color: 'blue',
            content: 'tag2'
          }
        ],
        notes: 'Notes for workout 2',
        exercises: [
          { _id: 'baz', name: 'Exercise', weight: 100, sets: 1, reps: 1 },
          { _id: 'qux', name: 'Exercise2', weight: 200, sets: 2, reps: 2 }
        ],
        user: '5dd4a49f2f67ae62f99cec6b',
        createdAt: '2019-11-20T02:27:43.700Z',
        __v: 0
      }
    ]
  }
};

export default mockWorkoutRes;
