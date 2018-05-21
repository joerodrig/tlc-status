import React from "react";

const formatDate = (date) => (
  new Date(date).toISOString().slice(0,10)
);

const TLCApplicationFooter = ({app_date, lastupdate}) => (
  <div className="tlc-application-footer">
    <span className="tlc-application-footer--applied">
      Applied on {formatDate(app_date)}
    </span>
    <span className="tlc-application-footer--updated">
      Updated on {formatDate(lastupdate)}
    </span>
  </div>
);

export default TLCApplicationFooter;
