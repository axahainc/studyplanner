$(document).ready(function () {
    let classes = [];
    let reminders = [];
    let notes = [];

    // Manage Classes - CRUD Operations
    function renderClasses() {
        $('#classList').empty();
        classes.forEach((item, index) => {
            $('#classList').append(`
                <li>
                    <a href="#createClassPage" data-id="${index}">${item.courseCode} - ${item.courseTitle}</a>
                    <a href="#" class="delete-class" data-id="${index}">Delete</a>
                </li>
            `);
        });
        $('#classList').listview('refresh');
    }

    $('#classForm').on('submit', function (event) {
        event.preventDefault();
        const id = $('#classId').val();
        const classData = {
            courseCode: $('#courseCode').val(),
            courseTitle: $('#courseTitle').val(),
            lecturerName: $('#lecturerName').val(),
            building: $('#building').val(),
            roomNumber: $('#roomNumber').val(),
            courseDay: $('#courseDay').val(),
            courseTimeFrom: $('#courseTimeFrom').val(),
            courseTimeTo: $('#courseTimeTo').val()
        };

        if (id) {
            classes[id] = classData;
        } else {
            classes.push(classData);
        }

        $('#classForm')[0].reset();
        $.mobile.navigate('#manageClassesPage');
        renderClasses();
    });

    $(document).on('click', '#classList a:not(.delete-class)', function () {
        const id = $(this).data('id');
        const classData = classes[id];
        $('#classId').val(id);
        $('#courseCode').val(classData.courseCode);
        $('#courseTitle').val(classData.courseTitle);
        $('#lecturerName').val(classData.lecturerName);
        $('#building').val(classData.building);
        $('#roomNumber').val(classData.roomNumber);
        $('#courseDay').val(classData.courseDay);
        $('#courseTimeFrom').val(classData.courseTimeFrom);
        $('#courseTimeTo').val(classData.courseTimeTo);
    });

    $(document).on('click', '.delete-class', function () {
        const id = $(this).data('id');
        classes.splice(id, 1);
        renderClasses();
    });

    // Manage Reminders - CRUD Operations
    function renderReminders() {
        $('#reminderList').empty();
        reminders.forEach((item, index) => {
            $('#reminderList').append(`
                <li>
                    <a href="#createReminderPage" data-id="${index}">${item.reminderTitle}</a>
                    <a href="#" class="delete-reminder" data-id="${index}">Delete</a>
                </li>
            `);
        });
        $('#reminderList').listview('refresh');
    }

    $('#reminderForm').on('submit', function (event) {
        event.preventDefault();
        const id = $('#reminderId').val();
        const reminderData = {
            reminderTitle: $('#reminderTitle').val(),
            reminderTime: $('#reminderTime').val()
        };

        if (id) {
            reminders[id] = reminderData;
        } else {
            reminders.push(reminderData);
        }

        $('#reminderForm')[0].reset();
        $.mobile.navigate('#manageRemindersPage');
        renderReminders();
    });

    $(document).on('click', '#reminderList a:not(.delete-reminder)', function () {
        const id = $(this).data('id');
        const reminderData = reminders[id];
        $('#reminderId').val(id);
        $('#reminderTitle').val(reminderData.reminderTitle);
        $('#reminderTime').val(reminderData.reminderTime);
    });

    $(document).on('click', '.delete-reminder', function () {
        const id = $(this).data('id');
        reminders.splice(id, 1);
        renderReminders();
    });

    // Manage Notes - CRUD Operations
    function renderNotes() {
        $('#noteList').empty();
        notes.forEach((item, index) => {
            $('#noteList').append(`
                <li>
                    <a href="#createNotePage" data-id="${index}">Note ${index + 1}</a>
                    <a href="#" class="delete-note" data-id="${index}">Delete</a>
                </li>
            `);
        });
        $('#noteList').listview('refresh');
    }

    $('#noteForm').on('submit', function (event) {
        event.preventDefault();
        const id = $('#noteId').val();
        const noteData = $('#noteContent').val();

        if (id) {
            notes[id] = noteData;
        } else {
            notes.push(noteData);
        }

        $('#noteForm')[0].reset();
        $.mobile.navigate('#manageNotesPage');
        renderNotes();
    });

    $(document).on('click', '#noteList a:not(.delete-note)', function () {
        const id = $(this).data('id');
        const noteData = notes[id];
        $('#noteId').val(id);
        $('#noteContent').val(noteData);
    });

    $(document).on('click', '.delete-note', function () {
        const id = $(this).data('id');
        notes.splice(id, 1);
        renderNotes();
    });

    // Initialize by rendering all lists
    renderClasses();
    renderReminders();
    renderNotes();
});
