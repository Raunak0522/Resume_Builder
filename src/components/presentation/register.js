import React,{useState,useEffect} from "react";
import { isLoaded } from 'react-redux-firebase'
import { connect } from "react-redux";
import * as authActions from '../../actions/authActions';
import { useHistory } from "react-router";
  function Register(props) {
    console.log(isLoaded(props.auth))
    let history = useHistory();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword]= useState('');
    const handleEmail= (e)=>{
      setEmail(e.target.value);
      }
    const handlename=(e)=>{
      setName(e.target.value)
    }  
      const handlePassword=(e)=>{
        setPassword(e.target.value);
      }
      useEffect(() => {
        console.log(props.auth);
        if(props.auth?.uid){
          history.push('/')
        }
      }, [props])
  const onSubmit=()=>{
    props.register({name:name,email:email, password:password})
    
  }

 
    return (
      <>
    {/* To save from multiple request */}
      {!isLoaded(props.auth)?<></>:<>
        {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are resgistering you in</h4>:
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
               
                    <h2 className="form-heading center">Enter your details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Username</label>
                            <div className="effect"><input type="text" name="name" value={name||''}  onChange={handlename}  /><span></span>
                            </div>
                        </div>
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email||''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>
                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password||''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.ErrorMessage?.message?<div className="input-group full">
                                <span className="error-message" >{props.authMine?.ErrorMessage?.message}</span> 
                        </div> :<></>}
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Register</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  }
        </>}
        </>
    );
  } 
const mapStateToProps=(state)=>{
  return {
      auth:state.firebase.auth,
      authMine:state.auth
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
     register:(object)=>
     {dispatch(authActions.register(object))}
  }
}
  export default connect(mapStateToProps,mapDispatchToProps)(Register)