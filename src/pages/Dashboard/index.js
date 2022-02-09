import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import queryString from 'query-string'
import {
  Container,
} from "reactstrap"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"


// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator';

import ToolkitProvider from 'react-bootstrap-table2-toolkit';

//Import Breadcrumb
import "./datatables.scss"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import _ from 'lodash';
import moment from 'moment';
import { productService, refreshService } from 'services';


const Dashboard = props => {

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Dashboard | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs
                        title={props.t("Dashboards")}
                        breadcrumbItem={props.t("Dashboard")}
                    />
                    <React.Fragment>
                        <Card>
                            <CardBody>
                                <div className='d-flex align-items-between w-100'>
                                    <div>
                                        <CardTitle className="h4">Rate History</CardTitle>
                                   
                                    </div>
                                    
                                </div>
                            </CardBody>
                        </Card> 
                            
                    </React.Fragment>
                </Container>
            </div>
        </React.Fragment>
    )
}

Dashboard.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(Dashboard)
