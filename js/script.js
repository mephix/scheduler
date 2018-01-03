// ====================== //
// ###  CALENDAR API  ### //
// ====================== //
var CLIENT_ID = '';
var API_KEY = '';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var findScheduleButton = document.getElementById('findSchedule-button');
// On load, called to load the auth2 library and API client library.
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
// Initializes the API client library and sets up sign-in state
// listeners.
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        listButton.onclick = handleListClick;
    });
}
// Called when the signed in status changes, to update the UI
// appropriately. After a sign-in, the API is called.
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        findSchedule.style.display = 'block'
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        findSchedule.style.display = 'none';
    }
}
// Sign in the user upon button click.
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
//  Sign out the user upon button click.
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/* ====================== */
/* ### FRONT END ### */
/* ====================== */
// scroll to top
function scrollToTop() {
    window.scrollTo(0, 0);
}
// scroll actions (show scroll to top fab and navbar shadow)
var pxScrolled = 10;
var duration = 500;
$(window).scroll(function() {
    if ($(this).scrollTop() > pxScrolled) {
        $('.fab-container').css({
            'bottom': '0px',
            'transition': '.2s'
        });
        $('.navbar').css({
            'box-shadow': '0 3px 6px rgba(0,0,0,0.16)',
            'transition': '.1s'
        });

    } else {
        $('.fab-container').css({
            'bottom': '-72px'
        });
        $('.navbar').css({
            'box-shadow': 'none',
        });
    }
});

// responsive table format for mobile
function initResponsiveTables() {
    tables = document.querySelectorAll(".table")
    for (t = 0; t < tables.length; ++t) {
        var headertext = []
          , headers = tables[t].querySelectorAll("table.table th")
          , tablebody = tables[t].querySelector("table.table tbody");
        for (var i = 0; i < headers.length; i++) {
            var current = headers[i];
            headertext.push(current.textContent.replace(/\r?\n|\r/, ""));
        }
        for (var i = 0, row; row = tablebody.rows[i]; i++) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                col.setAttribute("data-th", headertext[j]);
            }
        }
    }
}

// table filters
function filterTable() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filterTableInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("residentTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/*
$(window).on('load', function() {
  $('.table').toggleClass('table-responsive', $(window).width() < 768);
  $('.table-responsive').toggleClass('table-sm', $(window).width() < 768);
*/
// datepicker
$(function () {
    //default date range picker
    $('#daterange').daterangepicker({
        autoApply:true
    });

    //date time picker
    $('#timepicker').daterangepicker({
        timePicker: true,
        datePicker: false,
        timePickerIncrement: 60,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }
    });

    //single date
    $('#date').daterangepicker({
        singleDatePicker: false,
    });
});
    /*$('.startdatepicker').datetimepicker({
        format: 'mm/dd/yyyy',
        minView: '2',
        maxView: '3',
        autoclose: true,
        todayBtn: true,
        todayHighlight: true,
        fontAwesome: true,
    });

    $('.enddatepicker').datetimepicker({
        format: 'mm/dd/yyyy',
        minView: '2',
        maxView: '3',
        autoclose: true,
        todayBtn: true,
        todayHighlight: true,
        fontAwesome: true,
    });

    $("#starttimepicker").datetimepicker({
        formatViewType: 'time',
        autoclose: true,
        startView: 1,
        
        format: 'hh:ii'
    }).on("show", function() {
        $(".table-condensed .prev").css('visibility', 'hidden');
        $(".table-condensed .switch").text("Select a Time");
        $(".table-condensed .next").css('visibility', 'hidden');
    });

    $("#endtimepicker").datetimepicker({
        formatViewType: 'time',
        autoclose: true,
        startView: 1,
       
        format: 'hh:ii'
    }).on("show", function() {
        $(".table-condensed .prev").css('visibility', 'hidden');
        $(".table-condensed .switch").text("Select a Time");
        $(".table-condensed .next").css('visibility', 'hidden');
    });

    $('.datetimepicker').datetimepicker('update', new Date())*/


// pager number format
$(".pager-format").keypress(function(e) {
    if (e.which != 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
    var curchr = this.value.length;
    var curval = $(this).val();
    if (curchr == 3 && curval.indexOf("(") <= -1) {
        $(this).val("(" + curval + ")" + " ");
    } else if (curchr == 4 && curval.indexOf("(") > -1) {
        $(this).val(curval + ") ");
    } else if (curchr == 5 && curval.indexOf(")") > -1) {
        $(this).val(curval + "-");
    } else if (curchr == 9) {
        $(this).val(curval + "-");
        $(this).attr('maxlength', '14');
    }
});
initResponsiveTables();

/* ====================== */
/* ### ANGULAR ### */
/* ====================== */
// initialize app and controller
var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', function($scope, $filter) {
    $scope.orderBy = function(filter) {
        // initialize filter function
        $scope.order = filter;
    }
    ;
    /* === RESIDENTS === */
    $scope.triggerResidentForm = false;
    $scope.editResidentForm = false;
    $scope.addResidentForm = false;

    // seed resident data
    $scope.residents = [{
        id: 1,
        name: 'Kejriwal, V',
        level: '1',
        pager: '(510) 718-7138',
        email: '',
        team: 'AC SICU',
    }, {
        id: 2,
        name: 'Le, S',
        level: '1',
        pager: '(510) 718-7139',
        email: '',
        team: 'AC SICU',
    }, {
        id: 3,
        name: 'De Boer, C',
        level: '1',
        pager: '(510) 718-7134',
        email: '',
        team: 'AC Acute',
    }, {
        id: 4,
        name: 'Stern, K',
        level: '1',
        pager: '(510) 718-7144',
        email: '',
        team: 'AC Acute',
    }, {
        id: 5,
        name: 'Du, W',
        level: '1',
        pager: '(510) 718-7136',
        email: '',
        team: 'AC SICU',
    }, {
        id: 6,
        name: 'Lei, B',
        level: '1',
        pager: '(510) 718-7140',
        email: '',
        team: 'AC Blue',
    }, {
        id: 7,
        name: 'Kavanaugh, M',
        level: '1',
        pager: '(510) 718-7137',
        email: '',
        team: 'AC ES',
    }, {
        id: 8,
        name: 'Chou, D',
        level: '1',
        pager: '(510) 718-7147',
        email: '',
        team: 'AC Acute',
    }, {
        id: 9,
        name: 'Machino, K',
        level: '1',
        pager: '(510) 718-7141',
        email: '',
        team: 'AC Acute',
    }, {
        id: 10,
        name: 'Mazanec, P',
        level: '1',
        pager: '(510) 718-7142',
        email: '',
        team: 'AC SICU',
    }, {
        id: 11,
        name: 'Mooney, C',
        level: '1',
        pager: '(510) 718-7143',
        email: '',
        team: 'KO GS',
    }, {
        id: 12,
        name: 'Brunson, C',
        level: '1',
        pager: '(510) 718-7132',
        email: '',
        team: 'AC ES',
    }, {
        id: 13,
        name: 'Vinson, A',
        level: '1',
        pager: '(510) 718-7146',
        email: '',
        team: 'CHO',
    }, {
        id: 14,
        name: 'Cochran, M',
        level: '1',
        pager: '(510) 718-7133',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 15,
        name: 'Huwyler, C',
        level: '1',
        pager: '(510) 718-7148',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 16,
        name: 'Trinidad, N',
        level: '1',
        pager: '(510) 718-7145',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 17,
        name: 'Caccamo, S',
        level: '2',
        pager: '(510) 718-6252',
        email: '',
        team: 'AC Acute',
    }, {
        id: 18,
        name: 'Jackson, J',
        level: '2',
        pager: '(510) 718-6243',
        email: '',
        team: 'AC Acute',
    }, {
        id: 19,
        name: 'Tang, A',
        level: '2',
        pager: '(510) 718-6253',
        email: '',
        team: 'AC Blue',
    }, {
        id: 20,
        name: 'Davitt, M',
        level: '2',
        pager: '(510) 718-6238',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 21,
        name: 'Jackson, C',
        level: '2',
        pager: '(510) 718-6239',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 22,
        name: 'Chaudhary, M',
        level: '2',
        pager: '(510) 718-6247',
        email: '',
        team: 'Vacation',
    }, {
        id: 23,
        name: 'Beattie, G',
        level: '3',
        pager: '(510) 718-7984',
        email: '',
        team: 'AC Acute',
    }, {
        id: 24,
        name: 'Gologorsky, R',
        level: '3',
        pager: '(510) 718-7974',
        email: '',
        team: 'AC ES2',
    }, {
        id: 25,
        name: 'Fer, D',
        level: '3',
        pager: '(510) 718-7977',
        email: '',
        team: 'AC ES',
    }, {
        id: 26,
        name: 'Cohan, C',
        level: '3',
        pager: '(510) 718-7989',
        email: '',
        team: 'AC Acute',
    }, {
        id: 27,
        name: 'Ely, S',
        level: '3',
        pager: '(510) 718-7979',
        email: '',
        team: 'KO Vasc',
    }, {
        id: 28,
        name: 'Russell, D',
        level: '3',
        pager: '(510) 718-5016',
        email: '',
        team: 'Reno VA GS',
    }, {
        id: 29,
        name: 'Ewbank, C',
        level: '3',
        pager: '(510) 718-7983',
        email: '',
        team: 'Vacation',
    }, {
        id: 30,
        name: 'Dominguez, D',
        level: '3',
        pager: '(510) 718-7980',
        email: '',
        team: 'SF VA CT',
    }, {
        id: 31,
        name: 'Brooke, M',
        level: '4',
        pager: '(510) 718-5102',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 32,
        name: 'Veatch, J',
        level: '4',
        pager: '(510) 718-7237',
        email: '',
        team: 'AC Trauma',
    }, {
        id: 33,
        name: 'Castater, C',
        level: '4',
        pager: '(510) 718-5088',
        email: '',
        team: 'KO GS',
    }, {
        id: 34,
        name: 'Edquilang, J',
        level: '4',
        pager: '(510) 718-5027',
        email: '',
        team: 'KWC GS',
    }, {
        id: 35,
        name: 'Bradford, S',
        level: '5',
        pager: '(510) 718-6033',
        email: '',
        team: 'AC Acute',
    }, {
        id: 36,
        name: 'Swanson, J',
        level: '5',
        pager: '(510) 718-6055',
        email: '',
        team: 'AC ES',
    }, {
        id: 37,
        name: 'Green, A',
        level: '5',
        pager: '(510) 718-5323',
        email: '',
        team: 'KO GS',
    }, {
        id: 38,
        name: 'Martin, D',
        level: '5',
        pager: '(510) 718-5549',
        email: '',
        team: 'KO GS',
    }, {
        id: 39,
        name: 'Graf, J',
        level: '5',
        pager: '(510) 718-5317',
        email: '',
        team: 'Vacation',
    }];
    // trigger resident edit form
    $scope.editResident = function(resident) {
        var index = $scope.residents.indexOf(resident);
        $scope.triggerResidentForm = true;
        $scope.editResidentForm = true;
        $scope.addResidentForm = false;
        $scope.editResidentId = index;
        $scope.residentFormName = $scope.residents[index].name;
        $scope.residentFormLevel = $scope.residents[index].level;
        $scope.residentFormPager = $scope.residents[index].pager;
        $scope.residentFormEmail = $scope.residents[index].email;
        $scope.residentFormTeam = $scope.residents[index].team;
    }
    // save new or edited resident form
    $scope.saveResidentEdit = function(residentId) {
        if (residentId == 'new') {
            var newResident = {
                name: $scope.residentFormName,
                level: $scope.residentFormLevel,
                pager: $scope.residentFormPager,
                email: $scope.residentFormEmail,
                team: $scope.residentFormTeam,
            }
            // push new resident object to resident array
            $scope.residents.push(newResident);
        } else {
            $scope.residents[residentId].name = $scope.residentFormName;
            $scope.residents[residentId].level = $scope.residentFormLevel;
            $scope.residents[residentId].pager = $scope.residentFormPager;
            $scope.residents[residentId].email = $scope.residentFormEmail;
            $scope.residents[residentId].team = $scope.residentFormTeam;
        }
        // close edit forms
        $scope.triggerResidentForm = false;
        $scope.editResidentForm = false;
        $scope.editResidentId = 0;
    }
    // remove resident object from resident array
    $scope.deleteResident = function(resident) {
        var index = $scope.residents.indexOf(resident);
        $scope.residents.splice(index, 1);
    }
    // create new resident id on adding a new residents
    // trigger add resident form
    $scope.addResident = function() {
        $scope.editResidentId = 'new';
        $scope.triggerResidentForm = true;
        $scope.editResidentForm = false;
        $scope.addResidentForm = true;
        $scope.residentFormName = '';
        $scope.residentFormLevel = '';
        $scope.residentFormPager = '';
        $scope.residentFormEmail = '';
        $scope.residentFormTeam = '';
    }
    /* === JOBS === */
    $scope.triggerJobForm = false;
    $scope.editJobForm = false;
    $scope.addJobForm = false;
    // seed jobs data
    $scope.jobs = [{
        id: 1,
        team: ['AC Acute'],
        name: 'AC Acute Chief',
        dow: 'weekday',
        tod: 'day',
        level: ['5', '3'],
        count: 1,
    }, {
        id: 2,
        team: ['AC Acute'],
        name: 'AC Acute Consult',
        dow: 'weekday',
        tod: 'day',
        level: ['2', '3'],
        count: 1,
    }, {
        id: 3,
        team: ['AC Acute'],
        name: 'AC Acute Floor',
        dow: 'weekday',
        tod: 'day',
        level: ['1'],
        count: 1,
    }, {
        id: 4,
        team: ['AC Blue'],
        name: 'AC Blue Floor',
        dow: 'weekday',
        tod: 'day',
        level: ['1'],
        count: 1,
    }, {
        id: 5,
        team: ['AC Blue'],
        name: 'AC Blue Consult',
        dow: 'weekday',
        tod: 'day',
        level: ['2'],
        count: 1,
    }, {
        id: 6,
        team: ['AC ES'],
        name: 'AC ES Floor',
        dow: 'weekday',
        tod: 'day',
        level: ['1'],
        count: 1,
    }, {
        id: 7,
        team: ['AC ES'],
        name: 'AC ES Assist',
        dow: 'weekday',
        tod: 'day',
        level: ['2', '3'],
        count: 1,
    }, {
        id: 8,
        team: ['AC ES'],
        name: 'AC ES Chief',
        dow: 'weekday',
        tod: 'day',
        level: ['5'],
        count: 1,
    }, {
        id: 9,
        team: ['AC Trauma'],
        name: 'AC Trauma Floor',
        dow: 'weekday',
        tod: 'day',
        level: ['1', '2', '3'],
        count: 1,
    }, {
        id: 10,
        team: ['AC Trauma'],
        name: 'AC Trauma Chief',
        dow: 'weekday',
        tod: 'day',
        level: ['4'],
        count: 1,
    }, {
        id: 11,
        team: ['AC ES2'],
        name: 'AC ES2 Chief',
        dow: 'weekday',
        tod: 'day',
        level: ['3'],
        count: 1,
    }, {
        id: 12,
        team: ['AC SICU'],
        name: 'AC SICU',
        dow: 'weekday',
        tod: 'day',
        level: ['1'],
        count: 1,
    }, {
        id: 13,
        team: ['AC Trauma'],
        name: 'AC Call Chief',
        dow: 'weekday',
        tod: 'night',
        level: ['4', '5'],
        count: 1,
    }, {
        id: 14,
        team: ['AC Acute'],
        name: 'AC Call Consult',
        dow: 'weekday',
        tod: 'night',
        level: ['2', '3'],
        count: 1,
    }, {
        id: 15,
        team: ['AC Acute'],
        name: 'AC Call Floor',
        dow: 'weekday',
        tod: 'night',
        level: ['1'],
        count: 1,
    }, {
        id: 16,
        team: ['AC SICU'],
        name: 'AC Call SICU',
        dow: 'weekday',
        tod: 'night',
        level: ['1'],
        count: 1,
    }, {
        id: 17,
        team: ['AC Trauma'],
        name: 'AC Call Trauma',
        dow: 'weekday',
        tod: 'night',
        level: ['1', '2'],
        count: 1,
    }, {
        id: 18,
        team: ['AC Acute', 'AC Trauma'],
        name: 'AC Call Chief',
        dow: 'weekend',
        tod: 'night',
        level: ['4', '5'],
        count: 1,
    }, {
        id: 19,
        team: ['AC Acute', 'AC ES2'],
        name: 'AC Call Consult',
        dow: 'weekend',
        tod: 'night',
        level: ['2', '3'],
        count: 1,
    }, {
        id: 20,
        team: ['AC Acute', 'AC Trauma', 'AC ES', 'AC Blue'],
        name: 'AC Call Floor',
        dow: 'weekend',
        tod: 'night',
        level: ['1'],
        count: 1,
    }, {
        id: 21,
        team: ['AC SICU'],
        name: 'AC Call SICU',
        dow: 'weekend',
        tod: 'night',
        level: ['1'],
        count: 1,
    }, {
        id: 22,
        team: ['AC Trauma'],
        name: 'AC Call Trauma',
        dow: 'weekend',
        tod: 'night',
        level: ['1', '2', '3'],
        count: 1,
    }, {
        id: 23,
        team: ['AC Acute', 'AC Trauma'],
        name: 'AC Call Chief',
        dow: 'weekend',
        tod: 'day',
        level: ['4', '5'],
        count: 1,
    }, {
        id: 24,
        team: ['AC Acute', 'AC Trauma', 'AC ES2', 'AC Blue'],
        name: 'AC Call Consult',
        dow: 'weekend',
        tod: 'day',
        level: ['2', '3'],
        count: 1,
    }, {
        id: 25,
        team: ['AC Acute', 'AC Trauma', 'AC ES', 'AC Blue'],
        name: 'AC Call Floor',
        dow: 'weekend',
        tod: 'day',
        level: ['1'],
        count: 1,
    }, {
        id: 26,
        team: ['AC SICU'],
        name: 'AC Call SICU',
        dow: 'weekend',
        tod: 'day',
        level: ['1'],
        count: 1,
    }, {
        id: 27,
        team: ['AC Trauma'],
        name: 'AC Call Trauma',
        dow: 'weekend',
        tod: 'day',
        level: ['1', '2', '3'],
        count: 1,
    }];

    // trigger job edit form
    $scope.editJob = function(job) {
        var index = $scope.jobs.indexOf(job);
        $scope.triggerJobForm = true;
        $scope.editJobForm = true;
        $scope.addJobForm = false;
        $scope.editJobId = index;
        $scope.jobFormTeam = $scope.jobs[index].team;
        $scope.jobFormName = $scope.jobs[index].name;
        $scope.jobFormDow = $scope.jobs[index].dow;
        $scope.jobFormTod = $scope.jobs[index].tod;
        $scope.jobFormLevel = $scope.jobs[index].level;
        $scope.jobFormCount = $scope.jobs[index].count;
    }
    // save new or edited job form
    $scope.saveJobEdit = function(jobId) {
        if (jobId == 'new') {
            var newJob = {
                name: $scope.jobFormName,
                team: $scope.jobFormTeam,
                dow: $scope.jobFormDow,
                tod: $scope.jobFormTod,
                level: $scope.jobFormLevel,
                count: $scope.jobFormCount,
            }
            // push new job object to job array
            $scope.jobs.push(newJob);
        } else {
            $scope.jobs[jobId].team = $scope.jobFormTeam;
            $scope.jobs[jobId].name = $scope.jobFormName;
            $scope.jobs[jobId].dow = $scope.jobFormDow;
            $scope.jobs[jobId].tod = $scope.jobFormTod;
            $scope.jobs[jobId].level = $scope.jobFormLevel;
            $scope.jobs[jobId].count = $scope.jobFormCount;
        }
        // close edit forms
        $scope.triggerJobForm = false;
        $scope.editJobForm = false;
        $scope.editJobId = 0;
    }
    // remove job object from job array
    $scope.deleteJob = function(job) {
        var index = $scope.jobs.indexOf(job);
        $scope.jobs.splice(index, 1);
    }
    // create new job id on adding a new jobs
    // trigger add job form
    $scope.addJob = function() {
        $scope.editJobId = 'new';
        $scope.triggerJobForm = true;
        $scope.editJobForm = false;
        $scope.addJobForm = true;
        $scope.jobForm.$setUntouched();
        $scope.jobFormTeam = '';
        $scope.jobFormName = '';
        $scope.jobFormDow = '';
        $scope.jobFormTod = '';
        $scope.jobFormLevel = '';
        $scope.jobFormCount = '';
    }

    /* === SCHEDULES === */

    $scope.triggerScheduleForm = false;
    $scope.editScheduleForm = false;
    $scope.addScheduleForm = false;
    // seed schedules data
    $scope.schedules = [{
        id: 1,
        names: [{
            id: 1,
            team: ['AC Acute'],
            name: 'AC Acute Chief',
            dow: 'weekday',
            tod: 'day',
            level: ['5', '3'],
            count: 1,
        }, {
            id: 2,
            team: ['AC Acute'],
            name: 'AC Acute Consult',
            dow: 'weekday',
            tod: 'day',
            level: ['2', '3'],
            count: 1,
        }, {
            id: 3,
            team: ['AC Acute'],
            name: 'AC Acute Floor',
            dow: 'weekday',
            tod: 'day',
            level: ['1'],
            count: 1,
        }],
        startDate: '12/25/2017',
        endDate: '01/22/2018',
        events: [{
            'id': 'id',
            'jobName': 'jobname',
            'jobLevel': 'joblevel',
            'residents': 'residents',
            'start': {
                'dateTime': 'startdatetime',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': 'enddatetime',
                'timeZone': 'America/Los_Angeles'
            }
        }]
    }, {
        id: 2,
        names: [{
            id: 6,
            team: ['AC ES'],
            name: 'AC ES Floor',
            dow: 'weekday',
            tod: 'day',
            level: ['1'],
            count: 1,
        }, {
            id: 7,
            team: ['AC ES'],
            name: 'AC ES Assist',
            dow: 'weekday',
            tod: 'day',
            level: ['2', '3'],
            count: 1,
        }, {
            id: 8,
            team: ['AC ES'],
            name: 'AC ES Chief',
            dow: 'weekday',
            tod: 'day',
            level: ['5'],
            count: 1,
        }],
        startDate: '12/25/2017',
        endDate: '01/22/2018',
        events: [{
            'id': 'id',
            'jobName': 'jobname2',
            'jobLevel': 'joblevel2',
            'residents': 'residents2',
            'start': {
                'dateTime': 'startdatetime2',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': 'enddatetime2',
                'timeZone': 'America/Los_Angeles'
            }
        }]
    }];

    // trigger schedule edit form
    $scope.editSchedule = function(schedule) {
        var index = $scope.schedules.indexOf(schedule);
        $scope.triggerScheduleForm = true;
        $scope.editScheduleForm = true;
        $scope.addScheduleForm = false;
        $scope.editScheduleId = index;
        $scope.scheduleFormNames = $scope.schedules[index].names
        $scope.scheduleFormStartDate = $scope.schedules[index].startDate;
        $scope.scheduleFormEndDate = $scope.schedules[index].endDate;
        $scope.scheduleFormEvents = $scope.schedules[index].events;

        ///////////////

        $scope.content = '';

        $scope.isChecked = function(id) {
            var match = false;

            for (var i = 0; i < $scope.scheduleFormNames.length; i++) {
                if ($scope.scheduleFormNames[i].id == id) {
                    match = true;
                }
            }
            return match;
        }
        ;

        $scope.allOptions = $scope.jobs;

        $scope.sync = function(bool, item) {
            if (bool) {
                // add item
                $scope.scheduleFormNames.push(item);

            } else {
                // remove item
                for (var i = 0; i < $scope.scheduleFormNames.length; i++) {
                    if ($scope.scheduleFormNames[i].id == item.id) {
                        $scope.scheduleFormNames.splice(i, 1);
                    }
                }
            }
        }

        ///////////////

    }
    // save new or edited schedule form
    $scope.saveScheduleEdit = function(scheduleId) {

        if (scheduleId == 'new') {
            var newSchedule = {
                names: $scope.scheduleFormNames,
                startDate: $scope.scheduleFormStartDate,
                endDate: $scope.scheduleFormEndDate,
                events: $scope.scheduleFormEvents,
            }
            // push new schedule object to schedule array
            $scope.schedules.push(newSchedule);
        } else {
            $scope.schedules[scheduleId].names = $scope.scheduleFormNames;
            $scope.schedules[scheduleId].startDate = $scope.scheduleFormStartDate;
            $scope.schedules[scheduleId].endDate = $scope.scheduleFormEndDate;
            $scope.schedules[scheduleId].events = $scope.scheduleFormEvents;

        }
        // close edit forms

        $scope.triggerScheduleForm = false;
        $scope.editScheduleForm = false;
        $scope.addScheduleForm = false;
        $scope.editScheduleId = 0;

    }
    // remove schedule object from schedule array
    $scope.deleteSchedule = function(schedule) {
        var index = $scope.schedules.indexOf(schedule);
        $scope.schedules.splice(index, 1);
    }
    // create new schedule id on adding a new schedules
    // trigger add schedule form
    $scope.addSchedule = function() {
        $scope.editScheduleId = 'new';
        $scope.triggerScheduleForm = true;
        $scope.editScheduleForm = false;
        $scope.addScheduleForm = true;
        $scope.scheduleForm.$setUntouched();
        $scope.scheduleFormNames = [];
        $scope.scheduleFormStartDate = '';
        $scope.scheduleFormEndDate = '';
        $scope.scheduleFormEvents = [];
        $scope.allOptions = $scope.jobs;
    }

    /* === SHOW CALENDARS === */

    // show schedule's events
    $scope.showCalendar = function(schedule) {
        var index = $scope.schedules.indexOf(schedule);
        $scope.triggerScheduleForm = true;
        $scope.editScheduleForm = true;
        $scope.addScheduleForm = false;
        $scope.editScheduleId = index;
        $scope.scheduleFormNames = $scope.schedules[index].names;
        $scope.scheduleFormStartDate = $scope.schedules[index].startDate;
        $scope.scheduleFormEndDate = $scope.schedules[index].endDate;
    }

    /* === CONVERT VARIABLES === */
    // JP's code runs outside of angular, 
    // which means the angular variables need to be converted
    $scope.findSchedule = function(schedule) {
        var index = $scope.schedules.indexOf(schedule);

        //resets the schedule's events when user hits Generate button
        $scope.schedules[index].events = []

        var residentsWithFieldsChanged = []

        // for each resident (i)
        for (let i = 0, res; i < $scope.residents.length; i++) {
            res = $scope.residents[i];
            residents[res.id] = res;
            res._name = res.name
            res._pager = res.pager
            res._email = res.email
            res._team = res.team
            res._level = res.level
            residentsWithFieldsChanged.push(res)
        }

        var jobsWithFieldsChanged = []

        // for each job ()
        for (let j = 0, job; j < $scope.jobs.length; j++) {
            // if the job of the result matches the requested job
            for (let n = 0; n < $scope.schedules[index].names.length; n++) {
                if ($scope.jobs[j].name == $scope.schedules[index].names[n].name) {
                    job = $scope.jobs[j];
                    jobs[job.id] = job;
                    job._id = job.id
                    job._count = job.count
                    job._team = job.team
                    job._level = job.level
                    job._daytype = job.dow.toLowerCase()
                    job._time = job.tod.toLowerCase()
                    jobsWithFieldsChanged.push(job)
                }
            }
        }
        var residentss = residentsWithFieldsChanged.map((x)=>{
            return new Resident(x._name,x._pager,x._team,x._level)
        }
        )
        var jobss = jobsWithFieldsChanged.map((x)=>{
            return new Job(x._id,x._count,x._team,x._level,x._daytype,x._time)
        }
        )
        // set the startdate, enddate, (and jobname(s)) from the schedule form
        var startdate = new Date($scope.schedules[index].startDate);
        var enddate = new Date($scope.schedules[index].endDate);
        var jobname = $scope.schedules[index].jobName;
        // set the timeout for the scheduler
        var searchtime = 10
        // get results
        results = residentScheduler(jobss, residentss, startdate, enddate, searchtime)
        // get the schedule for each resident
        scheduleByResident = results[0].data
        scheduleByJob = results[1].data
        // get statistics for each resident
        averageHoursPerWeek = results[2].average_hours_per_week
        frequencyOfNightShifts = results[2].frequency_of_night_shifts
        fullCalendarDaysOff = results[2].full_calendar_days_off
        fullCalendarDaysOffPerCycle = results[2].full_calendar_days_off_per_cycle

        // allow the user to set the shift length in hours
        var shiftLength = 12;

        // allow the user to set the shift start hour
        var shiftStartTime1 = 5;
        var shiftStartTime2 = 17;
        var shiftStartTime3 = 5;
        var shiftStartTime4 = 17;

        // for each job (j)
        for (let j = 0, job; j < results[1].jobs.length; j++) {

            // for each shift (s)
            for (let s = 0; s < results[1].shiftTypes.length; s++) {

                //if someone is working that shift,
                if (results[1].data[j][s] != '') {
                    var shiftType = results[1].shiftTypes[s]
                    // shiftType '1' for weekday day, 
                    if (shiftType == '1') {
                        var shiftStartTime = shiftStartTime1;
                        // shiftType '2' for weekday night
                    } else if (shiftType == '2') {
                        var shiftStartTime = shiftStartTime2;
                        // shiftType '3' for weekend day 
                    } else if (shiftType == '3') {
                        var shiftStartTime = shiftStartTime3;
                        // shiftType '4' for weekend night
                    } else if (shiftType == '4') {
                        var shiftStartTime = shiftStartTime4;
                    }
                    ;// increment the shift date based on shift length * shift index
                    var shiftStartDate = moment($scope.schedules[index].startDate, 'MM/DD/YYYY').add(s * shiftLength, 'hours').format('MM/DD/YYYY');
                    // set the shift's start time by adding shiftStartTime (in hours) to 00:00 of the shift's date
                    var shiftStartDateTime = moment(shiftStartDate, 'MM/DD/YYYY').add(shiftStartTime, 'hours').format('ddd, DD MMM YYYY HH:mm');
                    // set the shift's end time by adding length of the shift to the start time
                    var shiftEndDateTime = moment(shiftStartDateTime, 'ddd, DD MMM YYYY HH:mm').add(shiftLength, 'hours').format('ddd, DD MMM YYYY HH:mm');

                    // set variable 'events' to the scheduler's results
                    var assignedResidents = results[1].data[j][s];

                    for (let r = 0; r < results[0].residents.length; r++) {
                        // if the shift's job is 0.5, then add name of resident to event residents
                        if (results[0].data[r][s] == '0.5') {
                            //then get the resident's name, level, and team
                            if (results[0].residents[r].team == $scope.jobs[j].team && results[0].residents[r].level == $scope.jobs[j].level) {
                                assignedResidents.push(results[0].residents[r].name);
                            }
                        }
                    }
                    // set details for each event
                    var event = {

                        // shift id
                        'id': s,
                        // job name
                        'jobName': $scope.schedules[index].names[j].name,
                        'jobLevel': ($scope.jobs[j].level).reverse(),
                        // assigned residents
                        'residents': assignedResidents.sort(),
                        // shift start datetime
                        'start': {
                            'dateTime': shiftStartDateTime,
                            'timeZone': 'America/Los_Angeles'
                        },
                        // shift end datetime
                        'end': {
                            'dateTime': shiftEndDateTime,
                            'timeZone': 'America/Los_Angeles'
                        },
                    };
                    // push event
                    $scope.schedules[index].events.push(event)
                    console.log('events created.')
                }
            }
        }
    }
    // allow the user to view one day at a time, add and subtract days
    $scope.viewDate = moment().format("ddd, DD MMM YYYY");
    $scope.viewDateLong = moment($scope.viewDate, "ddd, DD MMM YYYY").format("dddd, MMMM Do YYYY")

    $scope.today = function() {
        $scope.viewDate = moment().format("ddd, DD MMM YYYY");
        $scope.viewDateLong = moment($scope.viewDate, "ddd, DD MMM YYYY").format("dddd, MMMM Do YYYY")
    }

    $scope.increment = function() {
        $scope.viewDate = moment($scope.viewDate, "ddd, DD MMM YYYY").add(1, "day").format("ddd, DD MMM YYYY");
        $scope.viewDateLong = moment($scope.viewDate, "ddd, DD MMM YYYY").format("dddd, MMMM Do YYYY")
    }

    $scope.decrement = function() {
        $scope.viewDate = moment($scope.viewDate, "ddd, DD MMM YYYY").subtract(1, "day").format("ddd, DD MMM YYYY");
        $scope.viewDateLong = moment($scope.viewDate, "ddd, DD MMM YYYY").format("dddd, MMMM Do YYYY")
    }
})

/* ====================== */
/* ###    JP CODE     ### */
/* ====================== */
// the scheduler functions occur outside of angular.
function residentScheduler(jobs, residents, startdate, enddate, searchtime) {
    // initialize the schedule
    var schedule = new Schedule(residents,startdate,enddate)
    // find the best schedule
    console.log('the schedule requested is %f cycle(s) long.\n', math.ceil(schedule.shiftTypes.length / 56))
    console.log('searching for schedules for up to %f seconds...\n', searchtime)
    schedule = findBestSchedule(jobs, schedule, _.partial(stoppingTimeFunction, searchtime))
    // if no feasible schedule was found, exit here
    if (schedule.length === 0) {
        return
    }
    // calculate summary statistics about the schedule
    var summStats = summaryStats(schedule)
    // add days to the schedule where the residents should come into work,
    // even though they don't have an assigned job
    schedule = addOptionalDays(schedule)
    // calculate summary statistics about the schedule which includes the optional days
    var summStatsWithOptional = summaryStats(schedule)
    // produce a version of the schedule by job
    var scheduleByJob = getScheduleByJob(schedule, jobs)
    return [schedule, scheduleByJob, summStats, summStatsWithOptional]
    // end of residentScheduler
}

function findBestSchedule(jobs, schedule, stoppingTimeFunction) {
    // generate as many schedules as the stopping time function allows
    var schedules = []
    var timeElapsed = 0
    var schedulesTried = 0
    while (true) {
        var t0 = performance.now()
        try {
            schedulesTried++
            // create a fresh schedule for each attempt, which contains the data from past cycles,
            // but in which data for this cycle can be entered without overwriting the main copy
            var scheduleCopy = Schedule.copy(schedule)
            var scheduleAttempt = generateSchedule(scheduleCopy, jobs)
        } catch (err) {
            s = []
        }
        var t1 = performance.now()
        if (!_.isEmpty(scheduleAttempt)) {
            // if a schedule was found, add it to the list
            console.log('schedules found.')
            schedules.push(scheduleAttempt);
        }
        timeElapsed = timeElapsed + (t1 - t0) / 1000;
        // if at least as many schedules as required by the stopping time function have
        // been found, stop looking for more schedules
        if (schedules.length >= stoppingTimeFunction(timeElapsed)) {
            if (schedules.length == 0) {
                console.log('%f attempts made, no schedules found in %.0f seconds.\n', schedulesTried, math.round(timeElapsed, 0))
                break
            } else {
                console.log('%f attempts made, found %.0f schedules in %.0f seconds.\n', schedulesTried, schedules.length, math.round(timeElapsed, 0))
                break
            }
        }
    }
    // compare schedules using the objective function
    /*
the objective function is currently to minimize standard deviation of hours worked
within each level and team. Higher values of the objective function are worse and
the best possible value is zero (all interns in team A, etc, work the same hours).
*/
    objectiveFunctionValues = new Array
    if (schedules.length > 0) {
        for (let n = 0; n < schedules.length; n++) {
            [objectiveFunctionValues[n],scores] = evaluateSchedule(schedules[n])
        }
        let nstar = objectiveFunctionValues.findIndex((x)=>(x == Math.min(...objectiveFunctionValues)))
        bestSchedule = schedules[nstar]
    } else {
        bestSchedule = [];
    }
    return bestSchedule
    // end of findBestSchedule
}

function generateSchedule(schedule, jobs) {
    // Note that generateSchedule will be more effective if the list of jobs 
    // passed to it have previously been sorted in descending order of difficulty 
    for (let t = 0; t < schedule.shiftTypes.length; t++) {
        // filter for jobs which match the shiftType of this shift
        applicableJobs = _.filter(jobs, (x)=>{
            return x.shiftType == schedule.shiftTypes[t]
        }
        )
        // update who is eligible by ACGME rules to work this shift
        // this needs updating for each 't' because the schedule gets updated every 't'
        var eligibilityIdx = []
        for (let i = 0; i < schedule.residents.length; i++) {
            eligibilityIdx[i] = eligibleToWork(schedule, i, t)
        }
        // Go through applicable jobs in order
        // jobs should have already been pre-sorted in descending order of difficulty
        for (let j = 0; j < applicableJobs.length; j++) {
            // score residents in terms of hours worked
            // this needs to be updated for every job
            // because the schedule is updated after each job
            [objectiveFunctionValue,scores] = evaluateSchedule(schedule)
            // filter for residents who match the job requirements
            var matchIdx = schedule.residents.map((x)=>{
                return _.contains(applicableJobs[j].team, x.team) && _.contains(applicableJobs[j].level, x.level)
            }
            )
            // find residents who haven't already been allocated to another job
            // this needs to be updated for every job
            // because the schedule is updated after each job
            var availabilityIdx = schedule.data.map((x)=>{
                return !x[t]
            }
            )
            // get the final pool of potential residents
            var poolIdx = _.zip(matchIdx, availabilityIdx, eligibilityIdx).map((x)=>{
                return x[0] && x[1] && x[2]
            }
            )
            // pick the residents for the shift
            // if there are more available than needed, pick the ones with lowest hours worked
            // !! tweak this later to allow for night shift continuity !!
            if (math.sum(poolIdx) < applicableJobs[j].count) {
                /*console.log('.')*/
                console.log('schedule failed on shift %f for job %f,' + ' which requires %f staff from %s %s\n', t + 1, applicableJobs[j].id, applicableJobs[j].count, applicableJobs[j].team.toString(), applicableJobs[j].level.toString())
                throw 'generateSchedule: There are not enough residents available to do this job'
            } else {
                // there are enough residents available
                var scoresR = scores.map((x)=>{
                    return x + math.random(-0.001, +0.001)
                }
                )
                // add night shift blocking
                if (schedule.shiftTypes[t] == 2 || schedule.shiftTypes[t] == 4) {
                    if (t >= 6 && schedule.dayOfWeek[t] == 1) {
                        // if its a Mon night shift, try to pick people who didnt work last Fri night
                        var nightShiftIdx = schedule.data.map((x)=>{
                            return !x[t - 6]
                        }
                        )
                    } else if (t >= 14 && schedule.dayOfWeek[t] == 6) {
                        // if its a Sat night shift, try to pick people who didnt work last Sat night
                        var nightShiftIdx = schedule.data.map((x)=>{
                            return !x[t - 14]
                        }
                        )
                    } else if (t >= 2) {
                        // if its a Tue-Fri or Sun night shift, try to pick the same people as worked last night
                        var nightShiftIdx = schedule.data.map((x)=>{
                            return !!x[t - 2]
                        }
                        )
                    }
                } else {
                    var nightShiftIdx = schedule.data.map((x)=>{
                        return false
                    }
                    )
                }
                // sort residents by their scores
                poolNumIdx = _.chain(poolIdx)// add the scores, nightShiftIdx and a numerical index 
                // which is what we will keep at the end
                .zip(scoresR, nightShiftIdx, math.range(0, poolIdx.length)._data)// filter by whether the boolean index is true
                .filter((x)=>{
                    return x[0]
                }
                )// sort by ascending order of score
                .sort((x,y)=>{
                    return x[1] - y[1]
                }
                )// sort by nightShiftIdx with the ones marked 'true' first
                // hopefully this preserves the sort by score as the 2nd ordering
                .sort((x,y)=>{
                    return -(x[2] - y[2])
                }
                )// keep only the numerical index
                .unzip().last().value()
            }
            // update the schedule
            // for each resident chosen for the job, enter this job's id into their schedule
            for (c = 0; c < applicableJobs[j].count; c++) {
                schedule.data[poolNumIdx[c]][t] = applicableJobs[j].id
            }
        }
    }
    return schedule
    // end of generateSchedule
}

function evaluateSchedule(schedule, groups) {
    if (arguments.length < 2 || groups.length == 0) {
        // the default way to find groups is to split by team & level
        uniqueTeams = [...new Set(_.pluck(schedule.residents, "team"))]
        uniqueLevels = [...new Set(_.pluck(schedule.residents, "level"))]
        nL = uniqueLevels.length
        g = schedule.residents.map((val,idx,arr)=>{
            return _.indexOf(uniqueTeams, val.team) * nL + _.indexOf(uniqueLevels, val.level)
        }
        )
    }
    // count how many shifts, and how many night shifts, each resident has
    var nShiftsEach = new Array
    var nNightShiftsEach = new Array
    for (i = 0; i < schedule.residents.length; i++) {
        nShiftsEach[i] = math.sum(schedule.data[i].map((x)=>{
            return !!x
        }
        ))
        nNightShiftsEach[i] = math.sum(schedule.data[i].map((x,idx)=>{
            return (schedule.shiftTypes[idx] == 2 || schedule.shiftTypes[idx] == 4) ? !!x : 0
        }
        ))
    }
    // the objective function value is the sum across groups of the standard deviation of
    // shifts of the specified type worked within each group
    WEIGHT_ON_NIGHT_SHIFTS = 0.3
    groupStds = splitapply(math.std, nShiftsEach, g)
    groupNightStds = splitapply(math.std, nNightShiftsEach, g)
    objectiveFunctionValue = math.sum(_.toArray(groupStds)) + WEIGHT_ON_NIGHT_SHIFTS * math.sum(_.toArray(groupNightStds))
    // scores reflect how much each resident in a group is over or under the mean hours worked
    // by that group. These can be used to prioritize who gets the next shift.
    groupMeans = splitapply(math.mean, nShiftsEach, g);
    // use g to expand means & stds to match the original vector nShiftsEach
    groupMeansExpanded = indexexpander(groupMeans, g)
    groupStdsExpanded = indexexpander(groupStds, g)
    scores = math.dotDivide(math.subtract(nShiftsEach, groupMeansExpanded), groupStdsExpanded)
    // if std is zero, all scores are at mean of zero
    scores = scores.map((num,idx,arr)=>{
        return num = (groupStdsExpanded[idx] == 0) ? 0 : num
    }
    )
    return [objectiveFunctionValue, scores]
    // end of evaluateSchedule
}

function splitapply(f, vector, groups) {
    // reproduce matlab function which applies function to subvectors of 'vector' defined by 'groups'
    return _.chain(vector).zip(groups)// group by 'groups'
    .groupBy((x)=>(x[1]))// unzip the subvector corresponding to each group 
    // and apply the function f to it
    .mapObject((subvector,group)=>f(_.unzip(subvector)[0])).value()
}

function indexexpander(x, idx) {
    // reproduce matlab indexing functionality where an index can
    // expand an array by, say, referencing an element more than once
    // example:
    // arr = [1,2,3]
    // idx = [0,0,1,1,0,2]
    // indexexpander(arr,idx) -> [1,1,2,2,1,3]
    // includes no error checking
    var expandedArray = new Array
    for (i = 0; i < idx.length; i++) {
        expandedArray.push(x[idx[i]])
    }
    return expandedArray
}

function summaryStats(schedule) {
    // how many hours each person works per week
    // how many full calendar days they get off
    // what fraction of night shifts they work
    // initialize summStats
    var summStats = {
        'average_hours_per_week': new Array(schedule.residents.length),
        'frequency_of_night_shifts': new Array(schedule.residents.length),
        'full_calendar_days_off': new Array(schedule.residents.length),
        'full_calendar_days_off_per_cycle': new Array(schedule.residents.length)
    }
    // calculate summStats
    // dont forget to convert schedule to booleans before calculating!
    let nWeeks = schedule.shiftTypes.length / 14
    for (i = 0; i < schedule.residents.length; i++) {
        summStats.average_hours_per_week[i] = 0
        summStats.full_calendar_days_off[i] = 0
        summStats.frequency_of_night_shifts[i] = 0
        for (t = 0; t < schedule.shiftTypes.length; t++) {
            // 12 hours per shift * shifts worked / nWeeks in a cycle
            summStats.average_hours_per_week[i] += 12 * !!schedule.data[i][t] / nWeeks
            // day shifts not worked where the subsequent night shift is also not worked
            summStats.full_calendar_days_off[i] += ((schedule.shiftTypes[t] === 1 || schedule.shiftTypes[t] === 3) && (!schedule.data[i][t + 1] ? !schedule.data[i][t] : 0))
            // night shifts worked, as a fraction of night shifts in the schedule (nWeeks*7)
            summStats.frequency_of_night_shifts[i] += (schedule.shiftTypes[t] === 2 || schedule.shiftTypes[t] === 4) ? (!!schedule.data[i][t] / (nWeeks * 7)) : 0
        }
        summStats.average_hours_per_week[i] = math.round(summStats.average_hours_per_week[i], 0)
        summStats.frequency_of_night_shifts[i] = math.round(summStats.frequency_of_night_shifts[i], 2)
        // 4 weeks in a cycle
        summStats.full_calendar_days_off_per_cycle[i] = math.round(summStats.full_calendar_days_off[i] * 4 / nWeeks, 0)
    }
    return summStats
    // end of summaryStats
}

function addOptionalDays(schedule) {
    // add shifts the resident can work (but doesnt have an assigned job) to the main schedule as 0.5.
    // a resident can work weekday daytime shifts where they didnt work the previous night
    for (i = 0; i < schedule.residents.length; i++) {
        for (t = 0; t < schedule.shiftTypes.length; t++) {
            if (schedule.shiftTypes[t] === 1 && // if its weekday daytime
            !schedule.data[i][t] && // if they are not already working this shift
            (t === 0 || !schedule.data[i][t - 1])) // if they didn't work last night
            {
                // trick: set this shift as worked
                schedule.data[i][t] = 0.5
                // now reverse it if it breaks eligibleToWork
                const T = 28 * 2
                const nShifts = schedule.shiftTypes.length
                for (let v = t; v < math.min(t + T, nShifts + 1); v++) {
                    let e = eligibleToWork(schedule, i, t)
                    if (!e) {
                        // reverse it and stop
                        schedule.data[i][t] = 0
                        break
                    }
                }
            }
        }
    }
    return schedule
    // end addOptionalDays
}

function getScheduleByJob(schedule, jobs) {
    // takes a schedule by resident and converts it to a schedule by job
    // initialize
    var scheduleByJob = []
    scheduleByJob.shiftTypes = schedule.shiftTypes
    scheduleByJob.jobs = jobs
    scheduleByJob.data = new Array(jobs.length)
    for (j = 0; j < jobs.length; j++) {
        scheduleByJob.data[j] = new Array(scheduleByJob.shiftTypes.length)
    }
    // find the residents doing each job on each shift 
    for (t = 0; t < scheduleByJob.shiftTypes.length; t++) {
        st = _.zip(schedule.data)[t]
        for (j = 0; j < jobs.length; j++) {
            scheduleByJob.data[j][t] = []
            for (r = 0; r < schedule.residents.length; r++) {
                if (schedule.data[r][t] == scheduleByJob.jobs[j].id) {
                    scheduleByJob.data[j][t].push(schedule.residents[r].name)
                }
            }
        }
    }
    return scheduleByJob
    // end of getScheduleByJob    
}

function eligibleToWork(schedule, i, t) {
    // finds which residents are eligible by ACGME rules to work on this shift
    // assume the schedule before 't' complies with ACGME rules
    // assume the schedule after 't' has not been filled in yet
    // these assumptions are made because this function is designed to run fast
    // constants specified by the ACGME rules
    const MAX_SHIFTS = math.floor(320 / 12)
    const MIN_DAYS_OFF = 4
    const T = 56
    const nShifts = schedule.shiftTypes.length
    // convert the selected resident's schedule to booleans
    var s = schedule.data[i].map((x)=>{
        return !!x
    }
    )
    // start and end of the ACGME comparison period
    if (schedule.shiftTypes[t] == 2 || schedule.shiftTypes[t] == 4) {
        var start_t = math.max(0, t - T + 1)
        var end_t = math.max(t + 1, T)
        // 1 after the last period wanted, which is this period
    } else {
        var start_t = math.max(0, t - T + 2)
        var end_t = math.max(t + 2, T)
        // 1 after the last period wanted, 
    }
    // which is the night shift after this period
    // ACGME conditions:
    // c1: "residents cannot work for more than 320 hours (ie 26 shifts) in any 28-day period"
    let sumshifts = 1 - s[t] + math.sum(math.subset(s, math.index(math.range(start_t, end_t))))
    var c1 = (sumshifts <= MAX_SHIFTS)
    // c2: "residents must be scheduled for a minimum of 4 full calendar days off in every 28-day period"        
    let sumdaysoff = 0
    for (let k = start_t; k < end_t; k += 2) {
        // a day off is where neither the day nor the night shift are worked
        // here we mark shift 't' as worked because we're checking the validity of this
        sumdaysoff += !(((k == t) ? 1 : s[k]) || (((k + 1) == t) ? 1 : s[k + 1]))
    }
    var c2 = (sumdaysoff >= MIN_DAYS_OFF)
    // c3: "residents must have at least 24 hours off after 24 hours of working continuously"
    // !! in Javascript every case of a switch statement must have a break !!
    var c3 = false
    switch (t) {
    case 0:
        c3 = !(s[t + 1] && (s[t + 2] || s[t + 3]))
        break
    case 1:
        c3 = !(s[t + 1] && (s[t + 2] || s[t + 3])) && !(s[t - 1] && (s[t + 1] || s[t + 2]))
        break
    case 2:
        c3 = !(s[t + 1] && (s[t + 2] || s[t + 3])) && !(s[t - 1] && (s[t + 1] || s[t + 2])) && !(s[t - 2] && s[t - 1]);
        break
    case nShifts - 1:
        c3 = !(s[t - 3] && s[t - 2]) && !(s[t - 2] && s[t - 1]);
        break
    case nShifts - 2:
        c3 = !(s[t - 3] && s[t - 2]) && !(s[t - 2] && s[t - 1]) && !(s[t - 1] && s[t + 1]);
        break
    case nShifts - 3:
        c3 = !(s[t - 3] && s[t - 2]) && !(s[t - 2] && s[t - 1]) && !(s[t - 1] && (s[t + 1] || s[t + 2])) && !(s[t + 1] && s[t + 2]);
        break
    default:
        c3 = !(s[t - 3] && s[t - 2]) && !(s[t - 2] && s[t - 1]) && !(s[t - 1] && (s[t + 1] || s[t + 2])) && !(s[t + 1] && (s[t + 2] || s[t + 3]));
    }
    // the resident can only work on shift 't' if all the conditions are met
    return (c1 && c2 && c3)
    // end of eligibleToWork 
}

function sortJobsByDifficulty(jobs, residents) {
    // Rank jobs by how difficult it is to fill them. 
    // Jobs which can only fill from one level and team are considered 
    // "infinitely" difficult and must be done first, with the remaining 
    // more flexible jobs being done in order of how much in demand are 
    // the residents they want to use relative to their supply.
    teams = _.uniq(_.pluck(jobs, "team"))
    levels = _.uniq(_.pluck(jobs, "level"))
    shiftTypes = _.uniq(_.pluck(jobs, "shiftType"))
    // count available residents
    availableResidents = math.subset([], math.index(shiftTypes.length, teams.length, levels.length), 0, 0)
    for (resident of residents) {
        // each resident is available for all shiftTypes
        for (let s = 0; s < shiftTypes.length; s++) {
            availableResidents[s][_teams.indexOf(resident.team)][_levels.indexOf(resident.level)]++
        }
    }
    // allocate the inflexible jobs their residents
    for (job of jobs) {
        if (!job.flexible) {
            let s = _shiftTypes.indexOf(job.shiftType)
            let t = _teams.indexOf(job.team)
            let l = _levels.indexOf(job.level)
            // subtract the job count from the availableResidents 
            // in this job's team, level and shiftType
            availableResidents[s][t][l] -= job.count
            // the schedule fails if there aren't enough residents for 
            /// these inflexible jobs
            if (availableResidents[s][t][l] < 0) {
                throw 'There are not enough residents available to do even the inflexible jobs'
            }
            // the inflexible jobs have a difficulty of Infinity 
            // (they will always be ranked most difficult)
            job.difficulty = Infinity
        }
    }
    // calculate loads for each job and totalLoads for each shiftType
    loads = math.subset([], math.index(jobs.length, teams.length, levels.length), 0, 0)
    totalLoads = math.subset([], math.index(shiftTypes.length, teams.length, levels.length), 0, 0)
    let j = 0;
    for (job of jobs) {
        if (job.flexible) {
            let s = _shiftTypes.indexOf(job.shiftType)
            let sumloads = 0
            for (let tt = 0; tt < job.team.length; tt++) {
                for (let ll = 0; ll < job.level.length; ll++) {
                    let t = _teams.indexOf(job.team[tt])
                    let l = _levels.indexOf(job.level[ll])
                    // calling this 'loads' is a misnomer, but it saves
                    // initializing an intermediate array 
                    loads[j][t][l] += availableResidents[s][t][l]
                    sumloads += loads[j][t][l]
                }
            }
            // the job's load on each group is its count, spread out across the 
            // groups it can draw residents from
            for (let tt = 0; tt < job.team.length; tt++) {
                for (let ll = 0; ll < job.level.length; ll++) {
                    let t = _teams.indexOf(job.team[tt])
                    let l = _levels.indexOf(job.level[ll])
                    loads[j][t][l] = loads[j][t][l] / sumloads * job.count
                }
            }
            // the total load is by shiftType, for all the jobs with that shiftType
            for (let tt = 0; tt < job.team.length; tt++) {
                for (let ll = 0; ll < job.level.length; ll++) {
                    let t = _teams.indexOf(job.team[tt])
                    let l = _levels.indexOf(job.level[ll])
                    totalLoads[s][t][l] += loads[j][t][l]
                }
            }
        }
        j++
    }
    // calculate the expense of each category of resident as the ratio
    // of the load placed on them to the number of them available
    expense = math.dotDivide(totalLoads, availableResidents);
    // calculate the difficulty of each flexible job
    for (let j = 0; j < jobs.length; j++) {
        if (jobs[j].flexible) {
            jobs[j].difficulty = math.sum(math.dotMultiply(expense[s], loads[j]))
        }
    }
    // rank the jobs in descending order of cost
    // use -difficulty because sortBy sorts in ascending order
    // drop the difficulty property after we use it
    sortedJobs = _jobs.sortBy((x)=>{
        return -x.difficulty
    }
    )
    // sortedJobs = _.omit(sortedJobs,'difficulty')
    return sortedJobs
    // end of sortJobsByDifficulty
}

function stoppingTimeFunction(searchtime, t) {
    /*
the stopping time function compares the number of schedules found to some minimum number
required to be found, as a function of time elapsed. The user sets STOP_WITH_ONE and
STOP_WITH_NONE, which specify the amount of time that has to have elapsed before they
are happy to stop with one and zero schedules respectively, and we extrapolate the
stopping threshold based on this. 
*/
    // time to stop if no schedules have been found
    STOP_WITH_NONE = searchtime;
    // time to stop if one schedule has been found
    STOP_WITH_ONE = searchtime / 2;
    /*
The functional form for the threshold is: Ae^(-Bt)
solve for A and B using:
Ae^(-B*STOP_WITH_ONE) = 1
Ae^(-B*STOP_WITH_NONE) = 0.001 (ie approximately zero)
*/
    approx_zero = 0.001;
    B = Math.log(approx_zero) / (STOP_WITH_ONE - STOP_WITH_NONE);
    A = Math.exp(B * STOP_WITH_ONE);
    /*
you input the time elapsed in seconds into this stopping threshold function, and it
tells you how many schedules are required for stopping. After STOP_WITH_ONE seconds have
elapsed, it will allow stopping with one schedule, and after STOP_WITH_NONE seconds have
elapsed, it will allow stopping even without any schedules having been found.
*/
    return Math.ceil(A * Math.exp(-B * t) - approx_zero)
}
// Schedule class
// Schedule has properties residents, shiftTypes and data
class Schedule {
    constructor(residents, startdate, enddate) {
        // make a new instance of the Schedule class
        // the required inputs are a list of residents, plus start and end dates
        // each row is a resident and each column is a shift 
        // the data will contain the number of the job they are assigned,
        // or '0' for cant work, or '0.5' for can work but havent been assigned a job
        // set it initially to zero
        // shiftTypes are '1' for weekday day, '2' for weekday night,
        // '3' for weekend day and '4' for weekend night
        // argument checking
        if (_.isArray(arguments[0])) {
            let residents = arguments[0]
            if (!Schedule.errorCheckResidents(residents)) {
                throw 'Schedule must be initalized with arrays of Residents only'
            }
            this._residents = residents
            // shiftTypes
            // have to add one day to nDays to include the last day
            let nDays = 1 + math.ceil((enddate.getTime() - startdate.getTime()) / 1000 / 60 / 60 / 24)
            let dow = startdate.getDay()
            let shiftTypes = []
            let dayOfWeek = []
            for (let d = 0; d < nDays; d++) {
                // sunday is 0, saturday is 6
                if (dow === 0 || dow === 6) {
                    shiftTypes.push(3)
                    shiftTypes.push(4)
                } else {
                    shiftTypes.push(1)
                    shiftTypes.push(2)
                }
                dayOfWeek.push(dow)
                dayOfWeek.push(dow)
                dow = math.mod(dow + 1, 7)
            }
            this._shiftTypes = shiftTypes
            this._dayOfWeek = dayOfWeek
            // 'data' is an array of residents' schedules, where each resident's schedule is an array
            this._data = new Array(residents.length)
            for (let i = 0; i < this.data.length; i++) {
                this._data[i] = (new Array(shiftTypes.length)).fill(0)
            }
        } else if (typeof (arguments[0]) == 'object') {
            let a = arguments[0]
            // residents
            if (Schedule.errorCheckResidents(a._residents)) {
                this._residents = a._residents
            }
            // shiftTypes
            this._dayOfWeek = a._dayOfWeek
            this._shiftTypes = a._shiftTypes
            // data
            this._data = a._data
        } else {
            throw 'Schedule: must be initialized with a Resident array or an object'
        }
    }
    static template(a) {
        // copies the schedule in a, but erases the data
        // hence treats a as a template
        var b = new Object
        b._residents = a._residents.slice()
        b._dayOfWeek = a._dayOfWeek.slice()
        b._shiftTypes = a._shiftTypes.slice()
        b._data = new Array(a._residents.length)
        for (let i = 0; i < b._data.length; i++) {
            b._data[i] = (new Array(b._shiftTypes.length)).fill(0)
        }
        return new Schedule(b)
    }
    static copy(a) {
        // copies the schedule in a, and copies the data too
        // note that this is an independent copy via 'slice' with no references passed
        var b = new Object
        b._residents = a._residents.slice()
        b._dayOfWeek = a._dayOfWeek.slice()
        b._shiftTypes = a._shiftTypes.slice()
        b._data = new Array(a._residents.length)
        for (let i = 0; i < b._data.length; i++) {
            b._data[i] = a._data[i].slice()
        }
        return new Schedule(b)
    }
    // get
    get residents() {
        return this._residents
    }
    get shiftTypes() {
        return this._shiftTypes
    }
    get dayOfWeek() {
        return this._dayOfWeek
    }
    get data() {
        return this._data
    }
    // set
    set residents(r) {
        if (!Schedule.errorCheckResidents(r)) {
            throw 'Residents only must be supplied'
        }
        this._residents = r
    }
    // error checking
    static errorCheckResidents(r) {
        // r can be a single Resident
        if (r instanceof Resident) {
            return true
        }
        // if r is not a single Resident, it must be an Array
        if (!(r instanceof Array)) {
            return false
        }
        // if r is an Array, check it is an Array of Residents
        return _.every(r, (x)=>{
            return x instanceof Resident
        }
        )
    }
}
class Job {
    // Job has properties id, count, team, level, shiftType and flexible
    constructor(id, count, team, level, daytype, time) {
        if (arguments.length == 6) {
            // individual fields have been supplied
            // id
            Job.errorCheckId(id)
            this._id = id
            // count
            Job.errorCheckCount(count)
            this._count = count
            // flexible
            // default to false, then update to true if team or level is an array
            this._flexible = false
            // team      
            Job.errorCheckTeam(team)
            if (_.isString(team)) {
                team = [team]
            }
            this._team = team
            if (team.length > 1) {
                this._flexible = true
            }
            // multiple teams means the job is flexible
            // level      
            Job.errorCheckTeam(level)
            if (_.isString(level)) {
                level = [level]
            }
            this._level = level
            if (level.length > 1) {
                this._flexible = true
            }
            // multiple levels means the job is flexible
            // daytype & time
            if (daytype == 'weekday') {
                if (time == 'day') {
                    this._shiftType = 1
                } else if (time == 'night') {
                    this._shiftType = 2
                }
            } else if (daytype == 'weekend') {
                if (time == 'day') {
                    this._shiftType = 3
                } else if (time == 'night') {
                    this._shiftType = 4
                }
            } else {
                throw 'job defined with wrong daytype or time'
            }
        } else if (arguments.length == 1 && (typeof arguments[0] == 'object')) {
            let a = arguments[0]
            // id
            Job.errorCheckId(a._id)
            this._id = a._id
            // count
            Job.errorCheckCount(a._count)
            this._count = a._count
            // team      
            Job.errorCheckTeam(a._team)
            this._team = a._team
            // level      
            Job.errorCheckLevel(a._level)
            this._level = a._level
            // shiftType
            this._shiftType = a._shiftType
            // flexible
            // default to false, then update to true if team or level is an array
            if (!_.isBoolean(a._flexible)) {
                throw 'object property \'flexible\' must be boolean'
            }
            this._flexible = a._flexible
        } else {
            throw 'Job: constructor can only be called with 6 parameters or one object'
        }
    }
    // get
    // includes difficulty, which is not in the constructor
    get id() {
        return this._id
    }
    get count() {
        return this._count
    }
    get team() {
        return this._team
    }
    get level() {
        return this._level
    }
    get shiftType() {
        return this._shiftType
    }
    get flexible() {
        return this._flexible
    }
    get difficulty() {
        return this._difficulty
    }
    // set
    // includes difficulty, which is not in the constructor
    set id(i) {
        Job.errorCheckId(i)
        this._id = i
    }
    set count(c) {
        Job.errorCheckCount(c)
        this._count = c
    }
    set team(t) {
        Job.errorCheckTeam(team)
        if (_.isString(team)) {
            team = [team]
        }
        this._team = team
        if (team.length > 1) {
            this._flexible = true
        }
        // multiple teams means the job is flexible
    }
    set level(l) {
        Job.errorCheckTeam(level)
        if (_.isString(level)) {
            level = [level]
        }
        this._level = level
        if (level.length > 1) {
            this._flexible = true
        }
        // multiple levels means the job is flexible
    }
    set shiftType(s) {
        if (!_.contains([1, 2, 3, 4], s)) {
            throw 'shiftType must be 1, 2, 3 or 4'
        } else {
            this._shiftType = s
        }
    }
    set flexible(f) {
        throw 'cant set this property'
    }
    set difficulty(d) {
        this._difficulty = d
    }
    // error checking
    static errorCheckId(id) {
        if (!math.isNumeric(id) || !math.isPositive(id) || !math.isInteger(id)) {
            throw 'job id must be a positive integer'
        }
    }
    static errorCheckCount(count) {
        if (!math.isNumeric(count) || !math.isPositive(count) || !math.isInteger(count)) {
            throw 'job count must be a positive integer'
        }
    }
    static errorCheckTeam(team) {
        if (typeof team != "string" && !_.isArray(team)) {
            throw 'team must be a string or an array of strings'
        } else if (_.isArray(team)) {
            for (let i = 0; i < team.length; i++) {
                if (typeof team[i] != "string") {
                    throw 'team must be a string or an array of strings'
                }
            }
        }
    }
    static errorCheckLevel(level) {
        if (typeof level != "string" && !_.isArray(level)) {
            throw 'level must be a string or an array of strings'
        } else if (_.isArray(level)) {
            for (let i = 0; i < level.length; i++) {
                if (typeof level[i] != "string") {
                    throw 'level must be a string or an array of strings'
                }
            }
        }
    }
    // end of Job class
}
class Resident {
    constructor(name, pager, team, level) {
        if (arguments.length == 4) {
            // individual fields have been supplied
            // name
            if (typeof name != "string") {
                throw 'Resident: name must be a string'
            } else {
                this._name = name
            }
            // pager
            if (typeof pager != "string") {
                throw 'pager must be a string'
            } else {
                this._pager = pager
            }
            // team
            if (typeof team != "string") {
                throw 'team must be a string'
            } else {
                this._team = team
            }
            // level
            if (typeof level != "string") {
                throw 'level must be a string'
            } else {
                this._level = level
            }
        } else if (arguments.length == 1 && (typeof arguments[0] == 'object')) {
            let a = arguments[0]
            // name
            // Resident.errorCheckName(a._name)
            this._name = a._name
            // pager
            // Resident.errorCheckPager(a._pager)
            this._pager = a._pager
            // team      
            // Resident.errorCheckTeam(a._team)
            this._team = a._team
            // level      
            // Resident.errorCheckLevel(a._level)
            this._level = a._level
        } else {
            throw 'Resident: constructor can only be called with 4 parameters or one object'
        }
    }
    get name() {
        return this._name
    }
    get pager() {
        return this._pager
    }
    get team() {
        return this._team
    }
    get level() {
        return this._level
    }
    // do error checking on set functions later
    set name(n) {
        this._name = n
    }
    set pager(p) {
        this._pager = p
    }
    set team(t) {
        this._team = t
    }
    set level(l) {
        this._level = l
    }
}
