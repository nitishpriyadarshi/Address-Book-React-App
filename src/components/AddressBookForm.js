import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import "./AddressBookForm.css"
import AddressBookService from '../service/AddressBookService'

const AddressBookForm = (props) => {

    let startValue = {
        name: "",
        address: "",
        city: "",
        state: "",
        phoneNum: "",
        email: "",
        isUpdate: false,
    }
    const [formValue, setForm] = useState(startValue)

    const onReset = () => {
        setForm({
            ...startValue, personId: formValue.personId, isUpdate: formValue.isUpdate
        });
    };

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('Value For', event.target.name, event.target.value);
    }

    const params = useParams();
    useEffect(() => {
        console.log(params.id)
        if (params.id) {
            getPersonId(params.id)
            console.log(params.id)
        }
    }, [params.id]);

    const getPersonId = (employeeId) => {
        console.log("Data Found")
        AddressBookService.getPersonById(employeeId)
            .then((data) => {
                let obj = data.data.data;
                console.log(obj)
                setData(obj);
            });
    };

    const setData = (obj) => {
        console.log()
        setForm({
            ...formValue,
            ...obj,
            personId: obj.personId,
            name: obj.name,
            phoneNum: obj.phoneNum,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            email: obj.email,
            isUpdate: true,
        });
    };

    const save = async (event) => {
        event.preventDefault();

        let object = {
            personId: formValue.personId,
            name: formValue.name,
            phoneNum: formValue.phoneNum,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            email: formValue.email,
        };
        console.log(object);

        if (formValue.isUpdate) {
            AddressBookService.updatePerson(params.id, object)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("Data Update Successfully..!!");
                        this.props.history.push("");
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            AddressBookService.addPerson(object)
                .then((response) => {
                    console.log(response);
                    const addData = response.data.data;
                    console.log(addData);
                    alert("Data Added successfully!!")
                })
        }
    }

    return (
        <div>

            <div className="form-content">
                <div className="home-button">
                    <Link to="/home">
                        <Button variant="contained" size="large">Home</Button>
                    </Link>
                </div>
                <div className="form-head">
                    <span> PERSON ADDRESS FORM </span>
                </div>

                <form className="form" action="#" onSubmit={save}>
                    <label className="label text" htmlFor="name">Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="name" name="name" placeholder="Enter Name.."
                            onChange={onNameChange} value={formValue.name} required></input>
                        <error-output className="name-error" htmlFor="name"></error-output>
                    </div>

                    <label className="label text" htmlFor="phoneNumber">Phone Number</label>
                    <div className="row-content">
                        <input className="input" type="number" id="phoneNumber" name="phoneNum" placeholder="Enter Phone Number.."
                            onChange={onNameChange} value={formValue.phoneNum} required></input>
                        <error-output className="phone-error" htmlFor="number"></error-output>
                    </div>

                    <label className="label text" htmlFor="address">Address</label>
                    <div className="row-content">
                        <textarea className="input" id="address" name="address" rows="4" placeholder="Enter Full Address.."
                            onChange={onNameChange} value={formValue.address} required></textarea>
                    </div>

                    <div className="row">
                        <div className="input-content">
                            <label className="label text" htmlFor="city">City</label>
                            <div className="row-content">
                                <select className="input" name="city"
                                    onChange={onNameChange} value={formValue.city}>
                                    <option value="">City</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Solapur">Solapur</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Nagpur">Nagpur</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-content">
                            <label className="label text" htmlFor="state">State</label>
                            <div className="row-content">
                                <select className="input" name="state" id="state"
                                    onChange={onNameChange} value={formValue.state}>
                                    <option value="">State</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-content">
                            <label className="label text" htmlFor="email">Email</label>
                            <div className="row-content">
                                <input className="input" type="text" id="email" name="email" placeholder="Email.."
                                    onChange={onNameChange} value={formValue.email} required ></input>
                            </div>
                        </div>
                    </div>
                    <div className="buttonParent">
                        <div className="add-reset">
                            <Stack direction="row" spacing={2}>
                                <Button type="submit" className="button addButton" id="addButton" variant="contained" size="large">
                                    {formValue.isUpdate ? 'Update' : 'Submit'}</Button>


                                <Button type="rest" className="resetButton button" id="resetButton" variant="contained" size="large"
                                    onClick={onReset}>Reset</Button>

                            </Stack>


                        </div>

                    </div>


                </form>
            </div>
        </div>

    )
}

export default AddressBookForm