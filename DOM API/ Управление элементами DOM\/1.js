// Атрибуты

<a id="aboutPage" href="/pages/about" class="simple">About</a>

/*
Когда браузер загрузил HTML, на его основе строится DOM. Во время обработки, каждый тег становится узлом, 
а атрибуты – свойствами этого узла. Обычно имена атрибутов и свойств узлов совпадают между собой:
*/

// <a id="aboutPage" href="/pages/about" class="simple">About</a>
const el = document.querySelector('#aboutPage');
el.className; // simple
el.id; // aboutPage
el.href; // https://ru.hexlet.io/pages/about

/*
Существуют и исключения, например, атрибуту class соответствует свойство className. Более того, для удобной 
работы с классами предусмотрены дополнительные API. Это нужно по той причине, что классов может быть много и 
задаются они обычной текстовой строкой. Соответственно, если возникает задача изменения этого списка, 
то придется оперировать строчками, что совсем неудобно. А вот как можно это делать, используя DOM API:
*/

const el = document.querySelector('#aboutPage');
el.classList.add('page');
el.classList.remove('simple');
el.className; // page

// Дополнительные методы:

// el.classList.contains("class") – возвращает true/false
// el.classList.toggle("class") – если класс есть, удаляет его, и наоборот

// С одной стороны, атрибуты отображаются на свойства, но с другой, есть множество нюансов.

// 1. Атрибут — всегда строка, а свойство — не всегда. Например:

<textarea rows="5"></textarea>

// Значение свойства rows соответствующего элемента в DOM дереве будет числом.

// 2. Атрибуты не чувствительны к регистру
<a Id="aboutPage" hrEf="/pages/about" CLASS="simple">About</a>
// Так писать, конечно же, не стоит, но по крайней мере знать о том, что оно работает - полезно.

// 3. Атрибут всегда присутствует в HTML (а значит innerHTML)

// А вот многие свойства не имеют соответствующих атрибутов. Например у тега <a> есть свойство hash, но нет 
// такого атрибута.

/*
Как мы увидели выше, атрибут и свойство, в общем случае — не одно и то же. Поэтому существует набор методов 
для управления атрибутами:
*/

// el.hasAttribute(name) – проверяет наличие атрибута
// el.getAttribute(name) – получает значение атрибута
// el.setAttribute(name, value) – устанавливает атрибут
// el.removeAttribute(name) – удаляет атрибут
// el.attributes – список html атрибутов

// Методы работают с атрибутами html
el.getAttribute('class');

/*
В основном синхронизация осуществляется только в сторону свойств. То есть меняется атрибут и автоматически 
обновляется свойство. Но существуют и исключения. Из этих тезисов не следует делать вывод, что нужно стараться 
работать через атрибуты. Наоборот, по возможности, всегда работайте со свойствами дом дерева, а атрибуты 
используйте только для чтения, чтобы получить то состояние, которое было в доме на момент инициализации 
(парсинга html).
*/

<a id="aboutPage" href="/pages/about" class="simple">About</a>

const el = document.querySelector('#aboutPage');
el.setAttribute('class', 'page');
el.className; // page
el.getAttribute('class'); // page

/*
В отличие от свойств значение атрибута всегда совпадает с тем, что мы видим в html, а вот свойства иногда 
приводятся в нормализованный вид:
*/

<!-- В этот момент браузер открыт на https://ru.hexlet.io -->
<a id="link-to-courses" href="/courses">Курсы</a>

const el = document.querySelector('#link-to-courses');
el.href; // https://ru.hexlet.io/courses
el.getAttribute('href'); // /courses

/*
Нестандартные атрибуты никогда не превращаются в свойства соответствующих элементов DOM дерева. 
То есть, если мы добавим в тег p атрибут href, то он будет проигнорирован. Хотя это не отменяет возможность 
его извлечения через getAttribute.
*/

/*
Для работы с произвольными свойствами в html зарезервирован специальный атрибут data-*, где на месте 
звездочки может стоять любое слово.
*/

<a href="#" data-toggle="tab">Мои проекты</a>

// Такие атрибуты активно используются в js плагинах и позволяют не завязываться на классы. В элементах 
// DOM они доступны через специальное свойство dataset:

console.log(el.dataset.toggle); // => tab

// Внутри объекта dataset имя каждого свойства — это строка после data- в атрибуте. Если имя содержит дефис, 
// то он удаляется, а следующее за ним буква становится заглавной:

<a href="#" data-nav-toggle="tab">Мои проекты</a>

console.log(el.dataset.navToggle); // => tab
