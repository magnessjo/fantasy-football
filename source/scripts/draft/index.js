import fourteen from './draft-14.js';
import fifteen from './draft-15.js';
import sixteen from './draft-16.js';
import seventeen from './draft-17.js';
import eighteen from './draft-18.js';
import nineteen from './draft-19.js';
import twenty from './draft-20.js';

const drafts = [
  twenty,
  nineteen,
  eighteen,
  seventeen,
  sixteen,
  fifteen,
  fourteen,
];
const section = document.querySelector('#results');
const lock = section.querySelector('.lock');
const htmlOutput = lock.querySelector('.data');
let show = 'All';

// Private Function : Mobile

function setMobile(draft, wrapper) {
  const container = document.createElement('div');
  container.classList.add('wrapper');

  // Set header for round

  if (show === 'All') {
    const header = document.createElement('h3');
    header.innerHTML = `Round ${draft.round}`;
    container.appendChild(header);
  } else {
    container.classList.add('filtered');
  }

  // Iterate over each entry

  draft.picks.forEach(entry => {
    if (show === 'All') {
      const element = document.createElement('div');
      const player = document.createElement('div');
      const selectionWrapper = document.createElement('div');
      const selection = document.createElement('span');

      element.classList.add('entry');

      player.innerHTML = entry.player;
      selection.innerHTML = entry.selection;

      selectionWrapper.appendChild(selection);
      element.appendChild(player);
      element.appendChild(selectionWrapper);
      container.appendChild(element);
    } else {
      if (entry.player === show) {
        const element = document.createElement('div');
        const round = document.createElement('div');
        const selection = document.createElement('div');

        element.classList.add('entry');

        round.innerHTML = draft.round;
        selection.innerHTML = entry.selection;
        element.appendChild(round);
        element.appendChild(selection);
        container.appendChild(element);
      }
    }
  });

  wrapper.appendChild(container);
}

// Private Function : set Desktop

function setDesktop(draft, wrapper) {
  const row = document.createElement('tr');

  // Set Round Number

  const roundLabel = document.createElement('td');
  roundLabel.innerHTML = draft.round;
  row.appendChild(roundLabel);

  if (Math.round(draft.round) % 2 === 0) {
    draft.picks.reverse();
  }

  if (show === 'All') {
    draft.picks.forEach(entry => {
      const element = document.createElement('td');

      element.innerHTML = entry.selection;
      row.appendChild(element);
    });
  } else {
    draft.picks.forEach(entry => {
      if (entry.player === show) {
        const element = document.createElement('td');
        element.innerHTML = entry.selection;
        row.appendChild(element);
      }
    });
  }

  wrapper.appendChild(row);
}

// Private Function : set player names on table

function setTablePlayers(round, element) {
  const row = document.createElement('tr');

  // fake for the round number

  row.innerHTML = '<td></td>';

  round.picks.forEach((name, i) => {
    const td = document.createElement('td');

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
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  return table;
}

// Function sort years

function list(years, table, mobile) {
  return new Promise((resolve, reject) => {
    years.forEach((item, i) => {
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

  drafts.forEach(data => {
    const wrapper = document.createElement('div');
    const heading = document.createElement('h2');
    const mobile = document.createElement('div');
    const table = createTable();
    const years = data.draft;

    heading.innerHTML = `Draft ${data.year}`;
    mobile.classList.add('mobile');

    list(years, table, mobile).then(() => {
      wrapper.appendChild(heading);
      wrapper.appendChild(mobile);
      wrapper.appendChild(table);
      htmlOutput.appendChild(wrapper);
    });
  });
}

function createDropDown() {
  const picks = sixteen.draft[0].picks;
  const select = document.createElement('select');

  // all

  const option = document.createElement('option');
  option.innerHTML = 'All';
  option.value = 'All';
  select.appendChild(option);

  picks.forEach(key => {
    const name = key.player;
    const option = document.createElement('option');
    option.innerHTML = name;
    option.value = name;
    select.appendChild(option);
  });

  lock.insertBefore(select, lock.firstChild);

  select.addEventListener('change', () => {
    const selected = select.options[select.selectedIndex].text;
    show = selected;

    while (htmlOutput.firstChild) {
      htmlOutput.removeChild(htmlOutput.firstChild);
    }

    outputData(selected);
  });
}

// Load

document.addEventListener('DOMContentLoaded', () => {
  createDropDown();
  outputData();
});
