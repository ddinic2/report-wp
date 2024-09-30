import * as React from "react";
import ReportFilters from "../components/report-filter/ReportFilters";
import ReportData from "../components/report-preview/ReportData";

const ReportLayout = () => {
    return (
        <>
            <div className="row">
                <div className="offset-1 col-10">
                    <ReportFilters />
                </div>
            </div>
            <div className="row">
                <div className="col-12" style={{ marginTop: "20px" }}>
                    <ReportData />
                </div>
            </div>
        </>

    )
}

export default ReportLayout