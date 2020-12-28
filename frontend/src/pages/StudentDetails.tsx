import React from 'react'
import { Link } from "react-router-dom";
import { save,getById,getPrevNextId } from '../services/studentService'
import { Student } from '../models/student.model'
import StudentEdit  from '../cmps/StudentEdit'




type MyState = {
    isEditMode: boolean
    nextId: string,
    prevId: string,
    student?: Student
};

export class StudentDetails extends React.Component<any, MyState> {

    state: MyState = {
        isEditMode: false,
        nextId: '',
        prevId: ''
    };


    componentDidMount() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        // FOR MOBILE

        this.loadStudent();
    }

    componentDidUpdate(prevProps:any) {
        if (prevProps.match.params._id !== this.props.match.params._id) {
            this.loadStudent()
        }
    }

    loadStudent = async () => {
        const studentId = this.props.match.params._id;
        const student = await getById(studentId);
        this.setState({ student }, () => { this.getPrevNext(student) });
    }

    getPrevNext = async (student:Student) => {
        const { prevId, nextId } = await getPrevNextId(student);
        this.setState({ prevId, nextId })
    }

    onBack = () => {
        this.props.history.push('/');
    }
    onEdit = () => {
        const isEditMode = !this.state.isEditMode;
        this.setState({ isEditMode });
    }

    updateStudent = async (currStudent:Student) => {
        await save(currStudent);
        await this.loadStudent();

        this.onEdit();
    }

    render() {
        const { student, isEditMode, nextId, prevId } = this.state
        if (!student) return <div>Loading...</div>

        return (
            <div className="student-details">
                {!isEditMode && <div className="details-container">

                    <div className="img-container">
                        <i onClick={() => { this.onBack() }} className="back fas fa-arrow-circle-left"></i>
                        <img alt="img_profile" src={`https://randomuser.me/api/portraits/${student.gender === 'male' ? 'men' : 'women'}/${student._id}.jpg`} />
                    </div>

                    <h1><i className="fas fa-user-graduate"></i> {student.name} <span>{student.age} years old</span></h1>
                    <ul>
                        <li><span><i className="fas fa-venus-mars"></i></span>{student.gender}</li>
                        <li><span><i className="fas fa-map-marker-alt"></i></span>{student.city} ,Israel</li>
                        <li><span><i className="fas fa-at"></i></span>{student.email}</li>
                        <li><span><i className="fas fa-university"></i></span>{student.university} ,Israel</li>
                    </ul>
                    <div className="edit" onClick={() => { this.onEdit() }}><i className="fas fa-user-edit"></i> Edit</div>

                    <div className="next-prev">
                        <div className="btn prev"><Link to={`/${prevId}`}><i className="fas fa-arrow-left"></i></Link></div>
                        <div className="btn next"><Link to={`/${nextId}`}><i className="fas fa-arrow-right"></i></Link></div>
                    </div>

                </div>}

                {isEditMode && <div className="edit-container">
                    <StudentEdit student={student} onEdit={this.onEdit} onUpdate={this.updateStudent} />
                </div>}

            </div>
        )
    }
}
