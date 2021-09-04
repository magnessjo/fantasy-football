/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _draft = __webpack_require__(1);

var _draft2 = _interopRequireDefault(_draft);

var _draft3 = __webpack_require__(2);

var _draft4 = _interopRequireDefault(_draft3);

var _draft5 = __webpack_require__(3);

var _draft6 = _interopRequireDefault(_draft5);

var _draft7 = __webpack_require__(4);

var _draft8 = _interopRequireDefault(_draft7);

var _draft9 = __webpack_require__(5);

var _draft10 = _interopRequireDefault(_draft9);

var _draft11 = __webpack_require__(6);

var _draft12 = _interopRequireDefault(_draft11);

var _draft13 = __webpack_require__(7);

var _draft14 = _interopRequireDefault(_draft13);

var _draft15 = __webpack_require__(8);

var _draft16 = _interopRequireDefault(_draft15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drafts = [_draft16.default, _draft14.default, _draft12.default, _draft10.default, _draft8.default, _draft6.default, _draft4.default, _draft2.default];
var section = document.querySelector('#results');
var lock = section.querySelector('.lock');
var htmlOutput = lock.querySelector('.data');
var show = 'All';

// Private Function : Mobile

function setMobile(draft, wrapper) {
  var container = document.createElement('div');
  container.classList.add('wrapper');

  // Set header for round

  if (show === 'All') {
    var header = document.createElement('h3');
    header.innerHTML = 'Round ' + draft.round;
    container.appendChild(header);
  } else {
    container.classList.add('filtered');
  }

  // Iterate over each entry

  draft.picks.forEach(function (entry) {
    if (show === 'All') {
      var element = document.createElement('div');
      var player = document.createElement('div');
      var selectionWrapper = document.createElement('div');
      var selection = document.createElement('span');

      element.classList.add('entry');

      player.innerHTML = entry.player;
      selection.innerHTML = entry.selection;

      selectionWrapper.appendChild(selection);
      element.appendChild(player);
      element.appendChild(selectionWrapper);
      container.appendChild(element);
    } else {
      if (entry.player === show) {
        var _element = document.createElement('div');
        var round = document.createElement('div');
        var _selection = document.createElement('div');

        _element.classList.add('entry');

        round.innerHTML = draft.round;
        _selection.innerHTML = entry.selection;
        _element.appendChild(round);
        _element.appendChild(_selection);
        container.appendChild(_element);
      }
    }
  });

  wrapper.appendChild(container);
}

// Private Function : set Desktop

function setDesktop(draft, wrapper) {
  var row = document.createElement('tr');

  // Set Round Number

  var roundLabel = document.createElement('td');
  roundLabel.innerHTML = draft.round;
  row.appendChild(roundLabel);

  if (Math.round(draft.round) % 2 === 0) {
    draft.picks.reverse();
  }

  if (show === 'All') {
    draft.picks.forEach(function (entry) {
      var element = document.createElement('td');

      element.innerHTML = entry.selection;
      row.appendChild(element);
    });
  } else {
    draft.picks.forEach(function (entry) {
      if (entry.player === show) {
        var element = document.createElement('td');
        element.innerHTML = entry.selection;
        row.appendChild(element);
      }
    });
  }

  wrapper.appendChild(row);
}

// Private Function : set player names on table

function setTablePlayers(round, element) {
  var row = document.createElement('tr');

  // fake for the round number

  row.innerHTML = '<td></td>';

  round.picks.forEach(function (name, i) {
    var td = document.createElement('td');

    if (show === 'All') {
      td.innerHTML = name.player;
      row.appendChild(td);
    } else {
      if (name.player === show) {
        td.innerHTML = name.player;
        row.appendChild(td);
      }
    }
  });

  element.appendChild(row);
}

function createTable() {
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
}

// Function sort years

function list(years, table, mobile) {
  return new Promise(function (resolve, reject) {
    years.forEach(function (item, i) {
      setMobile(item, mobile);
      setDesktop(item, table.querySelector('tbody'));

      if (i === 0) {
        setTablePlayers(item, table.querySelector('thead'));
      }

      if (i === years.length - 1) {
        resolve();
      }
    });
  });
}

// Private Function : Loop each draft

function outputData() {
  // Set each draft

  drafts.forEach(function (data) {
    var wrapper = document.createElement('div');
    var heading = document.createElement('h2');
    var mobile = document.createElement('div');
    var table = createTable();
    var years = data.draft;

    heading.innerHTML = 'Draft ' + data.year;
    mobile.classList.add('mobile');

    list(years, table, mobile).then(function () {
      wrapper.appendChild(heading);
      wrapper.appendChild(mobile);
      wrapper.appendChild(table);
      htmlOutput.appendChild(wrapper);
    });
  });
}

function createDropDown() {
  var picks = _draft6.default.draft[0].picks;
  var select = document.createElement('select');

  // all

  var option = document.createElement('option');
  option.innerHTML = 'All';
  option.value = 'All';
  select.appendChild(option);

  picks.forEach(function (key) {
    var name = key.player;
    var option = document.createElement('option');
    option.innerHTML = name;
    option.value = name;
    select.appendChild(option);
  });

  lock.insertBefore(select, lock.firstChild);

  select.addEventListener('change', function () {
    var selected = select.options[select.selectedIndex].text;
    show = selected;

    while (htmlOutput.firstChild) {
      htmlOutput.removeChild(htmlOutput.firstChild);
    }

    outputData(selected);
  });
}

// Load

document.addEventListener('DOMContentLoaded', function () {
  createDropDown();
  outputData();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var draft = {
  year: '2014',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Montee Ball'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Jamaal Charles, KC **'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Demaryius Thomas'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Giovani Bernard'
    }, {
      number: '5',
      player: 'John',
      selection: 'Adrian Peterson, Min **'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Aaron Rodgers, GB ***'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Drew Brees, NO *'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Marshawn Lynch, Sea **'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Calvin Johnson, Det *'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Arian Foster'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'Matt Forte, Chi *'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'LeSean McCoy, Phi *'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Jimmy Graham, NO'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'LeVeon Bell'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'Zac Stacy'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Dez Bryant'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Brandon Marshall'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'A.J. Green'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Doug Martin'
    }, {
      number: '8',
      player: 'John',
      selection: 'Julio Jones'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Andre Ellington'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Eddie Lacy, GB *'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Jordy Nelson'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'DeMarco Murray, Dal *'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Antonio Brown'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'C.J. Spiller'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Alfred Morris'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Alshon Jeffery'
    }, {
      number: '5',
      player: 'John',
      selection: 'Rob Gronkowski, NE'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Reggie Bush'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Shane Vereen'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Randall Cobb'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Larry Fitzgerald'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Peyton Manning, Den *'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'Ray Rice'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Percy Harvin'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Joique Bell'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'Vincent Jackson'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'Ryan Mathews'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Ben Tate'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Frank Gore'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Toby Gerhart'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Rashad Jennings'
    }, {
      number: '8',
      player: 'John',
      selection: 'Michael Floyd'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Chris Johnson'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Pierre Garcon'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Keenan Allen'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Andre Johnson'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'AnDrew/Scott Luck'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Maurice Jones-Drew'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Steven Jackson'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Tom Brady'
    }, {
      number: '5',
      player: 'John',
      selection: 'Matthew Stafford'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Bishop Sankey'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Victor Cruz'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Cam Newton'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Trent Richardson'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Cordarrelle Patterson'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'DeSean Jackson'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Roddy White'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'T.Y. Hilton'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'Darren Sproles'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'Michael Crabtree'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Torrey Smith'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Vernon Davis, SF'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Emmanuel Sanders'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Julian Edelman'
    }, {
      number: '8',
      player: 'John',
      selection: 'Mark Ingram'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Danny Amendola'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Nick Foles'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Jordan Cameron, CLE'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Jason Witten, DAL'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Mike Wallace'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Colin Kaepernick'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Golden Tate'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Philip Rivers'
    }, {
      number: '5',
      player: 'John',
      selection: 'Knowshon Moreno'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Sammy Watkins'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Matt Ryan'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Jeremy Maclin'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Lamar Miller'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Reggie Wayne'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'Anquan Boldin'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Russell Wilson'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Terrance Williams'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'Greg Olsen, CAR'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'Khiry Robinson'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Jay Cutler'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Pierre Thomas'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Wes Welker'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Marques Colston'
    }, {
      number: '8',
      player: 'John',
      selection: 'Jeremy Hill'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Bernard Pierce'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Dennis Pitta, BAL'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Riley Cooper'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Hakeem Nicks'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'DeAngelo Williams'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Danny Woodhead'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Seattle Seahawks'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Kendall Wright'
    }, {
      number: '5',
      player: 'John',
      selection: 'Eric Decker'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Jordan Reed, WAS'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Carlos Hyde'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Fred Jackson'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Zach Ertz, PHI'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Stevan Ridley'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'Robert Griffin III'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Tony Romo'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Terrance West'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'Cecil Shorts'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'DeAndre Hopkins'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Darren McFadden'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Dwayne Bowe'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Devonta Freeman'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Steve Smith'
    }, {
      number: '8',
      player: 'John',
      selection: 'Markus Wheaton'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Greg Jennings'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Chris Ivory'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Knile Davis'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Stephen Gostkowski, NE'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'San Francisco 49ers'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Buffalo Bills'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'James Jones'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Christine Michael'
    }, {
      number: '5',
      player: 'John',
      selection: 'Shonn Greene'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Andre Williams'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Mike Evans'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Brandin Cooks'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Ahmad Bradshaw'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Donald Brown'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'Carolina Panthers'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Roy Helu'
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'LeGarrette Blount'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'Ben Roethlisberger'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'CJ Henderson DEN'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Andy Dalton'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Justin Tucker'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Kelvin Benjamin'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Eric Ebron, DET'
    }, {
      number: '8',
      player: 'John',
      selection: 'Carson Palmer'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Ladarius Green, SD'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Justin Hunter'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Jarrett Boykin'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Tavon Austin'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Aaron Dobson'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Matt Bryant, ATL'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Johnny Manziel'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Julius Thomas, Den *'
    }, {
      number: '5',
      player: 'John',
      selection: 'Rueben Randle'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Jordan Todman'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Martellus Bennett, CHI'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Cincinnati Bengals'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Miles Austin'
    }, {
      number: '10',
      player: 'Biggie',
      selection: 'Arizona Cardinals'
    }, {
      number: '11',
      player: 'Jacobson',
      selection: 'Bobby Rainey'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'St. Louis Rams'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Bryce Brown'
    }, {
      number: '2',
      player: 'Jacobson',
      selection: 'AnDrew Hawkins'
    }, {
      number: '3',
      player: 'Biggie',
      selection: 'Kyle Rudolph, MIN'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Antonio Gates, SD'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Eli Manning'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'James Starks'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Joe Flacco'
    }, {
      number: '8',
      player: 'John',
      selection: 'Heath Miller, PIT'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Brandon LaFell'
    }, {
      number: '10',
      player: 'Ford',
      selection: ''
    }, {
      number: '11',
      player: 'Kyle',
      selection: ''
    }, {
      number: '12',
      player: 'Dorsey',
      selection: ''
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '2',
      player: 'Kyle',
      selection: ''
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Steven Hauschka'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Ronnie Hillman'
    }, {
      number: '5',
      player: 'John',
      selection: 'Josh Gordon'
    }, {
      number: '6',
      player: 'Eder',
      selection: ''
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Nick Novak, SD'
    }, {
      number: '8',
      player: 'Shane',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Biggie',
      selection: ''
    }, {
      number: '11',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Dan Bailey, DAL'
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var draft = {
  year: '2015',
  'draft': [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'AP'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Jamaal Charles, KC ***'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Lacy'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Antonio Brown PIT,'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'DeMarco Murray PHI'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'C.J. Anderson'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Demaryius Thomas DEN,'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Aaron Rodgers'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Matt Forte CHI'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Justin Forsett BAL'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Lynch ***'
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Odell Beckham Jr.'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Bell *'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Lamar Miller MIA'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'LeSean McCoy BUF'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Dez *'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Frank Gore IND'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Alfred Morris WAS'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Rob Gronkowski NE,'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Julio Jones ATL,'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Calvin Johnson DET,'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Randall Cobb GB,'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Jimmy Graham SEA,'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'A.J. Green CIN,'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Alshon Jeffery CHI,'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Todd Gurley STL'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'T.Y. Hilton IND,'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Melvin Gordon SD'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Brandin Cooks NO,'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Latavius Murray OAK'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Arian Foster HOU'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Ameer Abdullah DET'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Mark Ingram NO'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Mike Evans TB,'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Brandon Marshall NYJ,'
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Joseph Randle DAL'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Peyton Manning'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Rashad Jennings NYG'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Julian Edelman NE,'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Emmanuel Sanders DEN,'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'C.J. Spiller NO'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Jordan Matthews PHI,'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'T.J. Yeldon JAC'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Andre Ellington ARI'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Christopher Ivory NYJ'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Jonathan Stewart CAR'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Andre Johnson IND,'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Isaiah Crowell CLE'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Tom Brady'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Doug Martin TB'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Devonta Freeman ATL'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Keenan Allen SD,'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Matt Ryan'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Amari Cooper OAK,'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Russell Wilson'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Davante Adams GB,'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Tevin Coleman ATL'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'AnDrew Luck *'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Golden Tate DET, '
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Tre Mason STL'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Greg Olsen CAR,'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Martavis Bryant PIT, '
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Travis Kelce KC,'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Jeremy Maclin KC,'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Steve Smith BAL,'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Giovani Bernard CIN'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Duke Johnson CLE'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Jarvis Landry MIA,'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Nelson Agholor PHI,'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'DeSean Jackson WAS,'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Vincent Jackson TB, '
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Joique Bell DET'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'David Johnson ARI'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Drew Brees'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Jason Witten DAL,'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Ben Roethlisberger'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Shane Vereen NYG'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Sammy Watkins *'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Torrey Smith SF,'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Larry Fitzgerald ARI,'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Martellus Bennett CHI,'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Marques Colston NO,'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'DeAngelo Williams PIT'
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Ryan Mathews PHI'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Alfred Blue HOU'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Ronnie Hillman DEN'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Darren McFadden DAL'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Bishop Sankey TEN'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Delanie Walker TEN,'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Roddy White ATL,'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Charles Johnson MIN,'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Mike Wallace MIN,'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Jermey Hill *'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Victor Cruz NYG,'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Jonas Gray FA'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Jordan Cameron MIA,'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Andre Williams NYG'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Michael Floyd ARI,'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Allen Robinson JAC,'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Larry Donnell NYG,'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Carlos Hyde *'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'John Brown ARI, '
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Steve Johnson SD, '
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Sam Bradford'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Tony Romo'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Kyle Rudolph MIN,'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Eli Manning'
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Anquan Boldin SF,'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Ryan Tannehill'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Percy Harvin BUF, '
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Seattle Seahawks'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Denard Robinson JAC'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Terrance Williams DAL,'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Cam Newton'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Matthew Stafford'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Tyler Eifert CIN,'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Eric Decker NYJ,'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Philadelphia Eagles'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Knile Davis KC'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'DeAndre Hopkins *'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Jerick McKinnon MIN'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Philip Rivers'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Matt Jones WAS'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Charles Sims TB'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Antonio Gates SD,'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Fred Jackson SEA'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Terrance West TEN'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Darren Sproles PHI'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Brian Quick STL,'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Stephen Gostkowski NE,'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Malcom Floyd SD,'
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Devin Funchess CAR, '
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Cameron Artis-Payne CAR'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Colin Kaepernick'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Andy Dalton'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Danny Woodhead SD'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Houston Texans'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'LeGarrette Blount *'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Kendall Wright TEN,'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Teddy Bridgewater'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Lorenzo Taliaferro BAL'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Javorius Allen BAL'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Buffalo Bills'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Christine Michael DAL'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Pierre Garcon WAS,'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Steven Hauschka SEA,'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Roy Helu OAK'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Jay Ajayi MIA'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Justin Tucker BAL,'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Breshad Perriman BAL,'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Jordy Nelson '
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Reggie Bush SF'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Eddie Royal CHI,'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Jerricho Cotchery CAR,'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Austin Seferian-Jenkins TB,'
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Markus Wheaton PIT,'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Josh Hill NO,'
    }, {
      number: '2',
      player: 'Shane',
      selection: ''
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Theo Riddick DET'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Joe Flacco'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Crocket Gilmore '
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Julius Thomas JAC,'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Kevin White CHI,'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Danny Amendola NE,'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'Vernon Davis SF,'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Jameis Winston'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Khiry Robinson NO'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Ravens'
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Adam Vinatieri IND,'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Cecil Shorts HOU'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Dwayne Allen IND,'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Tyrod Taylor'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Cody Latimer DEN,'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Marcus Mariota'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'Owen Daniels DEN,'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Mason Crosby GB,'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'St. Louis Rams'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Josh Scobee PIT,'
    }, {
      number: '11',
      player: 'Shane',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Dorial Green-Beckham TEN, '
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Denver Broncos'
    }, {
      number: '2',
      player: 'Shane',
      selection: ''
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'David Cobb TEN'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Reily copper phi'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Brandon Coleman NO,'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Cody Parkey PHI,'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Richard Rogers GB'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'Arizona Cardinals'
    }, {
      number: '9',
      player: 'Mesher',
      selection: 'James Starks GB'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Dan Bailey DAL,'
    }, {
      number: '11',
      player: 'Kyle',
      selection: ''
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Jay Cutler'
    }]
  }, {
    round: '17',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Chris Johnson ARI'
    }, {
      number: '2',
      player: 'Kyle',
      selection: ''
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Carson Palmer'
    }, {
      number: '4',
      player: 'Mesher',
      selection: 'Matt Bryant ATL,'
    }, {
      number: '5',
      player: 'Bob',
      selection: 'Carlos williams buf'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Brandon McManus DEN,'
    }, {
      number: '7',
      player: 'Drew/Scott',
      selection: 'New England Patriots'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Josh Robinson IND'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Robbie Gould K CHI'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Brandon LaFell NE,'
    }, {
      number: '11',
      player: 'Shane',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'James Jones'
    }]
  }, {
    round: '18',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: 'Blair Walsh MIN,'
    }, {
      number: '2',
      player: 'Shane',
      selection: ''
    }, {
      number: '3',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Tavin Austin'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Chris Polk HOU'
    }, {
      number: '6',
      player: 'Drew/Scott',
      selection: 'Stephen Diggs MInn'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Caralina D'
    }, {
      number: '8',
      player: 'Bob',
      selection: 'James white NE'
    }, {
      number: '9',
      player: 'Mesher',
      selection: ''
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Kenny stills'
    }, {
      number: '11',
      player: 'Kyle',
      selection: ''
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Zach Ortiz'
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var draft = {
  year: '2016',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Odell Beckham Jr.'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Ezekiel Elliott'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'AP'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Lamar Miller'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Antonio Brown *'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Devonta Freeman'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Eddie Lacy'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'A.J. Green'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Bell **'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'DeAndre Hopkins'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Rob Gronkowski'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Doug Martin'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'LeSean McCoy'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Brandin Cooks'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Cam Newton'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Thomas Rawls'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Arian Foster'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Julio Jones ATL *'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'C.J. Anderson'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Keenan Allen'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'T.Y. Hilton'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Dez Bryant'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Demaryius Thomas'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Jeremy Hill'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Mike Evans TB *'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'DeMarco Murray'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Latavius Murray'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Todd Gurley *'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Alshon Jeffery'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Jonathan Stewart'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Aaron Rodgers'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Mark Ingram NO *'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Sammy Watkins'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Melvin Gordon'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Brandon Marshall *'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Carlos Hyde'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Jordan Reed'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Matt Forte'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Jeremy Langford'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Rashad Jennings'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Kelvin Benjamin'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Matt Jones'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Jeremy Maclin'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Jamaal Charles'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Greg Olsen'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Julian Edelman'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Russell Wilson'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Randall Cobb'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Drew Brees'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Derrick Henry'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Frank Gore'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Jarvis Landry'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Ben Roethlisberger'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Donte Moncrief'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Allen Hurns'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'La blunt NE'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Doug Baldwin'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Amari Cooper OAK *'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Eric Decker '
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Golden Tate'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Emmanuel Sanders'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Ryan Mathews'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Travis Kelce'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'DeAngelo Williams'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Jordan Matthews'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Marvin Jones'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Tom Brady'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Giovani Bernard'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Andrew Luck'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Julius Thomas'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'John Brown'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Michael Floyd'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Delanie Walker'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Josh Gordon'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Larry Fitzgerald ARI *'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Isaiah Crowell'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Spencer Ware'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Gary Barnidge'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Tyler Eifert'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'DeSean Jackson'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Antonio Gates'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Ameer Abdullah'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Carson Palmer'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'David Johnson ARI *'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Duke Johnson Jr.'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Chris Ivory'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Danny Woodhead'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Michael Crabtree'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Blake Bortles'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Jay Ajayi'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Sterling Shepard'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Zach Ertz'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Tevin Coleman'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Terrance West'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Charles Sims'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Tyler Lockett'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Coby Fleener'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Christine Michael'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Eli Manning'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Travis Benjamin'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'T.J. Yeldon'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Allen Robinson JAC,'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Dwayne Allen'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Kevin White'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Torrey Smith'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Stefon Diggs'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'James White'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'DeVante Parker'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Tavon Austin'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Kamar Aiken'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Rob Kelly WAS'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Forsett'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Jimmy Graham'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Devontae Booker'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Mikinnon Minn'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Bilal Powell'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Willie Snead'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Eric Ebron'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Martellus Bennett'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Vincent Jackson'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Stephen Gronjowski K NE'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Devin Funchess'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Mike Wallace'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'James Starks'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Rivers'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Seattle Defense'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Markus Wheaton'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Jordan Howard'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Darren Sproles'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Corey Coleman'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Haskua sea k'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Tyrod Taylor'
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Chris Johnson'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Broncos'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Zach Miller'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Kenneth Dixon'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Alfred Morris'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Jameis Winston'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Kirk Cousins'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Caronlia Defense'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Phillip Dorsett'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Jason Witten'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Kenyan drake miami'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Cardinals D'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Michael Thomas'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Jordy Nelson *'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Dak Prescott'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Stafford'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'DeAndre Washington'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Steve Smith'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Wendall Smallwood'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Derek Carr'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Dion Lewis'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Levon Treadwell Minn'
    }, {
      number: '11',
      player: 'Shane',
      selection: 'Marcus Mariota'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Charcandrick West KC'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Sanu'
    }, {
      number: '2',
      player: 'Shane',
      selection: 'Breshad Perriman'
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Ryan Tannehill'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Matt Ryan'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Tyler Bortn Phi'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Rishard Matthews'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Pierre Garcon'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Tucker'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Texans'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Chris Hogan'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Buck Allen'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: 'Joe Flacco'
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: 'Victor Cruz'
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'RG III'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Terrelle Pryor'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Jared Cook'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Will Fuller'
    }, {
      number: '6',
      player: 'Ford',
      selection: 'Josh Doctson Was'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Tyler Boyd'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Chiefs D'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Chris Thompson Was'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Theo Riddick'
    }, {
      number: '11',
      player: 'Shane',
      selection: ''
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'C.J. Spiller'
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Dorial Green-Beckham'
    }, {
      number: '2',
      player: 'Shane',
      selection: ''
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Kaurse Sea'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Andy Dalton'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Conor Barth K'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Cano Carolina Kicker'
    }, {
      number: '7',
      player: 'Ford',
      selection: 'Charles Clay'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Tim Hightower'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Crosby GB'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Minnestoa Defense'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'McFadden'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: ''
    }]
  }, {
    round: '17',
    picks: [{
      number: '1',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '2',
      player: 'Drew/Scott',
      selection: 'Rams'
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Santos K Cheifs'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Green Den'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Ryan Fitzpatrick'
    }, {
      number: '6',
      player: 'Ford',
      selection: ''
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Sammy Coates'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Kary RB bears'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Walsh K'
    }, {
      number: '10',
      player: 'Eder',
      selection: 'Catantor K Arz'
    }, {
      number: '11',
      player: 'Shane',
      selection: ''
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Vinatteri '
    }]
  }, {
    round: '18',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Green Bay'
    }, {
      number: '2',
      player: 'Shane',
      selection: ''
    }, {
      number: '3',
      player: 'Eder',
      selection: 'Jets'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Giants'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Bears'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Cinn D'
    }, {
      number: '7',
      player: 'Ford',
      selection: ''
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Taiae sharpie Tenn'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Shane Verean'
    }, {
      number: '10',
      player: 'Josh',
      selection: 'Bradford'
    }, {
      number: '11',
      player: 'Drew/Scott',
      selection: 'Dan Baliey'
    }, {
      number: '12',
      player: 'Dorsey',
      selection: ''
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var draft = {
  year: '2017',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'LeVeon Bell'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Antonio Brown'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Freeman'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'McCoy'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Jordy Nelson'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Elliott'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'AJ Green *'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Fournette'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'Gurley'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Mike Evans'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Bechham Jr *'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'David Johnson ARI **'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Jordan Howard'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Julio Jones'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Michael Thomas'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Dez Bryant'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'Dalvin Cook'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Jay Ajayi'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Marshawyn Lynch'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Brandin Cooks *'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Amari Cooper'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Davante Adams'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Kareem Hunt'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Gronkowski'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'McCaffrey'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Hyde'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Aaron Rodgers *'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Doug Baldwin'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Lamar Miller'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Demaryius Thomas'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Alshon Jefferey'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Melvin Gordon *'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'DeMarco Murray *'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Joe Mixon'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Mark Ingram'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Drew Brees'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'T.Y. Hilton'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Matt Ryan'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Ty Montgomery'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Paul Perkins'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'Woodhead'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Robert Kelley'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Cam Newton'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'DeAndre Hopkins'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Russell Wilson'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Kelvin Benjamin'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Allen Robinson'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Tyreek Hill'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'Derrick Henry'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Jordan Reed'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Martavis Bryant'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Frank Gore'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Keenan Allen'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Terrance West'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Travis Kelce'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Dak Prescott'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'Sammy Watkins'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Greg Olson'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Adrian Peterson'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Larry Fitzgerald'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Emmanuel Sanders'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Jimmy Graham'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'C.J. Anderson'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Jameis Winston'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'DeVante Parker'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Duke Johnson'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Ameer Abdullah'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Mike Gillislee'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Jarvis Landry'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Doug Martin'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Tom Brady *'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Goldon Tate'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'Marcus Mariota'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Stefon Diggs'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Darren McFadden'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Isaiah Crowell *'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Tevin Coleman'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'DeSean Jackson'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Jeremy Maclin'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Theo Riddick'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'John Brown'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Andrew Luck'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Pierre Garcon'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Gio Bernard'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Matthew Stafford'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Delanie Walker'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Michael Crabtree *'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Tyrell Williams'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'Kyle Rudolph'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Jacquizz Rodgers'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Tyler Eifert'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Randall Cobb'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Eric Ebron'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Sterling Shepard'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Jonathan Stewart'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Chris Hogan'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'Rawls'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Jamison Crowder'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Martellus Bennett'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Eddie Lacy'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Eric Decker'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Derek Carr'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Jamaal Charles'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Adam Thielien'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'Brandon Marshall'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Darren Sproles'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Big Ben'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Kenny Britt'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Matt Forte'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Tucker'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Samaje Perine'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Blount'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'Devin Funchess'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Charcandrick West'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Corey Davis'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Kirk Cousins'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Austin Hooper'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'DOnta Foreman'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Zach Ertz'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Bilal Powell *'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'Jamaal Williams'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Eli Manning'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Latavius Murray'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Philip Rivers'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Hunter Henry'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Julius Thomas'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Tyrod Taylor'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Kevin White'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'Breshad Perriman'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Mike Wallace'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Denver Broncos'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Jeremey Hill'
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Antonio Gates'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Charles Sims'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Andy Dalton'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Jack Doyle'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'Buck Allen'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Houston Texans'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Baltimore Ravens'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Jordan Matthews'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Matt Bryant'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Zay Jones'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Donte Moncrief'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Ted Ginn'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'Alvin Kamara'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Seattle Seahawks'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Stephen Gostkowski'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'KC Chiefs'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'James White'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Marlon Mack'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Kendall Wright'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Carson Wentz'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'Chris Ivory'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Kenny Golladay'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Coby Fleener'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Rex Burkhead'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'C.J. Prosise'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Shane Vereen'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Dion Lewis'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'Dan Bailey'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'Evan Engram'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Wendell Smallwood'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Corey Coleman'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Jason Witten'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Willie Snead'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Cooper Kupp'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Mason Crosby'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Minnesota Vikings'
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Zeller',
      selection: 'Marvin Jones'
    }, {
      number: '2',
      player: 'Ford',
      selection: 'Chris Thompson'
    }, {
      number: '3',
      player: 'Bob',
      selection: 'Philadelphia Eagles'
    }, {
      number: '4',
      player: 'Kyle',
      selection: 'Robert Turbin'
    }, {
      number: '5',
      player: 'Shane',
      selection: 'Wil Lutz'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Terrelle Pryor *'
    }, {
      number: '7',
      player: 'Toby',
      selection: 'Sebastian Janikowski'
    }, {
      number: '8',
      player: 'Eder',
      selection: 'Mike Williams (LAC)'
    }, {
      number: '9',
      player: 'Drew/Scott',
      selection: 'Joe Williams'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'James Conner'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Rishard Matthews'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Matt Prater'
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Arizona Cardinals'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Alex Smith'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Cameron Brate'
    }, {
      number: '4',
      player: 'Drew/Scott',
      selection: 'New England Patriots'
    }, {
      number: '5',
      player: 'Eder',
      selection: 'O.J. Howard'
    }, {
      number: '6',
      player: 'Toby',
      selection: 'Carson Palmer'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Cole Beasley'
    }, {
      number: '8',
      player: 'Shane',
      selection: 'Carolina Panthers'
    }, {
      number: '9',
      player: 'Kyle',
      selection: 'Devontae Booker'
    }, {
      number: '10',
      player: 'Bob',
      selection: 'Josh Doctson'
    }, {
      number: '11',
      player: 'Ford',
      selection: 'Buffalo Bills'
    }, {
      number: '12',
      player: 'Zeller',
      selection: 'Dustin Hopkins'
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var draft = {
  year: '2018',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Johnson'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Bell'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Gurley *'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Barkley'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Hunt'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Leonard Fournette'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Elliott	*'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Melvin Gordon'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Beckham'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Julio Jones'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Dalvin Cook'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Antonio Brown *'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'McCaffrey'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Devonta Freeman'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'AJ Green'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Devante Adams'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Rob Gronkowski'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Josh Howard'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Keenan Allen'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Michael Thomas *'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Mike Evans'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'TY Hilton'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Tyreek Hill'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Lesean McCoy'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Dough Baldwin'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Amari Cooper'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Jarvis Landry'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Joe Mixon'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Kenyan Drake'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Adam Thielen'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Josh Gordon'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Stefon Diggs'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Alex Collins'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Royce Freeman'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Brandon Cooks'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Zach Ertz'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Lamar Miller'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Derrick Henry'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'DeAndre Hopkins *'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Marshawn Lynch'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'JuJU'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Demaryius Thomas'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Marvin Jones'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Rex Burkhead'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Golden Tate'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'Jay Ajayi'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Michael Crabtree'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Chris Hogan'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Larry Fitzgerald *'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Arron Rodgers'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Dion Lewis'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Allen Robinson'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Marquise Goodwin'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Mark Ingram'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Greg Olson'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Carlos Hyde'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Kelce *'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Tevin Coleman'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Tom Brady'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Pierre Garcon'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Deshaun Watson'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Evan Engram'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Duke Johnson'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Cam Newton'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Russell Wilson'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Matt Breida'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Drew Brees'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Emmanuel Sanders'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Big Ben'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'Edelman'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Jimmy Graham *'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Chris Carson'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Delanie Walker'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Tarik Cohen'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Andrew Luck'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Kirk Cousins'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Chris Thompson'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Peyton Barber'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Latavius Murray'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Corey Davis'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Robby Anderson'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Jamall Williams'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Will Fuller'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Cooper Kupp'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Isaiah Crowell'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Sony Michel'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Sammy Watkins'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Alfred Morris'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Kerryon Johnson'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'John Brown'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Kyle Rudolph'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Jordan Reed'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Marlon Mack'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'James White'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Jamison Crowder'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Devin Funchess'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'AP'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Gio Berndard'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Arron Jones'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Alshon Jeffery'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Robert Woods'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Jordy Nelson'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Patrick Mahomes'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Ronald Jones II'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Cameron Meredith'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Rashaad Penny'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Kelvin Benjamin'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Sterling Shepard'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Allen Hurns'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Trey Burton'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Stafford'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'TY Montgomery'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Nick Chubb'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Jimmy Garoppolo'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Kenny Golladay'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Matt Ryan'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Michael Gallup'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'DJ Moore'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Jack Doyle'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Randall Cobb'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Alex Smith'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Stephen Gostkowski'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Nelson Agholor'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'David Njoku'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Jordan Wilkins'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Phillip Rivers *'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Ravens D'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Jacksonville D'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Mohamed Sanu'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Calvin Ridley'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Theo Riddick'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'CJ Anderson'
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Jared Goff'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Chris Godwin'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Tyler Eifert'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Anthony Miller'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Greg Zuerlein'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Justin Tucker'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Corey Clement'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Devante Parker'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Devontae Booker'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'Dak Prescott'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Kenny Stills'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Josh Doctson'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Charles Clay'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Eagles D'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Bilal Powell'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Texans D'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Tyler Lockett'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Keelan Cole'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'George Kittle'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Alvin Kamara *'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Bears D'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Matt Bryant'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Carson Wentz *'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Jared Cook'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Rams D'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Mike Williams'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Hayden Hurst'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Dez'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'James Conner'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Blount'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Ebron'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Derrick Carr'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'James Washington'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'OJ Howard'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Blake Bortles'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Chris Ivory'
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Chase Edmonds'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Paul Richardson'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Will Lutz'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Donta Foreman'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Robbie Gould'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Vikings D'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Cole Beasley'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'John Ross'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'Mitch Trubisky'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Jeremy Hill'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Chargers D'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Terrelle Pryor'
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Jake Elliott'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Chris Boswell'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Broncos D'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'Body Parkey'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Frank Gore'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Gerominimo Allison'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Janikowski'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Patriots D'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Guice'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'McKinnon'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Danny Amendola'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Joe Flacco'
    }]
  }, {
    round: '17',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Matt Prater'
    }, {
      number: '2',
      player: 'Dorsey',
      selection: 'Tyrell Williams'
    }, {
      number: '3',
      player: 'Drew/Scott',
      selection: 'Saints D'
    }, {
      number: '4',
      player: 'Bob',
      selection: 'Harrison Butker'
    }, {
      number: '5',
      player: 'Jacobson',
      selection: 'Courtland Sutton'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Donte Moncrief'
    }, {
      number: '7',
      player: 'Josh',
      selection: 'Ryan Grant'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Austin Ekeler'
    }, {
      number: '9',
      player: 'Toby',
      selection: 'TJ Yeldon'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Cordarrelle Patterson'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Nyheim Hines'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Darren Sproles'
    }]
  }, {
    round: '18',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Same Perine'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Christian Kirk'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Eli Manninng'
    }, {
      number: '4',
      player: 'Toby',
      selection: 'John Kelly'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Wayne Gallman'
    }, {
      number: '6',
      player: 'Josh',
      selection: 'Buck Allen'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Doug Martian'
    }, {
      number: '8',
      player: 'Jacobson',
      selection: 'Gates'
    }, {
      number: '9',
      player: 'Bob',
      selection: 'Austin Hooper'
    }, {
      number: '10',
      player: 'Drew',
      selection: 'Baker Mayfield'
    }, {
      number: '11',
      player: 'Dorsey',
      selection: 'Mike Tolbert'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Skins D'
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var draft = {
  year: '2019',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Kamara'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Zeke'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'David Johnson'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Bell'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Hopkins'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Barkley *'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Chubb'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Gurley'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Cook'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Jones'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Kelce'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Thomas'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Mixon'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Beckham'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'McCaffrey*'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Ertz'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Devante Adams*'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Fournette'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'JuJu'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Kerryon Johnson'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'AB'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Tyreek Hill*'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Damin Williams'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Mike Evans'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Arron Jones'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Derrick Henry'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Ingram'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Freeman'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Montgomery'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Thielen'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Lockett'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Josh Jacobs'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Kellan Allen'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'George Kittle'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Marlon Mack'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Diggs'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Duke Johnson'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Deshaun Watson'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Tevin Coleman'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Josh Gordon'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Armari Cooper'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Julian Edelman'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Auston Ekeler'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Chris Goodwin'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Brandon Cooks'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Tyler Boyd'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'TY Hilton'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Alshon Jeffery'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Melvin Gordon'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Phillip Lindsay'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Evan Engram'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Mike Williams'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Robby Anderson'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Latavius Murray'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Lamar'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Miles Sanders'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'James White'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Cooper Kupp'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Tony Pollard'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'DJ Moore'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Derrius Guice'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Kenyan Drake'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Devin Singletary'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Matt Breida'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Dede Westbrook'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Tarik Cohen'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Calvin Ridley'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Darrell Henderson'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Jarvis Landry'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Corey Davis'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Arron Rodgers'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Chris Carson *'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'AJ Green'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Marvin Jones'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Drew Brees'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Royce Freeman'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'OJ Howard'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Carson Wentz'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Hunter Henry'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Big Ben'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Emmanuel Sanders'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Goff'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Rashad Penny'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'McCoy'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Justice Hill'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Darwin Thompson'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Allen Robinson'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Peyton Barber'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Vance McDonald'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Nyheim Hines'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Sterling Shepard'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Kalen Ballage'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Jarad Cook'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Larry Fitzgerald'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Sony Michel*'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Cam Newton'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Delaine Walker'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Dante Pettis'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'AP'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Dak'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Patrick Mahomes *'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Mark Andrews'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Courland Sutton'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Anthony Miller'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Robert Woods*'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Sammy Watkins'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Christine Kirk'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Jimmy Graham'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Russell Wilson'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Curtis Samuel'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Valdesscantling'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'James Washington'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Bears'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Kenny Golladay*'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Matt Ryan'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Alexlander Mattison'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Keke Coutee'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Hooper'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Will Fuller'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Germinmo Allison'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Jordan Howard'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Njoku'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Tyrell Williams'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Tom Brady'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Donte Moncrief'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Ito Smith'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Kareem Hunt'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'CJ Anderson'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Justin Jackson'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Kyle Rudolph'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Damin Harris'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Greg Olsen'
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Hollywood Brown'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Dion Lewis'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Carlos Hyde'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Justin Tucker'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Desean Jackson'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Kyler Murray'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Trequan Smith'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Malcolm Brown'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Greg Zuerlein'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Will Lutz'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Michael Gallup'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Phillip Rivers'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Jags'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Jamis Winston'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Rams'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Ravens'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Albert Wilson'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Kaimi Fairbairn'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'DK Matcalf'
    }, {
      number: '8',
      player: 'Toby',
      selection: 'Frank Gore'
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Chris Thompson'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Jalen Richard'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Ronald Jones II'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Quincy Enunwa'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Browns'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'James Conner *'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Miles Boykin'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Kirk Cousins'
    }, {
      number: '5',
      player: 'Toby',
      selection: 'Trubisky'
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Harrison Butker'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Jamaal Williams'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Darren Waller'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Hunter Renfrow'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Jamison Crowder'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Mecole Hardman'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Gostkwski'
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: 'Hayden Hurst'
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Gio Bernard'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Jaylen Samuels'
    }, {
      number: '4',
      player: 'Shane',
      selection: 'Brian Hill'
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Gus Edwards'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Trey Burton'
    }, {
      number: '7',
      player: 'Kyle',
      selection: 'Chargers'
    }, {
      number: '8',
      player: 'Toby',
      selection: ''
    }, {
      number: '9',
      player: 'Jacobson',
      selection: 'Stafford'
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Vikings'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Chase Edmonds'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Jason Myers'
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Noah Fant'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Mike Boone'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Doctson'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: 'Nkeal Harry'
    }, {
      number: '5',
      player: 'Toby',
      selection: ''
    }, {
      number: '6',
      player: 'Kyle',
      selection: 'Eric Ebron'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'John Brown'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Demaryis Thomas'
    }, {
      number: '9',
      player: 'Shane',
      selection: 'Willie Snead'
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Jacob Brissett'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Dwayne Haskins'
    }, {
      number: '12',
      player: 'Biggie',
      selection: 'Rex Burkhead'
    }]
  }, {
    round: '17',
    picks: [{
      number: '1',
      player: 'Biggie',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: 'Texans'
    }, {
      number: '3',
      player: 'Dorsey',
      selection: 'Dez Bryant'
    }, {
      number: '4',
      player: 'Shane',
      selection: ''
    }, {
      number: '5',
      player: 'Josh',
      selection: 'Jets D'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Nelson Agholor'
    }, {
      number: '7',
      player: 'Kyle',
      selection: ''
    }, {
      number: '8',
      player: 'Toby',
      selection: ''
    }, {
      number: '9',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '10',
      player: 'Ford',
      selection: 'Brent Maher'
    }, {
      number: '11',
      player: 'Zeller',
      selection: 'Steelers D'
    }, {
      number: '12',
      player: 'Drew/Scott',
      selection: 'Golden Tate'
    }]
  }, {
    round: '18',
    picks: [{
      number: '1',
      player: 'Drew/Scott',
      selection: 'Baker Mayfield *'
    }, {
      number: '2',
      player: 'Zeller',
      selection: 'Adam Vinatieri'
    }, {
      number: '3',
      player: 'Ford',
      selection: 'Jimmy Garoppolo'
    }, {
      number: '4',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '5',
      player: 'Toby',
      selection: ''
    }, {
      number: '6',
      player: 'Kyle',
      selection: ''
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Pats D'
    }, {
      number: '8',
      player: 'Josh',
      selection: 'Badgley'
    }, {
      number: '9',
      player: 'Shane',
      selection: ''
    }, {
      number: '10',
      player: 'Dorsey',
      selection: 'Saints'
    }, {
      number: '11',
      player: 'Eder',
      selection: 'Greg Joseph'
    }, {
      number: '12',
      player: 'Biggie',
      selection: ''
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var draft = {
  year: '2020',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Zeke'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Kamara'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Jones'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'Jacobs'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'Helaire'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Hopkins'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Barkley **'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Michael Thomas'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Ekeler'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Cook *'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Davante Adams'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'McCaffrey **'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Tyreek Hill'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Chubb'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Kelse'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'James Connor'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Mahomes'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Golladay'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Chris Carson'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Calvin Ridley'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Mixon *'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Julio Jones'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'George Kittle'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Amari Cooper'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Odell Beckham'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Chris Goodwin'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Mike Evans'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'Mark Andrews'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'Allen Robinson'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Derrick Henry *'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Todd Gurley'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Jonanthan Taylor'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Bell'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Thielin'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'DJ Moore'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Zach Ertz'
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'David Johnson'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Melvin Gordon'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Fournette'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'JuJu'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Mostert'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Matt Ryan'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Terry Mclaurin'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Antionio Gibson'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Kareem Hunt'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Cooper Kupp'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'Cam Akers'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Tyler Lockett'
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Miles Sanders *'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Courtland Sutton'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Mark Ingram'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'Kyler Murray'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'AJ Brown'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Devin Singletary'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'T.Y. Hilton'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'J.K. Dobbins'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Evan Engram'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Robert Woods'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Lamar *'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Stefon Diggs'
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Russel Wilson'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Hunter Henry'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'James White'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Devante Parker'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Kenyan Drake *'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'D.K Metcalf'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'D.J Chark'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Deshaun Watson'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Hollywood'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Michael Gallup'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'Keenan Allen'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Phillip Lindsay'
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Tyler Boyd'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Dak'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Jarvis Landry *'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'A.J. Green'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'Tyler Higbee'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'David Montgomery'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Hayden Hurts'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Tarik Cohen'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Brees'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Julian Edelman'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Dandre Swift'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Jordan Howard'
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Zach Moss'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Crowder'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Marvin Jones'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Christian Kirk'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Jerry Jeudy'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Will Fuller'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'James Robinson'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Brandon Cooks'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'CeCe Lamb'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Latavius Murray'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'Ronald Jones'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Marlon Mack'
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Arraon Rodgers'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Kerryon Johnson'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Carson Wentz'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'Sony Michael'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'Matt Breida'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Sterling Sharp'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Tevis Coleman'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Dionte Johnson'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Chris Thompson'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Gronk'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Henry Rubbs'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Perriman'
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Duke Johnson'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'James Cook'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Tucker'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Alexander Mattison'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Mike Gesicki'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Damien Harris'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Josh Allen'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Preston Williams'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Debo Samuel'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Noah Fant'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'Darrell Henderson'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Chase Edmonds'
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Hardman'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Golden Tate'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Boston Scotts'
    }, {
      number: '4',
      player: 'Drew',
      selection: '49ers'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'Tom Brady'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'TJ Hockenson'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Big Ben'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Tony Pollard'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Jamaal Williams'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Emmanuel Sanders'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Darius Slayton'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Hines'
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Pittman'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Burrow'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Benny Snell'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Jerick Mckinnon'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'A.J Dillion'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Darrel Williams'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Boykin'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Dallas Goebert'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Cam'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Fitzgerald'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'Danny Dimes'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Steelers'
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Austin Hopper'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Chris Herndon'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Carlos Hyde'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'Malcom Brown'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'John Brown'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Darrayton Evans'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Lutz'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Ravens'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Stafford'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Cole Heasley'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Shenault'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Justin Jefferson'
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Bryce Love'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Joshua Kelly'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Jarad Goff'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Darren Waller *'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Curtis Samual'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Desean Jackson'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'kenal Harry'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Robbie Gould'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Harrison Butker'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'Justin Jackson'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'Bills'
    }, {
      number: '12',
      player: 'Toby',
      selection: 'Baker'
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: 'Matt Prater'
    }, {
      number: '2',
      player: 'Biggie',
      selection: 'Greg Zuerlin'
    }, {
      number: '3',
      player: 'Shane',
      selection: 'Josh Lambo'
    }, {
      number: '4',
      player: 'Drew',
      selection: 'Gus Edwards'
    }, {
      number: '5',
      player: 'Dorsey',
      selection: 'Rams'
    }, {
      number: '6',
      player: 'Eder',
      selection: 'Rivers'
    }, {
      number: '7',
      player: 'Bob',
      selection: 'Ito Smith'
    }, {
      number: '8',
      player: 'Zeller',
      selection: 'Sammy Watkins'
    }, {
      number: '9',
      player: 'Josh',
      selection: 'Bears'
    }, {
      number: '10',
      player: 'Jacobson',
      selection: 'Antonio Brown'
    }, {
      number: '11',
      player: 'Kyle',
      selection: 'Vikings'
    }, {
      number: '12',
      player: 'Ford',
      selection: 'Jimmy G'
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: 'Kyle Rodolph'
    }, {
      number: '2',
      player: 'Kyle',
      selection: 'Jason Myers'
    }, {
      number: '3',
      player: 'Jacobson',
      selection: 'Ryan Tannehill'
    }, {
      number: '4',
      player: 'Josh',
      selection: 'Dan Arnold'
    }, {
      number: '5',
      player: 'Zeller',
      selection: 'Jalen Reagor'
    }, {
      number: '6',
      player: 'Bob',
      selection: 'Anthony mcfarland'
    }, {
      number: '7',
      player: 'Eder',
      selection: 'Devin Duvernay'
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'McCoy'
    }, {
      number: '9',
      player: 'Drew',
      selection: 'Tua'
    }, {
      number: '10',
      player: 'Shane',
      selection: 'J.D. Mckissic'
    }, {
      number: '11',
      player: 'Biggie',
      selection: 'st. Brown'
    }, {
      number: '12',
      player: 'Toby',
      selection: ''
    }]
  }, {
    round: '17',
    picks: [{
      number: '1',
      player: 'Toby',
      selection: ''
    }, {
      number: '2',
      player: 'Biggie',
      selection: ''
    }, {
      number: '3',
      player: 'Shane',
      selection: ''
    }, {
      number: '4',
      player: 'Drew',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Eder',
      selection: ''
    }, {
      number: '7',
      player: 'Bob',
      selection: ''
    }, {
      number: '8',
      player: 'Zeller',
      selection: ''
    }, {
      number: '9',
      player: 'Josh',
      selection: ''
    }, {
      number: '10',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '11',
      player: 'Kyle',
      selection: ''
    }, {
      number: '12',
      player: 'Ford',
      selection: ''
    }]
  }, {
    round: '18',
    picks: [{
      number: '1',
      player: 'Ford',
      selection: ''
    }, {
      number: '2',
      player: 'Kyle',
      selection: ''
    }, {
      number: '3',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '4',
      player: 'Josh',
      selection: ''
    }, {
      number: '5',
      player: 'Zeller',
      selection: ''
    }, {
      number: '6',
      player: 'Bob',
      selection: ''
    }, {
      number: '7',
      player: 'Eder',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Drew',
      selection: ''
    }, {
      number: '10',
      player: 'Shane',
      selection: ''
    }, {
      number: '11',
      player: 'Biggie',
      selection: ''
    }, {
      number: '12',
      player: 'Toby',
      selection: ''
    }]
  }]
};

exports.default = draft;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var draft = {
  year: '2021',
  draft: [{
    round: '1',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: 'Aaron Jones *'
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: 'Cook **'
    }]
  }, {
    round: '2',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: 'Chubb *'
    }]
  }, {
    round: '3',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: 'Johnathan Taylor *'
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '4',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: 'Antonio Gibson *'
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '5',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '6',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: 'DK *'
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '7',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '8',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '9',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '10',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '11',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: 'Jamaal Williams *'
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '12',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '13',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '14',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '15',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: 'Gus Edwards *'
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '16',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }, {
    round: '17',
    picks: [{
      number: '1',
      player: 'Kyle',
      selection: ''
    }, {
      number: '2',
      player: 'Bob',
      selection: ''
    }, {
      number: '3',
      player: 'Josh',
      selection: ''
    }, {
      number: '4',
      player: 'Toby',
      selection: ''
    }, {
      number: '5',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '6',
      player: 'Drew',
      selection: ''
    }, {
      number: '7',
      player: 'Shane',
      selection: ''
    }, {
      number: '8',
      player: 'Biggie',
      selection: ''
    }, {
      number: '9',
      player: 'Ford',
      selection: ''
    }, {
      number: '10',
      player: 'Zeller',
      selection: ''
    }, {
      number: '11',
      player: 'Eder',
      selection: ''
    }, {
      number: '12',
      player: 'Jacobson',
      selection: ''
    }]
  }, {
    round: '18',
    picks: [{
      number: '1',
      player: 'Jacobson',
      selection: ''
    }, {
      number: '2',
      player: 'Eder',
      selection: ''
    }, {
      number: '3',
      player: 'Zeller',
      selection: ''
    }, {
      number: '4',
      player: 'Ford',
      selection: ''
    }, {
      number: '5',
      player: 'Biggie',
      selection: ''
    }, {
      number: '6',
      player: 'Shane',
      selection: ''
    }, {
      number: '7',
      player: 'Drew',
      selection: ''
    }, {
      number: '8',
      player: 'Dorsey',
      selection: ''
    }, {
      number: '9',
      player: 'Toby',
      selection: ''
    }, {
      number: '10',
      player: 'Josh',
      selection: ''
    }, {
      number: '11',
      player: 'Bob',
      selection: ''
    }, {
      number: '12',
      player: 'Kyle',
      selection: ''
    }]
  }]
};

exports.default = draft;

/***/ })
/******/ ]);
