let tableCreated = false;

document.getElementById('createClassTable').addEventListener('click', () => {
    tableCreated = true;
    document.getElementById('formSection').style.display = 'block';
    alert('Class Table Created');
});

document.getElementById('createOtherTable').addEventListener('click', () => {
    tableCreated = true;
    document.getElementById('formSection').style.display = 'block';
    alert('Other Table Created');
});

document.getElementById('viewTable').addEventListener('click', () => {
    if (!tableCreated) {
        alert('Please Create a Table First');
    } else {
        document.getElementById('viewSection').style.display = 'block';
        displayCourses();
    }
});

document.getElementById('saveCourse').addEventListener('click', () => {
    const courseCode = document.getElementById('courseCode').value;
    const courseTitle = document.getElementById('courseTitle').value;
    const lecturerName = document.getElementById('lecturerName').value;
    const building = document.getElementById('building').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const courseDay = document.getElementById('courseDay').value;
    const courseTimeFrom = document.getElementById('courseTimeFrom').value;
    const courseTimeTo = document.getElementById('courseTimeTo').value;

    if (courseCode && courseTitle) {
        const course = {
            courseCode,
            courseTitle,
            lecturerName,
            building,
            roomNumber,
            courseDay,
            courseTimeFrom,
            courseTimeTo
        };
        
        saveCourse(course);
        alert('Course Saved');
        clearForm();
    } else {
        alert('Please fill in all required fields.');
    }
});

document.getElementById('viewCourses').addEventListener('click', () => {
    document.getElementById('viewSection').style.display = 'block';
    displayCourses();
});

function saveCourse(course) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

function displayCourses() {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    
    courses.forEach((course, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${course.courseCode}: ${course.courseTitle} - ${course.lecturerName}`;
        courseList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('courseCode').value = '';
    document.getElementById('courseTitle').value = '';
    document.getElementById('lecturerName').value = '';
    document.getElementById('building').value = '';
    document.getElementById('roomNumber').value = '';
    document.getElementById('courseDay').value = '';
    document.getElementById('courseTimeFrom').value = '';
    document.getElementById('courseTimeTo').value = '';
}
