import React from 'react'
import { Field, reduxForm, change} from 'redux-form';
import NormalTextField from 'components/Form/NormalTextField'

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })


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
const renderSelectField = ({ loadCities, children, input, label, meta: { touched, error, dispatch }, ...custom }) => {

  return (
    <select className="form-control input-lg" {...input} onChange={(e) => { input.onChange(e);loadCities(); } }
      {...custom}>
      {children}
    </select>
  )
}

export const FormDemo = (props) => {
  console.log(props)
  const { handleSubmit, pristine, reset, submitting, cities, loadCities, dispatch } = props
  return (
    <form >
      <div>

        <Field name="firstName" label="名字" component={NormalTextField} />

      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName"  component={renderTestField} type="text" loadCities={loadCities} placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Country</label>
        <div>
          <Field name="country"  disabled={!props.countries.length} component={renderSelectField} loadCities={loadCities}  >
            <option value=""></option>
            {props.countries && props.countries.map(c => (<option  key={c.id}  value={c.id}>{c.name}</option>)) }
          </Field>
        </div>
      </div>
      <div>
        <label>Cities </label>
        <div>
          <Field name="city"  className="form-control  input-sm" component='select'  >

            {props.cities && props.cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>)) }
          </Field>
        </div>
      </div>


      <div>
        <button type="submit" disabled={pristine || submitting} onClick={handleSubmit(showResults) }>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>

        <button type="button" onClick={loadCities}>Load CIties</button>
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
