$(document).on('pageinit', function () {
    // Initial setup and load from localStorage
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Request Notification Permission
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    // Save data to localStorage
    function saveData() {
        localStorage.setItem('classes', JSON.stringify(classes));
        localStorage.setItem('reminders', JSON.stringify(reminders));
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Helper function to show notifications
    function showNotification(title, body) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: 'icon.png' // Add an icon if you have one
            });
        }
    }

    // Function to check and notify
    function checkAndNotify() {
        const now = new Date();
        const currentTime = now.toTimeString().split(' ')[0]; // Get HH:MM:SS

        // Notify for Classes
        classes.forEach(item => {
            if (item.courseDay === now.toLocaleString('en-us', { weekday: 'long' }) &&
                item.courseTimeFrom === currentTime) {
                showNotification(`Class Reminder`, `It's time for ${item.courseCode} - ${item.courseTitle}`);
            }
        });

        // Notify for Reminders
        reminders.forEach(item => {
            if (item.reminderTime === now.toISOString().substring(0, 19)) {
                showNotification(`Reminder`, item.reminderTitle);
            }
        });

        // Notify for Calendar Events
        events.forEach(item => {
            if (item.start === now.toISOString().substring(0, 19)) {
                showNotification(`Event Reminder`, item.title);
            }
        });
    }

    // Set up interval to check for notifications every minute
    setInterval(checkAndNotify, 60000);

    // (Rest of your CRUD operations and calendar rendering code remains the same)
    // ...

    // Initial Rendering
    renderClasses();
    renderReminders();
    renderNotes();
    renderCalendarEvents();
    updateCalendar();
});

$(document).on('pageinit', function () {
    // Load data from localStorage or initialize empty arrays if not found
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Save the data to localStorage
    function saveData() {
        localStorage.setItem('classes', JSON.stringify(classes));
        localStorage.setItem('reminders', JSON.stringify(reminders));
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Manage Classes - CRUD Operations
    function renderClasses() {
        $('#classList').empty();
        classes.forEach((item, index) => {
            $('#classList').append(`
                <li>
                    <h2>${item.courseCode} - ${item.courseTitle}</h2>
                    <p>Lecturer: ${item.lecturerName}</p>
                    <p>Building: ${item.building}</p>
                    <p>Room: ${item.roomNumber}</p>
                    <p>Day: ${item.courseDay}</p>
                    <p>Time: ${item.courseTimeFrom} - ${item.courseTimeTo}</p>
                    <a href="#createClassPage" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="editClass(${index})">Edit</a>
                    <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="deleteClass(${index})">Delete</a>
                </li>
            `);
        });
    }

    function editClass(index) {
        const item = classes[index];
        $('#classId').val(index);
        $('#courseCode').val(item.courseCode);
        $('#courseTitle').val(item.courseTitle);
        $('#lecturerName').val(item.lecturerName);
        $('#building').val(item.building);
        $('#roomNumber').val(item.roomNumber);
        $('#courseDay').val(item.courseDay);
        $('#courseTimeFrom').val(item.courseTimeFrom);
        $('#courseTimeTo').val(item.courseTimeTo);
    }

    function deleteClass(index) {
        classes.splice(index, 1);
        saveData(); // Save to localStorage
        renderClasses();
        updateCalendar();
    }

    $('#classForm').submit(function (event) {
        event.preventDefault();
        const index = $('#classId').val();
        const newClass = {
            courseCode: $('#courseCode').val(),
            courseTitle: $('#courseTitle').val(),
            lecturerName: $('#lecturerName').val(),
            building: $('#building').val(),
            roomNumber: $('#roomNumber').val(),
            courseDay: $('#courseDay').val(),
            courseTimeFrom: $('#courseTimeFrom').val(),
            courseTimeTo: $('#courseTimeTo').val()
        };

        if (index === '') {
            classes.push(newClass);
        } else {
            classes[index] = newClass;
        }

        saveData(); // Save to localStorage
        renderClasses();
        updateCalendar();
        $.mobile.changePage('#manageClassesPage');
    });

    // Manage Reminders - CRUD Operations
    function renderReminders() {
        $('#reminderList').empty();
        reminders.forEach((item, index) => {
            $('#reminderList').append(`
                <li>
                    <h2>${item.reminderTitle}</h2>
                    <p>Time: ${item.reminderTime}</p>
                    <a href="#createReminderPage" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="editReminder(${index})">Edit</a>
                    <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="deleteReminder(${index})">Delete</a>
                </li>
            `);
        });
    }

    function editReminder(index) {
        const item = reminders[index];
        $('#reminderId').val(index);
        $('#reminderTitle').val(item.reminderTitle);
        $('#reminderTime').val(item.reminderTime);
    }

    function deleteReminder(index) {
        reminders.splice(index, 1);
        saveData(); // Save to localStorage
        renderReminders();
        updateCalendar();
    }

    $('#reminderForm').submit(function (event) {
        event.preventDefault();
        const index = $('#reminderId').val();
        const newReminder = {
            reminderTitle: $('#reminderTitle').val(),
            reminderTime: $('#reminderTime').val()
        };

        if (index === '') {
            reminders.push(newReminder);
        } else {
            reminders[index] = newReminder;
        }

        saveData(); // Save to localStorage
        renderReminders();
        updateCalendar();
        $.mobile.changePage('#manageRemindersPage');
    });

    // Manage Notes - CRUD Operations
    function renderNotes() {
        $('#noteList').empty();
        notes.forEach((item, index) => {
            $('#noteList').append(`
                <li>
                    <h2>${item.noteTitle}</h2>
                    <p>${item.noteContent}</p>
                    <a href="#createNotePage" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="editNote(${index})">Edit</a>
                    <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="deleteNote(${index})">Delete</a>
                </li>
            `);
        });
    }

    function editNote(index) {
        const item = notes[index];
        $('#noteId').val(index);
        $('#noteTitle').val(item.noteTitle);
        $('#noteContent').val(item.noteContent);
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        saveData(); // Save to localStorage
        renderNotes();
    }

    $('#noteForm').submit(function (event) {
        event.preventDefault();
        const index = $('#noteId').val();
        const newNote = {
            noteTitle: $('#noteTitle').val(),
            noteContent: $('#noteContent').val()
        };

        if (index === '') {
            notes.push(newNote);
        } else {
            notes[index] = newNote;
        }

        saveData(); // Save to localStorage
        renderNotes();
        $.mobile.changePage('#manageNotesPage');
    });

    // Calendar Management
    function updateCalendar() {
        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            events: getCalendarEvents()
        });
    }

    function getCalendarEvents() {
        let events = [];

        classes.forEach((item) => {
            events.push({
                title: `${item.courseCode} - ${item.courseTitle}`,
                start: moment().day(item.courseDay).format('YYYY-MM-DD') + 'T' + item.courseTimeFrom,
                end: moment().day(item.courseDay).format('YYYY-MM-DD') + 'T' + item.courseTimeTo
            });
        });

        reminders.forEach((item) => {
            events.push({
                title: item.reminderTitle,
                start: item.reminderTime,
                allDay: false
            });
        });

        return events;
    }

    // Manage Calendar Events
    function renderCalendarEvents() {
        $('#eventList').empty();
        events.forEach((item, index) => {
            $('#eventList').append(`
                <li>
                    <h2>${item.title}</h2>
                    <p>Start: ${item.start}</p>
                    <p>End: ${item.end || 'N/A'}</p>
                    <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-b" onclick="deleteEvent(${index})">Delete</a>
                </li>
            `);
        });
    }

    function deleteEvent(index) {
        events.splice(index, 1);
        saveData(); // Save to localStorage
        renderCalendarEvents();
        updateCalendar();
    }

    $('#addEventBtn').click(function () {
        // Code to add a new event (e.g., show a form for event creation)
        // For simplicity, this example assumes a prompt-based interface
        const title = prompt("Event Title:");
        const start = prompt("Event Start (YYYY-MM-DDTHH:MM:SS):");
        const end = prompt("Event End (YYYY-MM-DDTHH:MM:SS):");

        if (title && start) {
            events.push({ title, start, end });
            saveData(); // Save to localStorage
            renderCalendarEvents();
            updateCalendar();
        }
    });

    // Initial Rendering
    renderClasses();
    renderReminders();
    renderNotes();
    renderCalendarEvents();
    updateCalendar();
});
