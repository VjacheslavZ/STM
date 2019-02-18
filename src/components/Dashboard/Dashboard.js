import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import { FaCopyright } from 'react-icons/fa';
import bindFunctions from '../../utils/bind-functions';
import SortByControls from '../SortByControls/SortByControls';
import preloader from '../../preloader.gif';
import { getData, changeSearchParams, clearSearchResults } from '../../actions';
import { SearchMain, SearchMobile } from '../Search';
import { PaginationControls } from '../Pagination';
import TableData from '../Table';
import GridData from '../Grid';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      showRows: 10,
      searchBy: 'All',
      searchByDeadLabel: 'All status',
      searchByMarkFeature: 'Design plus words\\/letters\\/numbers',
    };

    bindFunctions.call(this,
      [
        'handleSubmitSearch',
        'handleSetSearchText',
        'handleChangeShowRows',
        'handleFilterByMarkFeature',
        'handleChangePagination',
        'handleFilterBy',
        'handleFilterByDead',
        'applyFilter',
      ]);
  }

  componentWillMount() {
    const filterParams = this.props.match.params;
    const { searchText, classFilter, searchByDead } = filterParams;
    const { activePage, showRows } = this.state;
    const { history } = this.props;

    if (Object.keys(filterParams).length) {
      this.props.changeSearchParams({ ...filterParams });
      this.props.getData(history, searchText, activePage - 1, showRows, classFilter, searchByDead);
    }
  }

  handleChangePagination(pageNumber) {
    this.setState({
      activePage: pageNumber,
    });

    const { showRows } = this.state;
    const { searchText, classFilter, searchByDead } = this.props.searchParams;
    const { history } = this.props;

    this.props.getData(history, searchText, (pageNumber * showRows) - showRows, showRows, classFilter, searchByDead);
  }

  handleChangeShowRows(e) {
    e.preventDefault();
    const rows = e.target.elements.rows.value;

    this.setState({
      showRows: rows,
      activePage: 1,
    });

    const { showRows, pageNumber } = this.state;
    const { searchText, classFilter, searchByDead } = this.props.searchParams;
    const { history } = this.props;

    this.props.getData(history, searchText, (pageNumber * showRows) - showRows, rows, classFilter, searchByDead);
  }

  handleFilterByDead(val, text) {
    this.props.changeSearchParams({ searchByDead: text });

    this.setState({
      searchByDeadLabel: text,
    }, () => this.applyFilter());
  }

  handleFilterByMarkFeature(val, text) {
    this.props.changeSearchParams({ searchByMarkFeature: text });

    this.setState({
      searchByMarkFeature: text,
    });
  }

  handleFilterBy(key, val) {
    this.props.changeSearchParams({ classFilter: key });

    this.setState({
      searchBy: val,
    }, () => this.applyFilter());
  }

  handleSetSearchText(e) {
    const { history } = this.props;
    const { value } = e.target;

    if (!value.length) {
      this.props.clearSearchResults();
      this.setState({
        searchBy: 'All',
        searchByDeadLabel: 'All status',
      });

      history.push('/');
    }

    this.props.changeSearchParams({ searchText: value });
  }

  handleSubmitSearch(e) {
    e.preventDefault();
    this.applyFilter();
  }

  applyFilter() {
    const { activePage, showRows } = this.state;
    const { history } = this.props;
    const { searchText, classFilter, searchByDead } = this.props.searchParams;
    if (searchText.length <= 2) return;

    this.props.getData(history, searchText, activePage - 1, showRows, classFilter, searchByDead);
  }

  render() {
    const { data, dataLoading, totalFound = 0 } = this.props.info;
    const { errors, typeViewRow } = this.props;
    const { activePage, showRows } = this.state;
    const { searchText } = this.props.searchParams;

    return (
      <Grid>
        <Row>
          <Col className="container inner-wrapper">

            <SearchMobile
              onChange={this.handleSetSearchText}
              value={searchText}
              onClick={this.handleSubmitSearch}
            />

            <SearchMain
              onSubmit={this.handleSubmitSearch}
              onChange={this.handleSetSearchText}
              value={searchText}
              dataLoading={dataLoading}
            />

            <SortByControls
              handleFilterBy={this.handleFilterBy}
              handleFilterByDead={this.handleFilterByDead}
              handleFilterByMarkFeature={this.handleFilterByMarkFeature}
              searchBy={this.state.searchBy}
              searchByDeadLabel={this.state.searchByDeadLabel}
              searchByMarkFeature={this.state.searchByMarkFeature}
            />

            { dataLoading ? (<img src={preloader} alt="" className="preloader" />) : null }

            { typeViewRow ? (<TableData />) : (<GridData />) }

            { Object.keys(data).length
              ? (
                <PaginationControls
                  onSubmit={this.handleChangeShowRows}
                  placeholder={showRows}
                  totalFound={totalFound}
                  activePage={activePage}
                  onChange={this.handleChangePagination}
                />
              ) : null
            }

            <div className="loader">
              { errors.searchError ? (<span className="no-results">No results</span>) : null }
            </div>

            <div className="footer">
              <div className="contacts">
                <a href="-#">Contacts</a>
                <a href="-#">Privacy & Terms</a>
              </div>

              <div className="copyright">
                <FaCopyright className="faCopyright" />
                <span>FoundBundles | DesignBundles</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProprs = state => ({
  info: state.data,
  totalFound: state.data,
  errors: state.data.errors,
  typeViewRow: state.data.typeViewRow,
  searchParams: state.data.searchParams,
});

export default connect(mapStateToProprs, { getData, changeSearchParams, clearSearchResults })(Dashboard);
