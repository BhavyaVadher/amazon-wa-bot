const CITIES = {
  1: 'Scarborough', 2: 'Ajax', 3: 'Whitby', 4: 'Mississauga',
  5: 'Brampton', 6: 'Hamilton', 7: 'St. Thomas', 8: 'Bolton',
  9: 'Cambridge', 10: 'Milton', 11: 'London',
};

function isValidDate(str) {
  const year = parseInt(str.slice(0, 4));
  const month = parseInt(str.slice(4, 6));
  const day = parseInt(str.slice(6, 8));
  if (month < 1 || month > 12) return false;
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

const validators = {
  1: (input) => {
    const val = input.trim().replace(/\s+/g, ' ');
    if (!/^[A-Za-z]+([ '-][A-Za-z]+)+$/.test(val)) return null;
    const words = val.split(/\s+/);
    if (words.length < 2) return null;
    if (words.some(w => w.length < 3)) return null;
    return val.replace(/\b\w/g, c => c.toUpperCase());
  },

  2: (input) => {
    const val = input.trim().toLowerCase();
    if (!/^[a-zA-Z0-9._%+\-]+@gmail\.com$/.test(val)) return null;
    return val;
  },

  3: (input) => {
    const val = input.trim();
    if (!/^\d{6}$/.test(val)) return null;
    return val;
  },

  4: (input) => {
    const val = input.trim().replace(/\s/g, '');
    if (!/^[A-Za-z]{16}$/.test(val)) return null;
    return val.toLowerCase();
  },

  5: (input) => {
    const val = input.trim();
    if (!/^\d{10}$/.test(val)) return null;
    return val;
  },

  6: (input) => {
    const map = { fulltime: 'Fulltime', parttime: 'Parttime', 'flex time': 'Flex Time' };
    const val = input.trim().toLowerCase();
    return map[val] || null;
  },

  7: (input) => {
    const map = { any: 'Any', day: 'Day', night: 'Night' };
    const val = input.trim().toLowerCase();
    return map[val] || null;
  },

  8: (input) => {
    const parts = input.trim().split(',').map(p => p.trim());
    const nums = [];
    let otherCity = null;

    for (const p of parts) {
      const n = parseInt(p);
      if (!isNaN(n) && n >= 1 && n <= 12) {
        nums.push(n);
      } else if (isNaN(n) && p.length >= 2 && /^[A-Za-z\s]+$/.test(p)) {
        otherCity = p.trim();
      }
    }

    const hasOther = nums.includes(12);
    const cityNums = nums.filter(n => n !== 12);
    const selectedCities = [...new Set(cityNums)].map(n => CITIES[n]);

    if (hasOther && otherCity) selectedCities.push(otherCity);

    const totalSelections = selectedCities.length;
    if (totalSelections < 2) return null;

    return selectedCities.join(', ');
  },

  9: (input) => {
    const map = {
      'study permit': 'Study Permit',
      'work permit': 'Work Permit',
      'applied work permit': 'Applied Work Permit',
      'pr': 'PR',
      'citizen': 'Citizen',
    };
    const val = input.trim().toLowerCase();
    return map[val] || null;
  },

  10: (input) => {
    const val = input.trim();
    if (!/^\d{9}$/.test(val)) return null;
    return val;
  },

  11: (input) => {
    const val = input.trim();
    if (!/^\d{8}$/.test(val)) return null;
    if (!isValidDate(val)) return null;
    const year = parseInt(val.slice(0, 4));
    if (year < 1940 || year > 2007) return null;
    return val;
  },

  12: (input) => {
    const val = input.trim();
    if (val.length < 10) return null;
    if (!/\d/.test(val)) return null;
    if (!/^[A-Za-z0-9\s,.\-]+$/.test(val)) return null;
    return val;
  },

  13: (input) => {
    const val = input.trim().toUpperCase();
    if (!/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(val)) return null;
    return val;
  },

  14: (input) => {
    const val = input.trim();
    if (!/^\d{8}$/.test(val)) return null;
    if (!isValidDate(val)) return null;
    const year = parseInt(val.slice(0, 4));
    if (year < 1900) return null;
    const inputDate = new Date(year, parseInt(val.slice(4, 6)) - 1, parseInt(val.slice(6, 8)));
    if (inputDate > new Date()) return null;
    return val;
  },

  15: (input) => {
    const map = { yes: 'Yes', no: 'No' };
    return map[input.trim().toLowerCase()] || null;
  },

  16: (input) => {
    const val = input.trim();
    if (val.length < 3) return null;
    if (!/^[A-Za-z0-9\s]+$/.test(val)) return null;
    return val;
  },

  17: (input) => {
    const val = input.trim();
    if (!/^\d{2}(0[1-9]|1[0-2])-\d{2}(0[1-9]|1[0-2])$/.test(val)) return null;
    return val;
  },
};

function validate(step, input) {
  const fn = validators[step];
  if (!fn) return null;
  return fn(input);
}

module.exports = { validate };
