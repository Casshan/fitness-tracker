import React from "react";

const MyRoutines = () => {
    return (
        <div class="container"><br/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Goal</th>
                        <th scope="col">Public Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td><a class="btn btn-primary" href="#" role="button">Edit</a></td>
                        <td><a class="btn btn-primary" href="#" role="button">Delete</a></td>
                        
                    </tr>
                    
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td><a class="btn btn-primary" href="#" role="button">Edit</a></td>
                        <td><a class="btn btn-primary" href="#" role="button">Delete</a></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        <td><a class="btn btn-primary" href="#" role="button">Edit</a></td>
                        <td><a class="btn btn-primary" href="#" role="button">Delete</a></td>
                    </tr>
                </tbody>
            </table>
            <a class="btn btn-primary" href="#" role="button">Add Routine</a>
        </div>
    )
}

export default MyRoutines;