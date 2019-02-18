import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, CardImg, CardBody } from 'reactstrap';
import { StatusMark } from '../StatusMark';
import preloader from '../../preloader.gif';
import TruncateWithToolTip from '../TruncateWithToolTip';
import { filterByClasses } from '../../utils/filterNiceClassification';

class GridData extends Component {
  render() {
    const { searchByMarkFeature } = this.props;
    const { data } = this.props.totalFound;

    return (
      <div className="cardWrap table">
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
              <Card key={applicationNumber}>
                <div className="imgCardWrap">
                  <div className="card-logo">
                    { logo.thumbnail ? (<CardImg top src={logo.thumbnail} />) : (<span>No logo</span>) }
                  </div>

                  <div className="grid_info">
                    <span className="mark_name">{mark}</span>
                    <span className="mark_owner">{owners}</span>
                    <span className="verify">
                      <StatusMark status={currentTrademarkStatus} />
                    </span>
                  </div>
                </div>

                <CardBody>
                  <div className="card_info_wrap">
                    <span className="card_info_title">Digital number:</span>
                    <a
                      className="card_info_number card_info_text"
                      target="_blank"
                      href={`http://tsdr.uspto.gov/#caseNumber=${applicationNumber}&caseSearchType=US_APPLICATION&caseType=SERIAL_NO&searchType=statusSearch`}
                      rel="noopener noreferrer"
                    >
                      {applicationNumber}
                    </a>
                  </div>

                  <div className="card_info_wrap">
                    <span className="card_info_title">Filed on:</span>
                    <span className="card_info_text">{startDate}</span>
                  </div>
                  <div className="card_info_wrap">
                    <span className="card_info_title">Class</span>
                    <span className="card_info_text">
                      {filterByClasses(niceClassification).map(indexClass => (<div key={indexClass}>{indexClass}</div>))}
                    </span>
                  </div>
                  <div className="card_info_wrap">
                    <span className="card_info_title">Goods</span>
                    {loading
                      ? (<img className="preloader_grid_description" src={preloader} alt="" />)
                      : infoText.length === 0 ? (<span className="card_info_text">No information</span>)
                        : (<TruncateWithToolTip id={info.applicationNumber} infoText={infoText} />)
                    }
                  </div>
                </CardBody>
              </Card>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalFound: state.data,
  searchByMarkFeature: state.data.searchParams.searchByMarkFeature,
});

export default connect(mapStateToProps)(GridData);
