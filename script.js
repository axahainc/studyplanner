$(document).ready(function () {
    let tableCreated = false;

    $('#createClassTable').click(function () {
        tableCreated = true;
        $('#formSection').show();
        $('#reminderSection').hide();
        $('#calendarSection').hide();
        $('#notesSection').hide();
        alert('Class Table Created');
    });

    $('#createOtherTable').click(function () {
        tableCreated = true;
        $('#formSection').show();
        $('#reminderSection').hide();
        $('#calendarSection').hide();
        $('#notesSection').hide();
        alert('Other Table Created');
    });

    $('#viewTable').click(function () {
        if (!tableCreated) {
            alert('Please Create a Table First');
        } else {
            $('#viewSection').show();
            displayCourses();
            displayReminders();
            displayNotes();
        }
    });

    $('#createReminder').click(function () {
        $('#reminderSection').show();
        $('#formSection').hide();
        $('#calendarSection').hide();
        $('#notesSection').hide();
    });

    $('#createCalendar').click(function () {
        $('#calendarSection').show();
        $('#formSection').hide();
        $('#reminderSection').hide();
        $('#notesSection').hide();
        generateCalendar();
    });

    $('#takeNotes').click(function () {
        $('#notesSection').show();
        $('#formSection').hide();
        $('#reminderSection').hide();
        $('#calendarSection').hide();
    });

    // Save Course
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
            
            saveToLocalStorage('courses', course);
            alert('Course Saved');
            clearForm();
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Save Reminder
    $('#saveReminder').click(function () {
        const reminderTitle = $('#reminderTitle').val();
        const reminderTime = $('#reminderTime').val();

        if (reminderTitle && reminderTime) {
            const reminder = {
                title: reminderTitle,
                time: reminderTime
            };
            
            saveToLocalStorage('reminders', reminder);
            alert('Reminder Saved');
            $('#reminderTitle').val('');
            $('#reminderTime').val('');
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Save Note
    $('#saveNote').click(function () {
        const noteContent = $('#noteContent').val();

        if (noteContent) {
            saveToLocalStorage('notes', noteContent);
            alert('Note Saved');
            $('#noteContent').val('');
        } else {
            alert('Please write some content.');
        }
    });

    // Display Courses
    function displayCourses() {
        let courses = getFromLocalStorage('courses');
        const courseList = $('#courseList');
        courseList.empty();
        
        $.each(courses, function (index, course) {
            let listItem = $('<li class="list-group-item"></li>').text(`${course.courseCode}: ${course.courseTitle} - ${course.lecturerName}`);
            courseList.append(listItem);
        });
    }

    // Display Reminders
    function displayReminders() {
        let reminders = getFromLocalStorage('reminders');
        const reminderList = $('#reminderList');
        reminderList.empty();

        $.each(reminders, function (index, reminder) {
            let reminderTimeFormatted = moment(reminder.time).format('MMMM Do YYYY, h:mm:ss a');
            let listItem = $('<li class="list-group-item"></li>').text(`${reminder.title} - ${reminderTimeFormatted}`);
            reminderList.append(listItem);
        });
    }

    // Display Notes
    function displayNotes() {
        let notes = getFromLocalStorage('notes');
        const noteList = $('#noteList');
        noteList.empty();

        $.each(notes, function (index, note) {
            let listItem = $('<li class="list-group-item"></li>').text(note);
            noteList.append(listItem);
        });
    }

    // Save to Local Storage
    function saveToLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key)) || [];
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    }

    // Get from Local Storage
    function getFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Generate a simple Calendar (Placeholder, for demo purposes)
    function generateCalendar() {
        $('#calendar').text('This is where the calendar would be displayed.');
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
