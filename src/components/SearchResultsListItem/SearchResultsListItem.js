import React, {Component} from 'react';
import './SearchResultsListItem.css';

class SearchResultsListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'', 
            Referral_Name:'Name', 
            Email_Address:'Email', 
            Referral_Submitted_Date:'Submitted', 
            Country_Referred_for:'For Country', 
            Referral_Submitted_Domain:'For Domain', 
            Special_Offer_Code:'Promo Code', 
            Referrer_Name:'Submitted By', 
            Referrer_Sapient_Email:'Submitter Email', 
            First_Screen_Outcome:'', 
            Second_Screen_Outcome:'', 
            Final_Outcome:'',
        }
    }
    componentWillMount(){
        this.setState((prevState)=>({
            ...prevState,...this.props.dataVo
        }));
    }
    renderLink(){
        if(this.state.id !== ''){
            return (
                <a href={'/referral-detail/' + this.state.id}>More</a>
            );
        }else{
            return '';
        }
    }
    render() {
        const status = this.state.Final_Outcome !== (' ' && '0000-00-00') ? this.state.Final_Outcome : this.state.Second_Screen_Outcome !== ' ' ? 'Second Screen' : this.state.First_Screen_Outcome !== ' ' ? 'First Screen' : 'In Progress';
        
        return (
            <div className={"search-results-list-item " + (this.props.header ? 'header' : '')}>
                <span className='referral-name'>{this.state.Referral_Name}</span>
                <span className='email'>{this.state.Email_Address}</span>
                <span className='submit-date'>{this.state.Referral_Submitted_Date}</span>
                <span className='country'>{this.state.Country_Referred_for}</span>
                <span className='domain'>{this.state.Referral_Submitted_Domain}</span>
                <span className='promo'>{this.state.Special_Offer_Code}</span>
                <span className='submitter-name'>{this.state.Referrer_Name}</span>
                <span className='submitter-email'>{this.state.Referrer_Sapient_Email}</span>
                <span className='status'>{status}</span>
                <span className='link'>{this.renderLink()}</span>
            </div>
        );
    }
}

export default SearchResultsListItem;