(function () {
  const names = ['Anik', 'Shakil'];

  Array.prototype.sayName = (name) => console.log('Hello, ' + name);
  for (let i = 0; i < names.length; i++) {
    names.sayName(names[i]);
  }

  const arr = [1, 2, 3, null, false, 4, 5, '', 'test', 6, 7];
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length - 1; j++) {
      if (!arr[j] || typeof arr[j] !== 'number') {
        arr[j] = arr[j + 1];
        arr[j + 1] = undefined;
      }
    }
    if (arr[i] === undefined) {
      count++;
    }
  }

  arr.length -= count;

  console.log(arr);

  function fib(n) {
    if (n === 0 || n === 1) {
      return n;
    }
    return fib(n - 1) + fib(n - 2);
  }

  console.log(fib(9));

  const people = [
    {
      id: 1,
      name: 'Anik',
      email: 'anik.wdev@gmail.com',
    },
    {
      id: 2,
      name: 'Shakil',
      email: 'shakil@gmail.com',
    },
    {
      id: 3,
      name: 'Another One',
      email: 'another@gmail.com',
    },
  ];

  const index1 = people.findIndex((item) => {
    return item.id === 3;
  });

  people[index1].name = 'Mohammod';
  people[index1].email = 'mohammod@gmail.com';

  const index2 = people.find((item) => {
    return item.id === 2;
  });

  index2.name = 'Mohammod Shakil Hossain';
  index2.email = 'mohammod_shakil@gmail.com';

  console.log(people);
})();

(() => {
  const myArr = [1, 2, 3, 4, false, null, '', NaN, 5, 6, 7, 8, 9, 0];

  const result = myArr.reduce((acc, curr) => {
    if (curr) {
      acc.push(curr);
    }
    return acc;
  }, []);
  console.log(result);

  const arr = [];
  for (let i = 1; i <= 5000000; i++) {
    arr.push(i);
  }

  console.time('not-optimized');

  arr.filter((item) => item % 2 === 0).map((item) => item * 2);

  console.timeEnd('not-optimized');

  console.time('optimized');

  arr.reduce((acc, curr) => {
    if (curr % 2 === 0) {
      acc.push(curr * 2);
    }
    return acc;
  }, []);

  console.timeEnd('optimized');

  function myReduce(arr, clbk, init) {
    let acc = init;
    for (let i = 0; i < arr.length; i++) {
      clbk(acc, arr[i], i, arr);
    }
    return acc;
  }

  const itsAwesome = myReduce(
    [1, 2, 3, 4],
    (acc, curr, index, arr) => {
      acc.push(curr * 2);
    },
    []
  );

  console.log(itsAwesome);
})();

(() => {
  const axios = require('axios').default;
  const url = 'https://jsonplaceholder.typicode.com/posts';

  async function getData() {
    const { data } = await axios.get(url);

    // Return an array

    // const result = data.slice(0, 10).map((item) => {
    //   return {
    //     userId: item.userId,
    //     id: item.id,
    //     title: item.title,
    //   };
    // });

    // Return an object

    const result = data.slice(0, 10).reduce((acc, curr) => {
      acc[curr.id] = {
        ...curr,
      };
      delete acc[curr.id].body;
      return acc;
    }, {});

    return result;
  }

  getData()
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
})();

(() => {
  const contacts = ['Anik', 'Anik Hossain', 'Shakil', 'Shakil Hossain'];
  const contactsGrouped = contacts.reduce((acc, cur) => {
    const firstLetter = cur[0].toUpperCase();
    if (firstLetter in acc) {
      acc[firstLetter].push(cur);
    } else {
      acc[firstLetter] = [cur];
    }
    return acc;
  }, {});

  Object.keys(contactsGrouped).forEach((key) => {
    console.log('------------', key, '------------');
    contactsGrouped[key].forEach((contact) => {
      console.log(contact);
    });
    console.log('');
  });
})();
