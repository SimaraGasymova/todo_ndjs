let counter = 1
const data = [
  {
    id: 1,
    text: 'text',
    isDone: true
  }
]

export function initCounter() {
  if (data.length === 0) {
    return
  }
  data.forEach(element => {
    if (element.id >= counter) {
      counter = element.id + 1
    }
  });
}

export function getData() {
  return JSON.stringify(data)
}

export function createTask(inputData) {
  if (Object.hasOwn(inputData, "text") && typeof inputData.text == "string"){
  const item = {
    text: inputData.text,
    id: counter++,
    isDone: false
  }
  data.push(item)
  return 
}
  else{
    return;
  }

}

export function changeStatus(id) {
  const item = data.find(i => i.id === id)
  if (item === undefined) {
    // TODO 404
  }
  item.isDone = !item.isDone
  return 
}

export function deleteTask(id) {
  const idx = data.findIndex(i => i.id === id)
  if (idx === -1) {
    // console.log('Такого id не существует');
    throw new Error("Такого id не существует");
    
  }
  const removed = data.splice(idx, 1)
  return JSON.stringify(removed)
}