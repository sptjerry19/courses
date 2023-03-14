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
            <li>
                <h4>${course.title}</h4>
                <p>${course.description}</p>
                <button onclick="deleteCourse(${course.id})">delete</button>
            </li>
        `
    })

    listcourses.innerHTML = htmls.join('');
}

function handleCreateCourse() {
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
        .then(callback)
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
        .then(callback)
}