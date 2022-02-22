import _ from "lodash"
import { useEffect, useState } from "react"
import { Card, CardBody, Col, Container, Row, Modal, Button, ModalHeader, ModalBody, Alert, Badge } from "reactstrap"
import { attributeService, colorService, hair_coolorService, trait_typeService } from "services"
import AttributeForm from "./attribute-form"
import placeholderImage from "../../assets/images/placeholder.jpg"
import { SingleSelect } from "components/Common/SingleSelect"
import { Form, Formik } from "formik"
import * as Yup from 'yup';
import Swal from "sweetalert2"

const ModalAttributeImage = (props) => {

    const [ item, setItem ] = useState({})
    const [ newImages, setNewImages ] = useState([])
    const [ actionsLoading, setActionsLoading ] = useState(false)
    const [ avatarPreview, setAvatarPreview ] = useState(null)
    const [ selectedCategory, setSelectedCategory ] = useState(null)

    const [initialValues, setInitialValues] = useState({
        forbidden_attributes: '',
        forbidden_trait_types: ''
    });

    const validationSchema = Yup.object().shape({
        forbidden_attributes: Yup.array().of(Yup.object()).nullable(),
        forbidden_trait_types: Yup.array().of(Yup.object()).nullable()
    });

    useEffect(() => {
        
        setItem(props.item);
        (!_.isEmpty(props.scopedHairColor)) ? (
            props.item.images.map(x => {
                if(x.hair_color === props.scopedHairColor._id){
                    setInitialValues({
                        forbidden_attributes: x.forbidden_attributes || '',
                        forbidden_trait_types: x.forbidden_trait_types || ''
                    })
                }
            })
            
        ) : (!_.isEmpty(props.scopedColor)) ? (
            props.item.images.map(x => {
                if(x.color === props.scopedColor._id){
                   
                    setInitialValues({
                        forbidden_attributes: x.forbidden_attributes || '',
                        forbidden_trait_types: x.forbidden_trait_types || ''
                    })
                }
            })
        ) : (
            setInitialValues({
                forbidden_attributes: props.item.images && props.item.images.length > 0 ? props.item.images[0]['forbidden_attributes'] : '',
                forbidden_trait_types: props.item.images && props.item.images.length > 0 ? props.item.images[0]['forbidden_trait_types'] : ''
            })
        );
    }, [props.item, props.scopedHairColor, props.scopedColor])

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


    async function onSubmit(fields, { setStatus, setSubmitting }) {
        console.log(item)
        setSubmitting(true)
        let completeData = Object.assign({}, fields)
        let sanitizedField = Object.assign({}, fields)
        
        

        let newItem
        let newCompleteData

        (!_.isEmpty(props.scopedHairColor)) ? (
            newItem = {
                images: item.images.map(x => {
                    if(x.hair_color === props.scopedHairColor._id){
                        x = {...x, ...sanitizedField}
                    }
                    return x
                })
            },
            newCompleteData = {
                images: item.images.map(x => {
                    if(x.hair_color === props.scopedHairColor._id){
                        x = {...x, ...completeData}
                    }
                    return x
                })
            }
        ) : (!_.isEmpty(props.scopedColor)) ? (
            newItem = {
                images: item.images.map(x => {
                    if(x.color === props.scopedColor._id){
                        x = {...x, ...sanitizedField}
                    }
                    return x
                })
            },
            newCompleteData = {
                images: item.images.map(x => {
                    if(x.color === props.scopedColor._id){
                        x = {...x, ...completeData}
                    }
                    return x
                })
            }
        ) : (
            newItem = {
                images: [
                    {...item.images[0], ...completeData}
                ]
            }
        );

        if(newItem.images && newItem.images.length > 0){
            newItem.images = newItem.images.map(x => {
                if(x.forbidden_attributes && x.forbidden_attributes.length > 0){
                    x.forbidden_attributes = x.forbidden_attributes.map(x => x._id)
                } else {
                    x.forbidden_attributes = []
                }
                if(x.forbidden_trait_types && x.forbidden_trait_types.length > 0){
                    x.forbidden_trait_types = x.forbidden_trait_types.map(x => x._id)
                } else {
                    x.forbidden_trait_types = []
                }
                return x
            })
        }
        

        try {
            await attributeService.update({_id: item._id, params: newItem})
            Swal.fire(
                'Done',
                'Attribute updated',
                'success'
            )
            
            setStatus();
            props.getData()
            setSubmitting(false)
            props.toggle()
        } catch (er){
            Swal.fire(
                'Ooops',
                'Something went wrong',
                'error'
            )
            props.toggle()
            console.log(er)
        }
        
        
        
    }
    
    
    return (
    
        <Modal
            isOpen={props.isOpen} 
            toggle={props.toggle}
            
        >
            {console.log(props)}
            {
                actionsLoading ? 'Loading...' : <>
                    <ModalHeader toggle={props.toggle} tag="h4">
                        {item.value}: {props.scopedColor ? props.scopedColor.value : props.scopedHairColor ? props.scopedHairColor.value : 'Default'}
                    </ModalHeader>
                    <ModalBody>
                        <div class="mt-3">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize={true} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting, setFieldTouched, handleChange, setFieldValue, values }) => (
            <Form className="signup-form">
                            <div className='col-12 mt-3'>
                                <label className="form-label ml-2"> Forbidden attributes</label>
                                <div className="form-group">
                                    <select onChange={(e)=>setSelectedCategory(e.target.value)} className='form-control'>
                                        <option value={''}>Select category</option>
                                        {
                                            JSON.parse(sessionStorage.getItem('menu')).map(x => <option value={x._id}>{x.name}</option>)
                                        }
                                    </select>
                                    <br/>
				            		<SingleSelect
				            			value={values.forbidden_attributes}
				            			onChange={setFieldValue}
                                        isMulti={true}
				            			onBlur={setFieldTouched}
				            			error={errors.forbidden_attributes}
				            			endPoint={attributeService.find}
				            			touched={touched.forbidden_attributes}
				            			name={"forbidden_attributes"}
				            			// title={"Forbidden attributes"}
                                        searchField={"value"}
                                        sortField={'value'}
				            			extraFilter={false}
                                        extraQuery={selectedCategory ? `&filter_field[]=trait_type&filter_type[]=eq&filter_value[]=${selectedCategory}` : null}
                                        placeholder={'Search attributes'}
				            		/>
                                </div>
                            </div>  
                            <div className='col-12 mt-3'>
                                <div className="form-group">
                                    <label className="form-label ml-2" for="forbidden_trait_types"> Forbidden trait types</label>
                                    <SingleSelect
				            			value={values.forbidden_trait_types}
				            			onChange={setFieldValue}
                                        isMulti={true}
				            			onBlur={setFieldTouched}
				            			error={errors.forbidden_trait_types}
				            			endPoint={trait_typeService.find}
				            			touched={touched.forbidden_trait_types}
				            			name={"forbidden_trait_types"}
				            			// title={"Forbidden attributes"}
                                        searchField={"name"}
                                        sortField={'name'}
				            			extraFilter={false}
                                        extraQuery={null}
                                        placeholder={'Search trait types'}
				            		/>
                                </div>
                            </div> 
                            <div className='d-flex justify-content-end pt-4'>
                    <button type="submit" disabled={props.actionsLoading} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        {
                            'UPDATE ATTRIBUTE'
                        }
                    </button>
                </div>
                            </Form>
                             )}
                             </Formik>
                             <br/>
                             <hr />
                            <label for="formFile" class="form-label form-label">Update image</label>
                            <input 
                                id="formFile" 
                                type="file" 
                                class="form-control form-control" 
                                id={`inputGroupFile_${item.value}`} 
                                type="file" 
                                class="form-control form-control" 
                                accept="image/png"
                                onChange={(event) => {
                                    // setFieldValue("image", event.currentTarget.files[0]);
                                    const fileReader = new FileReader();
                                    fileReader.readAsDataURL(event.target.files[0]);
                                    uploadImage(
                                        (!_.isEmpty(props.scopedHairColor)) ? (
                                            {hair_color: props.scopedHairColor._id, image: event.target.files[0]}
                                        ) : (!_.isEmpty(props.scopedColor)) ? (
                                            {color: props.scopedColor._id, image: event.target.files[0]}
                                        ) : (
                                            {image: event.target.files[0]}
                                        )
                                        
                                    );
                                }}
                            />
                        </div>
                        <img style={{width:'100%'}} src={
                            (!_.isEmpty(props.scopedHairColor)) ? (
                                item.images && item.images.find(x => x.hair_color ===  props.scopedHairColor._id) ? item.images.find(x => x.hair_color ===  props.scopedHairColor._id).url : placeholderImage
                            ) : (!_.isEmpty(props.scopedColor)) ? (
                                item.images && item.images.find(x => x.color ===  props.scopedColor._id) ? item.images.find(x => x.color ===  props.scopedColor._id).url : placeholderImage
                            ) : (
                                item.images ? item.images[0].url : placeholderImage
                            )
                                
                        }></img>
                    </ModalBody>
                </>
            }
        </Modal>
    )
}

export default ModalAttributeImage