import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert } from "reactstrap"
import Hair_coolorForm from "./hair_coolor-form"


const ModalHair_coolorForm = (props) => {


    


    return (
        

        <Modal
            isOpen={props.isOpen} 
            toggle={props.toggle}
            
        >
                <ModalHeader toggle={props.toggle} tag="h4">
                    {!!props.isEdit ? "Edit Hair_coolor" : "Add Hair_coolor"}
                </ModalHeader>
                <ModalBody>
                {(!_.isEmpty(props.error) && props.showError) ? (
                                                                                            <Alert hair_coolor="danger">{props.error.response.data.message}</Alert>
                                                                                        ) : null}
                    <Hair_coolorForm 
                        handleValidHair_coolorSubmit={props.handleValidHair_coolorSubmit}
                        isEdit={props.isEdit}
                        hair_coolorToEdit={props.hair_coolorToEdit}
                        actionsLoading={props.actionsLoading}
                        setActionsLoading={props.setActionsLoading}
                     
                    />

                    {/* <AvForm
                        onValidSubmit={
                            handleValidHair_coolorSubmit
                        }
                        autoComplete="off"
                    >
                    <Row form>
                        <Col xs={12}>
                            {(!_.isEmpty(props.error) && showError) ? (
                                <Alert hair_coolor="danger">{props.error.response.data.message}</Alert>
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
                                    value={hair_coolorList.name || ""}
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
                                    value={hair_coolorList.rate || ""}
                                />
                            </div>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="btn btn-success save-hair_coolor"
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

export default ModalHair_coolorForm