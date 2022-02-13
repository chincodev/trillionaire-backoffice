import React from 'react'
import { SingleSelect } from 'components/Common/SingleSelect';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { currencyService } from 'services';




function Trait_typeForm(props) {

    const [initialValues, setInitialValues] = React.useState({
		name: '',
		description: '',
        index: '',
        hasColor: '',
        hasHairColor: ''
    });

    React.useEffect(() => {
        setInitialValues(props.trait_typeToEdit)
    }, [props.trait_typeToEdit])

    

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required')
            .max(100, 'The name cannot contain more than 100 characters'),
        description: Yup.string()
            .max(455, 'The description cannot contain more than 455 characters'),
        index: Yup.number()
            .max(100, 'Value must be less or equal than 100')
            .min(0, 'Value must be equal or greater than 0'),
        hasColor: Yup.boolean(),
        hasHairColor: Yup.boolean(),
    
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        props.handleValidTrait_typeSubmit(null, fields)
    }

    return (

        <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize={true} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting, setFieldTouched, handleChange, setFieldValue, values }) => (
            <Form className="signup-form">
                {/* <div className='col-12 mt-3'>
                    <div className="form-group">
						<SingleSelect
							value={values.currency_to_receive}
							onChange={setFieldValue}
							onBlur={setFieldTouched}
							error={errors.currency_to_receive}
							endPoint={currencyService.find}
							touched={touched.currency_to_receive}
							name={"currency_to_receive"}
							title={"Currency To Receive"}
							extraFilter={false}
                            extraQuery={false}
						/>
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group">
						<SingleSelect
							value={values.currency_to_deliver}
							onChange={setFieldValue}
							onBlur={setFieldTouched}
							error={errors.currency_to_deliver}
							endPoint={currencyService.find}
							touched={touched.currency_to_deliver}
							name={"currency_to_deliver"}
							title={"Currency To Deliver"}
							extraFilter={false}
                            extraQuery={false}
						/>
                    </div>
                </div> */}
                <div className='col-12 mt-3'>
                    <div className="form-group">
                        <label className="form-label ml-2" for="name"> Name</label>
                        <Field type="text" name="name" placeholder='Name' className='form-control' />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
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
                        <label className="form-label ml-2" for="index"> Index</label>
                        <Field type='number' name="index" placeholder='index' className='form-control' />
                        <ErrorMessage name="index" component="div" className="invalid-feedback" />
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group d-flex align-items-center">
                        <Field type="checkbox" name="hasColor" id='hasColor' />&nbsp;
                        <label className="form-label ml-2 mb-0" for="hasColor"> Has skin colors</label>
                        <ErrorMessage name="hasColor" component="div" className="invalid-feedback" />
                    </div>
                </div>
                <div className='col-12 mt-3'>
                    <div className="form-group d-flex align-items-center">
                        <Field type="checkbox" name="hasHairColor" id='hasHairColor' />&nbsp;
                        <label className="form-label ml-2 mb-0" for="hasHairColor"> Has hair colors</label>
                        <ErrorMessage name="hasHairColor" component="div" className="invalid-feedback" />
                    </div>
                </div>
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
                            props.isEdit ? 'UPDATE TRAIT_TYPE' : 'ADD TRAIT_TYPE'
                        }
                    </button>
                </div>
            </Form>
       
            )}
            </Formik>
        
    )


}


export default Trait_typeForm