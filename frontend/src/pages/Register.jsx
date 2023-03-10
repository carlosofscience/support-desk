import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register
 } from "../features/auth/authSlice"
import Spinner from "../components/Spinner";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate()
    
  const { name, email, password, confirm_password } = formData;

  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.auth)

  const onChange = (e)=>{
    setFormData((prevState => ({
      ...prevState, [e.target.name]: e.target.value 
    })));
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    
    if(password !== confirm_password){
      toast.error('Passwords do not match')
    }else{

      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          toast.success(` Hey ${user.name}, you're now registered!`);
          navigate("/");
        })
        .catch(toast.error);
    }
  }

  if(isLoading) return <Spinner/>

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              id="confirm_password"
              value={confirm_password}
              onChange={onChange}
              placeholder="Enter your confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register