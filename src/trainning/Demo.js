// import { createStore } from 'redux';
// import { status, sort } from './actions/index';
// import myReduce from './reduces/StateOne';

// const store = createStore(myReduce);
// console.log('Default : ', store.getState());
// // thực hiện thay đổi status
// // var action= { type : 'TOGGLE_STATUS'}

// store.dispatch(status());
// console.log('TOGGLE_STATUS : ', store.getState());

// // thực hiện công việc sắp xếp tên A- Z
// // var sortAction= {
// //     type : 'SORT', 
// //     sort : {
// //         by : 'name',
// //         value : -1
// //     },
// // }

// store.dispatch(sort({
//   by : 'name', 
//   value : -1  
// }));
// console.log('SORT : ',store.getState());