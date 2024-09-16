$(document).ready(function () {
    let tableCreated = false;

    $('#createClassTable').click(function () {
        tableCreated = true;
        $('#formSection').show();
        alert('Class Table Created');
    });

    $('#createOtherTable').click(function () {
        tableCreated = true;
        $('#formSection').show();
        alert('Other Table Created');
    });

    $('#viewTable').click(function () {
        if (!tableCreated) {
            alert('Please Create a Table First');
        } else {
            $('#viewSection').show();
            displayCourses();
        }
    });

    $('#saveCourse').click(function () {
        const courseCode = $('#courseCode').val();
        const courseTitle = $('#courseTitle').val();
        const lecturerName = $('#lecturerName').val();
        const building = $('#building').val();
        const roomNumber = $('#roomNumber').val();
        const courseDay = $('#courseDay').val();
        const courseTimeFrom = $('#courseTimeFrom').val();
        const courseTimeTo = $('#courseTimeTo').val();

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

    $('#viewCourses').click(function () {
        $('#viewSection').show();
        displayCourses();
    });

    function saveCourse(course) {
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    function displayCourses() {
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        const courseList = $('#courseList');
        courseList.empty();
        
        $.each(courses, function (index, course) {
            let listItem = $('<li class="list-group-item"></li>').text(`${course.courseCode}: ${course.courseTitle} - ${course.lecturerName}`);
            courseList.append(listItem);
        });
    }

    function clearForm() {
        $('#courseCode').val('');
        $('#courseTitle').val('');
        $('#lecturerName').val('');
        $('#building').val('');
        $('#roomNumber').val('');
        $('#courseDay').val('');
        $('#courseTimeFrom').val('');
        $('#courseTimeTo').val('');
    }
});
