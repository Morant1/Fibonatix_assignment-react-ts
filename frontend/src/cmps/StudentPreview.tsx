import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import {Student} from '../models/student.model'


type Props = {
    student: Student,
      select: (student:Student) => Promise<void>;
}

export const StudentPreview: React.FC<Props> = ({student,select}) => {

    const handleInput = (e:React.FormEvent<HTMLInputElement>) => {
        select(student);
    }

    return (
  
        <div className="preview">
            <Checkbox
                checked={student.isSelected}
                onChange={handleInput}
                style={{
                    color: "#88c5f9",
                    backgroundColor: "white"
                }}
            />
            <img src={`https://randomuser.me/api/portraits/${student.gender === 'male' ? 'men' : 'women'}/${student._id}.jpg`} alt="img_profile" />
            <div className="student-info">
                <h1>{student.name}</h1>
                <h2>{student.email}</h2>
            </div>
            <h2 className="university">{student.university}</h2>
            <Link to={`/${student._id}`}><button>Details</button></Link>
        </div>

    );
  };