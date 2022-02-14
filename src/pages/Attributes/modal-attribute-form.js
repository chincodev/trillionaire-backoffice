import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert } from "reactstrap"
import AttributeForm from "./attribute-form"


const ModalAttributeForm = (props) => {


    


    return (
        

        <Modal
            isOpen={props.isOpen} 
            toggle={props.toggle}
            
        >
                <ModalHeader toggle={props.toggle} tag="h4">
                    {!!props.isEdit ? `Edit ${props.selectedAttributeName}` : `Add ${props.selectedAttributeName}`}
                </ModalHeader>
                <ModalBody>
                {(!_.isEmpty(props.error) && props.showError) ? (
                                                                                            <Alert attribute="danger">{props.error.response.data.message}</Alert>
                                                                                        ) : null}
                    <AttributeForm 
                        handleValidAttributeSubmit={props.handleValidAttributeSubmit}
                        isEdit={props.isEdit}
                        attributeToEdit={props.attributeToEdit}
                        actionsLoading={props.actionsLoading}
                        setActionsLoading={props.setActionsLoading}
                        selectedAttributeName={props.selectedAttributeName}
                        selectedAttributeId={props.selectedAttributeId}
                    />

                    {/* <AvForm
                        onValidSubmit={
                            handleValidAttributeSubmit
                        }
                        autoComplete="off"
                    >
                    <Row form>
                        <Col xs={12}>
                            {(!_.isEmpty(props.error) && showError) ? (
                                <Alert attribute="danger">{props.error.response.data.message}</Alert>
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
                                    value={attributeList.name || ""}
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
                                    value={attributeList.rate || ""}
                                />
                            </div>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="btn btn-success save-attribute"
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

export default ModalAttributeForm