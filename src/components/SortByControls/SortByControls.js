import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaThLarge, FaAlignJustify } from 'react-icons/fa';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import classnames from 'classnames';
import { changeViewTable } from '../../actions';

class SortByControls extends Component {
  render() {
    const {
      typeViewRow, handleFilterBy, handleFilterByDead, searchByDeadLabel, handleFilterByMarkFeature,
    } = this.props;
    const { classFilter, searchByDead, searchByMarkFeature } = this.props.searchParams;

    const getTetByFilter = (id) => {
      switch (id) {
        case '16':
          return '16 - Paper Goods';
        case '21':
          return '21 - Household Utensils';
        case '25':
          return '25 - Clothing';
        default:
          return 'All';
      }
    };

    return (
      <div className="sortByControls">

        <div className="sort__wrap">
          <div className="filter_wrap sortBy">
            <span className="sortByTitleFilter">Class:</span>
            <DropdownButton
              title={getTetByFilter(classFilter)}
              id="dropdown-basic-x"
              onSelect={(key, val) => { handleFilterBy(key, val.target.innerText); }}
              className="filter_drop-down"
            >
              <MenuItem eventKey="16,21,25" active={classFilter === '16,21,25'}>All</MenuItem>
              <MenuItem eventKey="16" active={classFilter === '16'}>16 - Paper Goods</MenuItem>
              <MenuItem eventKey="21" active={classFilter === '21'}>21 - Household Utensils</MenuItem>
              <MenuItem eventKey="25" active={classFilter === '25'}>25 - Clothing</MenuItem>
            </DropdownButton>
          </div>

          <div className="filter_wrap filterByDead">
            <span>Status:</span>
            <DropdownButton
              title={searchByDeadLabel}
              id="dropdown-basic-x"
              onSelect={(key, val) => { handleFilterByDead(key, val.target.innerText); }}
              className="filter_drop-down"
            >
              <MenuItem eventKey={false} active={searchByDead === 'All status'}>All status</MenuItem>
              <MenuItem eventKey active={searchByDead === 'Dead'}>Dead</MenuItem>
            </DropdownButton>
          </div>

          <div className="filter_wrap filterByMarkFeature">
            <span>Mark feature:</span>
            <DropdownButton
              title={searchByMarkFeature}
              id="dropdown-basic-x"
              onSelect={(key, val) => { handleFilterByMarkFeature(key, val.target.innerText); }}
              className="filter_drop-down"
            >
              <MenuItem active={searchByMarkFeature === 'Design plus words/letters/numbers'}>Design plus words/letters/numbers</MenuItem>
              <MenuItem active={searchByMarkFeature === 'Standard character mark'}>Standard character mark</MenuItem>
              <MenuItem active={searchByMarkFeature === 'Typed'}>Typed</MenuItem>
            </DropdownButton>
          </div>

          <div className="changeView">
            <span>View: </span>

            <div
              className={classnames('iconWrap', { active: typeViewRow })}
              onClick={() => this.props.changeViewTable(true)}
            >
              <FaAlignJustify />
            </div>

            <div
              className={classnames('iconWrap', { active: !typeViewRow })}
              onClick={() => this.props.changeViewTable(false)}
            >
              <FaThLarge />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  typeViewRow: state.data.typeViewRow,
  typeSortTable: state.data.typeSortTable,
  searchParams: state.data.searchParams,
});

export default connect(mapStateToProps, { changeViewTable })(SortByControls);
