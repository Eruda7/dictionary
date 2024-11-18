const form = document.querySelector('form')
const addEnd = document.querySelector('#engWord')
const addRus = document.querySelector('#rusWord')
const testModal = document.querySelector('.testModal')

testModal.style.display = 'none'

const btnTest = document.querySelector('#testBtn')
const cancelButton = document.querySelector('#cancel')
const h2 = document.querySelector('h2')
const answer = document.querySelector('#answer')
const btnCheck = document.querySelector('#check')
const points = document.querySelector('#points')

const dict = {
	apple: 'Яблоко',
	pear: 'Груша',
	orange: 'апельсин',
	apricot: 'абрикос',
	peach: 'персик',
}

let engArr = []
let rusArr = []
let i = 0
let point = 0
let dictLength = Object.keys(dict).length

form.addEventListener('submit', e => {
	e.preventDefault()
	if (!addEnd.value.trim().length || !addRus.value.trim().length) {
		return alert('Введите слова!')
	}
	dict[addEnd.value.toLowerCase()] = addRus.value.toLowerCase()
	alert('Слова добавлены!')
	addEnd.value = ''
	addRus.value = ''
	dictLength = Object.keys(dict).length
	addPoints()
})

const handleTest = () => {
	testModal.style.display = 'flex'
	engArr = []
	rusArr = []
	for (let key in dict) {
		engArr.push(key.toLowerCase())
		rusArr.push(dict[key].toLowerCase())
	}
	i = 0
	point = 0
	addQuestion()
	addPoints()
}

btnTest.addEventListener('click', handleTest)

const cancelClick = () => {
	testModal.style.display = 'none'
}
cancelButton.addEventListener('click', cancelClick)

const addQuestion = () => {
	if (i < engArr.length) {
		h2.textContent = `Как переводится ${engArr[i]}`
	} else {
		h2.textContent = 'Вопросы закончились!'
	}
}

const addPoints = () => {
	points.innerHTML = `${point} / ${dictLength}`
}

const handleCheck = () => {
	if (!answer.value.trim().length) {
		answer.value = ''
		return alert('Вы ничего не ввели!')
	}

	if (answer.value.toLowerCase() === rusArr[i]) {
		alert('Верно!')
		point++
	} else {
		alert('Не верно!')
	}
	addPoints()

	i++

	if (i >= engArr.length) {
		alert(`Всего: ${point} / ${dictLength} очков`)
		i = 0
		testModal.style.display = 'none'
	} else {
		addQuestion()
	}

	answer.value = ''
}

btnCheck.addEventListener('click', handleCheck)
