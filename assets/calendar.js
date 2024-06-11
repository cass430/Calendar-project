/*
 * Student Name: Cassidy Perry
 * Student ID: 041038298
 * Course: CST8209 - Web Programming I
 * Semester: Winter 2024
 * Assignment: 3
 * Date Submitted: Apr. 13, 2024
 */

function Calendar(elem) {
  // HTML element to display the calendar
  this.elem = elem;

  //days of the week
  this.dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Returns the month name of the year for month index.
  this.getMonth = function (monthIndex) {
    switch (monthIndex) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "Unknown";
    }
  };

  // Returns the number of days in the month for month index & year.
  this.getDaysInMonth = function (monthIndex, year) {
    if (
      monthIndex === 0 ||
      monthIndex === 2 ||
      monthIndex === 4 ||
      monthIndex === 6 ||
      monthIndex === 7 ||
      monthIndex === 9 ||
      monthIndex === 11
    ) {
      return 31;
    } else if (monthIndex === 1 && year % 4 === 0) {
      return 29;
    } else if (monthIndex === 1) {
      return 28;
    } else {
      return 30;
    }
  };

  // method display generates calendar HTML
  // the displayDate parameter indicates the year and month to display
  // method display generates calendar HTML
  // the displayDate parameter indicates the year and month to display
  this.display = function (displayDate = new Date()) {
    // clear the calendar element
    this.elem.empty();

    // create table element using jQuery
    let table = $("<table></table>");
    let thead = $("<thead></thead>");
    let tbody = $("<tbody></tbody>");

    // a row containing the previous month button, month name and year, and next month button
    // the previous and next month buttons call the cal.display() method when clicked
    // with parameters of year displayed, but previous or next month
    // dates will "carry forward", increasing or decreasing the year automatically
    let row = $("<tr></tr>");

    /********************************************
     * (JQuery crash course [2] - events 2016)
     ********************************************/
    let prevButtonCell = $("<td></td>");
    let prevButton = $("<button> Previous Month </button>").attr(
      "value",
      "Previous Month"
    );
    prevButton.click(function () {
      cal.display(
        new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1)
      );
    });

    prevButtonCell.append(prevButton);
    row.append(prevButtonCell);

    let monthYearCell = $("<td colspan='5'> </td>");
    let monthYearHeader = $("<h1> </h1>").text(
      this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear()
    );
    monthYearCell.append(monthYearHeader);
    row.append(monthYearCell);

    let nextButtonCell = $("<td> </td>");
    let nextButton = $("<button> Next Month </button>").attr(
      "value",
      "Next Month"
    );
    nextButton.click(function () {
      cal.display(
        new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1)
      );
    });
    nextButtonCell.append(nextButton);
    row.append(nextButtonCell);

    thead.append(row);

    // row of weekday name headers
    // loop through the array, creating a table header cell for each element in the array
    row = $("<tr></tr>");
    for (const elem of this.dayNames) {
      let th = $("<th></th>").text(elem);
      row.append(th);
    }
    thead.append(row);

    // calendar table body rows (days of the month)
    // start with blank cells until 1st of month
    row = $("<tr></tr>");

    // loop from 0 until the first day of the month (Sunday, until the day of the week of the first day of the month)
    // create an empty table cell for each blank day

    /***********************
     * OpenAI, 2021
     * ********************/
    for (
      let i = 0;
      i <
      new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();
      i++
    ) {
      row.append($("<td></td>"));
    }

    // for each day within the month, create a table cell containing the date
    let daysInMonth = this.getDaysInMonth(
      displayDate.getMonth(),
      displayDate.getFullYear()
    );
    for (let i = 1; i <= daysInMonth; i++) {
      let dayCell = $("<td></td>").addClass("day").text(i);
      row.append(dayCell);

      // if this day is a Saturday or the last day of the month, end the week table row, and start a new row
      if (
        new Date(
          displayDate.getFullYear(),
          displayDate.getMonth(),
          i
        ).getDay() === 6 ||
        i === daysInMonth
      ) {
        tbody.append(row);
        row = $("<tr></tr>");
      }
    }

    // last week of month empty cells to fill the week
    // create an empty table cell for each blank day
    for (
      let i =
        new Date(
          displayDate.getFullYear(),
          displayDate.getMonth(),
          daysInMonth
        ).getDay() + 1;
      i < 7;
      i++
    ) {
      row.append($("<td></td>"));
    }

    tbody.append(row);

    // append table elements to the calendar element
    table.append(thead);
    table.append(tbody);
    this.elem.append(table);
  };
}
// declare an instance of Calendar
const cal = new Calendar($("#calendar"));

// call the display() method
cal.display();

/* 
**********************************************
(JQuery form validation | form validation tutorial using jQuery 2021)*
********************************************/

$(document).ready(function () {
  $(function () {
    /* (Shuba.ivan et al., Jquery-form-validator validate format date in datepicker 2018) */

    $("#eventDate").datepicker({
      dateFormat: "Month 00, 0000", // Set the date format to "Month 00, 0000"
      showAnim: "drop",
      changeMonth: true,
      changeYear: true,
      showWeek: true,
    });
  });

  // Form validation
  $("#formValidation").validate({
    rules: {
      eventDate: {
        required: true,
        date: true,
      },
      eventTitle: {
        required: true,
        minlength: 3,
      },
    },
    messages: {
      eventDate: {
        required: "Please enter the event date.",
        date: "Please enter a valid date.",
      },
      eventTitle: {
        required: "Please enter the event title.",
        minlength: "Event title must be at least 3 characters long.",
      },
    },
    submitHandler: function (form) {
      form.submit();
      alert("Successfully added event");

      form.reset();

      /************************************************** 
(VijayVijay Declare empty array in javascript 2015) */

      // Create a string with event information and add it to the events array
      var eventInfo =
        "Event Date: " +
        $("#eventDate").val() +
        ", Event Title: " +
        $("#eventTitle").val();
      events.push(eventInfo);

      console.log(events);
    },
    errorPlacement: function (error, element) {
      error.insertAfter(element).addClass("error-message"); // Display error message after each form element/ add css class.
    },
  });
});

//manually trying to fix the toggle close
$("#new-event-button").click(function () {
  $("#collapseExample").collapse("toggle");
});

var second = 0;
var minute = 0;
var hour = 0;

var d = new Date();

//calls function every 1000 miliseconds or every second
setInterval(function () {
  /* to set current time */
  const time = new Date();
  const hour = -3600 * (time.getHours() % 12);
  const mins = -60 * time.getMinutes();
  app.style.setProperty("--_dm", `${mins}s`);
  app.style.setProperty("--_dh", `${hour + mins}s`);
}, 1000);
