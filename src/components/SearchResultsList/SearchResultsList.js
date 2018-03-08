import React, {Component} from 'react';
import './SearchResultsList.css';
import SearchResultsListItem from '../../components/SearchResultsListItem/SearchResultsListItem';
import SearchResultsPaginationButton from '../../components/SearchResultsPaginationButton/SearchResultsPaginationButton';
class SearchResultsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            SearchResults:[],
            pageLimit:5,
            currentPaginatedPage:[],
            currentPageIndex:0,
            currentPageNum:1,
            paginatedResults: [],
        }
        this.choosePage = this.choosePage.bind(this);
        this.handlePageLimitChange = this.handlePageLimitChange.bind(this);
    }
    componentWillMount(){
        let paginatedResults = this.calculatePages(this.props.SearchResults, this.state.pageLimit);
        this.setState({
            SearchResults:this.props.SearchResults, 
            paginatedResults:paginatedResults,
            currentPaginatedPage: paginatedResults[this.state.currentPageIndex]
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.SearchResults !== this.state.SearchResults){
            this.resetPagination(nextProps.SearchResults);
        }
    }
    resetPagination(results){
        let newPaginatedResults = this.calculatePages(results, this.state.pageLimit);
        this.setState((prevState) => ({
            currentPageIndex:0,
            currentPageNum:1,
            SearchResults: results,
            paginatedResults:newPaginatedResults,
            currentPaginatedPage: newPaginatedResults[0]
        }));
    }
    calculatePages(results, pagelimit){
        let nPages = Math.ceil(results.length/pagelimit);
        let arPages = [];
        let t=0;
        for (let i=0;i<nPages;i++){
            arPages.push(results.slice(t,Number(pagelimit)+t));
            t += Number(pagelimit);
        }
        return arPages;
    }
    choosePage(event){
        let selectedPage = event.currentTarget.getAttribute('data-index');
        if(selectedPage === 'prev'){
            selectedPage = Number(this.state.currentPageIndex) - 1;
        }else if(selectedPage == 'next'){
            selectedPage = Number(this.state.currentPageIndex) + 1;
        }
        this.setState((prevState)=>({
            ...prevState, 
            currentPageIndex:selectedPage,
            currentPageNum:Number(selectedPage)+1,
            currentPaginatedPage: this.state.paginatedResults[selectedPage]
        }));
    }
    handlePageLimitChange(event){
        this.setState({pageLimit: event.target.value},()=>{
            this.resetPagination(this.state.SearchResults);
        });
        
    }
    incrementSearchPage(){

    }
    decrementSearchPage(){

    }
    render() {
        let ceilPage = this.state.pageLimit * this.state.currentPageNum;
        let floorPage = (ceilPage+1) - this.state.pageLimit;
        ceilPage = ceilPage > this.state.SearchResults.length ? this.state.SearchResults.length : ceilPage;
        let showLeftArrow = this.state.currentPageIndex > 0;
        let showRightArrow = this.state.currentPageNum < this.state.paginatedResults.length && this.state.SearchResults.length > this.state.pageLimit;
        return (
            <div className="search-results-list-wrapper">
                <div className="search-results-wrapper">
                    <ul>
                        <li key="-1"><SearchResultsListItem header="true" /></li>
                        {this.state.currentPaginatedPage.map(function(obj, index){
                            return <li key={index+obj.id}><SearchResultsListItem dataVo={obj} /></li>;
                        })}
                    </ul>
                </div>
                <div className="pagination-wrapper">
                    <ul> 
                        <li>
                            <label htmlFor="pageLimitSelect">Show</label>
                            <select id="pageLimitSelect" value={this.state.pageLimit} onChange={this.handlePageLimitChange}>
                                <option value="5">5 items</option>
                                <option value="15">15 items</option>
                                <option value="25">25 items</option>
                                <option value="50">50 items</option>
                                <option value="100">100 items</option>
                            </select>
                        </li>
                        <li data-index="prev" onClick={this.choosePage} className={'button arrow-button ' + (showLeftArrow ? 'show' : 'hide')} key='prevbtn'><SearchResultsPaginationButton currentIndex={this.state.currentPageIndex} label='<' /></li>
                        {this.state.paginatedResults.map(function(obj, index){
                            return <li data-index={index} onClick={this.choosePage} className='button'  key={index}><SearchResultsPaginationButton currentIndex={this.state.currentPageIndex} pageIndex={index} label={index+1} /></li>;
                        }, this)}
                        <li data-index="next" onClick={this.choosePage} className={'button arrow-button ' + (showRightArrow ? 'show' : 'hide')} key='nextbtn'><SearchResultsPaginationButton currentIndex={this.state.currentPageIndex} label='>' /></li>
                        <li>{floorPage} to {ceilPage} of {this.state.SearchResults.length}</li>
                    </ul>
                    
                </div>
            </div>
        );
    }
}

export default SearchResultsList;