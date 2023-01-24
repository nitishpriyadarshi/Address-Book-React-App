//import React from 'react'
import "./AddressBookHome.css";
import AddressBookService from '../service/AddressBookService';
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Header from "../Header";


export default class AddressBookHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
        };
    }

    componentDidMount() {
        this.fetchData();
        console.log(this.props);
    }

    fetchData() {
        AddressBookService.getAllContacts().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }

    delete = (personId) => {
        AddressBookService.deletePerson(personId);
        alert("Data Deleted Successfully..!!!")
        window.location.reload();

    };

    update = (id) => {
        this.props.Link(`form/${id}`);
        console.log(id);
    };


    // // update = (id) => {
    // //     this.props.history.push(`AddressBookForm/${id}`);
    // //     console.log(id);
    // };



    render() {
        return (

            <div>
                <Header />
                <div className='main-content'>
                    <div className='header-contentt'>
                        <div className='person-detail-text'>Person Details</div>

                        <Link to="/form">
                            <Button variant="contained" size="large">Add User</Button>
                        </Link>
                    </div>

                    <table id='table-display' className='table'>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        <tbody>
                            {this.state.addressbook.map((book, index) => (
                                <tr key={`${index}`}>
                                    <td>{book.name}</td>
                                    <td>{book.phoneNum}</td>
                                    <td>{book.address}</td>
                                    <td>{book.city}</td>
                                    <td>{book.state}</td>
                                    <td>{book.email}</td>
                                    <td>



                                        <NavLink to={`/form/${book.personId}`}>

                                            <IconButton aria-label="delete" size="smaller"  >
                                                <EditIcon />

                                            </IconButton>

                                        </NavLink>

                                        <IconButton aria-label="delete" size="smaller" onClick={() => this.delete(book.personId)}>
                                            <DeleteIcon /></IconButton>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}