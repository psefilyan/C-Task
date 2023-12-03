import React from "react";
import { User } from "../shared/User";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { log } from "console";

interface ExamState {
    firstName: string;
    lastName: string;
    email: string;
    errors: {
        firstName?: string;
        lastName?: string;
        email?: string;
    };
}

export class Exam extends React.Component<{}, ExamState> {
    state: ExamState = {
        firstName: "",
        lastName: "",
        email: "",
        errors: {}
    };

    componentDidMount() {
        document.title = "Exam - My React Application";
    }
    addUser = (user :User) => {
        fetch("http://localhost:3000/User", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                
                return response.json().then(err => toast.error(err.message));
            }
            if(response.ok){
                toast.success("User SuccessFully Created");
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    validateForm = () => {
        const { firstName, lastName, email } = this.state;
        const errors: ExamState["errors"] = {};

        if (!firstName) errors.firstName = "First name is required";
        if (!lastName) errors.lastName = "Last name is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!this.validateForm()) return;

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        };


            event.preventDefault();
            if (!this.validateForm()) return;
        
            const formUser = {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                date_created: new Date().toISOString()
            };
        
            this.addUser(formUser);
        console.log("Submitting user:", formUser);
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">Exam</h2>
                <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            onChange={this.handleChange}
                            value={this.state.firstName}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            onChange={this.handleChange}
                            value={this.state.lastName}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Add User</button>
                </form>
            </div>
        );
    }

}
