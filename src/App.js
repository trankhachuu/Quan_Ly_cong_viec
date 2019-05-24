import React, { Component } from 'react';
import './App.css';
import TackForm from './components/TackForm';
import Control from './components/Control';
import TackList from './components/TackList';
import { findIndex, createStore } from 'lodash';
import Demo from './trainning/Demo';
import { connect } from 'react-redux'; // import 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks : [], // id : unique, name, status
      isDisplayForm: false,
      taskEditing : null,
      filter : {
        name : '',
        status : -1
      },
      keyword : '', 
      sortBy : 'name',
      sortValue : 1 
    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  s4(){
    return Math.floor((1+ Math.random())* 0x10000).toString(16).substring(1);
  }

  genestateID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + 
      this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onToggleFrom = () => { // them tack
    if (this.state.isDisplayForm === true && this.state.taskEditting !== null) {
      this.setState({
        isDisplayForm: true, 
        taskEditing : null
      });
    } else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }
// hiển thị form
  onShowForm = () => {
    this.setState({
      isDisplayForm : true,
    });
  }
  // thêm dữ liệu vào tasks
  onSubmit = (data) => {
    var { tasks } = this.state /// tasks= this.state.tasks
    if (data.id === '') {
      /// thêm 
      data.id= this.genestateID();// tasks
      tasks.push(data);
    }else{
      // cập nhật 
      var index= this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks, 
      taskEditing : null   /// clear đi cái taskEditing
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => { // cập nhật status
    var { tasks } = this.state;
    // dung thư viện
    var index= findIndex(tasks, (task) => {
      return task.id=== id;
    });
    tasks[index].status = !tasks[index].status;
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //////////////////// viết thuần
    // var index = this.findIndex(id);
    // if (index !== -1) {
    //   tasks[index].status = !tasks[index].status;
    //   this.setState({
    //     tasks: tasks
    //   });
    //   localStorage.setItem('tasks', JSON.stringify(tasks));
    // }
  }

  findIndex = (id) => {   // tìm vị trí cần cập nhật
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id)=> {
    var { tasks }= this.state;
    var index= this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => { // lọc dữ liệu
   // console.log(filterName ,'____', filterStatus);
    filterStatus = parseInt(filterStatus, 20);
    //console.log(typeof filterStatus);
    this.setState({
      filter : {
        name : filterName.toLowerCase(), 
        status : filterStatus
      }
    });
  }

  onSearch= (keyword) => { // tim name
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sortBy, sortValue) =>{
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }

  componentDidMount(){
    console.log(this.props.StateTest);
  }

  render() {

    var { tasks, 
        isDisplayForm, 
        taskEditing, 
        filter, 
        keyword, 
        sortBy,
        sortValue } = this.state;
    //console.log(filter);


    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          // toLowerCase viết thường số , indexOf kiểm tra nếu nó chứa cái tên
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1)
        {
          return task;
        }
        else{  
          return task.status === (filter.status === 1 ? true : false )
        }
      });
      // if (filter.status) {  //->  !=== null !=== undefine !== 0
        
      // }
    }


    // if (keyword) {   // toLowerCase viết thường số , indexOf kiểm tra nếu nó chứa keyword
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    //   });
    // }


  tasks = tasks.filter((task)=> {
    return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
  });

    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if(a.name > b.name) return -sortValue;
        else return 0;
      });
    }
    else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if(a.status > b.status) return sortValue;
        else return 0;
      });
    }

    var elmTackForm = isDisplayForm ? <TackForm 
    onSubmit={this.onSubmit} 
    onCloseForm={this.onCloseForm}
    task = { taskEditing } /> : '';
    return (

      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {/* form */}
            {elmTackForm}
          </div>
          <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12npm col-sm-12npm col-md-12npm col-lg-12npm'}>
            <button type="button" className="btn btn-primary" style={{ marginBottom: '10px' }} onClick={this.onToggleFrom}>
              <span className="fa fa-plus mr-5" /> Thêm công việc
            </button>
            {/* Search - Sort */}
            <Control onSearch= { this.onSearch }
              onSort= { this.onSort }
              sortBy = { sortBy }
              sortValue = { sortValue}
            />
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TackList tasks= { tasks }
                  onUpdateStatus= { this.onUpdateStatus} 
                  onDelete= { this.onDelete }
                  onUpdate= { this.onUpdate }
                  onFilter= { this.onFilter }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default connect(function(state){
  return { StateTest : state.StateTest,  }
})(App);
