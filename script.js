const massivs = []

const btnFormElement = document.querySelector('.js_open_form');
const formElement = document.querySelector('.form')
const btnCloseForm = document.querySelector('.js_close_form')
const inputText = document.querySelector('.js_input_text')
const listWrap = document.querySelector('.list_wrap')
const btnAddInfo = document.querySelector(' .js_add_info')
const selectPriorityElement = document.querySelector('.js-select')
const thingFormElement = document.querySelector('.js_input_thing')
const btnFilter = document.querySelector('.js_open_filter')
const formFilterElement = document.querySelector('.form_filter')
const inputSearchElement = document.querySelector('.js_input_text_search')
const selectSortElement = document.querySelector('.js-select-sort')

selectSortElement.addEventListener('change', hendleChangeSortSelect)

btnFormElement.addEventListener('click', () => {
    formElement.classList.remove('open_form')
})
btnCloseForm.addEventListener('click', () => {
    formElement.classList.add('open_form')
})

btnFilter.addEventListener('click', filterCloueOpen)

function filterCloueOpen() {
    formFilterElement.classList.toggle('form_disable')
}

btnAddInfo.addEventListener('click', formAddText)

inputSearchElement.addEventListener('input',
    hendleInputsearch)

function hendleChangeSortSelect({
    target
}) {
    const {
        value
    } = target
    const resultSort = massivs.sort((a, b) => {
        return b[value] - a[value]
    })
    createList(resultSort)
}


function hendleInputsearch({
    target
}) {
    const {
        value
    } = target
    const resultSearch = massivs.filter((item) => {
        if (item.content.includes(value)) {
            return true
        }
        return false
    })
    if (resultSearch.length) {
        createList(resultSearch)
    } else {
        listWrap.innerHTML = '<div class="text-muted">ничего не найдено!</div>'
    }
}

function formAddText() {
    const content = inputText.value.trim()
    const date = help()
    const priority = selectPriorityElement.value
    const estimate = thingFormElement.value
    if (content) {
        massivs.push({
            content,
            date,
            priority,
            estimate
        })
        formElement.reset()
        createList(massivs)
    }
}

function listRemove(event) {
    const {
        target
    } = event
    if (target.tagName == 'BUTTON') {
        const {
            index
        } = target.dataset
        massivs.splice(index, 1)
        createList(massivs)
    }
}

function addListText({
    content,
    date,
    priority,
    estimate
}, index) {
    const template = `<li class="list_item"> 
    ${content}
    <span class="ms-3 text-muted">${date}</span>
    <span class="ms-3 text-muted  me-3">${estimate} шт</span>
    <span>
    ${renderStars(priority)}
    </span>
    <button class="btn btn-danger ms-auto btn-sm" data-index="${index}">-</button>
    </li>`
    return template
}


function createList(massivs = []) {
    const listElement = document.createElement('ul')
    listElement.classList.add('list')
    listWrap.innerHTML = ''
    massivs.forEach((item, index) => {
        listElement.innerHTML = listElement.innerHTML + addListText(item, index)
    })
    listElement.addEventListener('click', listRemove)
    listWrap.append(listElement)
}

function help() {
    const date = new Date()

    const day = date.getDate()
    let month = +date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    const year = date.getFullYear()

    const result = `${day}.${month}.${year}`

    return result
}

function renderStars(caunter) {
    const template = `
 <svg width="1em" height="1em">
    <use xlink:href="#star">
    </svg>
 `
    let result = ''
    for (let i = 0; i < caunter; i++) {
        result = result + template
    }
    return result
}





