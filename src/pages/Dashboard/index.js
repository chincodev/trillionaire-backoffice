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
import { avatarService, productService, refreshService } from 'services';


const Dashboard = props => {

    const [ avatar, setAvatar ] = useState(null)
    const [ actionsLoading, setActionsLoading ] = useState(null)

    const generate = async () => {

        try {
            setActionsLoading(true)
            let response = await avatarService.find('1000')
            setAvatar(response);
            setActionsLoading(false)
        } catch (er) {

            console.log(er);

        }

    }

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
                                        <CardTitle className="h4">Trillionaire club</CardTitle>
                                   
                                    </div>
                                    
                                </div>
                                <div className='d-flex justify-content-center flex-column align-items-center'>
                                    <img style={{width:'300px'}} src={avatar ? avatar.url : ''}></img>
                                    <button onClick={()=>generate()} disabled={actionsLoading} className='btn btn-primary'>{actionsLoading ? 'Please wait...' : 'Generate NFT'}</button>
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
