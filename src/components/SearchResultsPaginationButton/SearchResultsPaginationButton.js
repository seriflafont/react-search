import React, {Component} from 'react';
import './SearchResultsPaginationButton.css';

class SearchResultsPaginationButton extends Component {
    
    render() {
        return ( 
            <button className={'search-results-pagination ' + (Number(this.props.currentIndex) === this.props.pageIndex ? 'selected' : '')}>{this.props.label}</button>
        );
    }
}
export default SearchResultsPaginationButton;