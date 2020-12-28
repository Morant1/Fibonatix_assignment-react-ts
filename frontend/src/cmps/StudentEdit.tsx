import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { Student } from '../models/student.model'



type State = {
    student: Student
};

type Props = {
    student: Student,
    onUpdate: (student:Student) => Promise<void>,
    onEdit: () => void;
}



export default class StudentEdit extends React.Component<Props, State> {

    state: State = {
        student: this.props.student
    };


    handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const field = target.name;
        let value = (target.type === 'number') ? +target.value : target.value;

        this.setState(prevState => {
            return {
                student: {
                    ...prevState.student,
                    [field]: value
                }
            }
        })
    }

    handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const target = e.currentTarget;

        this.setState(prevState => {
            return {
                student: {
                    ...prevState.student,
                    gender: target.value
                }
            }
        })
    }

    onSaveStudent = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.props.onUpdate(this.state.student)
    }


    render() {
        const { student } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.onSaveStudent} className="edit-student">
                    <TextField label="Name:" type="text" autoComplete="off" name="name" onChange={this.handleInput} value={student.name} />
                    <TextField label="Age:" type="number" autoComplete="off" name="age" onChange={this.handleInput} value={student.age} />
                    <TextField label="City:" type="text" autoComplete="off" name="city" onChange={this.handleInput} value={student.city} />
                    <TextField label="Email:" type="email" autoComplete="off" name="email" onChange={this.handleInput} value={student.email} />
                    <TextField label="University:" type="text" autoComplete="off" name="university" onChange={this.handleInput} value={student.university} />
                    <div className="select">
                        <label>Gender:</label>
                        <select name="gender" value={student.gender} onChange={this.handleSelect}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </div>

                    <div className="btns">
                        <Button variant="contained" color="primary" className="btn" type="submit">Save</Button>
                        <Button variant="contained" className="btn" type="button" onClick={() => { this.props.onEdit() }}>Back</Button>
                    </div>
                </form>

            </React.Fragment>
        )
    }
}
