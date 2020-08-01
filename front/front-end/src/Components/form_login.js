import React,{Component} from 'react';
import Input_login_mail from './input_login_email';
import Input_password from './input_login_password';


class App extends Component{
    render(){
        return(
            <form >

                <div className="form-row">
                     <Input_login_mail />
                </div>         
                <div className="form-row">
                     <Input_password />     
                </div>

            </form>
        );
    }
}


export default App;
