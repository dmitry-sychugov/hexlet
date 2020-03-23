/*
Несмотря на все удобства, промисы не являются вершиной эволюции. Вспомним минусы, которые они добавляют:

    1)  Своя собственная обработка ошибок, которая идёт в обход try/catch. Это значит, что в коде будут 
    появляться оба способа обработки, комбинирующихся в причудливых формах.

    2)  Иногда бывает нужно передавать данные вниз по цепочке с самых верхних уровней, и с промисами делать это 
    неудобно. Придётся создавать переменные вне промиса.
    3)  С промисами по-прежнему легко начать создавать вложенность, если специально за этим не следить.

Все эти сложности убираются механизмом async/await, делающим код с промисами ещё более похожим на синхронный! 
Вспомним нашу задачу по объединению двух файлов. Вот её код:
*/

import { promises as fs } from 'fs';

const unionFiles = (inputPath1, inputPath2, outputPath) => {
  let data1;
  return fs.readFile(inputPath1, 'utf-8')
    .then((content) => {
      data1 = content;
    })
    .then(() => fs.readFile(inputPath2, 'utf-8'))
    .then((data2) => fs.writeFile(outputPath, `${data1}${data2}`));
};

/* А теперь посмотрим на этот же код с использованием async/await. Подчеркну, что async/await работает с 
промисами: */

import { promises as fs } from 'fs';

const unionFiles = async (inputPath1, inputPath2, outputPath) => {
    // Очень важный момент. Так же как и в примере выше, эти запросы выполняются строго друг за другом
    // (хотя при этом не блокируется программа, это значит, что другой код тоже может выполняться во время 
    // этих запросов)

    const data1 = await fs.readFile(inputPath1, 'utf-8');
    const data2 = await fs.readFile(inputPath2, 'utf-8');

    await fs.writeFile(outputPath, `${data1}${data2}`);
}

/*
Эта версия, визуально, практически не отличается от её синхронной версии. Код настолько простой, что даже не 
верится, что он асинхронный. Разберём его по порядку.
*/

/*
Первое, что мы видим, — это ключевое слово async перед определением функции. Оно означает, что данная функция 
всегда возвращает промис: const promise = unionFiles(...). Причём, теперь не обязательно возвращать результат 
из этой функции явно, она всё равно станет промисом.
*/

/*
Внутри функции используется ключевое слово await, которое ставится перед вызовом функций, которые, в свою 
очередь, тоже возвращают промисы. Если результат этого вызова присваивается переменной или константе, то в 
них записывается результат вызова. Если присвоения нет, как в последнем вызове await, то происходит ожидание 
выполнения операции без использования её результата.
*/

/*
Асинхронность, в данном случае (как и в промисах), гарантирует нам, что программа не блокируется ожидая 
завершения вызовов, она может продолжать делать что-то еще (но не в этой функции). Но она не гарантирует 
параллельности. Более того, подряд идущие await в рамках одной функции всегда выполняются строго друг за 
другом. Проще всего это понимать если представлять код как цепочку промисов, где каждая следующая операция 
выполняется внутри then.
*/

// А что с обработкой ошибок? Теперь достаточно поставить обычные try/catch и ошибки будут отловлены!

import { promises as fs } from 'fs';

const unionFiles = async (inputPath1, inputPath2, outputPath) => {
  try {
    const data1 = await fs.readFile(inputPath1, 'utf-8');
    const data2 = await fs.readFile(inputPath2, 'utf-8');
    await fs.writeFile(outputPath, `${data1}${data2}`);
  } catch (e) {
    console.log(e);
    throw e; // снова бросаем, потому что вызывающий код должен иметь возможность отловить ошибку
  }
};

// Однако, при параллельном выполнении промисов не обойтись без функции Promise.all:

const unionFiles = async (inputPath1, inputPath2, outputPath) => {
    // Эти вызовы начинают чтение почти одновременно и не ждут друг друга
    const promise1 = fs.readFile(inputPath1, 'utf-8');
    const promise2 = fs.readFile(inputPath2, 'utf-8');
    // Теперь дожидаемся когда они оба завершатся
    // Данные можно сразу разложить
    const [data1, data2] = await Promise.all([promise1, promise2]);
    await fs.writeFile(outputPath, `${data1}${data2}`);
};

/*
Подводя итог, механизм async/await делает код максимально плоским и похожим на синхронный. Благодаря ему 
появляется возможность использовать try/catch, и легко манипулировать данными полученными в результате 
асинхронных операций.
*/
