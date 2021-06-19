import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import config from '../config'
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercises extends Component {
    
    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration =  this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            description:'',
            duration:0,
            date: new Date(),
        }
    }

    componentDidMount(){
            axios.get(`${config.SERVER_URI}/exercises/`+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        console.log(date);
        this.setState({
        date: date
        })
    }
    
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post(`${config.SERVER_URI}/exercises/update/`+this.props.match.params.id, exercise)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
        
        window.location = '/';
    }

    render(){
        return (
            <div>
               <h3>Edit Exercise Log</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Username: </label>
                       <select ref="userInput"
                       required
                       className="form-control"
                       value={this.state.username}>
                           {
                           <option
                               key={this.state.username}
                               value={this.state.username}>
                                {this.state.username}
                               </option>
                        }
                       </select>
                   </div>
                   <div className="form-group">
                       <label>Description: </label>
                       <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                   </div>
                   <div className="form-group">
                       <label>Duration (in minutes): </label>
                       <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                   </div>
                   <div className="form-group">
                       <label>Date: </label>
                       <div>
                           <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                       </div>
                   </div>
                   <div className="form-group">
                       <input type="submit" onSubmit={this.onSubmit} value="Edit Exercise Log" className="btn btn-primary" />
                   </div>
               </form>
            </div>
        )
    }
}