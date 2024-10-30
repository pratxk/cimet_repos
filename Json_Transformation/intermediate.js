//1. Calculate average grades for each course

// Grade distribution:
// A: 90 and above
// B: 80 - 89
// C: 70 - 79
// D: 60 - 69
// F: Below 60

// OUTPUT: [
//     {
//       courseId,
//       courseName
//       totalStudents"
//       averages": {
//         "assignments",
//         "midterm",
//         "final",
//         "overall"
//       },
//       "gradeDistribution": {
//         "A": 1,
//         "B": 0,
//         "C": 0,
//         "D": 0,
//         "F": 0
//       }
//     },
//     {
//       "courseId",
//       "courseName",
//       "totalStudents",
//       "averages": {
//         "assignments",
//         "midterm",
//         "final",
//         "overall"
//       },
//       "gradeDistribution": {
//         "A": 0,
//         "B": 1,
//         "C": 1,
//         "D": 0,
//         "F": 0
//       }
//     }
//   ]


async function loadUniversityData() {
    const response = await fetch('./university-data.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

loadUniversityData().then(universityData => {
    const newObj = universityData.departments.flatMap(dept =>
        dept.courses.map(course => {
            const totalStudents = course.students.length;

            const assignmentAvg = totalStudents > 0 ?
                (course.students.map(student =>
                    student.grades.assignments.reduce((a, b) => a + b, 0) / student.grades.assignments.length
                ).reduce((acc, cur) => acc + cur, 0) / totalStudents)
                : 0;

            const midtermAvg = totalStudents > 0 ?
                (course.students.map(student => student.grades.midterm)
                    .reduce((acc, cur) => acc + cur, 0) / totalStudents)
                : 0;

            const finalAvg = totalStudents > 0 ?
                (course.students.map(student => student.grades.final)
                    .reduce((acc, cur) => acc + cur, 0) / totalStudents)
                : 0;

            const overallAvg = (assignmentAvg * 0.4) + (midtermAvg * 0.3) + (finalAvg * 0.3);

            const obj = {
                courseId: course.courseId,
                courseName: course.title,
                totalStudents: totalStudents,
                averages: {
                    assignments: assignmentAvg,
                    midterm: midtermAvg,
                    final: finalAvg,
                    overall: overallAvg
                },
                gradeDistribution: {
                    A: 0,
                    B: 0,
                    C: 0,
                    D: 0,
                    E: 0
                }

            };
            const g = (() => {
                if (overallAvg >= 90) {
                    return 'A'
                }
                else if (overallAvg >= 80) return 'B'
                else if (overallAvg >= 70) return 'c'
                else if (overallAvg >= 60) return 'D'
                else return 'E'

            })()
            obj.gradeDistribution[g]=totalStudents 
            return obj;
        })
    );

    console.log(newObj);
}).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});
