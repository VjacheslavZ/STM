import React from 'react';
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

export const PaginationControls = ({
  onSubmit, placeholder, totalFound, activePage, onChange,
}) => (
  <div className="paginationWrap">
    <Form onSubmit={onSubmit} className="show_one_time">
      <FormGroup>
        <span>Show:</span>
        <FormControl
          type="text"
          name="rows"
          placeholder={placeholder}
          className="show"
        />
      </FormGroup>
    </Form>

    {placeholder < parseInt(totalFound, 10)
      ? (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={placeholder}
          totalItemsCount={totalFound}
          pageRangeDisplayed={5}
          onChange={onChange}

          firstPageText="First"
          lastPageText="Last"
          nextPageText={<FaCaretRight className="FaCaretRight" />}
          prevPageText={<FaCaretLeft />}
          linkClassPrev="linkClassPrev"
          linkClassNext="linkClassNext"
          linkClass="linkClass"
          itemClassNext="itemClassNext"
          itemClassPrev="itemClassPrev"
        />
      ) : null}
  </div>
);
