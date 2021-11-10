import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import { useRouter } from 'next/router'


const Register = () => {
  const initialState = { name: '', firstname: '', lastname: '', address: '', date: '', number:'', email: '', password: '', cf_password: '', gender:'', role:'' }
  const [userData, setUserData] = useState(initialState)
  const { name, firstname, lastname, address, date, number, email, password, cf_password, gender,role } = userData

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name,  firstname , lastname, address, date, number, email, password, cf_password, gender, role)
    if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await postData('auth/register', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>Register Page</title>
        </Head>

        <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input type="text" className="form-control" id="name"
            name="name" value={name} placeholder="Enter your Firstname" onChange={handleChangeInput} />
          </div>

           <div className="form-group">
            <label htmlFor="name">Firstname</label>
            <input type="text" className="form-control" id="firstname"
            name="firstname" value={firstname} placeholder="Enter your Firstname" onChange={handleChangeInput} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Lastname</label>
            <input type="text" className="form-control" id="lastname"
            name="lastname" value={lastname} placeholder="Enter your Lastname" onChange={handleChangeInput} />
          </div>
           <div className="form-group">
            <label htmlFor="name">Address</label>
            <input type="text" className="form-control" id="address"
            name="address" value={address} placeholder="Enter your Address" onChange={handleChangeInput} />
          </div>

            <div className="form-group">
            <label htmlFor="name">Date of Birth</label>
            <input type="date" className="form-control" id="date"
            name="date" value={date} placeholder="MM/DD/YY" required onChange={handleChangeInput} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone Number</label>
            <input type="number" className="form-control" id="number"
            name="number" value={number} placeholder="Enter your Phone Number" onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email </label>
            <input type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={email} placeholder="me@example.com" required onChange={handleChangeInput} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
          <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Gender</label>
          <select className="form-control" id="inlineFormCustomSelect"
          name="gender" value= {gender} onChange={handleChangeInput}>
            <option selected>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer no to say">Prefer not to say</option>
          </select>
        </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" value={password} placeholder="Enter your Password" onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" value={cf_password} placeholder="Enter your Confirm Password" onChange={handleChangeInput} />
          </div>

          <div className="form-group">
          <label className="mr-sm-2" htmlFor="inlineFormCustomSelect1">ROLE</label>
          <select className="form-control" id="inlineFormCustomSelect1"
          name="role" value= {role} onChange={handleChangeInput}>
            <option selected>ROLE</option>
            <option value="user">User</option>
            <option value="artist">Artist</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        
        

          
          <button type="submit" className="btn btn-dark w-100">Register</button>

          <p className="my-2">
            Already have an account? <Link href="/signin"><a style={{color: 'crimson'}}>Login Now</a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Register