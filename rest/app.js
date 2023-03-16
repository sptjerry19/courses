const coursesapi = "http://localhost:3000/courses";

// const listcourses = document.getElementById("list_courses");
// console.log(listcourses);

function start() {
    getCourse(function(courses) {
        renderCourse(courses);
    });

    handleCreateCourse();
}

start();

function getCourse(callback) {
    fetch(coursesapi)
    .then(function (response) {
        return response.json();
    })
    .then(callback)
    .catch(function (err) {
        alert("error");
    })
}

function renderCourse(courses) {
    const listcourses = document.getElementById("list_courses");
    let htmls = courses.map(function (course) {
        return `
            <li class="course_data_${course.id}">
                <div class="describe">
                    <h4>Title: ${course.title}</h4>
                    <p>Description: ${course.description}</p>
                </div>
                <div class="edit">
                    <button onclick="showUpdateCourse(${course.id})">update</button>
                    <button onclick="deleteCourse(${course.id})">delete</button>
                </div>
            </li>
        `
    })

    listcourses.innerHTML = htmls.join('');
}

function handleCreateCourse(id) {
    let createBtn = document.querySelector('#create');
    console.log(createBtn);
    createBtn.onclick = function () {
        let name = document.querySelector('input[name="title"]').value;
        let description = document.querySelector('input[name="description"]').value;

        let formdata = {
            title : name,
            description : description
        }
        createCourse(formdata);
    }
}

function createCourse(data, callback) {
    const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        //   'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
    fetch(coursesapi, options)
        .then(function (response) {
            return response.json();
        })
        .then(function() {
            getCourse(function(courses) {
                renderCourse(courses);
            });
        })
}

function showUpdateCourse(id) {
    const updateCourseID = document.querySelector('.update_course');
    updateCourseID.style.display = "block";
    const hideUpdateCourseID = document.querySelector('#hide');
    hideUpdateCourseID.onclick = function() {
        updateCourseID.style.display = "none";
    }
    handleUpdateCourse(id);
}

function handleUpdateCourse(id) {
    let updateBtn = document.querySelector('#update');
    console.log(updateBtn);
    updateBtn.onclick = function () {
        let name = document.querySelector('input[name="title_update"]').value;
        let description = document.querySelector('input[name="description_update"]').value;

        let formdata = {
            title : name,
            description : description
        }
        updateCourse(id, formdata);
    }
}

function updateCourse(id, data) {
    const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        //   'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(coursesapi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            getCourse(function(courses) {
                renderCourse(courses);
            });
        })
}

function deleteCourse(id) {
    const options = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        //   'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    fetch(coursesapi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            let deleteCourse = document.querySelector('.course_data_'+id);
            deleteCourse.remove();
        })
}