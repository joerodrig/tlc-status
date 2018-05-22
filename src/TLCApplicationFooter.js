import React from "react";
import PropTypes from "prop-types";

const formatDate = (date) => (
  new Date(date).toISOString().slice(0,10)
);

const TLCApplicationFooter = ({appDate, lastUpdate}) => (
  <div className="tlc-application-footer">
    <span className="tlc-application-footer--applied">
      Applied on {formatDate(appDate)}
    </span>
    <span className="tlc-application-footer--updated">
      Updated on {formatDate(lastUpdate)}
    </span>
  </div>
);

TLCApplicationFooter.propTypes = {
  appDate: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired
};

export default TLCApplicationFooter;
