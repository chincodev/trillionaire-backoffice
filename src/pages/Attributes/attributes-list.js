import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux"
import { withRouter, Link, useHistory } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert } from "reactstrap"
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
import { attributeService, trait_typeService } from "services";
import ModalAttributeImages from "./modal-attribute-images";

const AttributesList = props => {

    const { attributes, onGetAttributes } = props
    const [attributeToEdit, setAttributeToEdit] = useState([])
    const [modal, setModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [scopedItem, setScopedItem] = useState({})
    const [actionsLoading, setActionsLoading] = useState(false)
    const [openFormModal, setOpenFormModal] = useState(false)


    const pageOptions = {
        sizePerPage: 50,
        totalSize: props.totalSize,
        // onPageChange: onPageChange,
        custom: true,
        page: Math.ceil(props.from/50)
    }
 

    const defaultSorted = [{
        dataField: '_id', // if dataField is not match to any column you defined, it will be ignored.
        order: 'desc' // desc or asc
    }];

    const history = useHistory()

    const attributeListColumns = [
        {
            text: "id",
            dataField: "_id",
            hidden: true,
            formatter: (cellContent, attribute) => (
                <>
                    {attribute.id}
                </>
            ),
        },
        {
            dataField: "value",
            text: "Value",
        },
        {
            dataField: "description",
            text: "Description",
        },
        {
            dataField: "chance",
            text: "Chance",
            formatter: (cellContent, value) => (
                <>
                    {cellContent} / 9999
                </>
            ),
        },
        {
            text: "Trait type",
            dataField: "trait_type",
            formatter: (cellContent, value) => (
                <>
                    {cellContent.name}
                </>
            ),
        },
        {
            text: "Forbidden attributes",
            dataField: "forbidden_attributes",
            formatter: (cellContent, value) => (
                <>
                    {cellContent && cellContent.length > 0 && cellContent.map(x => x.name).join(', ')}
                </>
            ),
        },
        {
            text: "Images",
            dataField: "images",
            formatter: (cellContent, value) => (
                <>
                    {cellContent ? cellContent.length : 0}
                </>
            ),
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Action",
            formatter: (cellContent, attribute) => (
                <div className="d-flex gap-3">
                    <Link className="text-primary" to="#"><i className="mdi mdi-eye font-size-18" id="imagetooltip" onClick={() => openImagesModal(attribute)}></i></Link>
                    <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => handleAttributeClick(attribute)}></i></Link>
                    <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => openDeleteDialog(attribute)}></i></Link>
                </div>
            ),
        },
    ]

    useEffect(() => {
        
            onGetAttributes(`?filter_field[]=trait_type&filter_type[]=eq&filter_value[]=${props.match.params._id}`)
            setIsEdit(false)
        
    }, [props.match.params._id]);

    



    const toggle = () => {
        setModal(!modal)
    }

    const handleAttributeClick = arg => {
        setShowError(false)
        const attribute = arg
        setAttributeToEdit({
            _id: attribute._id,
            value: attribute.value,
            description: attribute.description,
            // image: attribute.image,
            chance: attribute.chance,
            trait_type: attribute.trait_type, 
            forbidden_attributes: attribute.forbidden_attributes
        })

        setIsEdit(true)
        setOpenFormModal(true)
        setModal(true)
    }

    const openDeleteDialog = (attribute) => {
        toggleDeleteModal()
        setScopedItem({
            _id: attribute._id,
            name: attribute.value
        })
    }

    const [ imagesModalIsOpen, setImagesModalIsOpen ] = useState(false)
    const [ scopedItemForImages, setScopedItemForImages ] = useState({})

    function toggleImagesModal() {
        setImagesModalIsOpen(!imagesModalIsOpen)
        removeBodyCss()
    }

    const openImagesModal = (attribute) => {
        toggleImagesModal()
        setScopedItemForImages(attribute)
    }

    const handleDeleteAttribute = () => {
        setActionsLoading(true)
        const { onDeleteAttribute } = props
        onDeleteAttribute(scopedItem)
    }


    const handleValidAttributeSubmit = (e, values) => {
        setActionsLoading(true)
        setShowError(true)
        const { onAddNewAttribute, onUpdateAttribute } = props
        if (isEdit) {
            const updateAttribute = {
                _id: values._id,
                value: values.value,
                description: values.description,
                // image: values.image,
                chance: values.chance,
                trait_type: values.trait_type, 
                forbidden_attributes: values.forbidden_attributes
            }
            onUpdateAttribute(updateAttribute)
        } else {
            const newAttribute = {
                value: values.value,
                description: values.description,
                // image: values.image,
                chance: values.chance,
                trait_type: values.trait_type, 
                forbidden_attributes: values.forbidden_attributes
            }
            onAddNewAttribute(newAttribute)
        }
    }

    useEffect(() => {
        if(openFormModal){
            if(_.isEmpty(props.error)){
                setOpenFormModal(false)
                setIsEdit(false)
                setAttributeToEdit({})
                showNotification({title:'Saved!', message:'Item is saved', type:'success'})
            }
        }
        if(deleteModalIsOpen){
            if(_.isEmpty(props.error)){
                toggleDeleteModal()
                showNotification({title:'Deleted!', message:'Item is gone', type:'success'})
            }
        }
        setActionsLoading(false)
    }, [attributes, props.error])

    const handleAttributeClicks = () => {
        setOpenFormModal(true)
        setIsEdit(false)
        setAttributeToEdit({})
        setShowError(false)
    }

    function toggleDeleteModal() {
        setDeleteModalIsOpen(!deleteModalIsOpen)
        removeBodyCss()
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding")
    }



    return (
        <React.Fragment>
            <DeleteDialog 
                deleteModalIsOpen={deleteModalIsOpen}
                setDeleteModalIsOpen={setDeleteModalIsOpen}
                toggleDeleteModal={toggleDeleteModal}
                scopedItem={scopedItem}
                handleDelete={handleDeleteAttribute}
                actionsLoading={actionsLoading}
            />
            <ModalAttributeForm 
                isOpen={openFormModal}
                isEdit={false}
                toggle={()=>setOpenFormModal(false)}
                handleValidAttributeSubmit={handleValidAttributeSubmit}
                attributeToEdit={attributeToEdit}
                isEdit={isEdit}
                error={props.error}
                showError={showError}
                actionsLoading={actionsLoading}
                setActionsLoading={setActionsLoading}
                selectedAttributeName={JSON.parse(sessionStorage.getItem('menu')).find(x => x._id === props.match.params._id).name}
                selectedAttributeId={props.match.params._id}
            />
            
            <ModalAttributeImages 
                isOpen={imagesModalIsOpen}
                toggle={()=>setImagesModalIsOpen(false)}
                actionsLoading={actionsLoading}
                setActionsLoading={setActionsLoading}
                item={scopedItemForImages}
            />
            <div className="page-content">
                <MetaTags>
                    <title>Trait types List | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Contacts" breadcrumbItem={JSON.parse(sessionStorage.getItem('menu')).find(x => x._id === props.match.params._id).name + ' list'} />
                    <h5>{JSON.parse(sessionStorage.getItem('menu')).find(x => x._id === props.match.params._id).totalChance+'/9999'} spots taken</h5>
                    <br/>
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                      pagination={paginationFactory(pageOptions)}
                                      keyField='_id'
                                      columns={+attributeListColumns}
                                      data={attributes}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                              keyField="_id"
                                              data={attributes}
                                              columns={attributeListColumns}
                                              bootstrap4
                                              search
                                            >
                                                {toolkitProps => (
                                                    <React.Fragment>
                                                        <Row className="mb-2">
                                                            <Col sm="12">
                                                                <div className="d-flex justify-content-between">
                                                                    <div >
                                                                       
                                                                       
                                                                        <strong><small>{props.totalSize} results found</small></strong>
                                                                    </div>
                                                                    <Button
                                                                        color="primary"
                                                                        className="font-16 btn-block btn btn-primary"
                                                                        onClick={handleAttributeClicks}
                                                                    >
                                                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                                                        Create Attribute
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xl="12">
                                                                <div className="table-responsive">
                                                                    <BootstrapTable
                                                                        {...toolkitProps.baseProps}
                                                                        {...paginationTableProps}
                                                                        defaultSorted={defaultSorted}
                                                                        classes={
                                                                            "table align-middle table-nowrap table-hover"
                                                                        }
                                                                        remote
                                                                        onTableChange={
                                                                            (e)=>''
                                                                        }
                                                                        bordered={false}
                                                                        striped={false}
                                                                        responsive
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                       
                                                    </React.Fragment>
                                                )}
                                            </ToolkitProvider>
                                        )}
                                    </PaginationProvider>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

AttributesList.propTypes = {
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
)(withRouter(AttributesList))
