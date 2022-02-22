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
import Swal from "sweetalert2";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import { SingleSelect } from 'components/Common/SingleSelect';
import { attributeService, avatarService, colorService, hair_coolorService, trait_typeService } from 'services';
import _ from 'lodash';
import AvatarShowModal from './AvatarShowModal';

const Dashboard = props => {
  const [modal, setmodal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)
  const [avatarShowModal, setAvatarShowModal] = useState(false)

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
        id: 0,
    })

    const [ avatarsInfo, setAvatarsInfo ] = useState({})

    const [ traitTypes, setTraitTypes ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)
    const getTraitTypes = async () => {
      try {
        let response = await trait_typeService.list()
        let response2 = await avatarService.list()
        setAvatarsInfo(response2)
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
        let res = await avatarService.create(payload)
        setActionsLoading(false)
        setAvatar({
          color:null,
          hair_color:null,
          attributes: [],
          id: null,
        })
        setParts([])
        Swal.fire({
          title: 'Avatar Save.',
          text: 'Avatar save with the id '+res.record.id,
          imageUrl: res.record.image,
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: res.record.name,
        })
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

    const [ autogeneratedAvatar, setAutogeneratedAvatar ] = useState(null)

    const autogenerate = async () => {

      try {
        setActionsLoading(true)
        let res = await avatarService.generateOne()
        setAutogeneratedAvatar(res)
        setActionsLoading(false)
      } catch (er) {
        console.log(er)
      }

    }

    const saveAutoGenerated = async () => {
      setActionsLoading(true)
      let _autogeneratedAvatar = Object.assign({}, autogeneratedAvatar)
          _autogeneratedAvatar.color = _autogeneratedAvatar.color._id
          _autogeneratedAvatar.hair_color = _autogeneratedAvatar.hair_color._id
          _autogeneratedAvatar.attributes = _autogeneratedAvatar.attributes.map(x => x._id)

      Swal.fire({
        title: 'Set the ID of the avatar',
        input: 'number',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (id) => {
          _autogeneratedAvatar.id = id
          return avatarService.saveGenerated(_autogeneratedAvatar)
            .then(response => {
              console.log('asd')
              return response
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        // allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.record.name}`,
            imageUrl: result.value.record.image
          })
          setAvatar({
            color:null,
            hair_color:null,
            attributes: [],
            id: 0,
          })
          setParts([])
          setSubscribemodal(false)
        }
      })
      
    }
    
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
              <MonthlyEarning setAvatarShowModal={setAvatarShowModal} avatarsInfo={avatarsInfo} autogenerate={autogenerate} autogeneratedAvatar={autogeneratedAvatar} setSubscribemodal={setSubscribemodal} loaded={loaded} setmodal={setmodal} />
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

      {
        avatarShowModal && <AvatarShowModal 
          avatarShowModal={avatarShowModal}
          setAvatarShowModal={setAvatarShowModal}
        />
      }

      {/* subscribe ModalHeader */}
      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        size='lg'
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal)
        }}
      >
        <div className="modal-content">
          
           
              
            <ModalHeader
              toggle={() => {
                setSubscribemodal(!subscribemodal)
              }}
            >
              Generate Avatar
            </ModalHeader>
       
            <ModalBody>
              {
                 actionsLoading ? 'Generating avatar... Please wait...' : (!_.isEmpty(autogeneratedAvatar)) ? (
                  <>
                     <div className="d-flex">
                <div style={{width:'60%'}}>
                 <img id='avatar' src={autogeneratedAvatar.image} style={{width:'100%', paddingRight:'20px', paddingTop:'10px'}}></img>
                  
                  
                </div >
                <div style={{width:'40%'}}>
                  <div>
                    <p><strong>Color: </strong>{autogeneratedAvatar.color.value}</p>
                  </div>
                  <div>
                    <p><strong>Hair color: </strong>{autogeneratedAvatar.hair_color.value}</p>
                  </div>
                  {
                    autogeneratedAvatar.attributes.map(x => <div>
                      <p><strong>{x.trait_type_name}: </strong>{x.value}</p>
                    </div>)
                  }
                  
                  </div>
                  </div>
                  </>) : ''
              }
         
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setSubscribemodal(!subscribemodal)
              }}
            >
              Close
            </Button>
            <Button
              type="button"
              color="dark"
              onClick={() => {
                autogenerate()
              }}
            >
              {
                actionsLoading ? 'Loading...' : 'Generate'
              }
            </Button> 
            <Button
              disabled={actionsLoading}
              type="button"
              color="primary"
              onClick={() => {
                saveAutoGenerated()
              }}
            >
              {
                actionsLoading ? 'Loading...' : 'Save'
              }
              
            </Button>
          </ModalFooter>
            
          
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
                  id: 0,
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

