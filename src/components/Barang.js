import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Growl} from 'primereact/growl';
import Header from './Header';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class Barang extends Component {

    constructor(props){
        super(props);
        this.state = {
            login_status: localStorage.getItem('ta_login'),
            status_add: '',
            data_barang:[],
            imageURL: '',
            edit_barang_status: false
            

        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onHide(event) {
        this.setState({edit_barang_status: false});
    }

    componentDidMount(){

        axios.get('http://localhost:3002/api/barang/show_barang')
        .then((response_barang) => {
            // console.log(response_barang)
            this.setState({data_barang: response_barang.data.reverse()})
        });
        
        if(this.state.login_status === null){
            window.location.href = 'http://localhost:3001' ;
        }
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

    edit_barang(_id, nama, harga, img_url){

        if(_id){

            console.log(_id)
            this.setState({edit_barang_status: true, edit_id:_id, nama_barang:nama, harga:harga, img_url:img_url})
    
        } else {
            this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
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
            let action_edit = <button class="btn btn-warning btn-xs" onClick={() => this.edit_barang(item._id, item.nama_barang, item.harga, item.img_url)}><i class="fa fa-pencil"></i></button>
            let action_remove = <button class="btn btn-danger btn-xs" onClick={() => this.hapus_barang()} ><i class="fa fa-remove"></i></button>
            
            return (
            
                <tr>
                    <td>{numb++}</td>
                    <td>{item.nama_barang}</td>
                    <td>{convertToRupiah(item.harga)}</td>
                    <td>{img_barang}</td>
                    <td><div class="btn-group">{action_edit}{action_remove}</div></td>
                </tr>
            )
        })


        return (
            
            <div>
                <Dialog header="Edit Barang" visible={this.state.edit_barang_status} width="350px" modal={true} minY={70} onHide={this.onHide} maximizable={true}>
                    
                    <img src={this.state.img_url} width="100%" />
                    <label>Nama Barang</label>
                    <input type="text" class="form-control" placeholder="Nama Barang" value={this.state.nama_barang}/>
                    <label>Harga</label>
                    <input type="number" class="form-control" placeholder="Harga" value={this.state.harga}/>
                </Dialog>
                <Growl ref={(el) => this.growl = el} />
                <div class='container' style={{paddingTop: '10px'}}>

                    <Header  />
                    <h3>{ this.state.status_add }</h3>
                    <form onSubmit={this._handleSubmit}>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Nama Barang</label>
                            <input ref="nama_barang" type="text" class="form-control" id="exampleInputEmail1" placeholder="Nama Barang" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Stok</label>
                            <input ref="harga" type="number" class="form-control" id="exampleInputPassword1" placeholder="Harga" />
                        </div>

                        {/* <div class="form-group">
                            <label for="exampleInputPassword1">Foto</label>
                            <input type="file" />
                        </div> */}

                        <input className="fileInput"  type="file"
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


export default Barang;
