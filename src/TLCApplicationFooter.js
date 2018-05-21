import React from "react";

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

export default TLCApplicationFooter;
