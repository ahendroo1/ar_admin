import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from './Header'

class Order extends Component {

    constructor(props){
        super(props);
        this.state = {
            status_add: '',
            data_barang:[],
            imageURL: '',
            login_status: localStorage.getItem('ta_login')
        };

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:3002/api/barang/show_barang')
        .then((response_barang) => {
            // console.log(response_barang)
            this.setState({data_barang: response_barang.data.reverse()})
        });

        if(this.state.login_status === null){
            window.location.href = 'http://localhost:3000'
        }

        // if(this.state.login_status){
            
        //     axios.post('http://localhost:3002/api/login/auth_pass', { pass_auth: this.state.login_status})
        //     .then((login_pass) => {

        //         if(login_pass.data.status === 2){

        //             window.location.href = 'http://localhost:3000/barang';

        //         } else {

        //             localStorage.removeItem('ta_login')
        //             window.location.href = 'http://localhost:3000/login';

        //         }
        //     });
        // }else {

        //     localStorage.removeItem('ta_login')
        //     window.location.href = 'http://localhost:3000';
        // }
        
    }

    _handleSubmit(e) {

        e.preventDefault();
        if(this.refs.nama_barang.value && this.refs.harga.value && this.uploadInput.files[0] ){

            const data = new FormData();
            data.append('file', this.uploadInput.files[0]);
            data.append('nama_barang', this.refs.nama_barang.value);
            data.append('harga', this.refs.harga.value);
            // data.append('filename', this.fileName.value);
            console.log(this.uploadInput.files[0])
            fetch('http://localhost:3002/api/barang', {
                method: 'POST',
                body: data,
            }).then((res_barang) => {
                this.componentDidMount()
            });

        } else {

            this.setState({status_add: 'Data masih ada yang kosong'})

        }
    }


    _handleImageChange(e) {
        e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }

        reader.readAsDataURL(file)
    }

    render() {


        function convertToRupiah(angka) {
            var rupiah = '';
            var angkarev = angka.toString().split('').reverse().join('');
            for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';
            return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
        }

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{width:'100px'}} />);
        } else {
            $imagePreview = (<div className="previewText">Upload Foto </div>);
        }
        
        var numb = 1 ;
        const data_barang = this.state.data_barang.map((item, index) => {

            // var judul = item.title;
            // var release = item.release_date;
            // var img = 'https://image.tmdb.org/t/p/w500'+item.backdrop_path;
            
            let img_barang = <img alt="bjhsx" src={item.img_url} style={{width: '50px'}}/>;
            let action = <button class="btn btn-primary btn-xs" ><i class="fa fa-pencil"></i></button>
            
            return (
            
                // <li key="index">
                // <h1>{title}</h1>
                // <p>{overview}</p>
                // {/* <img src={foto} alt=""/> */}
                // </li>

                <tr>
                    <td>{numb++}</td>
                    <td>{item.nama_barang}</td>
                    <td>{convertToRupiah(item.harga)}</td>
                    <td>{img_barang}</td>
                    <td>{action}</td>
                </tr>

                // <div key={index} class="col-md-4 col-xs-12 text-center" >
                //     <div class="product-details">
                //         <div class="product-img">
                //             <img src={item.img_url} alt="" />
                //             <div class="filled-button" onClick={() => this.show_order(item)}>
                //                 <i class="fa fa-shopping-cart"></i>
                //             </div>
                //         </div>
                //         <h4><a>{item.nama_barang}</a></h4>
                //         <p>{convertToRupiah(item.harga)}</p>
                //     </div>
                // </div>
            )
        })

        return (
            
            <div>
                    <Header />
                <div class='container' style={{paddingTop: '10px'}}>

                    <h3>{ this.state.status_add }</h3>
                    <form onSubmit={this._handleSubmit}>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Nama Barang</label>
                            <input ref="nama_barang" type="text" class="form-control" id="exampleInputEmail1" placeholder="Nama Barang" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Stok</label>
                            <input  ref="harga" type="number" class="form-control" id="exampleInputPassword1" placeholder="Harga" />
                        </div>

                        {/* <div class="form-group">
                            <label for="exampleInputPassword1">Foto</label>
                            <input type="file" />
                        </div> */}

                        <input className="fileInput" 
                        type="file"
                        ref={(ref) => { this.uploadInput = ref; }}
                        onChange={(e)=>this._handleImageChange(e)} />
                        {$imagePreview}
                        <button class="btn btn-default btn-sm pull-right">Simpan</button>
                    </form>
                </div>

                <hr />
                <br />

                <div class="container">
                    <table class="table">
                        <thead>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Harga</th>
                            <td>Img</td>
                            <td>Tools</td>
                        </thead>
                        <tbody>
                            { data_barang }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default Order;
