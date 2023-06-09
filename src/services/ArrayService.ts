import { TArrayOfRecords } from '@/types/arrayOfRecords';

export default class ArrayService {
    static sample = {
        fetch() {
            function raw(): TArrayOfRecords {
                const someMap = new Map();
                const someWeakSet = new WeakSet();
                const someWeakMap = new WeakMap();

                someMap.set('a', 2);
                someMap.set('b', 4);

                someWeakSet.add({ a: 4 });
                someWeakSet.add({ b: 5 });

                someWeakMap.set({ a: 1, b: 2 }, 1);
                someWeakMap.set({ b: 2 }, 1);

                return [
                    {
                        id: 1,
                        title: 'Element 1',
                        text: 'some text',
                        amount: 8,
                        someField: [1,2,3,4, { field: 2 }],
                        some: {
                            a: 2,
                            b: 3,
                            c: [3123, [1,2]]
                        },
                        date: new Date(),
                        map: someMap,
                        set: new Set(['a', new Date(), 6]),
                        weakMap: someWeakMap,
                        weakSet: someWeakSet,
                        arrowFunc: () => { console.log(1); },
                        func: function() {
                            console.log(4)
                        }
                    },
                    {
                        id: 2,
                        title: 'Element 2',
                        text: 'some text',
                        amount: 4,
                        some: 4
                    },
                    {
                        id: 3,
                        title: 'Element 3',
                        text: 'some text',
                        amount: 1,
                        some: -4,
                    },
                    {
                        id: 4,
                        title: 'Element 4',
                        text: 'some text',
                        amount: 9,
                        four: 3
                    },
                ];
            }

            return {
                raw
            };
        }
    }
}
