import React, { Component } from 'react';
import logo from '../logo-TA.png';
import { Redirect }  from 'react-router-dom';
import {SlideMenu} from 'primereact/slidemenu';
import {Button} from 'primereact/button';
 

class Header extends Component {
    constructor() {
        super();
        this.state = {
            login_admin: localStorage.getItem('ta_login'),
            items: [
                {
                    label: 'User Member',
                    icon: 'fa fa-fw fa-user-o',
                    items: [
                        {
                            label: 'Admin',
                            icon: 'fa fa-fw fa-user-secret',
                            items: [
                                    {
                                        label: 'Text', 
                                        items: [
                                            {
                                                label: 'Workspace'
                                            }
                                        ]
                                    },
                                    {
                                        label: 'File'
                                    }
                                ]
                        },
                        {
                            label: 'Member',
                            icon: 'fa fa-fw fa-user',
                            items: [
                                    {
                                        label: 'Text', 
                                        items: [
                                            {
                                                label: 'Workspace'
                                            }
                                        ]
                                    },
                                    {
                                        label: 'File'
                                    }
                                ]
                        },
                    ]
                },
                {
                    label: 'Transaksi',
                    icon: 'fa fa-fw fa-shopping-cart',
                    items: [
                        {
                            label: 'Order',
                            icon: 'fa fa-fw fa-download',
                            items: [
                                {label: 'Save', icon: 'fa fa-fw fa-save'},
                                {label: 'Update', icon: 'fa fa-fw fa-save'},
                            ]
                        },
                        {
                            label: 'Cancel Order',
                            icon: 'fa fa-fw fa-remove',
                            items: [
                                {label: 'Save', icon: 'fa fa-fw fa-save'},
                                {label: 'Update', icon: 'fa fa-fw fa-save'},
                            ]
                        }
                    ]
                },
                {
                    separator: true
                },
                {
                    label:  ' logout', icon: 'glyphicon glyphicon-log-in', command: () => {this.logout_admin()}
                }
            ]
        }
        
    }

    logout_admin(){
        console.log('logout')
        localStorage.removeItem('ta_login');
        window.location.href = 'http://localhost:3000/'
    }

    render() {
        return (
            <div>
                <h1 class="text-center"><img src={logo} /></h1>
                <SlideMenu ref={(el) => this.menu = el} model={this.state.items} popup={true}></SlideMenu>
                <Button type="button" icon="pi pi-bars" label="" onClick={(event) => this.menu.toggle(event)} ></Button>
            </div>

        );
    }
}

export default Header;
