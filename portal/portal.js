const firebaseConfig = {
    apiKey: "AIzaSyDOrwFpiYuD7Fatx5P4YKqO-vM6quVrYRM",
    authDomain: "dateyet-a69a0.firebaseapp.com",
    databaseURL: "https://dateyet-a69a0-default-rtdb.firebaseio.com",
    projectId: "dateyet-a69a0",
    storageBucket: "dateyet-a69a0.appspot.com",
    messagingSenderId: "68054972373",
    appId: "1:68054972373:web:108f33f587f6908bf3ef5c",
    measurementId: "G-TVZPWBWJ7P"
};

firebase.initializeApp(firebaseConfig);

// const students_Names = [
//     "John Smith",
//     "Emma Johnson",
//     "Michael Williams",
//     "Olivia Brown",
//     "William Davis",
//     "Sophia Garcia",
//     "James Rodriguez",
//     "Emily Martinez",
//     "Alexander Hernandez",
//     "Charlotte Lopez",
//     "Daniel Gonzalez",
//     "Ava Wilson",
//     "Matthew Anderson",
//     "Amelia Moore",
//     "Joseph Taylor",
//     "Abigail Lewis",
//     "David Lee",
//     "Harper Hall",
//     "Andrew White",
//     "Ella Clark",
//     "Josephine Lewis",
//     "Gabriel Turner",
//     "Grace Scott",
//     "Nicholas Harris",
//     "Madison Young",
//     "Benjamin Walker",
//     "Elizabeth King",
//     "Samuel Turner",
//     "Lily Adams",
//     "Christopher Hill"
// ];

// const students_Nums = [
//     123456789,
//     987654321,
//     234567890,
//     876543210,
//     345678901,
//     765432109,
//     456789012,
//     654321987,
//     567890123,
//     321098765,
//     678901234,
//     210987654,
//     789012345,
//     432109876,
//     543210987,
//     123098765,
//     789765432,
//     456123789,
//     987210345,
//     890654321,
//     109876543,
//     678432109,
//     567109823,
//     987654312,
//     890765432,
//     876543210,
//     987654321,
//     123456789,
//     234567890,
//     345678901
// ];

function convertArrayToLowercase(arr) {
// Use the map method to create a new array with all values converted to lowercase
return arr.map(function(item) {
    if (typeof item === 'string') {
    return item.toLowerCase();
    }
    // If the item is not a string, return it as is
    return item;
});
}

// Example usage:
var students_Names_Lower = convertArrayToLowercase(students_Names);
// console.log(students_Names_Lower); // Output: ["apple", "banana", "cherry"]

var studentsHere = []

var here_Count = 0
day = new Date().getDate()
month = new Date().getMonth()
year = new Date().getFullYear()

hour = new Date().getHours()
min = new Date().getMinutes()
sec = new Date().getSeconds()

time = String(hour) + ":" + String(min) + ":" + String(sec)

textMonth = month

my_Student_Num = 678432109

if(day < 10) {
    day = 0 + String(day)
}

if(textMonth < 10) {
    textMonth = 0 + String(textMonth)
}

if(year < 10) {
    year = 0 + String(year)
}

day2 = new Date().getDate()
month2 = new Date().getMonth()
year2 = new Date().getFullYear()


if(day2 < 10) {
    day2 = String(0) + String(day2)
}

if(month2 + 1 < 10) {
    month2 = String(0) + String(month2)
}

if(year2 < 10) {
    year2 = String(0) + String(year2)
}

today = String(day2) + String(month2 + 1) + String(year2)

path = "Days/" + today


// firebase.database().ref(path + "/" + my_Student_Num).set({"student": my_Student_Num, "time": time})

firebase.database().ref(path).once("value", function(snapshot) {
    here_Count = 0
    snapshot.forEach(function(child) {
        studentMarked(child.val())
        studentsHere.push(String(child.val().student).toLowerCase())
        here_Count += 1
    })
    
    document.getElementById('progressbar').style.animation = "growProgressBar 3s 1 forwards"
    document.documentElement.style.setProperty('--value', "calc((" + here_Count + " / " + students_Names.length + ") * 100)");
    document.getElementById("number-Fraction").innerText = here_Count + "/" + students_Names.length

    function updateCount(num) {
        here_Count += num
        document.getElementById('progressbar').style.animation = "growProgressBar 3s 1 forwards"
        document.documentElement.style.setProperty('--value', "calc((" + here_Count + " / " + students_Names.length + ") * 100)");
        document.getElementById("number-Fraction").innerText = here_Count + "/" + students_Names.length
    }
})

firebase.database().ref(path).on("child_added", function(snapshot) {
    // here_Count = 0
    studentMarked(snapshot.val())
    studentsHere.push(String(snapshot.val().student).toLowerCase())
    here_Count += 1
    // snapshot.forEach(function(child) {
    //     studentMarked(child.val())
    // })
    
    document.getElementById('progressbar').style.animation = "growProgressBar 3s 1 forwards"
    document.documentElement.style.setProperty('--value', "calc((" + here_Count + " / " + students_Names.length + ") * 100)");
    document.getElementById("number-Fraction").innerText = here_Count + "/" + students_Names.length

    function updateCount(num) {
        here_Count += num
        document.getElementById('progressbar').style.animation = "growProgressBar 3s 1 forwards"
        document.documentElement.style.setProperty('--value', "calc((" + here_Count + " / " + students_Names.length + ") * 100)");
        document.getElementById("number-Fraction").innerText = here_Count + "/" + students_Names.length
    }
})

var months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

var date = months[month - 1] + " " + day + ", " + year

accountOpened = false

document.getElementById("date").textContent = date
document.getElementById("date-1").textContent = date

for(var i=0;i<students_Names.length;i++) {
    addElement(i, i)
}

function addElement(i, actual_Index) {
    document.getElementById("lists").innerHTML += '<div class="student-Container" onclick="openAccount(`' + actual_Index + '`)"><div class="student-Info"><div class="student-Name">' + students_Names[i] + '</div><div class="student-Num">' + students_Nums[i] + '</div></div><div id="time-' + students_Nums[i] + '" class="time">-</div><svg class="icon" id="icon-' + students_Nums[i] + '" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></div>'
}

function addElementHere(i, actual_Index) {
    document.getElementById("lists").innerHTML += '<div class="student-Container" onclick="openAccount(`' + actual_Index + '`)"><div class="student-Info"><div class="student-Name">' + students_Names[i] + '</div><div class="student-Num">' + students_Nums[i] + '</div></div><div id="time-' + students_Nums[i] + '" class="time">-</div><svg class="icon" id="icon-' + students_Nums[i] + '" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></div>'

    document.getElementById("icon-" + students_Nums[i]).style.fill = "rgb(36, 167, 34)"
}

function openAccount(index) {
    if(accountOpened) {

        document.getElementById("student-Info-Side-Container").style.transition = ".5s"
        document.getElementById("student-Info-Side-Container").style.opacity = "0"
        setTimeout(function() {
            document.getElementById("name").innerText = students_Names[index]
            document.getElementById("student-Num").innerText = students_Nums[index]
            document.getElementById("avg-Sign-In-Time").innerText = document.querySelectorAll(".time")[index].innerHTML

            if(document.querySelectorAll(".time")[index].innerHTML == "-") {
                document.getElementById("icon-Selected-Student").style.fill = "rgb(60, 60, 60)"
                document.getElementById("icon-Selected-Student").innerHTML = '<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>'
            } else {

                document.getElementById("icon-Selected-Student").style.fill = "rgb(36, 167, 34)"
                document.getElementById("icon-Selected-Student").innerHTML = '<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>'
            }

            document.getElementById("student-Info-Side-Container").style.transition = ".5s"
            document.getElementById("student-Info-Side-Container").style.opacity = "1"
        }, 500)

    } else {
        document.getElementById("no-Student-Selected").style.transition = ".5s"
        document.getElementById("no-Student-Selected").style.opacity = "0"
        document.getElementById("current-Student-Selected").style.transition = ".5s"
        document.getElementById("current-Student-Selected").style.background = "transparent"
        setTimeout(function() {
            document.getElementById("name").innerText = students_Names[index]
            document.getElementById("student-Num").innerText = students_Nums[index]
            document.getElementById("avg-Sign-In-Time").innerText = document.querySelectorAll(".time")[index].innerHTML
            document.getElementById("current-Student-Selected").style.transition = "0s"
            document.getElementById("current-Student-Selected").style.padding = "0px"

            if(document.querySelectorAll(".time")[index].innerHTML == "-") {
                document.getElementById("icon-Selected-Student").style.fill = "rgb(60, 60, 60)"
                document.getElementById("icon-Selected-Student").innerHTML = '<path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>'
            } else {

                document.getElementById("icon-Selected-Student").style.fill = "rgb(36, 167, 34)"
                document.getElementById("icon-Selected-Student").innerHTML = '<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>'
            }
            
            setTimeout(function() {
                document.getElementById("student-Info-Side-Container").style.transition = ".5s"
                document.getElementById("student-Info-Side-Container").style.opacity = "1"
            }, 500)
        }, 500)
    }
    
    accountOpened = true
}

function studentMarked(info) {
    document.getElementById("time-" + info.student).style.transition = ".5s"
    document.getElementById("time-" + info.student).style.opacity = "0"
    document.getElementById("icon-" + info.student).style.transition = ".5s"
    document.getElementById("icon-" + info.student).style.opacity = "0"
    setTimeout(function() {
        document.getElementById("time-" + info.student).innerText = info.time
        document.getElementById("time-" + info.student).style.opacity = "1"
        document.getElementById("icon-" + info.student).style.opacity = "1"
        document.getElementById("icon-" + info.student).innerHTML = '<path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>'
        document.getElementById("icon-" + info.student).style.fill = "rgb(36, 167, 34)"
    }, 500)
}


function searchNames(search_Val) {
    document.getElementById("lists").innerHTML = '<div id="top-Hide"></div><div id="bottom-Hide"></div><div id="cover"></div>'
    // console.log(search_Val)
    if(search_Val == "") {
        for(var i=0;i<students_Names.length;i++) {
            if(studentsHere.includes(students_Nums[i])) {
                addElementHere(i, i)
            } else {
                addElement(i, i)
            }
        }
    } else {
        for(var i2 = 0; i2 < 1; i2++) {
            var textBoxString = search_Val
    
            var finalName = textBoxString.toLowerCase();
            // console.log(names[0])
            // document.getElementById("no-User-Found-Holder").style.display = "none";
        
            if (textBoxString != "") {
        
                myNames = students_Names_Lower.filter((students_Names_Lower) => students_Names_Lower.includes(finalName));
                // myNames += students_Nums.filter((students_Nums) => students_Nums.includes(Number(finalName)));
            
                var html = "";
            
                // Output new array
                if (myNames.length != 0) {
                    for (var i = 0; i < myNames.length; i++) {
                        var currentMyName = myNames[i]
                        var currentShownName = myNames[i].charAt(0).toUpperCase() + myNames[i].slice(1);
                        // document.getElementById("possible-Searches-Holder").innerHTML = " ";

                        // console.log(studentsHere.includes(String(students_Nums[students_Names_Lower.indexOf(myNames[i])])))
                        // console.log(studentsHere.includes(String(students_Nums[students_Names_Lower.indexOf(myNames[i])])))
                        if(studentsHere.includes(students_Nums[students_Names_Lower.indexOf(myNames[i])])) {
                            console.log(myNames)
                            addElementHere(students_Names_Lower.indexOf(myNames[i]), i)
                        } else {
                            addElement(students_Names_Lower.indexOf(myNames[i]), i)
                        }
                        // console.log(students_Names_Lower.indexOf(myNames[i]))
                        // addElement(students_Names_Lower.indexOf(myNames[i]), i)
                        // firebase.database().ref("TDSB/Users/" + currentMyName).on("value", function (snapshot) {
                        //     html += "<div class='search-Profile-Holder'>"
                        //     html +=     '<div class="search-Profile-Image-Holder">'
                        //     html +=         '<img src="' + snapshot.val().imgURL + '" class="search-Profile-Img">'
                        //     html +=     '</div>'
                        //     html +=     '<div class="search-Profile-Name">' + snapshot.val().Name + '</div>'
                        //     html +=     '<button class="chat-Button" onclick="openChat(myNames, '+i+');">';
                        //     html +=         "Chat";
                        //     html +=     "</button>";
                        //     html += "</div>"
                        // });

                        // document.getElementById("no-User-Found-Holder").style.display = "none";
                        }
                    } else {
                        // document.getElementById("possible-Searches-Holder").innerHTML = " ";
                        // document.getElementById("no-User-Found-Holder").style.display = "flex";
                    }
                    // document.getElementById("possible-Searches-Holder").innerHTML += html;
            } else {
                console.log()
                // document.getElementById("possible-Searches-Holder").innerHTML = " ";
            }
        }
    }
}

function openAddStudent() {
    document.getElementById("add-Student-Container").style.zIndex = "100"
    setTimeout(function() {
        
        document.getElementById("add-Student-Container").style.transition = ".5s"
        document.getElementById("add-Student-Container").style.opacity = "1"
        setTimeout(function() {
            document.getElementById("add-Student-Container").style.transition = "0s"
        }, 500)
    }, 175)
}

function closeAddStudentContainer() {
    document.getElementById("add-Student-Container").style.transition = ".5s"
    document.getElementById("add-Student-Container").style.opacity = "0"
    setTimeout(function() {
        document.getElementById("add-Student-Container").style.zIndex = "-100"
    }, 175)
}

function checkValueText() {
    var value1 = document.getElementById("student-Name-Input").value
    var value2 = document.getElementById("student-Num-Input").value

    if(value1 != "" && value2 != "") {
        document.getElementById("actual-Add-Student-Button").classList.add("active")
    } else {
        document.getElementById("actual-Add-Student-Button").classList.remove("active")
    }
}