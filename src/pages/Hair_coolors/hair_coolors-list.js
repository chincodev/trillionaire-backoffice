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
    getHair_coolors,
    addNewHair_coolor,
    updateHair_coolor,
    deleteHair_coolor
} from "store/hair_coolors/actions"
import _, { isEmpty, size, map } from "lodash"
import DeleteDialog from '../../components/Common/DeleteDialog'
import ModalHair_coolorForm from "./modal-hair_coolor-form";
import { hair_coolorService } from "services";

const Hair_coolorsList = props => {
    console.log(props)

    const { hair_coolors, onGetHair_coolors } = props
    const [hair_coolorToEdit, setHair_coolorToEdit] = useState([])
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


    const hair_coolorListColumns = [
        {
            text: "id",
            dataField: "_id",
            hidden: true,
            formatter: (cellContent, hair_coolor) => (
                <>
                    {hair_coolor.id}
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
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Action",
            formatter: (cellContent, hair_coolor) => (
                <div className="d-flex gap-3">
                    <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => handleHair_coolorClick(hair_coolor)}></i></Link>
                    <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => openDeleteDialog(hair_coolor)}></i></Link>
                </div>
            ),
        },
    ]

    useEffect(() => {
        if (hair_coolors && !hair_coolors.length) {
            onGetHair_coolors(window.location.search);
            setIsEdit(false)
        }
    }, [onGetHair_coolors, hair_coolors.from, window.location.search]);



    const toggle = () => {
        setModal(!modal)
    }

    const handleHair_coolorClick = arg => {
        setShowError(false)
        const hair_coolor = arg
        setHair_coolorToEdit({
            _id: hair_coolor._id,
            value: hair_coolor.value,
            description: hair_coolor.description,
            chance: hair_coolor.chance
        })

        setIsEdit(true)
        setOpenFormModal(true)
        setModal(true)
    }

    const openDeleteDialog = (hair_coolor) => {
        toggleDeleteModal()
        setScopedItem({
            _id: hair_coolor._id,
            name: hair_coolor.value
        })
    }

    const handleDeleteHair_coolor = () => {
        setActionsLoading(true)
        const { onDeleteHair_coolor } = props
        onDeleteHair_coolor(scopedItem)
    }


    const handleValidHair_coolorSubmit = (e, values) => {
        setActionsLoading(true)
        setShowError(true)
        const { onAddNewHair_coolor, onUpdateHair_coolor } = props
        if (isEdit) {
            console.log(values);
            const updateHair_coolor = {
                _id: values._id,
                value: values.value,
                description: values.description,
                chance: values.chance
            }
            onUpdateHair_coolor(updateHair_coolor)
        } else {
            const newHair_coolor = {
                value: values["value"],
                description: values["description"],
                chance: values["chance"]
            }
            onAddNewHair_coolor(newHair_coolor)
        }
    }

    useEffect(() => {
        if(openFormModal){
            if(_.isEmpty(props.error)){
                setOpenFormModal(false)
                setIsEdit(false)
                setHair_coolorToEdit({})
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
    }, [hair_coolors, props.error])

    const handleHair_coolorClicks = () => {
        setOpenFormModal(true)
        setIsEdit(false)
        setHair_coolorToEdit({})
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
                handleDelete={handleDeleteHair_coolor}
                actionsLoading={actionsLoading}
            />
            <ModalHair_coolorForm 
                isOpen={openFormModal}
                isEdit={false}
                toggle={()=>setOpenFormModal(false)}
                handleValidHair_coolorSubmit={handleValidHair_coolorSubmit}
                hair_coolorToEdit={hair_coolorToEdit}
                isEdit={isEdit}
                error={props.error}
                showError={showError}
                actionsLoading={actionsLoading}
                setActionsLoading={setActionsLoading}
            />
            <div className="page-content">
                <MetaTags>
                    <title>Hair_coolor List | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Contacts" breadcrumbItem="Hair_coolor List" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                      pagination={paginationFactory(pageOptions)}
                                      keyField='_id'
                                      columns={+hair_coolorListColumns}
                                      data={hair_coolors}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                              keyField="_id"
                                              data={hair_coolors}
                                              columns={hair_coolorListColumns}
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
                                                                        onClick={handleHair_coolorClicks}
                                                                    >
                                                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                                                        Create New Hair coolor
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

Hair_coolorsList.propTypes = {
    hair_coolors: PropTypes.array,
    onGetHair_coolors: PropTypes.func,
    onAddNewHair_coolor: PropTypes.func,
    onDeleteHair_coolor: PropTypes.func,
    onUpdateHair_coolor: PropTypes.func
}

const mapStateToProps = ({ hair_coolors }) => ({
    hair_coolors: hair_coolors.hair_coolors,
    totalSize: hair_coolors.totalSize,
    from: hair_coolors.from,
    error: hair_coolors.error
})

const mapDispatchToProps = dispatch => ({
    onGetHair_coolors: (query) => dispatch(getHair_coolors(query)),
    onAddNewHair_coolor: hair_coolor => dispatch(addNewHair_coolor(hair_coolor)),
    onUpdateHair_coolor: hair_coolor => dispatch(updateHair_coolor(hair_coolor)),
    onDeleteHair_coolor: hair_coolor => dispatch(deleteHair_coolor(hair_coolor)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Hair_coolorsList))
