/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { prices, employees, animals, hours } = require('./data');

function animalsByIds(...ids) {
  const find = ids.map(id => animals.find(element => element.id === id));
  return find;
}

function animalsOlderThan(animal, age) {
  const found = animals.find(element => element.name === animal);
  const result = found.residents.every(element => element.age > age);
  return result;
}

function findEmployee(id) {
  const res = employees.find(e => e.firstName === id || e.lastName === id || e.id === id);
  return res;
}

function employeeByName(empName) {
  if (empName === undefined) {
    return {};
  }
  return findEmployee(empName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return employees.some(element => element.managers.some(person => person === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const count = {};
    animals.forEach((element) => {
      count[element.name] = element.residents.length;
    });
    return count;
  }
  const rage = animals.filter(element => element.name === species);
  return rage[0].residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let total = 0;
  Object.entries(entrants).forEach((element) => {
    switch (element[0]) {
      case 'Adult':
        total += 49.99 * element[1];
        break;
      case 'Senior':
        total += 24.99 * element[1];
        break;
      case 'Child':
        total += 20.99 * element[1];
        break;
      default:
        break;
    }
  });
  return total;
}

function animalMap(options) {
  // seu c??digo aqui
}

function schedule(dayName) {
  const resultWithDayName = {};
  const resultComplete = {};
  resultComplete.Sunday = `Open from ${hours.Sunday.open}am until 8pm`;
  resultComplete.Monday = 'CLOSED';
  resultComplete.Tuesday = `Open from ${hours.Tuesday.open}am until 6pm`;
  resultComplete.Wednesday = `Open from ${hours.Wednesday.open}am until 6pm`;
  resultComplete.Thursday = `Open from ${hours.Thursday.open}am until 8pm`;
  resultComplete.Friday = `Open from ${hours.Friday.open}am until 8pm`;
  resultComplete.Saturday = `Open from ${hours.Saturday.open}am until 10pm`;
  if (dayName === undefined) {
    return resultComplete;
  }
  resultWithDayName[dayName] = resultComplete[dayName];
  return resultWithDayName;
}

function oldestFromFirstSpecies(id) {
  const employee = findEmployee(id);
  const group = animals.find(element => element.id === employee.responsibleFor[0]);
  let result = group.residents[0];
  group.residents.forEach((resident) => {
    if (resident.age > result.age) {
      result = resident;
    }
  });
  return Object.values(result);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((element) => {
    prices[element] = Math.round((prices[element] * (1 + (percentage / 100))) * 100) / 100;
  });
}

function nameOfAnimalsById(id) {
  const result = animals.find(element => element.id === id);
  return result.name;
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const allEmployees = {};
    employees.forEach((element) => {
      const animalsName = [];
      element.responsibleFor.forEach((el) => {
        animalsName.push(nameOfAnimalsById(el));
        const fullName = `${element.firstName} ${element.lastName}`;
        allEmployees[fullName] = animalsName;
      });
    });
    return allEmployees;
  }
  const employee = findEmployee(idOrName);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const animalsName = [];
  employee.responsibleFor.forEach((element) => {
    animalsName.push(nameOfAnimalsById(element));
  });
  const result = {};
  result[fullName] = animalsName;
  return result;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
