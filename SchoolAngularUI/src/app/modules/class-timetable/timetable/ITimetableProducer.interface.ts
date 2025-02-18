export interface ItemtableProducer{
    SelectedPeriodType:number;
    NoOfExistence:number;
    TimeTaken:number;
}

export interface IClassTimeTableUrlParameter{
    classId:number;
}

export interface IExistingSubjectTeacher{
    classId:number;
    subjectId:number;
    teacherId:number;
}
