import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
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
    getTrait_types,
    addNewTrait_type,
    updateTrait_type,
    deleteTrait_type
} from "store/trait_types/actions"
import _, { isEmpty, size, map } from "lodash"
import DeleteDialog from '../../components/Common/DeleteDialog'
import ModalTrait_typeForm from "./modal-trait_type-form";
import { trait_typeService } from "services";

const Trait_typesList = props => {

    const { trait_types, onGetTrait_types } = props
    const [trait_typeToEdit, setTrait_typeToEdit] = useState([])
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


    const trait_typeListColumns = [
        {
            text: "id",
            dataField: "_id",
            hidden: true,
            formatter: (cellContent, trait_type) => (
                <>
                    {trait_type.id}
                </>
            ),
        },
        {
            dataField: "name",
            text: "Name",
        },
        {
            dataField: "description",
            text: "Description",
        },
        {
            dataField: "index",
            text: "Index",
        },
        {
            dataField: "hasColor",
            text: "Skin color",
        },
        {
            dataField: "hasHairColor",
            text: "Hair color",
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Action",
            formatter: (cellContent, trait_type) => (
                <div className="d-flex gap-3">
                    <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => handleTrait_typeClick(trait_type)}></i></Link>
                    <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => openDeleteDialog(trait_type)}></i></Link>
                </div>
            ),
        },
    ]

    useEffect(() => {
        if (trait_types && !trait_types.length) {
            onGetTrait_types(window.location.search);
            setIsEdit(false)
        }
    }, [onGetTrait_types, trait_types.from, window.location.search]);



    const toggle = () => {
        setModal(!modal)
    }

    const handleTrait_typeClick = arg => {
        setShowError(false)
        const trait_type = arg
        setTrait_typeToEdit({
            _id: trait_type._id,
            name: trait_type.name,
            description: trait_type.description,
            index: trait_type.index,
            hasColor: trait_type.hasColor
        })

        setIsEdit(true)
        setOpenFormModal(true)
        setModal(true)
    }

    const openDeleteDialog = (trait_type) => {
        toggleDeleteModal()
        setScopedItem({
            _id: trait_type._id,
            name: trait_type.name
        })
    }

    const handleDeleteTrait_type = () => {
        setActionsLoading(true)
        const { onDeleteTrait_type } = props
        onDeleteTrait_type(scopedItem)
    }


    const handleValidTrait_typeSubmit = (e, values) => {
        setActionsLoading(true)
        setShowError(true)
        const { onAddNewTrait_type, onUpdateTrait_type } = props
        if (isEdit) {
            const updateTrait_type = {
                _id: values._id,
                name: values.name,
                description: values.description,
                index: values.index,
                hasColor: values.hasColor,
                hasHairColor: values.hasHairColor
            }
            onUpdateTrait_type(updateTrait_type)
        } else {
            const newTrait_type = {
                name: values["name"],
                description: values["description"],
                index: values["index"],
                hasColor: values["hasColor"],
                hasHairColor: values["hasHairColor"]
            }
            onAddNewTrait_type(newTrait_type)
        }
    }

    useEffect(() => {
        if(openFormModal){
            if(_.isEmpty(props.error)){
                setOpenFormModal(false)
                setIsEdit(false)
                setTrait_typeToEdit({})
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
    }, [trait_types, props.error])

    const handleTrait_typeClicks = () => {
        setOpenFormModal(true)
        setIsEdit(false)
        setTrait_typeToEdit({})
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
                handleDelete={handleDeleteTrait_type}
                actionsLoading={actionsLoading}
            />
            <ModalTrait_typeForm 
                isOpen={openFormModal}
                isEdit={false}
                toggle={()=>setOpenFormModal(false)}
                handleValidTrait_typeSubmit={handleValidTrait_typeSubmit}
                trait_typeToEdit={trait_typeToEdit}
                isEdit={isEdit}
                error={props.error}
                showError={showError}
                actionsLoading={actionsLoading}
                setActionsLoading={setActionsLoading}
            />
            <div className="page-content">
                <MetaTags>
                    <title>Trait types List | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Contacts" breadcrumbItem="Trait types List" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                      pagination={paginationFactory(pageOptions)}
                                      keyField='_id'
                                      columns={+trait_typeListColumns}
                                      data={trait_types}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                              keyField="_id"
                                              data={trait_types}
                                              columns={trait_typeListColumns}
                                              bootstrap4
                                              search
                                            >
                                                {toolkitProps => (
                                                    <React.Fragment>
                                                        <Row className="mb-2">
                                                            <Col sm="12">
                                                                <div className="text-sm-end">
                                                                    <Button
                                                                        color="primary"
                                                                        className="font-16 btn-block btn btn-primary"
                                                                        onClick={handleTrait_typeClicks}
                                                                    >
                                                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                                                        Create New Trait type
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

Trait_typesList.propTypes = {
    trait_types: PropTypes.array,
    onGetTrait_types: PropTypes.func,
    onAddNewTrait_type: PropTypes.func,
    onDeleteTrait_type: PropTypes.func,
    onUpdateTrait_type: PropTypes.func
}

const mapStateToProps = ({ trait_types }) => ({
    trait_types: trait_types.trait_types,
    totalSize: trait_types.totalSize,
    from: trait_types.from,
    error: trait_types.error
})

const mapDispatchToProps = dispatch => ({
    onGetTrait_types: (query) => dispatch(getTrait_types(query)),
    onAddNewTrait_type: trait_type => dispatch(addNewTrait_type(trait_type)),
    onUpdateTrait_type: trait_type => dispatch(updateTrait_type(trait_type)),
    onDeleteTrait_type: trait_type => dispatch(deleteTrait_type(trait_type)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Trait_typesList))
