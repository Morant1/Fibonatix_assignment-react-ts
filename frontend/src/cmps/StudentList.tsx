import React from "react";
import {StudentPreview} from './StudentPreview'
import {Student} from '../models/student.model'


type Props = {
    students: Array<Student>,
      select: (student:Student) => Promise<void>;
}

export const StudentList: React.FC<Props> = ({students,select}) => {

  
    return (
        <div className="list">
        {students.map(student => <StudentPreview student={student} key={student._id} select={select} />)}
    </div>
    );
  };