import { getPokemonNames } from './pokeapi';

// autocomplete pokemon names
const autocomplete = function (input, namesArray) {
  let currentFocus;

  // remove all autocomplete suggestions
  const closeAllLists = function (element) {
    let items = document.getElementsByClassName('autocomplete-items');
    // loop through all items, removing them from the DOM unless the element is the current input
    Array.from(items).forEach(function (item) {
      if (element !== item && element !== input) {
        item.parentNode.removeChild(item);
      }
    });
  };

  // add 'autocomplete-active' class which highlights input match to suggestion
  const addActive = function (x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add('autocomplete-active');
  };

  const removeActive = function (x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  };

  input.addEventListener('input', function () {
    let a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;
    a = document.createElement('div');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    this.parentNode.appendChild(a);
    let count = 0; // Initialize a count to limit the number of suggestions
    for (i = 0; i < namesArray.length; i++) {
      if (
        namesArray[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        if (count >= 5) break; // Stop adding items if the count reaches 5
        count++;
        b = document.createElement('div');
        b.innerHTML =
          '<strong>' + namesArray[i].substr(0, val.length) + '</strong>';
        b.innerHTML += namesArray[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + namesArray[i] + "'>";
        b.addEventListener('click', function (e) {
          input.value = this.getElementsByTagName('input')[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  input.addEventListener('keydown', function (e) {
    let item = document.getElementById(this.id + 'autocomplete-list');
    if (item) {
      item = item.getElementsByTagName('div');
    }

    // down arrow
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(item);

      // up arrow
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(item);

      // enter or tab
    } else if (e.keyCode === 13 || e.keyCode === 9) {
      // if nothing selected using up/down arrows, autocomplete with first in suggestion
      if (currentFocus === -1) {
        currentFocus++;
        addActive(item);
      }

      // 'click' the selected item
      if (item) {
        item[currentFocus].click();
      }
    }
  });

  document.addEventListener('click', function (e) {
    closeAllLists(e.target);
  });
};

export default autocomplete;
