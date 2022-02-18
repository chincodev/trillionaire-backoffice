import React from "react"

import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Link } from "react-router-dom"

import ApexRadial from "./ApexRadial"

const MonthlyEarning = (props) => {
  
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          {
            (!props.loaded) ? (
              'Loading...'
            ) : (
              <>
                <CardTitle className="mb-4">Avatars</CardTitle>
                <Row>
                  <Col sm="6">
                    <p className="text-muted">Total avatars generated</p>
                    <h3>35</h3>
                    <div className="mt-4">
                      <Button
                        color="primary"
                        to=""
                        className="btn btn-primary"
                      >
                        Autogenerate
                      </Button>
                      &nbsp;
                      <Button
                        color="primary"
                        to=""
                        className="btn btn-primary"
                        onClick={()=>props.setmodal(true)}
                      >
                        Create
                      </Button>
                      <Link
                        to=""
                        className="btn btn-success-outline mt-2"
                        style={{color:'blue'}}
                      >
                        View All <i className="mdi mdi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="mt-4 mt-sm-0">
                      <ApexRadial />
                    </div>
                  </Col>
                </Row>
              </>
            )
          }
          
          {/* <p className="text-muted mb-0">
            We craft digital, graphic and dimensional thinking.
          </p> */}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarning
