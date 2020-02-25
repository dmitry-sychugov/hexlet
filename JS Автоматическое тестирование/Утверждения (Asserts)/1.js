/*Каждую проверку, которую мы написали для функции capitalize, в тестировании принято называть 
утверждением (assert). Утверждения — ключевая часть тестов. Именно они проверяют функциональность кода: */

import capitalize from '../src/capitalize'; // условно

// Первое утверждение (проверка на пустую строку)
if (capitalize('') !== '') {
    throw new Error('Функция работает неверно!');
}

// Второе утверждение (проверка на слово)
if (capitalize('hello') !== 'Hello') {
    throw new Error('Функция работает неверно!');
}

/*Можно заметить, что все проверки строятся одинаковым способом: условие => исключение. 
Node.js поставляется с модулем assert, в котором есть несколько функций, упрощающих 
написание утверждений:*/

import assert from 'assert';
import capitalize from '../src/capitalize';

// Проверка сменилась с отрицательной на положительную
assert(capitalize('') === '');
assert(capitalize('hello') === 'Hello');

// Другими словами, assert(true) означает что всё хорошо, а assert(false) говорит об ошибке.

// С другой стороны, вывод сообщения об ошибке крайне не информативный.

/*Это пытаются исправить с помощью специализированных утверждений, заточенных под конкретные ситуации. 
Например, при сравнении двух значений подходит функция assert.equal(actual, expected). 
Перепишем код выше: */

import assert from 'assert';
import capitalize from '../src/capitalize';

// Проверка сменилась с отрицательной на положительную
assert.equal(capitalize(''), '');
// Первый параметр actual – то, что пришло
// Второй параметр expected – то, что ожидает тест
// Правильный порядок аргументов имеет большое значение при анализе ошибки
assert.equal(capitalize('hello'), 'Hello');

/*Однако, будьте осторожны. Функция equal(actual, expected) проверяет равенство по ссылке. 
То есть два разных объекта, имеющих одинаковое содержание, рассматриваются, как не эквивалентные: */
assert.equal({}, {}) // ошибка
assert.equal({ key: 'value' }, { key: 'value' }); // ошипка

/*Для сравнения по значению используется ещё одно утверждение: assert.deepEqual(actual, expected). 
Оно опирается только на содержимое: */

assert.deepEqual({}, {}); // всё ок
assert.deepEqual({ key: 'value' }, { key: 'value' }); // всё ок

/*Для тестирования негативных сценариев предназначены функции assert.notEqual(actual, expected) 
и assert.notDeepEqual(actual, expected). Они тестируют то, что значения не равны. 
Эти утверждения используются крайне редко, но знать о них всё равно полезно. */