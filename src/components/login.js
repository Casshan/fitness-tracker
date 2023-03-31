import React from "react";

const Login = () => {



    return (
        <div class="container" id="loginform">
            <br />
            <form>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
                    <label for="floatingPassword">Password</label>
                </div><br/>
                <button type="Login" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;