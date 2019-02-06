'use strict';

QUnit.module('Тестируем функцию set', function () {
	QUnit.test('set работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		const object2 = {
			deep: {
				hested: {
					field: 42
				}
			}
		};

		const object3 = {
			deep: {
				hested: {
					foo: 'bar'
				}
			}
		};

		const object4 = {
			deep: null
		};

		assert.deepEqual(set({foo: 'bar'}, '.foo', 'baz'), {foo: 'baz'});
		assert.deepEqual(set(object, '.deep.hested.field', 42), object2);

		assert.deepEqual(set(object, '.deep.hested', {foo: 'bar'}), object3);
		assert.deepEqual(set(object, '.deep', null), object4);
	});

	QUnit.test('set изменяет переданный объект', function (assert) {
		const object = {
			foo: 'bar'
		};

		const object1 = {
			foo: 'baz'
		};

		const object2 = set(object, '.foo', 'baz');
		assert.deepEqual(object, object1);
		assert.deepEqual(object2, object1);
	});

	QUnit.test('set работает правильно c массивами', function (assert) {
		const object1 = {
			foo: [ 1, 2, 3 ],
			bar: [
				{foobar: '42'}
			]
		};

		const object2 = {
			foo: [ 1, 2, 3 ],
			bar: [
				{foobar: '42'}
			]
		};

        const object3 = {
            foo: [ 1, 2, 3 ],
            bar: [
                {foobar: '42'}
            ]
        };

		const new1 = {
			foo: [ 42, 2, 3 ],
			bar: [
				{foobar: '42'}
			]
		};

		const new2 = {
			foo: [ 1, 2, 3 ],
			bar: [
				{foobar: 'baz'}
			]
		};

        const new3 = {
            foo: [ 1, 2, 3, 4 ],
            bar: [
                {foobar: '42'}
            ]
        };

		assert.deepEqual(set(object1, '.foo.0', 42), new1);
		assert.deepEqual(set(object2, '.bar.0.foobar', 'baz'), new2);
        assert.deepEqual(set(object3, '.foo.3', 4), new3);
	});

	QUnit.test('set работает правильно c объектами без свойств', function (assert) {
		const object = {
			deep: {
				nested: {
					field: null
				}
			}
		};

		assert.deepEqual(set({}, '.deep.nested.field', null), object);
	});

    QUnit.test('set работает правильно c полученным в качестве параметра массивом', function (assert) {
        const object = [
            {foo: 'I am first'},
            {bar: 'I am second'}
        ];

        const object1 = [
            {foo: 'I am first'},
            {bar: 'I am first too'}
        ];

        assert.deepEqual(set(object, '.1.bar', 'I am first too'), object1);
    });

    QUnit.test('set игнорирует путь без символа "." к свойству', function (assert) {
        const object = {
            foo: 'bar'
        };

        assert.deepEqual(set(object, '', 'First'), object);
        assert.deepEqual(set(object, 'foo', 'New'), object);
    });
});
