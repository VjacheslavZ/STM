import React from 'react';
import ReactTooltip from 'react-tooltip';
import Truncate from 'react-truncate';

const TruncateWithToolTip = ({ id, infoText }) => (
  <div className="card_info_text__table">
    <Truncate
      trimWhitespace
      lines={2}
      ellipsis={(
        <React.Fragment>
          <span data-tip data-for={id} className="read_more">...Read more</span>

          <ReactTooltip
            id={id}
            aria-haspopup="true"
            place="top"
          >
            <p>{infoText}</p>
          </ReactTooltip>
        </React.Fragment>
      )}
    >
      {infoText}
    </Truncate>
  </div>
);

export default TruncateWithToolTip;
