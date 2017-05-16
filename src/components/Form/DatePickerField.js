import React from 'react'
import {Form, DatePicker} from 'antd';
import moment from 'moment'
const FormItem = Form.Item;

export const DatePickerField = ({input, label, startDate, endDate, showRequiredStar, labelSpan, wrapperSpan, meta: {touched, error}, ...custom}) => {

    if (input.value == "" || input.value == undefined||isNaN(input.value) ) {
        input.value = null;
    }
    else {
        input.value=moment(input.value)
    }


    return (
        <FormItem
            label={label}
            labelCol={{span: labelSpan == undefined ? "8" : labelSpan}}
            wrapperCol={{span: wrapperSpan == undefined ? "16" : wrapperSpan}}
            validateStatus={(touched && error) ? "error" : ""}
            help={touched && error} required={showRequiredStar ? true : false}
        >
            <DatePicker format="YYYY-MM-DD" value={input.value}  {...custom} onChange={(e)=> {
                input.onChange(Date.parse(e))
            }}/>
        </FormItem>
    )


}
export default DatePickerField
