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
    getColors,
    addNewColor,
    updateColor,
    deleteColor
} from "store/colors/actions"
import _, { isEmpty, size, map } from "lodash"
import DeleteDialog from '../../components/Common/DeleteDialog'
import ModalColorForm from "./modal-color-form";
import { colorService } from "services";

const ColorsList = props => {

    const { colors, onGetColors } = props
    const [colorToEdit, setColorToEdit] = useState([])
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


    const colorListColumns = [
        {
            text: "id",
            dataField: "_id",
            hidden: true,
            formatter: (cellContent, color) => (
                <>
                    {color.id}
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
            formatter: (cellContent, color) => (
                <div className="d-flex gap-3">
                    <Link className="text-success" to="#"><i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => handleColorClick(color)}></i></Link>
                    <Link className="text-danger" to="#"><i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => openDeleteDialog(color)}></i></Link>
                </div>
            ),
        },
    ]

    useEffect(() => {
        if (colors && !colors.length) {
            onGetColors(window.location.search);
            setIsEdit(false)
        }
    }, [onGetColors, colors.from, window.location.search]);



    const toggle = () => {
        setModal(!modal)
    }

    const handleColorClick = arg => {
        setShowError(false)
        const color = arg
        setColorToEdit({
            _id: color._id,
            value: color.value,
            description: color.description,
            chance: color.chance
        })

        setIsEdit(true)
        setOpenFormModal(true)
        setModal(true)
    }

    const openDeleteDialog = (color) => {
        toggleDeleteModal()
        setScopedItem({
            _id: color._id,
            name: color.value
        })
    }

    const handleDeleteColor = () => {
        setActionsLoading(true)
        const { onDeleteColor } = props
        onDeleteColor(scopedItem)
    }


    const handleValidColorSubmit = (e, values) => {
        setActionsLoading(true)
        setShowError(true)
        const { onAddNewColor, onUpdateColor } = props
        if (isEdit) {
            console.log(values);
            const updateColor = {
                _id: values._id,
                value: values.value,
                description: values.description,
                chance: values.chance
            }
            onUpdateColor(updateColor)
        } else {
            const newColor = {
                value: values["value"],
                description: values["description"],
                chance: values["chance"]
            }
            onAddNewColor(newColor)
        }
    }

    useEffect(() => {
        if(openFormModal){
            if(_.isEmpty(props.error)){
                setOpenFormModal(false)
                setIsEdit(false)
                setColorToEdit({})
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
    }, [colors, props.error])

    const handleColorClicks = () => {
        setOpenFormModal(true)
        setIsEdit(false)
        setColorToEdit({})
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
                handleDelete={handleDeleteColor}
                actionsLoading={actionsLoading}
            />
            <ModalColorForm 
                isOpen={openFormModal}
                isEdit={false}
                toggle={()=>setOpenFormModal(false)}
                handleValidColorSubmit={handleValidColorSubmit}
                colorToEdit={colorToEdit}
                isEdit={isEdit}
                error={props.error}
                showError={showError}
                actionsLoading={actionsLoading}
                setActionsLoading={setActionsLoading}
            />
            <div className="page-content">
                <MetaTags>
                    <title>Color List | Skote - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Contacts" breadcrumbItem="Color List" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <PaginationProvider
                                      pagination={paginationFactory(pageOptions)}
                                      keyField='_id'
                                      columns={+colorListColumns}
                                      data={colors}
                                    >
                                        {({ paginationProps, paginationTableProps }) => (
                                            <ToolkitProvider
                                              keyField="_id"
                                              data={colors}
                                              columns={colorListColumns}
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
                                                                        onClick={handleColorClicks}
                                                                    >
                                                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                                                        Create New Color
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

ColorsList.propTypes = {
    colors: PropTypes.array,
    onGetColors: PropTypes.func,
    onAddNewColor: PropTypes.func,
    onDeleteColor: PropTypes.func,
    onUpdateColor: PropTypes.func
}

const mapStateToProps = ({ colors }) => ({
    colors: colors.colors,
    totalSize: colors.totalSize,
    from: colors.from,
    error: colors.error
})

const mapDispatchToProps = dispatch => ({
    onGetColors: (query) => dispatch(getColors(query)),
    onAddNewColor: color => dispatch(addNewColor(color)),
    onUpdateColor: color => dispatch(updateColor(color)),
    onDeleteColor: color => dispatch(deleteColor(color)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ColorsList))
