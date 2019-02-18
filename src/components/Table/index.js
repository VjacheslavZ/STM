import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import preloader from '../../preloader.gif';
import { StatusMark } from '../StatusMark';
import TruncateWithToolTip from '../TruncateWithToolTip';
import { filterByClasses } from '../../utils/filterNiceClassification';

class TableData extends Component {
  render() {
    const { searchByMarkFeature } = this.props;
    const { data } = this.props.totalFound;

    return (
      <Table striped condensed hover className="tableWrap">
        <thead>
          <tr>
            <th className="table__head textColor">Name</th>
            <th className="table__head textColor">8 digit number</th>
            <th className="table__head textColor">Status</th>
            <th className="table__head textColor">Class</th>
            <th className="table__head textColor">Goods/Description</th>
            <th className="table__head textColor">Filed on</th>
          </tr>
        </thead>

        <tbody className="tbody">
          {
            data.map((info) => {
              const {
                logo = {},
                applicationDate,
                goodsDescription,
                mark,
                owners,
                applicationNumber,
                currentTrademarkStatus,
                niceClassification,
              } = info;
              const { loading, infoText, markFeature } = goodsDescription;
              if (markFeature !== searchByMarkFeature) return null;

              const startDate = moment(applicationDate).format('MMMM DD,YYYY');

              return (
                <tr key={applicationNumber}>
                  <td>
                    <div className="table_name-wrap">
                      <div className="table_image-wrap">
                        { logo.thumbnail ? (<img className="logoCompany" src={logo.thumbnail} alt="" />) : null }
                      </div>

                      <div className="table_name_info">
                        <span>{mark}</span>
                        <span className="table_name_owner">{owners}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="serialNumber">
                      <a
                        href={`http://tsdr.uspto.gov/#caseNumber=${applicationNumber}&caseSearchType=US_APPLICATION&caseType=SERIAL_NO&searchType=statusSearch`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicationNumber}
                      </a>
                    </span>
                  </td>

                  <td>
                    <span className="verify">
                      <StatusMark
                        status={currentTrademarkStatus}
                      />
                    </span>
                  </td>

                  <td>
                    <div className="niceClassificationWrap">
                      {filterByClasses(niceClassification).map(indexClass => (<div key={indexClass}>{indexClass}</div>))}
                    </div>
                  </td>

                  <td>
                    {loading ? (<img className="preloader_table_description" src={preloader} alt="" />)
                      : infoText.length === 0 ? (<span className="card_info_text">No information</span>)
                        : (<TruncateWithToolTip id={info.applicationNumber} infoText={infoText} />)
                    }
                  </td>

                  <td className="startDate">
                    {startDate}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  totalFound: state.data,
  searchByMarkFeature: state.data.searchParams.searchByMarkFeature,
});

export default connect(mapStateToProps)(TableData);
