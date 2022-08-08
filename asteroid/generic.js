const DATA = { 
    // multiple and binary questions
    "questions": [
        {
            type: `multiple`,
            question: `שאלה שהתשובה אליה היא הרביעית`,
            ans1: `תשובה לא נכונה`,
            ans2: `תשובה לא נכונה`,
            ans3: `תשובה לא נכונה`,
            ans4: `תשובה נכונה`,
            correctAns: `ans4`
        },
        {
            type: `binary`,
            question: `התשובה היא: "נכון"`,
            correctAns: true
        },
        {
            type: `multiple`,
            question: `שאלה שהתשובה אליה היא הראשונה`,
            ans1: `תשובה נכונה`,
            ans2: `תשובה לא נכונה`,
            ans3: `תשובה לא נכונה`,
            ans4: `תשובה לא נכונה`,
            correctAns: `ans1`
        }
    ]
};

/* questionsEnd
--------------------------------------------------------------
Description: for multiple and binary questions or for complete the sentence */
const questionsEnd = () => {
    // user didnt succeed
    if (nMultipleCorrectAnswers === 0) {
        // user failed - retry
        movePage("+0","-1");
        document.querySelector('#instructions .instructions').innerHTML = "לא הצלחתם לצבור מספיק כדורים... נסו שוב!";
        nMultipleCurrentQuestion = 0;
    } else {
        movePage("+0","+1"); 
    }
}


/*
shuffle
------------------------------------------------
Description: take DATA array and shffel it
Parameters: array.
*/

function shuffle(arr) {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

// El
// --------------------------------------------------------------

function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}

addAnimation = (element, animation, time, delay, callback) => {
    element.classList.add(animation);
    element.style.cssText = `animation-duration: ${time}ms; animation-delay: ${delay}ms;`;
    setTimeout(callback, time + delay - 100);
}

