import React, { useState } from 'react'
import { SingleSelect } from 'components/Common/SingleSelect';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { attributeService, currencyService, trait_typeService } from 'services';
import _ from 'lodash';




function AttributeForm(props) {

    const [initialValues, setInitialValues] = React.useState({
		value: '',
		description: '',
        // image: '',
        chance: '',
        trait_type: '',
        forbidden_attributes: '',
        forbidden_attributes: ''
    });

    React.useEffect(() => {
        setInitialValues(props.attributeToEdit)
    }, [props.attributeToEdit])

    const SUPPORTED_FORMATS = ['image/png']
    const FILE_SIZE = 1024 * 1024 * 2

    const validationSchema = Yup.object().shape({
        value: Yup.string()
            .required('value is required')
            .max(100, 'The value cannot contain more than 100 characters'),
        description: Yup.string()
            .max(455, 'The description cannot contain more than 455 characters'),
        // image: Yup.mixed()
        //     .test('fileSize', "File Size is too large", value => value && value.size <= FILE_SIZE)
        //     .test('fileType', "Unsupported File Format", value => value && SUPPORTED_FORMATS.includes(value.type)),
        chance: Yup.number().required('chance is required')
            .max(9999, 'index must be less or equal than 9999')
            .min(0, 'index must be equal or greater than 0'),
        forbidden_attributes: Yup.array().of(Yup.object()).nullable(),
        forbidden_trait_types: Yup.array().of(Yup.object()).nullable()
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        let sanitizedField = Object.assign({}, fields)
        sanitizedField.trait_type = props.selectedAttributeId
        if(sanitizedField.forbidden_attributes && sanitizedField.forbidden_attributes.length > 0){
            sanitizedField.forbidden_attributes = sanitizedField.forbidden_attributes.map(x => x._id)
        } else {
            sanitizedField.forbidden_attributes = []
        }
        if(sanitizedField.forbidden_trait_types && sanitizedField.forbidden_trait_types.length > 0){
            sanitizedField.forbidden_trait_types = sanitizedField.forbidden_trait_types.map(x => x._id)
        } else {
            sanitizedField.forbidden_trait_types = []
        }
        setStatus();
        props.handleValidAttributeSubmit(null, sanitizedField)
    }

    const [ avatarPreview, setAvatarPreview ] = useState(null)

    const [ selectedCategory, setSelectedCategory ] = useState(null)

    return (

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
                {/* </div>
                <div className='col-12 mt-3'> */}
                    
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
                <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label ml-2" for="value"> Value</label>
                        <Field type="text" name="value" placeholder='Value' className='form-control' />
                        <ErrorMessage name="value" component="div" className="invalid-feedback" />
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label ml-2" for="description"> Description</label>
                        <Field as="textarea" name="description" placeholder='Description' className='form-control' />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label ml-2" for="chance"> Chance</label>
                        <div class="input-group">
                            <Field type='number' name="chance" placeholder='chance' className='form-control' />
                            <div class="input-group-text">/ 9999</div>
                        </div>
                        <ErrorMessage name="chance" component="div" className="invalid-feedback" />
                    </div>
                </div>
                {/* <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label ml-2" for="image"> Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            id="imageFile" 
                            aria-describedby="imageFile" 
                            aria-label="Upload" 
                            accept="image/png"
                            onChange={(event) => {
                                // setFieldValue("image", event.currentTarget.files[0]);
                                const fileReader = new FileReader();
                                fileReader.onload = () => {
                                  if (fileReader.readyState === 2) {
                                    
                                    setAvatarPreview(fileReader.result);
                                  }
                                };
                                fileReader.readAsDataURL(event.target.files[0]);
                                setFieldValue('image', event.target.files[0]);
                            }}
                        />
                    </div>
                    <br/>
                    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        <img src={avatarPreview} style={{maxHeight:'200px', maxWidth:'100%'}}></img>
                    </div>
                </div> */}
                {/* <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <Field name="email" type="text" placeholder="Enter email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <Field name="email" type="text" placeholder="Enter email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                </div> */}
                <div className='d-flex justify-content-end pt-4'>
                    <button type="submit" disabled={props.actionsLoading} className="btn btn-primary">
                        {props.actionsLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        {
                            props.isEdit ? 'UPDATE ATTRIBUTE' : 'ADD ATTRIBUTE'
                        }
                    </button>
                </div>
            </Form>
       
            )}
            </Formik>
        
    )


}


export default AttributeForm