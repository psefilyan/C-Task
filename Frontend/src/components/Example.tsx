import React from "react";
import { User } from "../shared/User";

export class Example extends React.Component {
    
    private users: User[] = [];

    public componentDidMount() {
        document.title = "Example - My React Application";
    }

    public render(): JSX.Element {
        return (
            <div>
                <h2>Example</h2>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tb-container">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name </th>
                                        <th>Email</th>
                                        <th>Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.users.map(user => (
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.date_created}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            className="btn btn-info"
                            type="button"
                            id="addressSearch"
                            onClick={() => this.loadUsers()}
                        >
                            Load Users
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private loadUsers(): void  {
        fetch("http://localhost:3000/User")
        .then(response => {
            response.json()
            .then(apiUsers => {
                this.users = apiUsers;
                this.forceUpdate();
            });
        });
    }
}