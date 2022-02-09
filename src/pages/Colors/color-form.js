import React from 'react'
import { SingleSelect } from 'components/Common/SingleSelect';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { currencyService } from 'services';




function ColorForm(props) {

    const [initialValues, setInitialValues] = React.useState({
		value: '',
		description: '',
    });

    React.useEffect(() => {
        setInitialValues(props.colorToEdit)
    }, [props.colorToEdit])

    

    const validationSchema = Yup.object().shape({
        value: Yup.string()
            .required('currency_to_receive is required')
            .max(100, 'The value cannot contain more than 100 characters'),
        description: Yup.string()
            .max(455, 'The description cannot contain more than 455 characters'),
    
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        console.log(fields);
        props.handleValidColorSubmit(null, fields)
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
                            props.isEdit ? 'UPDATE COLOR' : 'ADD COLOR'
                        }
                    </button>
                </div>
            </Form>
       
            )}
            </Formik>
        
    )


}


export default ColorForm