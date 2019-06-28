// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBjgRKGzcr5G7FgVfQHKLuMm09FUzMsZrw",
  authDomain: "edms-fc5f6.firebaseapp.com",
  databaseURL: "https://edms-fc5f6.firebaseio.com",
  projectId: "edms-fc5f6",
  storageBucket: "",
  messagingSenderId: "397450958640",
  appId: "1:397450958640:web:744d4f65545039a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase database
var database = firebase.database();

$(document).ready(function() {
    console.log(moment().format())
});

$("#submit").on("click", function(event) {
  var employeeName = $('#employeeName').val().trim();
  var role = $('#role').val().trim();
  var startDate = $('#startDate').val().trim();
  var monthlyRate = $('#monthlyRate').val().trim();

  database.ref().push({
    employeeName: employeeName,
    role: role,
    startDate: startDate,
    monthlyRate: monthlyRate
  });
});

/*
    Once the database is updated, window will be updated with the 
    information from the Database
*/
database.ref().on(
  "child_added",
  function(snapshot) {

    var monthsWorked = getMonthsWorks(moment(snapshot.val().startDate), "MM-DD-YYYY");
    var totalBilled = monthsWorked * snapshot.val().monthlyRate

    $("#employees").append(`<tr>
    <td>${snapshot.val().employeeName}</td>
    <td>${snapshot.val().role}</td>
    <td>${snapshot.val().startDate}</td>
    <td>${monthsWorked}</td>
    <td>${snapshot.val().monthlyRate}</td>
    <td>${totalBilled}</td>
  </tr>`);


  },
  function(err) {
    console.error(err);
  }
);



var getMonthsWorks = function(monthStarted) {
    var currentTime = moment();
    return currentTime.diff(monthStarted, 'months');
}
