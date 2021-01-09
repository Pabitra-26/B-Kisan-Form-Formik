import React, {useState} from 'react'
import {Formik, Form, FieldArray} from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import axios from 'axios'

function FormikForm() {

    const [Personal, setPersonal] = useState(true)
    const [Orders, setOrders] = useState(false)
    const [Bank, setBank] = useState(false)

    const AcOptions = [
        {key : 'SBI', value : 'SBI'},
        {key : 'HDFC', value : 'HDFC'}
    ]    

    const initialValues = {
        OrderNo:'',
        Date:'',
        Name:'',
        AadharNo:'',
        Address:'',
        Tehsil:'',
        District:'',
        PinCode:'',
        State:'',
        Whatsapp:'',
        Contact:'',
        CompanyName:'',

        OrderTable: [{
            Order_Details:'',
            Order_Quantity:'',
            Order_Rate:'',
            Order_Amount:'',
        }],  
        TotalAmt:'',
        Advance:'', 
        BillAmt:'',
        TransportChrg:'',
        DueAmt:'',
        DeliveryDate:'',
        DeliveryPlace:'',
        DepositTable:[{
            Deposit_Date:'',
            Deposit_Amount:'',
            Deposit_UTRNo:'',
            Deposit_Bank:''
        }],        

        Ac:'',
        AcHolder:'',
        AcNo:'',
        IFSC:'',
        DealerName:'',
        DealerContact:'',            
    }

    const validationSchema = Yup.object({
        OrderNo : Yup.string().nullable(),
        Date : Yup.date().required('Required'),
        Name : Yup.string().required('Required'),
        AadharNo : Yup.string().matches(/^\d{4}\s\d{4}\s\d{4}$/, 'Invalid Aadhar No').required('Required'),
        Address : Yup.string().required('Required'),
        Tehsil : Yup.string().required('Required'),
        District : Yup.string().required('Required'),
        PinCode : Yup.string().matches(/^\d{3}\s\d{3}$/, 'Invalid PinCode').required('Required'),
        Whatsapp : Yup.string().matches(/^\d{10}$/, 'Invalid WhatsApp No').nullable(),
        Contact : Yup.string().matches(/^\d{10}$/, 'Invalid Contact No').required('Required'),
        CompanyName : Yup.string().required('Required'),

        OrderTable : Yup.array().of(
            Yup.object({
                Order_Details : Yup.string().required('Required'),
                Order_Quantity : Yup.number().positive().typeError('Must be a number').required('Required'),
                Order_Rate : Yup.number().positive().typeError('Must be a number').required('Required'),
            })
        ).required('Must have orders').min(1, 'Minimum 1 order'),        
        TransportChrg : Yup.number().positive().nullable(),
        Advance : Yup.number().positive().required('Required'),
        BillAmt : Yup.number().positive().required('Required'),
        TotalAmt : Yup.number().positive().required('Required'),
        DueAmt : Yup.number().positive().required('Required'),
        DeliveryDate : Yup.date().required('Required'),
        DeliveryPlace : Yup.string().required('Required'),
        DepositTable : Yup.array().of(
            Yup.object({
                Deposit_Date : Yup.date().required('Required'),
                Deposit_Amount : Yup.number().positive().required('Required'),
                Deposit_UTRNo: Yup.string().required('Required'),
                Deposit_Bank : Yup.string().required('Required')
            })
        ).required('Required'),

        Ac : Yup.string().required('Required'),
        AcHolder : Yup.string().required('Required'),
        AcNo : Yup.number().positive().required('Required'),
        IFSC: Yup.string().matches(/^\w{4}0\d{6}$/, 'Invalid IFSC code').required('Required'),
        DealerName : Yup.string().required('Required'),
        DealerContact : Yup.string().matches(/^\d{10}$/, 'Invalid Mobile No').required('Required')
    })

    const onSubmit = values =>{
        console.log('Form values', values)
        // const payload = values        
        // axios.post('http://localhost:4000/order/add' ,payload)
        // .then((data)=>{
        //     console.log(data)
        //     alert("Successfully submitted form.")
        // })
        // .catch((err)=>{console.log(err)})
    }

    const personal_next = () =>{      
            setPersonal(prevPersonal => !prevPersonal)
            setOrders(prevOrders => !prevOrders)
    }

    const order_next = () =>{   
            setOrders(prevOrders => !prevOrders)
            setBank(prevBank => !prevBank)
    }

    const order_prev =()=>{
        setPersonal(prevPersonal => !prevPersonal)
        setOrders(prevOrders => !prevOrders)        
    }

    const bank_prev = () =>{   
        setOrders(prevOrders => !prevOrders)
        setBank(prevBank => !prevBank)
    }

    return (
       <Formik
        initialValues = {initialValues}
        validationSchema = {validationSchema}
        onSubmit = {onSubmit}        
        >
            {
                formik =>{                    
                    return <Form>
                        {Personal && <div className = 'form-control'>
                            <FormikControl control = 'input' type = 'text' name = 'OrderNo' placeholder = 'Order No' /> 
                            <FormikControl control = 'date' name = 'Date' placeholderText = 'Enter date' />   
                            <FormikControl control = 'input' type = 'text' name = 'Name' placeholder = 'Name' />  
                            <FormikControl control = 'input' type = 'text' name = 'AadharNo' placeholder = 'Aadhar No eg: 1234 5678 1234' />  
                            <FormikControl control = 'textarea' name = 'Address' placeholder = 'Address' />   
                            <FormikControl control = 'input' type = 'text' name = 'Tehsil' placeholder = 'Tehsil' />
                            <FormikControl control = 'input' type = 'text' name = 'District' placeholder = 'District' />
                            <FormikControl control = 'input' type = 'text' name = 'PinCode' placeholder = 'Enter PinCode eg: 123 456' />
                            <FormikControl control = 'input' type = 'text' name = 'Whatsapp' placeholder = 'Whatsapp Number' />
                            <FormikControl control = 'input' type = 'text' name = 'Contact' placeholder = 'Contact Number' />
                            <FormikControl control = 'input' type = 'text' name = 'CompanyName' placeholder = 'Enter Company Name' />
                            <button type = 'button' onClick={personal_next}>Next</button>                          
                        </div> } 

                        {Orders && <div className = 'form-control'>
                            <table>
                                <thead>
                                    Orders
                                    {/* <tr>
                                        <th scope="col" colspan="2">Srl No</th>
                                        <th scope="col ">Details</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Amount</th>
                                    </tr> */}
                                </thead>
                                <tbody>                                    
                                    <FieldArray name = 'OrderTable'  render ={arrayHelpers => (<div> {formik.values.OrderTable.map((Order, index) => (<div key={index}>                                                
                                            <th scope="col"><button type = 'button' onClick = {() => arrayHelpers.push({Order_Details: '', Order_Quantity: '', Order_Rate: '', Order_Amount: ''})}>+ New</button></th>
                                            <th scope="col"><button type = 'button' onClick = {() => arrayHelpers.remove(index)}>Delete</button></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`OrderTable[${index}].Order_Details`} placeholder = {`Detail ${index}`} /></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`OrderTable[${index}].Order_Quantity`} placeholder = {`Quantity ${index}`}/></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`OrderTable[${index}].Order_Rate`} placeholder = {`Rate ${index}`}/></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`OrderTable[${index}].Order_Amount`} placeholder = {`Amount ${index}`} value = {formik.values.OrderTable[index].Order_Quantity * formik.values.OrderTable[index].Order_Rate} onChange = {() =>formik.setFieldValue('BillAmt', formik.values.BillAmt+formik.values.OrderTable[index].Order_Amount)}/></th>
                                        </div>))}                                            
                                        </div>)}/>
                                </tbody>
                            </table>

                            <FormikControl control = 'input' name = 'BillAmt' type = 'text' label = 'Bill Amount' placeholder = 'Bill Amount' />                            
                            <FormikControl control = 'input' name = 'TransportChrg' type = 'text' label = 'Transport Charge' placeholder = 'Transport Charge'/>
                            <FormikControl control = 'input' name = 'Advance' type = 'text' label = 'Advance ' placeholder = 'Advance Amount'/>
                            <FormikControl control = 'input' name = 'TotalAmt' type = 'text' label = 'Total Amount' placeholder = 'Total Amount' />
                            <FormikControl control = 'input' name = 'DueAmt' type = 'text' label = 'Due Amount' placeholder = 'Due Amount'/>
                            <FormikControl control = 'date' name = 'DeliveryDate' label = 'Delivery Date' placeholderText = 'Delivery Date'/>
                            <FormikControl control = 'textarea' name = 'DeliveryPlace' type = 'text'  placeholder = 'Delivery Address '/>
                            
                            <table>
                                <thead>
                                    Deposit Details
                                    {/* <tr>
                                        <th scope="col" colspan="2">Srl No</th>
                                        <th scope="col ">Deposit Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">UTR, IMPS, Ref No.</th>
                                        <th scope="col">Bank Name</th>
                                    </tr> */}
                                </thead>
                                <tbody>                                    
                                    <FieldArray name = 'DepositTable'  render ={arrayHelpers => (<div> {formik.values.DepositTable.map((Deposit, index) => (<div key={index}>                                                
                                            <th scope="col"><button type = 'button' onClick = {() => arrayHelpers.push({Deposit_Date: '', Deposit_Amount: '', Deposit_UTRNo: '', Deposit_Bank: ''})}>+ New</button></th>
                                            <th scope="col"><button type = 'button' onClick = {() => arrayHelpers.remove(index)}>Delete</button></th>
                                            <th scope="col"><FormikControl control = 'date' type = 'text' name = {`DepositTable[${index}].Deposit_Date`} placeholder = {`dd/mm/yyyy`}/></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`DepositTable[${index}].Deposit_Amount`} /></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`DepositTable[${index}].Deposit_UTRNo`} /></th>
                                            <th scope="col"><FormikControl control = 'input' type = 'text' name = {`DepositTable[${index}].Deposit_Bank`}  /></th>
                                        </div>))}                                            
                                        </div>)}/>
                                </tbody>
                            </table>

                            <button type='button' onClick = {order_prev}>Previous</button>
                            <button type = 'button' onClick = {order_next}>Next</button>    
                            </div>}             

                        {Bank && <div  className = 'form-control'>
                            <FormikControl control = 'radio' name = 'Ac' options={AcOptions}/>
                            <FormikControl control = 'input' type = 'text' name = 'AcHolder' placeholder = 'A/c Holder Name'/>
                            <FormikControl control = 'input' type = 'text' name = 'AcNo' placeholder = 'A/c No'/>
                            <FormikControl control = 'input' type = 'text' name = 'IFSC' placeholder = 'IFSC'/>
                            <FormikControl control = 'input' type = 'text' name = 'DealerName' placeholder = 'Dealer Name'/>
                            <FormikControl control = 'input' type = 'text' name = 'DealerContact' placeholder = 'Mobile Name'/>
                            <button type='button' onClick = {bank_prev}>Previous</button>
                            <button type = 'submit' disabled = {!formik.isValid}>Submit</button>
                            </div>}
                    </Form>
                }
            }
        </Formik>
    )
}

export default FormikForm
