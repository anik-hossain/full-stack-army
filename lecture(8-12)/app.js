const axios = require('axios').default;

function divider(msg = null) {
    console.log(
        '------------------------------------------------------------------------------------'
    );
    if (msg) {
        console.log(msg);
    }
    console.log(
        '------------------------------------------------------------------------------------'
    );
}

divider('********** Lecture-8 **********');

(() => {
    const functionData = {
        params: ['a', 'b'],
        body: ['const result = a + b', 'return result'],
    };

    const functionBody = functionData.body.reduce((acc, cur) => {
        acc += cur + ';';
        return acc;
    }, '');

    const finalFunction = new Function(...functionData.params, functionBody);

    console.log(finalFunction(45, 5));
})();

divider('********** Lecture-9 **********');

(() => {
    function power(p) {
        return (n) => {
            let result = 1;
            for (let i = 1; i <= p; i++) {
                result *= n;
            }
            return result;
        };
    }
    console.log(power(2)(8));
    console.log(power(3)(8));
    console.log(power(4)(8));
    console.log(power(5)(8));
    console.log(power(6)(8));
    console.log(power(7)(8));
    console.log(power(40)(8));
})();

divider('********** Lecture-11 **********');

divider('***** Iterator *****');

(() => {
    const range = {
        start: 0,
        stop: 100,
        step: 5,
    };

    range[Symbol.iterator] = function () {
        let current = this.start;
        const stop = this.stop;
        const step = this.step;

        return {
            next() {
                const obj = {
                    value: current,
                    done: current > stop,
                };
                current += step;
                return obj;
            },
        };
    };

    for (v of range) {
        console.log(v);
    }
})();

divider('***** Generator *****');

(() => {
    function* range(start = 0, stop = 50, step = 2) {
        console.log(start);
        console.log(stop);
        console.log(step);
        for (let i = start; i <= stop; i += step) {
            yield i;
        }
    }

    // const rangeIt = range(0, 100, 5);
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    // console.log(rangeIt.next());
    for (v of range()) {
        console.log(v);
    }
})();

divider('***** Async Generator *****');

(() => {
    async function getUsers() {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
        const { data: users } = await axios.get(url);
        return users.map((user) => axios.get(`${postsUrl}?userId=${user.id}`));
    }

    // async function* getPostByUser(users) {
    //     for (let i = 0; i < users.length; i++) {
    //         const { data: posts } = await axios.get(
    //             `${url}?userId=${users[i].id}`
    //         );
    //         yield posts;
    //     }
    // }
    (async () => {
        const users = await getUsers();
        for await (let v of users) {
            console.log(v.data.map((post) => post.title));
        }
    })();
    // getUser()
    //     .then(async (users) => {
    //         // const userIterator = await getPostByUser(users);
    //         // console.log((await userIterator.next()).value);
    //         // for await (let v of getPostByUser(users)) {
    //         //     console.log(v.map((data) => data.title));
    //         // }
    //         console.log(users);
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });
})();
