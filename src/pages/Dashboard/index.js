import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"
import mergeImages from 'merge-images';
//import Charts
import StackedColumnChart from "./StackedColumnChart"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { SingleSelect } from 'components/Common/SingleSelect';
import { attributeService, avatarService, colorService, hair_coolorService, trait_typeService } from 'services';

const Dashboard = props => {
  const [modal, setmodal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ]
  const email = [
    { title: "Week", linkto: "#", isActive: false },
    { title: "Month", linkto: "#", isActive: false },
    { title: "Year", linkto: "#", isActive: true },
  ]

    const [ avatar, setAvatar ] = useState({
        color:null,
        hair_color:null,
        attributes: [],
        id: null,
    })

    const [ traitTypes, setTraitTypes ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)
    const getTraitTypes = async () => {
      try {
        let response = await trait_typeService.list()
        response.totalData = response.totalData.sort((a, b) => a.index > b.index ? 1 : -1);
        setTraitTypes(response.totalData)
        setLoaded(true)
      } catch(er) {
        console.log(er)
      }
    } 

    useEffect(() => {
      getTraitTypes()
    }, [])
    

    const [ parts, setParts ] = useState([])

    const [ actionsLoading, setActionsLoading ] = useState(null)

    const generate = async (n) => {

        try {
            setActionsLoading(true)
            let response = await avatarService.find(n)
            setAvatar([...avatar, response]);
            setActionsLoading(false)
        } catch (er) {

            console.log(er);

        }

    }

    const save = async () => {
      setActionsLoading(true)
      try {
        let payload = Object.assign({}, avatar)
        if(!payload.hair_color){
          throw new Error('You must select a hair color')
        }
        if(!payload.color){
          throw new Error('You must select a color')
        }
        if(payload.attributes.length < 5){
          throw new Error('You must add more attributes to the avatar')
        }
        if(!payload.id || payload.id < 0 || payload.id > 9999){
          throw new Error('Wrong ID')
        }
        payload.color = payload.color._id
        payload.hair_color = payload.hair_color._id
        payload.attributes = payload.attributes.map(x => {
          return x._id
        })
        await avatarService.create(payload)
        setActionsLoading(false)
      } catch (er) {
        alert(er.message)
        setActionsLoading(false)
      }
    }

    const buildImage = async () => {

      let parts = []
      let _color = avatar.color
      let _hair_color = avatar.hair_color
      avatar.attributes = avatar.attributes.sort((a, b) => a.trait_type.index > b.trait_type.index ? 1 : -1);
      avatar.attributes.map(x => {
        
            if(x.trait_type.hasColor){
              parts.push(x.images.find(z => z.color === _color._id)['url'])
            } else if(x.trait_type.hasHairColor){
              parts.push(x.images.find(z => z.hair_color === _hair_color._id)['url'])
            } else {
              parts.push(x.images[0]['url'])
            }
          
       
      })
      setParts(parts)
    }

    useEffect(() => {
      if(avatar.color && avatar.hair_color && avatar.attributes.length > 0){
        buildImage(avatar)
      } else if(avatar.attributes.length > 0 && (!avatar.color && !avatar.hair_color)) {
        
      }
    }, [avatar])
    

    
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="4">
              {/* <WelcomeComp /> */}
              <MonthlyEarning loaded={loaded} setmodal={setmodal} />
            </Col>
            {/* <Col xl="8">
              <Row>
                
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <Media>
                          <Media body>
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </Media>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Email Sent</h4>
                    <div className="ms-auto">
                      <ul className="nav nav-pills">
                        {email.map((mail, key) => (
                          <li className="nav-item" key={"_li_" + key}>
                            <Link
                              className={
                                mail.isActive ? "nav-link active" : "nav-link"
                              }
                              to={mail.linkto}
                            >
                              {mail.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                
                  <StackedColumnChart />

                </CardBody>
              </Card>
            </Col> */}
          </Row>

          {/* <Row>
            <Col xl="4">
              <SocialSource />
            </Col>
            <Col xl="4">
              <ActivityComp />
            </Col>

            <Col xl="4">
              <TopCities />
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              
            </Col>
          </Row> */}
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal)
        }}
      >
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <ModalHeader
              toggle={() => {
                setSubscribemodal(!subscribemodal)
              }}
            >
            </ModalHeader>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <div className="avatar-md mx-auto mb-4">
                {/* style={{ backgroundColor:"#eff2f7" }}  */}
                <div className="avatar-title bg-light  rounded-circle text-primary h1">
                  <i className="mdi mdi-email-open"></i>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <h4 className="text-primary">Subscribe !</h4>
                  <p className="text-muted font-size-14 mb-4">Subscribe our newletter and get notification to stay update.</p>

                  <div className="input-group rounded" style={{ backgroundColor: "#eff2f7" }}>
                    <Input type="email" className="form-control bg-transparent border-0" placeholder="Enter Email address" />
                    <Button color="primary" type="button" id="button-addon2">
                      <i className="bx bxs-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
              {console.log(traitTypes)}
      {
        loaded && <Modal
        isOpen={modal}
        size='lg'
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal)
        }}
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => {
              setmodal(!modal)
            }}
          >
            Create avatar
          </ModalHeader>
          <ModalBody>
           
            {/* <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p> */}
            <div className="d-flex">
                <div style={{position:'relative', width:'60%'}}>
                  {
                    parts && parts.length > 0 && parts.map(x =><img id='avatar' src={x} style={{width:'100%', paddingRight:'20px', paddingTop:'10px', position:'absolute'}}></img>)
                  }
                  
                </div >
                {console.log(parts)}
                <div style={{width:'40%'}}>
                <div style={{marginTop:'8px'}}>
                        <label style={{marginBottom: '0.2rem'}}>COLOR</label>
                        <SingleSelect
                            value={avatar.color ? avatar.color : null}
                            onChange={(name, data)=>{
                              let newAvatar = Object.assign({}, avatar)
                              newAvatar.color = data
                              setAvatar(newAvatar)
                            }}
                            isMulti={false}
                            onBlur={()=>{}}
                            error={''}
                            endPoint={colorService.find}
                            touched={()=>{}}
                            name={"color"}
                            // title={"Forbidden attributes"}
                            searchField={"value"}
                            sortField={'value'}
                            extraFilter={false}
                            extraQuery={null}
                            placeholder={'Search color'}
                        >

                        </SingleSelect>
                    </div>
                    
                    <div style={{marginTop:'8px'}}>
                        <label style={{marginBottom: '0.2rem'}}>HAIR COLOR</label>
                        <SingleSelect
                            value={avatar.hair_color ? avatar.hair_color : null}
                            onChange={(name, data)=>{
                              let newAvatar = Object.assign({}, avatar)
                              newAvatar.hair_color = data
                              setAvatar(newAvatar)
                            }}
                            isMulti={false}
                            onBlur={()=>{}}
                            error={''}
                            endPoint={hair_coolorService.find}
                            touched={()=>{}}
                            name={"hair_color"}
                            // title={"Forbidden attributes"}
                            searchField={"value"}
                            sortField={'value'}
                            extraFilter={false}
                            extraQuery={null}
                            placeholder={'Search hair color'}
                        >
                            
                        </SingleSelect>
                    </div>
                    <br/>
                    <hr />
                    {
                      traitTypes.map(x => <div>

                        <div style={{marginTop:'8px'}}>
                            
                            <label style={{marginBottom: '0.2rem'}}>{x.name}</label>
                            <SingleSelect
                                value={avatar.attributes.find(y => y.trait_type._id === x._id) ? avatar.attributes.find(y => y.trait_type._id === x._id) : null}
                                onChange={(e, data) => {
                                  let newAvatar = Object.assign({}, avatar)
                                  if(newAvatar.attributes.find(y => y.trait_type._id === x._id)){
                                    newAvatar.attributes = newAvatar.attributes.filter(y => y.trait_type._id != x._id)
                                  }
                                  newAvatar.attributes = newAvatar.attributes.concat(data)
                                  setAvatar(newAvatar)
                                }}
                                isMulti={false}
                                onBlur={()=>{}}
                                error={''}
                                endPoint={attributeService.find}
                                touched={()=>{}}
                                name={"color"}
                                // title={"Forbidden attributes"}
                                searchField={"value"}
                                sortField={'value'}
                                extraFilter={false}
                                extraQuery={`&filter_field[]=trait_type&filter_type[]=eq&filter_value[]=${x._id}`}
                                placeholder={'Search '+x.name}
                            >
                            </SingleSelect>
                        </div>
                      </div>)
                    }
                    <div style={{marginTop:'8px'}}>
                    <label style={{marginBottom: '0.2rem'}}>ID</label>
                    <input className='form-control' value={avatar.id} onChange={(e)=>{
                      let _avatar = Object.assign({}, avatar)
                      _avatar.id = e.target.value
                      setAvatar(_avatar)
                    }} type='number' min='1' max='9999'></input>

                    </div>
                    
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              Close
            </Button>
            <Button
              type="button"
              color="dark"
              onClick={() => {
                setAvatar({
                  color:null,
                  hair_color:null,
                  attributes: [],
                  id: null,
                })
                setParts([])
              }}
            >
              Reset
            </Button> 
            <Button
              disabled={actionsLoading}
              type="button"
              color="primary"
              onClick={() => {
                save()
              }}
            >
              {
                actionsLoading ? 'Loading...' : 'Save'
              }
              
            </Button>
          </ModalFooter>
        </div>
      </Modal>
      }
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(Dashboard)

