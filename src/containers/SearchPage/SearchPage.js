import React, {Component} from 'react';
import './SearchPage.css';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';

const API = 'http://localhost:8888/referrals-wanted-api/public/api/referrals';
//const QUERY = '';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = { 
            SearchResults: Array(10).fill(
            {
                id: "2",
                Referral_Name: "Shivam Gupta",
                Email_Address: "shivam@shivam.us",
                Mobile_Number: "2147483647",
                Country_Referred_for: "India",
                Years_Of_Work_Experience: "1 - 3 Years",
                Referral_Submitted_Domain: "",
                CityofResidence: "chennai",
                Portfolio_Link: "",
                TaleoID_or_Avature_ID: "4220743",
                Referral_Submitted_Date: "2012-01-17",
                Referral_Key_Skills: "2 years  BA Business Analayst",
                Business_Type: "Global Markets",
                Referral_Hired_Location: "",
                Referrer_Name: "Gopinath Umapathi",
                Referrer_Sapient_Email: "gumapathi@sapient.com",
                Referrer_Country: "India",
                Referrer_Oracle_ID: "652636",
                Referrer_Business_Unit: "SNINDIA",
                Referrer_Sapient_Office: "BENGALURU - BCBP",
                Referrer_Home_Office: "",
                Duplicate_Check_Outcome:
                "Passed \u2030\u00db\u00d2 Avature/Taleo Created",
                Duplicate_Check_Outcome_Date: "2012-05-17",
                First_Screen_Outcome:
                "Possible match future needs - keep warm",
                First_Screen_Outcome_Date: "2012-05-17",
                Second_Screen_Outcome: " ",
                Second_Screen_Outcome_Date: "0000-00-00",
                Final_Outcome: "0000-00-00",
                Final_Outcome_Date: "0000-00-00",
                Last_Modified_By: "Gopinath Umapathi",
                Last_Modified: "2012-05-17",
                Special_Offer_Code: "",
                Referral_Bonus_Currency: "",
                Referral_Bonus_Approver_Name: "",
                Referral_Bonus_Approved_Date: "0000-00-00",
                Referral_Bonus_Paid_Date: "0000-00-00",
                Referral_Hired_Title: "",
                Referral_Start_Date: "0",
                Referral_Bonus_Amount: "0",
                Bonus_Paid_Quarter: "",
                PoC: "",
                Willing_To_Relocate_To_India: "FALSE",
                HitCount: "0",
                TimeSubmitted: "00:05:55"
            }
            ), 
            arFormProps: {}, 
            loadingsearchresults: false,
            id:null
        };
        this.QUERY = '';
        this.handleSearchCriteriaChange = this.handleSearchCriteriaChange.bind(this);
    }

    fetchSearchResults() {
        //hacky way for id 'search' for now.
        let URL = (this.state.id === '' || null) ? API : API + '/'+this.state.id;;
        fetch(URL)
          .then(response => response.json())
          .then(data => this.setState({ SearchResults: data, loadingsearchresults:false }));
    }

    handleSearchCriteriaChange(formObj){
        this.setState((prevState) => ({
            ...prevState, ...formObj, loadingsearchresults:true
        }), this.fetchSearchResults);
    }

    render(){
        return (
            <div className="page-content">
                <SearchPanel isLoading={this.state.loadingsearchresults} searchSubmitHandler={this.handleSearchCriteriaChange}/>
                <SearchResultsList SearchResults={this.state.SearchResults} />
            </div>
        );
    }
}
export default SearchPage;