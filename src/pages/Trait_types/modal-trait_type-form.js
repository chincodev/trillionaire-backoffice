import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert } from "reactstrap"
import Trait_typeForm from "./trait_type-form"


const ModalTrait_typeForm = (props) => {


    


    return (
        

        <Modal
            isOpen={props.isOpen} 
            toggle={props.toggle}
            
        >
                <ModalHeader toggle={props.toggle} tag="h4">
                    {!!props.isEdit ? "Edit Trait_type" : "Add Trait_type"}
                </ModalHeader>
                <ModalBody>
                {(!_.isEmpty(props.error) && props.showError) ? (
                                                                                            <Alert trait_type="danger">{props.error.response.data.message}</Alert>
                                                                                        ) : null}
                    <Trait_typeForm 
                        handleValidTrait_typeSubmit={props.handleValidTrait_typeSubmit}
                        isEdit={props.isEdit}
                        trait_typeToEdit={props.trait_typeToEdit}
                        actionsLoading={props.actionsLoading}
                        setActionsLoading={props.setActionsLoading}
                     
                    />

                    {/* <AvForm
                        onValidSubmit={
                            handleValidTrait_typeSubmit
                        }
                        autoComplete="off"
                    >
                    <Row form>
                        <Col xs={12}>
                            {(!_.isEmpty(props.error) && showError) ? (
                                <Alert trait_type="danger">{props.error.response.data.message}</Alert>
                            ) : null}
                            <div className="mb-3">
                                <AvField
                                    name="name"
                                    label="Name"
                                    type="text"
                                    autoComplete="off"
                                    errorMessage="Invalid name"
                                    validate={{
                                      required: { value: true },
                                    }}
                                    value={trait_typeList.name || ""}
                                />
                            </div>
        
                            <div className="mb-3">
                                <AvField
                                    name="rate"
                                    label="Rate"
                                    type="number"
                                    errorMessage="Invalid secret"
                                    validate={{
                                        required: { value: true },
                                    }}
                                    value={trait_typeList.rate || ""}
                                />
                            </div>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="btn btn-success save-trait_type"
                                    disabled={actionsLoading}
                                >
                                    {
                                        actionsLoading 
                                            ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            : 'Save' 
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>
                </AvForm> */}
            </ModalBody>
        </Modal>
    )
}

export default ModalTrait_typeForm