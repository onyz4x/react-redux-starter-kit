import React from 'react'
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    />
)
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  return errors
}
const renderTestField = (props) => {
  console.log(props);
  return (
    <div>dfdfdf</div>
  )

}

export const FormDemo = (props) => {
  console.log(props)
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form >
      <div>

        <Field name="firstName" label="名字" component={renderTextField} />

      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component={renderTestField} type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting} onClick={handleSubmit(showResults) }>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

FormDemo.propTypes = {
}

export default reduxForm({
  form: 'formDemo' // a unique name for this form
  ,
  validate
})(FormDemo);
