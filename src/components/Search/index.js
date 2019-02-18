import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Form, FormGroup } from 'react-bootstrap';

export const SearchMain = ({
  onSubmit, onChange, value, dataLoading,
}) => (
  <Form onSubmit={onSubmit} className="form">
    <FormGroup className="formGroup">
      <FaSearch className="searchIc" />

      <input
        onChange={onChange}
        className="input-search"
        placeholder="Search for customers, transactions or stores"
        value={value}
      />

      <Button type="submit" className="searchButton" bsStyle="primary">
        {dataLoading ? ' Loading...' : 'Search'}
      </Button>
    </FormGroup>
  </Form>
);

export const SearchMobile = ({ value, onChange, onClick }) => (
  <div>
    <div className="form-mobile">
      <div className="logo">
          logo
      </div>
      <div className="search-wrapper">
        <input
          onChange={onChange}
          className="input-search"
          value={value}
        />
        <FaSearch className="searchIc" onClick={onClick} />
      </div>
    </div>
  </div>
);
