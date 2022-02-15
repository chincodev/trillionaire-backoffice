import _ from "lodash"
import { useEffect, useState } from "react"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert, Badge } from "reactstrap"
import { attributeService, colorService, hair_coolorService } from "services"
import AttributeForm from "./attribute-form"
import placeholderImage from "../../assets/images/placeholder.jpg"


const ModalAttributeImages = (props) => {

    const [ item, setItem ] = useState({})
    const [ colors, setColors ] = useState([])
    const [ hairColors, setHairColors ] = useState([])
    const [ newImages, setNewImages ] = useState([])
    const [ actionsLoading, setActionsLoading ] = useState([])
    const [ avatarPreview, setAvatarPreview ] = useState(null)

    const fetchColors = async () => {

        try {
            const response = await colorService.list()
            setColors(response.totalData)
            setActionsLoading(false)

        } catch (er) {
            console.log(er);
        }

    }

    const fetchHairColors = async () => {

        try {
            const response = await hair_coolorService.list()
            setHairColors(response.totalData)
            setActionsLoading(false)

        } catch (er) {
            console.log(er);
        }

    }

    useEffect(() => {
        setActionsLoading(true)
        if(!_.isEmpty(props.item)){
            setItem(props.item)
        }
        if(!_.isEmpty(props.item) && (props.item.trait_type.hasColor)){
            setItem(props.item)
            fetchColors()
        } else if(!_.isEmpty(props.item) && (props.item.trait_type.hasHairColor)){
            setItem(props.item)
            fetchHairColors()
        } else {
            setActionsLoading(false)
        }
    }, [props.item]);

    const uploadImage = async (props) => {
        try {
            setActionsLoading(true)
            let res = await attributeService.updateImage({_id:item._id, params:props})
            setItem(res);
            setActionsLoading(false)
        } catch (er) {
            console.log(er);
        }
    }
    

    if(_.isEmpty(item)) return ''
    return (
    
        <Modal
            isOpen={props.isOpen} 
            toggle={props.toggle}
            
        >
            {
                actionsLoading ? 'Loading...' : <>
                    <ModalHeader toggle={props.toggle} tag="h4">
                        {item.value}
                    </ModalHeader>
                    <ModalBody>
                        <Badge color='primary' style={{backgroundColor:'#556ee6'}}>{item.trait_type.name}</Badge>
                        <p>{item.description}</p>
                        {
                            item.forbidden_attributes && item.forbidden_attributes.length > 0 && <span><strong>Forbidden traits:</strong> {item.forbidden_attributes.map(x => x.name).join(', ')}</span>
                        }<br />
                        <span><strong>Chance: </strong>{item.chance} / 9999</span>
                        <hr />
                        {
                            (item.trait_type.hasColor) ? (
                                <>
                                    <h5>Images</h5>
                                    {
                                        colors.length > 0 && <div className="form-group">
                                            <div className="row">
                                                {
                                                    colors.map(x => <div class="col col-4">
                                                        <div class="input-group mb-3 d-flex align-items-center justify-content-center flex-column" style={{border:'1px solid #cccccc', padding:'5px'}}>
                                                            <small><strong>{x.value}</strong></small>
                                                            <img 
                                                                
                                                                src={actionsLoading ? placeholderImage : item.images.find(y => y.color === x._id) ? item.images.find(y => y.color === x._id).url+'?'+Date.now() : placeholderImage} 
                                                                style={{width:'100%', marginBottom:'5px'}}
                                                                
                                                            />
                                                          
                                                            <label for={`inputGroupFile_${x.value}`} class="input-group-text form-label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}>Upload</label>
                                                            <input 
                                                                id={`inputGroupFile_${x.value}`} 
                                                                type="file" 
                                                                class="form-control form-control" 
                                                                style={{display:'none'}} 
                                                                accept="image/png"
                                                                onChange={(event) => {
                                                                    // setFieldValue("image", event.currentTarget.files[0]);
                                                                    const fileReader = new FileReader();
                                                                    fileReader.readAsDataURL(event.target.files[0]);
                                                                    uploadImage({color: x._id, image: event.target.files[0]});
                                                                }}
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
                                                    hairColors.map(x => <div class="col col-4">
                                                        <div class="input-group mb-3 d-flex align-items-center justify-content-center flex-column" style={{border:'1px solid #cccccc', padding:'5px'}}>
                                                            <small><strong>{x.value}</strong></small>
                                                            <img 
                                                                
                                                                src={actionsLoading ? placeholderImage : item.images.find(y => y.hair_color === x._id) ? item.images.find(y => y.hair_color === x._id).url+'?'+Date.now() : placeholderImage} 
                                                                style={{width:'100%', marginBottom:'5px'}}
                                                                
                                                            />
                                                          
                                                            <label for={`inputGroupFile_${x.value}`} class="input-group-text form-label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}>Upload</label>
                                                            <input 
                                                                id={`inputGroupFile_${x.value}`} 
                                                                type="file" 
                                                                class="form-control form-control" 
                                                                style={{display:'none'}} 
                                                                accept="image/png"
                                                                onChange={(event) => {
                                                                    // setFieldValue("image", event.currentTarget.files[0]);
                                                                    const fileReader = new FileReader();
                                                                    fileReader.readAsDataURL(event.target.files[0]);
                                                                    uploadImage({hair_color: x._id, image: event.target.files[0]});
                                                                }}
                                                            />
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
                                            <div class="col col-4">
                                                <div class="input-group mb-3 d-flex align-items-center justify-content-center flex-column" style={{border:'1px solid #cccccc', padding:'5px'}}>
                                                    <small><strong>Default</strong></small>
                                                    <img src={item.images.length > 0 ? item.images[0]['url'] : placeholderImage}  style={{width:'100%', marginBottom:'5px'}}></img>
                                                  
                                                    <label for="inputGroupFile" class="input-group-text form-label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}>Upload</label>
                                                    <input 
                                                        id="inputGroupFile" 
                                                        type="file" 
                                                        class="form-control form-control" 
                                                        style={{display:'none'}} 
                                                        id={`inputGroupFile`} 
                                                        accept="image/png"
                                                        onChange={(event) => {
                                                            // setFieldValue("image", event.currentTarget.files[0]);
                                                            const fileReader = new FileReader();
                                                            fileReader.readAsDataURL(event.target.files[0]);
                                                            uploadImage({image: event.target.files[0]});
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            
                        }
                        {/* {console.log(newImages)}
                        {
                            newImages.length > 0 && (
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary btn-block">Save</button>
                                </div>
                            )
                        } */}
                    </ModalBody>
                </>
            }
        </Modal>
    )
}

export default ModalAttributeImages