import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { loadStudents, getPageData, setPageData, save, remove, selectAll } from '../services/studentService'
import { Student } from '../models/student.model'
import {StudentList} from '../cmps/StudentList'



type MyState = {
    pageSize: number,
    pageCount: number,
    checked: boolean,
    chosenBtn: number,
    pageIdx: number,
    students: Array<Student>
};

export default class Home extends React.Component<any, MyState> {

    state: MyState = {
        pageSize: 8,
        pageCount: 0,
        checked: false,
        students: [],
        pageIdx: 0,
        chosenBtn: 0
    };


    async componentDidMount() {
        await this.load()
        this.calcPageCount();
        this.setChecked();

        const { chosenBtn, pageIdx } = await getPageData();
        this.setState({ chosenBtn, pageIdx })
    }

    load = async () => {
        const students = await loadStudents();
        this.setState({ students }, () => { console.log(this.state.students) })
    }

    calcPageCount = () => {
        const { students } = this.state
        const pageCount = Math.ceil(students.length / this.state.pageSize);
        this.setState({ pageCount })
    }

    onNextPage = (pageNumber: number) => {
        const { pageCount } = this.state;
        const pageIdx = (pageNumber + 1 <= pageCount) ? pageNumber : 0;
        const chosenBtn = pageNumber;

        setPageData(chosenBtn, pageIdx);
        this.setState({ pageIdx, chosenBtn })
    }

    select = async (student: Student) => {
        const currStudent = { ...student };
        currStudent.isSelected = !currStudent.isSelected;
        await save(currStudent);
        await this.load();

        this.setChecked()
        
    }

    setChecked = () => {
        const isSelectedAll = this.state.students.every(student => student.isSelected);
        if (!this.state.checked && isSelectedAll) this.setState({ checked: true })
        if (this.state.checked && !isSelectedAll) this.setState({ checked: false })
    }

    onRemoveBtn = async () => {
        const { chosenBtn } = this.state
        remove();
        await this.load()
        this.calcPageCount()

        const isSelectedAll = this.getStudents.every(student => student.isSelected);
        if (isSelectedAll && !!chosenBtn) this.onNextPage(chosenBtn - 1)
        if (!this.state.students.length) this.setState({ checked: false })

    }


    handleInput = () => {
        const checked = !this.state.checked
        selectAll(checked)
        this.setState({ checked })
    }


    get getStudents() {

        const { pageIdx, pageSize, students } = this.state;

        var startIdx = pageIdx * pageSize;
        return students.slice(startIdx, startIdx + pageSize);
    }

    get getRemoveSign() {
        const isSelected = this.state.students.find(student => student.isSelected)
        if (isSelected) return true;
        else return false;
    }



    render() {
        const { students } = this.state;
        if (!students) return <div>Loading....</div>;


        const studentsToDisplay = this.getStudents;
        const { pageCount, chosenBtn, checked } = this.state;

        return (
            <div className="student-app">
                {this.getRemoveSign ?
                    <i className="trash fas fa-trash-alt" onClick={this.onRemoveBtn}></i>
                    : ''}


                <div className="wrapper">
                    <div className="checkbox">
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={(ev) => { this.handleInput() }} style={{
                                color: "#88c5f9",
                                backgroundColor: "white"
                            }} />}
                            label="Select all"
                        />
                    </div>
                    <StudentList students={studentsToDisplay} select={this.select} />
                    <div className="navigation">
                        {[...Array(pageCount)].map((val, idx) => {
                            return (
                                <button className={`btn ${chosenBtn === idx ? 'color' : ''}`}
                                    key={idx} onClick={() => { this.onNextPage(idx) }}>{idx + 1}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
