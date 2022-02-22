import React from "react"

import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Link } from "react-router-dom"

import ApexRadial from "./ApexRadial"
import _ from "lodash"

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
                    <p className="text-muted">Total avatars</p>
                    <h3>{props.avatarsInfo.total}</h3>
                    <div className="mt-4">
                      <Button
                        color="primary"
                        to=""
                        className="btn btn-primary"
                        onClick={()=>{
                          props.setSubscribemodal(true)
                          {
                            !_.isEmpty(props.autogeneratedAvatar) ? '' : props.autogenerate()
                          }
                        }}
                      >
                        Generate
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
                      
                    </div>
                    <Button
                        to=""
                        className="btn btn-success-outline mt-2"
                        style={{color:'blue'}}
                        onClick={()=>props.setAvatarShowModal(true)}
                      >
                        View All <i className="mdi mdi-arrow-right ms-1"></i>
                      </Button>
                  </Col>
                  <Col sm="6">
                    <div className="mt-4 mt-sm-0">
                      <ApexRadial number={props.avatarsInfo.total} total={9999} />
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
