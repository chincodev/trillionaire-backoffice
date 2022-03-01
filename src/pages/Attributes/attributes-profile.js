import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux"
import { withRouter, Link, useHistory } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert, Badge } from "reactstrap"
import placeholderImage from "../../assets/images/placeholder.jpg"
import
paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { AvForm, AvField } from "availity-reactstrap-validation"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

import showNotification from '../../components/Common/Notifications'
import Breadcrumbs from "components/Common/Breadcrumb"

import {
    getAttributes,
    addNewAttribute,
    updateAttribute,
    deleteAttribute
} from "store/attributes/actions"
import _, { isEmpty, size, map } from "lodash"
import DeleteDialog from '../../components/Common/DeleteDialog'
import ModalAttributeForm from "./modal-attribute-form";
import { attributeService, colorService, hair_coolorService, trait_typeService } from "services";
import ModalAttributeImages from "./modal-attribute-images";
import ModalAttributeImage from "./modal-attribute-image";

const AttributeProfile = props => {

    const [actionsLoading, setActionsLoading] = useState(false)
    const [ imagesModalIsOpen, setImagesModalIsOpen ] = useState(false)
    const [ scopedColor, setScopedColor ] = useState(false)
    const [ scopedHairColor, setScopedHairColor ] = useState(false)
    const [ scopedDefault, setScopedDefault ] = useState(false)
    const [ item, setItem ] = useState({})
    const [ colors, setColors ] = useState([])
    const [ hairColors, setHairColors ] = useState([])
    const history = useHistory()
    

    const getData = async () => {
        try {
            setActionsLoading(true)
            const _item = await attributeService.find(props.match.params.attribute_id)
            setItem(_item)
            const _colors = await colorService.list()
            setColors(_colors.totalData)
            const _hairColors = await hair_coolorService.list()
            setHairColors(_hairColors.totalData)
            setActionsLoading(false)
         
        } catch (er) {
            setActionsLoading(false)
            console.log(er)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <React.Fragment>
            
            <div className="page-content">
                <MetaTags>
                    <title>Trait types List | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    {
                        actionsLoading || _.isEmpty(item)  ? (
                            'Loading...'
                        ) : (
                            <>
                                <Breadcrumbs title={'ATTRIBUTES'} subtitle={item.trait_type.name} breadcrumbItem={item.value} />
                                {console.log(item)}
                                {
                                    imagesModalIsOpen && <ModalAttributeImage
                                        isOpen={imagesModalIsOpen}
                                        toggle={()=>setImagesModalIsOpen(false)}
                                        actionsLoading={actionsLoading}
                                        setActionsLoading={setActionsLoading}
                                        item={item}
                                        setItem={setItem}
                                        getData={getData}
                                        scopedHairColor={scopedHairColor}
                                        scopedColor={scopedColor}
                                    />
                                }
                                
                                <br/>
                                <Row>
                                    <Col lg="12">
                                        <Card>
                                            <CardBody>
                                                <div style={{display:'flex'}}>
                                                    <h4>{item.value}</h4>&nbsp;<div><Badge color='primary' style={{backgroundColor:'#556ee6'}}>{item.trait_type.name}</Badge></div>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span><strong>Description: </strong>{item.description}</span>
                                                    <span><strong>Chance: </strong>{item.chance} / 9999</span>
                                                </div>
                                                <hr />
                                                {
                                                    (item.trait_type.hasColor) ? (
                                                        <>
                                                            <h5>Images</h5>
                                                            {
                                                                colors.length > 0 && <div className="form-group">
                                                                    <div className="row">
                                                                        {
                                                                            colors.map((x, i) => <div style={{cursor:'pointer'}}  key={i} class="col col-3">
                                                                                <div onClick={()=>{
                                                                                    setImagesModalIsOpen(true)
                                                                                    setScopedColor(x)
                                                                                    setScopedHairColor(null)
                                                                                    setScopedDefault(null)
                                                                                }} class="mb-3 d-flex align-items-center justify-content-center flex-column" style={{border:'1px solid #cccccc', padding:'5px'}}>
                                                                                    <small><strong>{x.value}</strong></small>
                                                                                    <img 

                                                                                        src={actionsLoading ? placeholderImage : item.images.find(y => y.color === x._id) ? item.images.find(y => y.color === x._id).url+'?'+Date.now() : placeholderImage} 
                                                                                        style={{width:'100%', marginBottom:'5px'}}

                                                                                    />
                                                                                </div>
                                                                            </div>)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </>
                                                    ) : (item.trait_type.hasHairColor) ? (
                                                        <>
                                                            <h5>Images</h5>
                                                            {
                                                                hairColors.length > 0 && <div className="form-group">
                                                                    <div className="row">
                                                                        {
                                                                            hairColors.map((x, i) => <div  key={i} class="col col-3">
                                                                                <div onClick={()=>{
                                                                                    setImagesModalIsOpen(true)
                                                                                    setScopedColor(null)
                                                                                    setScopedHairColor(x)
                                                                                    setScopedDefault(null)
                                                                                }} class="mb-3 d-flex align-items-center justify-content-center flex-column" style={{border:'1px solid #cccccc', padding:'5px'}}>
                                                                                    <small><strong>{x.value}</strong></small>
                                                                                    <img 

                                                                                        src={actionsLoading ? placeholderImage : item.images.find(y => y.hair_color === x._id) ? item.images.find(y => y.hair_color === x._id).url+'?'+Date.now() : placeholderImage} 
                                                                                        style={{width:'100%', marginBottom:'5px'}}

                                                                                    />
                                                                                    <button className="btn btn-primary">Update</button>
                                                                                </div>
                                                                            </div>)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h5>Image</h5>
                                                            <div className="form-group">
                                                                <div className="row">
                                                                    <div class="col col-3">
                                                                        <div onClick={()=>{
                                                                            setImagesModalIsOpen(true)
                                                                            setScopedDefault(true)
                                                                            setScopedColor(null)
                                                                            setScopedHairColor(null)
                                                                        }} class="mb-3 d-flex align-items-center justify-content-center flex-column" style={{border:'1px solid #cccccc', padding:'5px'}}>
                                                                            <small><strong>Default</strong></small>
                                                                            <img src={item.images.length > 0 ? item.images[0]['url'] : placeholderImage}  style={{width:'100%', marginBottom:'5px'}}></img>
                                                                            <button className="btn btn-primary">Update</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                                            
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        )
                    }
                </Container>
            </div>
        </React.Fragment>
    )
}

AttributeProfile.propTypes = {
    attributes: PropTypes.array,
    onGetAttributes: PropTypes.func,
    onAddNewAttribute: PropTypes.func,
    onDeleteAttribute: PropTypes.func,
    onUpdateAttribute: PropTypes.func
}

const mapStateToProps = ({ attributes }) => ({
    attributes: attributes.attributes,
    totalSize: attributes.totalSize,
    from: attributes.from,
    error: attributes.error
})

const mapDispatchToProps = dispatch => ({
    onGetAttributes: (query) => dispatch(getAttributes(query)),
    onAddNewAttribute: attribute => dispatch(addNewAttribute(attribute)),
    onUpdateAttribute: attribute => dispatch(updateAttribute(attribute)),
    onDeleteAttribute: attribute => dispatch(deleteAttribute(attribute)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AttributeProfile))
