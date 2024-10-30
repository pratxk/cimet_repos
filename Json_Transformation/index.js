async function loadUniversityData() {
    const response = await fetch('./university-data.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// loadUniversityData().then(universityData => {
//     const newObj = universityData.departments.flatMap(dept =>
//         dept.courses.flatMap(course =>
//             course.students.map(student => ({
//                 name: student.name,
//                 studentId: student.studentId,
//                 gpa: (
//                     ((((student.grades.assignments.reduce((accumulator, currentValue) => {
//                         return accumulator + currentValue;
//                     }, 0))*0.4)/student.grades.assignments.length) + 
//                     (student.grades.midterm * 0.3) + 
//                     (student.grades.final * 0.3)) / 20) 

//             }))
//         )
//     );

//     console.log(newObj);
// }).catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
// });

// loadUniversityData().then(universityData => {
//     const newObj = universityData.departments.flatMap(dept =>
//         dept.courses.map(course =>(
//             {
//             courseId: course.courseId,
//             course: course.title,
//             credits: course.credits,
//             course: course.title,
//             Schedule: course.schedule
//             }
//           )
//         )
//     );

//     console.log(newObj);
// }).catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
// });


// loadUniversityData().then(universityData => {
//     const newObj = universityData.departments.map(dept => (
//         {
//             departmentId: dept.id,
//             name:dept.name,
//             faculty:{
//                 name:dept.head.name,
//                 id:dept.head.id,
//                 email:dept.head.email,
//                 qualification:dept.head.qualifications,
//                 researchAreas:dept.head.researchAreas,

//             }

//         }
//         )
//     );

//     console.log(newObj);
// }).catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
// });






