import React, {Component} from 'react';
import './SearchPanel.css';

class SearchPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            id:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        event.persist();
        let prop = event.target.getAttribute('name');
        this.setState((prevState) => ({
            ...prevState, [prop]: event.target.value
        }));
    }
    handleSubmit(){
        this.props.searchSubmitHandler(this.state);
    }
    render() {
        return (
            <div className={"search-panel-wrapper " + (this.props.isLoading ? 'loading' : '')}>
                <div className="search-row">
                    <div className="search-input">
                        <label htmlFor="nameField">Referral's Name</label>
                        <input value={this.state.name} onChange={this.handleChange} id="nameField" type="text" name="name" />
                    </div>
                    <div className="search-input">
                        <label htmlFor="idField">Referral's ID (Temporary)</label>
                        <input value={this.state.id} onChange={this.handleChange} id="idField" type="text" name="id" />
                    </div>
                </div>
                <div className="search-row top-line">
                    <button onClick={this.handleSubmit}>Search</button>
                </div>
            </div>
        );
    }
}

export default SearchPanel;