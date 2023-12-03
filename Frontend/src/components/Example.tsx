import React from "react";
import { User } from "../shared/User";

interface ExampleState {
    users: User[];
    filteredUsers: User[]; 
    currentPage: number;    
    itemsPerPage: number;  
    searchQuery: string;  
}

export class Example extends React.Component<{}, ExampleState> {
    state: ExampleState = {
        users: [],
        filteredUsers: [],
        currentPage: 1,
        itemsPerPage: 30,
        searchQuery: ""
     };
     

    componentDidMount() {
        document.title = "Example - My React Application";
        this.loadUsers(); // Automatically load users when the component mounts
    }

    loadUsers() {
        fetch("http://localhost:3000/User")
            .then(response => response.json())
            .then(apiUsers => {
                this.setState({ 
                    users: apiUsers,
                    filteredUsers: apiUsers,
                    currentPage: 1
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }
    
    handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        this.setState(prevState => ({
            searchQuery: query,
            filteredUsers: prevState.users.filter(user =>
                user.first_name.toLowerCase().includes(query.toLowerCase()) ||
                user.last_name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            ),
            currentPage: 1
        }));
    };
    
    goToNextPage = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage + 1
        }));
    };
    
    goToPreviousPage = () => {
        this.setState(prevState => ({
            currentPage: Math.max(prevState.currentPage - 1, 1)
        }));
    };

    formatDate(dateString:string) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return `${year}/${month}/${day}`;
    }

    render() {
        const { filteredUsers, currentPage, itemsPerPage, searchQuery } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
       const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
        return (
            <div>
                <h2>Example</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={this.handleSearch}
                />
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
                                    {currentItems.map((user,index) => (
                                        <tr>
                                            <td>{indexOfFirstItem + index + 1 }</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>{this.formatDate(user.date_created)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                <button 
                    onClick={this.goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button 
                    onClick={this.goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>

                </div>
            </div>
        );
    }
    
}
