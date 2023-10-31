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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var info = {
    "student_num":"",
    "time":""
};

day = new Date().getDate()
month = new Date().getMonth()
year = new Date().getFullYear()


if(day < 10) {
    day = String(0) + String(day)
}

if(month + 1 < 10) {
    month = String(0) + String(month)
}

if(year < 10) {
    year = String(0) + String(year)
}

today = String(day) + String(month + 1) + String(year)

console.log(String(day))
console.log(String(month + 1))
console.log(String(year))

// firebase.database().ref("Code/").set({
//     "Code": "18374"
// })

// firebase.database().ref("").once('value', function(snapshot) {

// })

function code() {
    if(document.getElementById("info-Input").value != "") {
        console.log(students_Nums.includes(Number(document.getElementById("info-Input").value)))
        console.log(students_Nums)
        console.log(document.getElementById("info-Input").value)

        if(students_Nums.includes(Number(document.getElementById("info-Input").value))) {
            info.student_num = document.getElementById("info-Input").value
            document.getElementById("text-Input").style.transition = ".5s"
            document.getElementById("text-Input").style.opacity = "0"

            setTimeout(function() {
                document.getElementById("info-Input").setAttribute("placeholder", "Todays Code")
                document.getElementById("info-Input").setAttribute("type", "text")
                document.getElementById("info-Input").value = ""
                document.getElementById("enter-Button").style.opacity = .5
                
                document.getElementById("enter-Button").setAttribute("onclick", "here()")
                document.getElementById("button-Text").innerText = "Here"
                document.getElementById("text-Input").style.opacity = "1"
            }, 500);
        } else {
            document.getElementById("info-Input").style.animation = "notCorrect 2s forwards"
            document.getElementById("button-Text").style.transition = ".5s"
            document.getElementById("button-Text").style.opacity = "0"
            setTimeout(function() {
                document.getElementById("button-Text").innerText = "Doesn't Exist"
                document.getElementById("button-Text").style.opacity = "1"
                setTimeout(function() {
                    document.getElementById("button-Text").style.opacity = "0"
                    setTimeout(function() {
                        document.getElementById("button-Text").style.opacity = "1"
                        document.getElementById("button-Text").innerText = "Enter"
                        document.getElementById("info-Input").style.opacity = "0"
                        setTimeout(function() {
                            document.getElementById("info-Input").value = ""
                            document.getElementById("info-Input").style.opacity = "1"
                        }, 500)
                    }, 500)
                }, 1000)
            }, 500)
        }
    }
}

const here = function() {
    if(document.getElementById("info-Input").value != "") {
        firebase.database().ref("Code/").on("value", function(snapshot) {

            if(snapshot.val().Code == document.getElementById("info-Input").value) {
                hour = new Date().getHours()
                min = new Date().getMinutes()
                sec = new Date().getSeconds()
                if(sec < 10) {
                    sec = String(0) + String(sec)
                }

                if(min < 10) {
                    min = String(0) + String(min)
                }

                if(hour < 10) {
                    hour = String(0) + String(hour)
                }

                var pathToCheck = firebase.database().ref("Days/" + today + "/" + info.student_num);

                pathToCheck.once("value")
                .then(function(snapshot) {
                    if (snapshot.exists()) {
                        document.getElementById("final-Text").style.marginTop = "-16px"
                        document.getElementById("final-Text").innerText = "Already Signed In"
                        document.getElementById("signed-In-At-Text").style.marginTop = "16px"
                        document.getElementById("signed-In-At-Text").style.opacity = "1"
                        document.getElementById("signed-In-At-Text").innerText = "Signed In At " + snapshot.val().time
                        
                        document.getElementById("text-Input").style.transition = ".5s"
                        document.getElementById("text-Input").style.opacity = "0"
                        setTimeout(function() {
                            document.getElementById("end-Screen").style.opacity = "1"
                        }, 500);
                    } else {
                        firebase.database().ref("Days/" + today + "/" + info.student_num).update({
                            "student": info.student_num,
                            "time":String(hour) + ":" + String(min) + ":" + String(sec)
                        }).then( function() {
                            document.getElementById("text-Input").style.transition = ".5s"
                            document.getElementById("text-Input").style.opacity = "0"
                            setTimeout(function() {
                                document.getElementById("end-Screen").style.opacity = "1"

                                setTimeout(function() {
                                    runConfetti()
                                }, 500)
                            }, 500);
                        })
                        
                    }
                })
                .catch(function(error) {
                    console.error("Error checking path:", error);
                });
            } else {
                console.log("wrong")

                document.getElementById("info-Input").style.animation = "notCorrect 2s forwards"
                document.getElementById("button-Text").style.transition = ".5s"
                document.getElementById("button-Text").style.opacity = "0"
                setTimeout(function() {
                    document.getElementById("button-Text").innerText = "Wrong"
                    document.getElementById("button-Text").style.opacity = "1"
                    setTimeout(function() {
                        document.getElementById("button-Text").style.opacity = "0"
                        setTimeout(function() {
                            document.getElementById("button-Text").style.opacity = "1"
                            document.getElementById("button-Text").innerText = "Here"
                            document.getElementById("info-Input").style.opacity = "0"
                            setTimeout(function() {
                                document.getElementById("info-Input").value = ""
                                document.getElementById("info-Input").style.opacity = "1"
                            }, 500)
                        }, 500)
                    }, 1000)
                }, 500)
                // animation: notCorrect 2s forwards;
            }
        })
    }
}

function checkLength() {
    if(document.getElementById("info-Input").value.length != 0) {
        document.getElementById("enter-Button").style.cursor = "pointer"
        document.getElementById("enter-Button").style.opacity = 1
    } else {
        document.getElementById("enter-Button").style.cursor = "default"
        document.getElementById("enter-Button").style.opacity = .5
    }
}