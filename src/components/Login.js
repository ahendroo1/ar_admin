import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo-TA.png'

class Barang extends Component {

    constructor(props){
        super(props);
        this.state = {
            status_login: '',
            data_barang:[],
            imageURL: '',
            login_status: localStorage.getItem('ta_login'),
            
        };
    }

    componentDidMount(){
        console.log(this.state.login_status)
        if (this.state.login_status !== null){
            window.location.href = 'http://localhost:3001/barang';
        } 

        // if(this.state.login_status){
            
        //     axios.post('http://localhost:3002/api/login/auth_pass', { pass_auth: this.state.login_status})
        //     .then((login_pass) => {

        //         if(login_pass.data.status === 2){
        //             this.setState({login_admin: true})
        //             window.location.href = 'http://localhost:3000/barang';

        //         } else {

        //             this.setState({login_admin: false})
        //             localStorage.removeItem('ta_login')
        //             window.location.href = 'http://localhost:3000/login';

        //         }
        //     });
        // }else {

        //     localStorage.removeItem('ta_login')
        //     this.setState({login_admin: false})
        // }
    }

    login(){

        if(this.refs.uname.value && this.refs.pass.value){

            var data_login_admin = {
                logemail: this.refs.uname.value,
                logpassword: this.refs.pass.value
            }

            axios.post('http://localhost:3002/api/login', data_login_admin )
            .then((res_login) => {
                console.log(res_login.data.password)
                if (res_login.data.status === 2){

                    localStorage.setItem('ta_login', res_login.data.password)
                    window.location.href = 'http://localhost:3001/barang';

                } else {

                    localStorage.removeItem('ta_login')
                    this.setState({status_login: ' Username dan Password Salah'})
                }
                // localStorage.setItem('ta_login', res_login)
            });

        } else {

            this.setState({status_login: 'Masukkan Username dan Password'})
        }

    }

    render() {

        return (
            <div>
                <div class='container' style={{paddingTop: '100px', width: '250px'}}>

                    <h1 class="text-center"><img src={logo} /></h1>
                    <h5>{ this.state.status_login }</h5>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input ref="uname" type="text" class="form-control" placeholder="Username" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input ref="pass" type="password" class="form-control"  placeholder="Password" />
                    </div>

                    <button class="btn btn-danger btn-sm pull-right" onClick={() => this.login()}><i class="fa fa-lock"></i> Login</button>

                </div>
            </div>
        );
    }
}

export default Barang;