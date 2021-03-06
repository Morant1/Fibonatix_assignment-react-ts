import axios from 'axios';
import { loadFromStorage, saveToStorage } from './storageService'
import { Student } from '../models/student.model';
import { PageData } from '../models/pageData.model';


const KEY_STUDENTS = 'STUDENTS';
const KEY_PAGE = "PAGE";
let gStudents: Student[] = loadFromStorage(KEY_STUDENTS) || null;
let gPageData: PageData;


const BASE_URL = 'http://localhost:3001/student'


export const loadStudents = async () : Promise<Student[]> => {
    if (!gStudents) {
        let res = await axios.get(`${BASE_URL}`)
        gStudents = res.data;
        saveToStorage(KEY_STUDENTS, gStudents);
    }

    return gStudents
}

export const getById = (studentId: string) : Promise<Student> | any => {
    const student = gStudents.find(student => student._id === studentId);
    return Promise.resolve(student);
}

export const remove = () : void => {
    gStudents = gStudents.filter(student => !student.isSelected)
    if (!gStudents.length) saveToStorage(KEY_STUDENTS, null);
    else saveToStorage(KEY_STUDENTS, gStudents);
    
}

export const save = (currStudent: Student) : Promise<Student> => {
    const idx = gStudents.findIndex(student => student._id === currStudent._id)
    gStudents.splice(idx, 1, currStudent);
    saveToStorage(KEY_STUDENTS, gStudents);

    return Promise.resolve(currStudent);
}

export const getPrevNextId = (currStudent: Student) => {

    const currIdx = gStudents.findIndex(student => student._id === currStudent._id)
    const nextStudent = gStudents[currIdx + 1] || gStudents[0]
    const prevStudent = gStudents[currIdx - 1] || gStudents[gStudents.length - 1]

    return Promise.resolve({
        prevId: prevStudent._id,
        nextId: nextStudent._id
    })
}

export const getPageData = () : Promise<PageData> => {
    gPageData = loadFromStorage(KEY_PAGE) || { chosenBtn: 0, pageIdx: 0 }
    return Promise.resolve(gPageData)
}

export const setPageData = (chosenBtn:any, pageIdx:any) : void => {
    gPageData = { chosenBtn, pageIdx };
    saveToStorage(KEY_PAGE, gPageData)
}

export const selectAll = (isSelect: boolean) : void => {
    gStudents = gStudents.map(student => {
        if (isSelect ? !student.isSelected : student.isSelected) student.isSelected = !student.isSelected
        return student;
    })
    saveToStorage(KEY_STUDENTS, gStudents);
}

















