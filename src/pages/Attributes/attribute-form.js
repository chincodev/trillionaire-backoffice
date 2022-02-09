import React, { useState } from 'react'
import { SingleSelect } from 'components/Common/SingleSelect';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { currencyService, trait_typeService } from 'services';
import _ from 'lodash';




function AttributeForm(props) {

    const [initialValues, setInitialValues] = React.useState({
		value: '',
		description: '',
        // image: '',
        chance: '',
        trait_type: '',
        forbidden_trait_types: ''
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
        chance: Yup.number()
            .max(9999, 'index must be less or equal than 9999')
            .min(0, 'index must be equal or greater than 0'),
        trait_type: Yup.object(
        //     {
        //     name: Yup.string()
        //         .required('name is required')
        //         .max(100, 'The name cannot contain more than 100 characters'),
        //     description: Yup.string()
        //         .max(455, 'The description cannot contain more than 455 characters'),
        //     index: Yup.number()
        //         .max(100, 'Value must be less or equal than 100')
        //         .min(0, 'Value must be equal or greater than 0'),
        // }
        ).required('Trait type is required'),
        forbidden_trait_types: Yup.array().of(
            Yup.object(
            //     {
            //     name: Yup.string()
            //         .required('name is required')
            //         .max(100, 'The name cannot contain more than 100 characters'),
            //     description: Yup.string()
            //         .max(455, 'The description cannot contain more than 455 characters'),
            //     index: Yup.number()
            //         .max(100, 'Value must be less or equal than 100')
            //         .min(0, 'Value must be equal or greater than 0'),
            // }
            ),
        )
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        let sanitizedField = Object.assign({}, fields)
        if(!_.isEmpty(sanitizedField.trait_type)){
            sanitizedField.trait_type = sanitizedField.trait_type._id
        }
        if(sanitizedField.forbidden_trait_types && sanitizedField.forbidden_trait_types.length > 0){
            sanitizedField.forbidden_trait_types = sanitizedField.forbidden_trait_types.map(x => x._id)
        }
        setStatus();
        props.handleValidAttributeSubmit(null, sanitizedField)
    }

    const [ avatarPreview, setAvatarPreview ] = useState(null)

    return (

        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize={true} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting, setFieldTouched, handleChange, setFieldValue, values }) => (
            <Form className="signup-form">
                <div className='col-12 mt-3'>
                    <div className="form-group">
						<SingleSelect
							value={values.trait_type}
							onChange={setFieldValue}
							onBlur={setFieldTouched}
							error={errors.trait_type}
							endPoint={trait_typeService.find}
							touched={touched.trait_type}
							name={"trait_type"}
							title={"Trait type"}
							extraFilter={false}
                            extraQuery={false}
						/>
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group">
						<SingleSelect
							value={values.forbidden_trait_types}
							onChange={setFieldValue}
                            isMulti={true}
							onBlur={setFieldTouched}
							error={errors.forbidden_trait_types}
							endPoint={trait_typeService.find}
							touched={touched.forbidden_trait_types}
							name={"forbidden_trait_types"}
							title={"forbidden trait types"}
							extraFilter={false}
                            extraQuery={false}
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