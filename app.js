//Объявлены переменные по id
const quizStart = document.getElementById("all_start")
const butnStart = document.getElementById("butn_start_id")
const quizProcess = document.getElementById("quiz_process")
const headElem = document.getElementById("head_")
const buttonsElem = document.getElementById("buttons")
const pagesElem = document.getElementById("pages")
const btnFinish = document.getElementById("finish_btn")

//Стартовое состояние: заставка, тест не виден
function startQuiz () {
    quizStart.hidden = true;
    quizProcess.hidden = false;
}

function startQuiz_all () {
    location.reload()
}

//Тест завершен: вывод показан, кнопка Завершить
//Возврат на стартовое состояние


//Класс, который представляет сам тест
class Quiz {
   constructor(type, questions, results) {
       //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
       this.type = type; 
       //Массив с вопросами
       this.questions = questions; 
       //Массив с возможными результатами
       this.results = results; 
       //Количество набранных очков
       this.score = 0; 
       //Номер результата из массива
       this.result = 0; 
       //Номер текущего вопроса
       this.current = 0;
    }
    //добавить метод в конструктор внутри класса
    Click(index) {
        //Добавляем очки
        let value = this.questions[this.current].Click(index);
        this.score += value;
    
        let correct = -1;
    
        //Если было добавлено хотя бы одно очко, то считаем, что ответ верный
    //     if(value >= 1) {
    //         correct = index;
    //     }
    //     else {
    //         //Иначе ищем, какой ответ может быть правильным
    //         for(let i = 0; i < this.questions[this.current].answers.length; i++) {
    //             if(this.questions[this.current].answers[i].value >= 1) {
    //                 correct = i;
    //                 break;
    //             }
    //        }
    //    }
 
       this.Next(); 
       return correct;
   }
 
   //Переход к следующему вопросу
   Next() {
       this.current++;      
       if(this.current >= this.questions.length) {
           this.End();
       }
   }
 
   //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
   End() {
       for(let i = 0; i < this.results.length; i++) {
           if(this.results[i].Check(this.score)) {
               this.result = i;
           }
       }
   }
}
 
//Класс, представляющий вопрос
class Question {
   constructor(text, answers) {
       this.text = text;
       this.answers = answers;
   }
 
   Click(index) {
       return this.answers[index].value;
   }
}
 
//Класс, представляющий ответ
class Answer {
   constructor(text, value) {
       this.text = text;
       this.value = value;
   }
}
 
//Класс, представляющий результат
class Result {
   constructor(text, value) {
       this.text = text;
       this.value = value;
   }
 
   //Этот метод проверяет, достаточно ли очков набрал пользователь
   Check(value) {
       if(this.value <= value) {
           return true;
       }
       else {
           return false;
       }
   }
}


//Массив с результатами
const results =
[
   new Result("<img src='01.PNG' alt=''><p style='color: brown;font-size: 24px;'><strong>Идеальный клиент для мошенников</strong></p><br><br> Тебя легко обмануть и заставить поверить в откровенную чушь. Доверять людям, конечно, нужно, но не стоит верить всему, что говорят. Чрезмерная наивность может привести тебя к денежным потерям и неприятным ситуациям", 3),
   new Result("<img src='02.PNG' alt=''><p style='color: brown;font-size: 24px;'><strong>Сомневающаяся</strong></p><br><br> Ты, вроде, чуешь подвох, но надеешься на чудо. Развивай свою интуицию и доверяй ей. Она точно не подведет", 6),
   new Result("<img src='03.PNG' alt=''><p style='color: brown;font-size: 24px;'>Тебя не проведешь!</strong></p><br><br> Ты та, кого не рискуют обманывать. Связываться с тобой опасно. Ты не только заметишь ложь, но и пристыдишь злоумышленника", 12)
];
 
//Массив с вопросами
const questions =
[
   new Question("Тебе пришло сообщение о выигрыше в лотерею, в которой ты не участвовала. Как отреагируешь?",
   [
       new Answer("Это же невероятно, просто сногсшибательное везение!", 0),
       new Answer("Интересно, на что рассчитывают эти люди?", 2),
       new Answer("Может, позвонить и уточнить?", 1)       
   ]),
   new Question("В VK тебе в друзья стучится Джордж Клуни",
   [
       new Answer("Ребят, развивайте фантазию!", 2),
       new Answer("Ой, а я не знаю английский. Интересно, как у него с русским?", 0),       
       new Answer("Надо проверить, точно ли его страничка? Меня не проведешь", 1)
   ]),
   new Question("Подруга, которая давно не отдает тебе долг, говорит, что буквально за час до стречи ее обокрали. Как ты отнесешься?",
   [
       new Answer("С пониманием и сочувствием", 1),
       new Answer("Дружба прибывает на станцию Конечная", 2),       
       new Answer("Подозреваю, что-то не так. Надо подождать еще", 0)
   ]),
   new Question("В ходе поездки таксист рассказывает тебе о своем бизнесе. Что ты об этом думаешь?",
   [
       new Answer("Ну вот он, конечно, молодец. Я бы тоже хотела бы все успевать", 1),
       new Answer("... а я томат", 2),       
       new Answer("Ну а что? Мы же не знаем, какая у человека ситуация", 0)
   ]),
   new Question("Часто ли ты покупаешь лишнее по рекомендации консультанта?",
   [
       new Answer("Иногда такое случается", 1),
       new Answer("Никогда, я прихожу в магазин с четким запросом", 2),       
       new Answer("Да, и мне нравится эта помощь", 0)
   ]),
   new Question("К тебе пристает незнакомка. Говорит, что знает, что у тебя на душе и обещает помочь. А ты... что?",
   [
       new Answer("Я проверю, закрыта ли сумочка и постараюсь уйти как можно быстрее", 2),
       new Answer("Это настоящее чудо! Откуда она узнала?", 0),       
       new Answer("А что, если?", 1)
   ]),
   new Question("Представь: первое свидание, вы ужинаете в ресторане. Вам приносят счет и тут твой принц говорит, что забыл карточку. Как ты отреагируешь?",
   [
       new Answer("Я его выручу. Неприятная ситуация, конечно, представляю, как ему неловко", 0),
       new Answer("Понятное дело, что плачу я. Но мы больше не увидимся", 2),       
       new Answer("Очень странное совпадение. Но, возможно, я накручиваю", 1)
   ])
];
 
//Сам тест (тип, вопрос, ответ)
const quiz = new Quiz(2, questions, results);




Update();
 
//Обновление теста
function Update() {
   //Проверяем, есть ли ещё вопросы
   if(quiz.current < quiz.questions.length) {
        
        //Если есть, меняем вопрос в заголовке
        headElem.innerHTML = quiz.questions[quiz.current].text;
 
        //Удаляем старые варианты ответов
        
        buttonsElem.innerHTML = "";
 
        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
           let btn = document.createElement("button");
           btn.className = "button"; 
           btn.innerHTML = quiz.questions[quiz.current].answers[i].text; 
           btn.setAttribute("index", i); 
           buttonsElem.appendChild(btn);
        }
      
        //Выводим номер текущего вопроса
        
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
 
        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    }
   else {
        //Если это конец, то выводим результат
        
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = "Очки: " + quiz.score;
        btnFinish.hidden = false
   }
}
 
function Init() {
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");
 
   for(let i = 0; i < btns.length; i++) {
       //Прикрепляем событие для каждой отдельной кнопки
       //При нажатии на кнопку будет вызываться функция Click()
       btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
   }
}
 
function Click(index)
{
   //Получаем номер правильного ответа
   let correct = quiz.Click(index);
 
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");
 
   //Делаем кнопки серыми
   for(let i = 0; i < btns.length; i++) {
       btns[i].className = "button button_passive";
   }
 
//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
//    if(quiz.type == 1) {
//        if(correct >= 0) {
//            btns[correct].className = "button button_correct";
//        }
 
//        if(index != correct) {
//            btns[index].className = "button button_wrong";
//        }
//    }
//    else {
//Иначе просто подсвечиваем зелёным ответ пользователя
       btns[index].className = "button button_correct";
//}
 
   //Ждём секунду и обновляем тест
   setTimeout(Update, 1000);
}

//Нажатие Начать тест - запуск функции
butnStart.addEventListener("click", startQuiz)
btnFinish.addEventListener("click", startQuiz_all)
