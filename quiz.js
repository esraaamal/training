//Fill html with question and choice
const question=document.getElementById('question')
const aText=document.getElementById("a-text")
const bText=document.getElementById("b-text")
const cText=document.getElementById("c-text")
const dText=document.getElementById("d-text")


const submitBtn=document.getElementById('submit')
const reload=document.getElementById('reload')

//know what is the answer was clicked by user
const answerEls=document.querySelectorAll('.answer')
const quiz=document.getElementById("quiz")

const resultPage=document.getElementById('resultPage')



    fetch('json/html.json')
    .then(function(resp){
        return resp.json()
    })
    .then(function(data){
        let score=0;
      let currentQuiz=0


    console.log(data.html.length)
    
        loadData()
    
        
    var resultHistory=[]
    
    
    function HistoryAnswer(question,useAnswer,correct){
    this.question=question;
    this.useAnswer=useAnswer;
    this.correct=correct;
    resultHistory.push(this)
    }
    
    function loadData(){
        removeSelect()
        const currentQuizData=data.html[currentQuiz];
        question.innerText=currentQuizData.question
        aText.innerText=currentQuizData.a
        bText.innerText=currentQuizData.b
        cText.innerText=currentQuizData.c
        dText.innerText=currentQuizData.d
    }
    
    
    
    function getUserAnswer(){
        let firstAnswer=undefined;
        answerEls.forEach(x=>{
            if(x.checked){
                firstAnswer=x.id
            }
        })
        console.log(firstAnswer)
        new HistoryAnswer(data.html[currentQuiz].question,firstAnswer,data.html[currentQuiz].correct)
    
        return firstAnswer
    
    }
    
    function removeSelect(){
        answerEls.forEach(x=>{
            x.checked=false
        })
    }
    
    function renderQuizzes(e){
        let correctAnswer=getUserAnswer();
        console.log(resultHistory)
        if(correctAnswer){
            if(correctAnswer===data.html[currentQuiz].correct){
                score++
            }
            currentQuiz++;
    
       if(currentQuiz<data.html.length){
           loadData()
       }else{
           e.preventDefault()
        quiz.innerHTML=`<h2>you answered correctly at ${score}/${data.html.length} questions.
        </h2>`;
        setLocalStorage()
        reload.style.display="block"
        reload.setAttribute('onclick','location.reload()')
        submitBtn.innerText='Show all result'
        resultPage.setAttribute('href','index.html')
        console.log(resultPage)
        submitBtn.removeEventListener('click',renderQuizzes)
    
        // submitBtn.setAttribute('onclick','location.reload()')
        
     }
     
    
    
        }
    }
    
    submitBtn.addEventListener('click',renderQuizzes)
    
    
    function setLocalStorage(){
        var convertToJson=JSON.stringify(resultHistory)
        localStorage.setItem('userAnswer',convertToJson)
    }
    
    
    
    })






