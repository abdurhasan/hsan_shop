import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/add_data.css'
import axios from 'axios'

class addData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: '',
            title: '',
            price: null,
            rate:null,
            brand: '',
            description: '',
            memory: '',
            color:'',
            loaded: 0,
            err:false,
            
        }
        
        this.imageSubmit = 'https://api-hsanshop.herokuapp.com/images/next.png'
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(ev) {
        const {file,title,rate,price,brand,description,memory,color} = this.state
        

        const fileUpload = new FormData();
        fileUpload.append('fileUpload', file);
        fileUpload.append('title',title)
        fileUpload.append('color',color)
        fileUpload.append('rate',rate)               
        fileUpload.append('price',price)
        fileUpload.append('brand',brand)
        fileUpload.append('description',description)         
        fileUpload.append('memory',memory)        
        
        axios
            .post('https://api-hsanshop.herokuapp.com/api/products/files', fileUpload, {
                onUploadProgress: mangan => {
                    this.setState({
                        loaded: (mangan.loaded / mangan.total * 100),
                    })
                },
            })
            .then(res => {                               
                this.setState({file:'',color:'',price:'',rate:'',title:'',brand:'',memory:'',description:'',err:false})
            })
            .catch(error=>this.setState({err:true,loaded:0}))

        ev.preventDefault()
    }

    componentDidMount() {
        document.body.style.background = "#2d2d2d";
    }

    render() {
        const {title,price,brand,description,rate,memory,err} =this.state

        return (
            <div>
                <form id="loginform" onSubmit={this.handleSubmit}>
                    <input type="text" value={title}  placeholder="title" onChange={(ev) => this.setState({ title: ev.target.value })} />
                    <input type="text"   placeholder="color : blue,black" onChange={(ev) => this.setState({ color: ev.target.value })}  />
                    <input type="number" value={rate} placeholder="rate * 1 - 10" onChange={(ev) => this.setState({ rate: ev.target.value })} />
                    <input type="number" value={price} placeholder="price * K" onChange={(ev) => this.setState({ price: ev.target.value })} />
                    <input type="text" value={brand} placeholder="brand" onChange={(ev) => this.setState({ brand: ev.target.value })} />                    
                    <input type="text" value={description} placeholder="description" onChange={(ev) => this.setState({ description: ev.target.value })} />
                    <input type="text" value={memory} placeholder="memory : 32GB,64GB" onChange={(ev) => this.setState({ memory: ev.target.value })} />
                    <input type="file" placeholder="file"  onChange={(ev) => this.setState({ file: ev.target.files[0] })} />
                    
                    <div className="info_upload">
                        <span className="percent_upload"> {Math.round(this.state.loaded, 2)}%</span>                    
                        {err ?<span className="err_msg">! upload gagal, periksa koneksi anda</span>:null}
                        
                    </div>  

                    <img src={this.imageSubmit} alt="true" onClick={this.handleSubmit}/>                    
                    <button type="submit" style={{ display: 'none' }} />
                </form>
                    

                <div id="notif_msg">Back to  Home ?</div>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}> <button id="notif_btn">Home</button> </Link>
            </div>
        )
    }
}

export default addData;