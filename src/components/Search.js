import React, { Component } from 'react';


class Search extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            keyword : '',
        }
    }

    onChange = (event) => {
        var target= event.target;
        var name= target.name;
        var value= target.value;
        this.setState({
            [name] : value
        });
    }

    onSearch= () => { // tim name
        this.props.onSearch(this.state.keyword);
    }

    render() {
        var { keyword } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text"
                        className="form-control"
                        name="keyword"
                        placeholder="Nhập từ khóa ..."
                        value= { keyword }
                        onChange= { this.onChange }
                    />
                    <span className="input-group-btn">
                        <button type="button" 
                            className="btn btn-primary"
                            onClick= { this.onSearch }>
                            <i className="fas fa-search mr-5 " />Tìm
                        </button>
                    </span>
                </div>
            </div>

        );
    }
}

export default Search;
