import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword: ""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const   {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
        
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history("/");
            props.showAlert("Account Created Successfully","success");


        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }



    return (
        <div className="container">
           <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" id="name" onChange={onChange} placeholder="Enter email"/>
          
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input type="email" name = "email" className="form-control" onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control"onChange={onChange}  id="password" minLength={5} required placeholder="Password"/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword"> Confirm Password</label>
          <input type="password"  name="cpassword" className="form-control"  onChange={onChange} id="cpassword" minLength={5} required placeholder="Password"/>
        </div>
       <div className="d-flex  justify-content-center">
        <button type="submit " className="btn btn-primary mb-3 ">Submit</button>
        </div>
      </form>
      </div>
    )
}

export default Signup