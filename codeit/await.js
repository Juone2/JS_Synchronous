fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    const lastUser = users[users.length - 1];
    return lastUser.id;
  })
  .then((id) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`))
  .then((response) => response.json())
  .then((posts) => {
    const lastPost = posts[posts.length - 1];
    console.log(lastPost);
  });

// 같은 동작을 하는 코드

async function getTheLastPostOfTheLastUser() {
  const usersJSON = await fetch("https://jsonplaceholder.typicode.com/users")
  const users = await usersJSON.json();
  const lastUser = users[users.length - 1];
  const { id } = users;
  const postsJSON = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  const posts = await postsJSON.json();
  const lastPost = posts[users.length - 1];
  return lastPost;
}

getTheLastPostOfTheLastUser().then((lastPost) => {
  console.log(lastPost);
}); 

// 실습 예제

  const p1 = fetch('https://jsonplaceholder.typicode.com/users?id=1')
    .then((response) => response.text());
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('hello'); }, 2000);
  });
  const p3 = Promise.resolve('Success');
  const p4 = Promise.reject(new Error('Fail'));

  async function test() {
    console.log(await p1);
    console.log(await p2);
    console.log(await p3);
    console.log(await p4);
  }

  console.log('----Start----');
  test();
  console.log('-----End-----');

// try catch finally 예제

async function showQuiz() {
  try {
    const response = await fetch('https://learn.codeit.kr/api/quiz');
    const test = await response.json();
    const yourAnswer = prompt(test.quiz);
    if (yourAnswer.toLowerCase() === test.answer) {
      alert(`Good Job, ${test.explanation} => Let\'s learn more with Codeit!`);
    } else {
      throw new Error('wrong');
    }
  } catch (error) {
    if (error.message === 'wrong') {
      alert('You need to learn JavaScript with Codeit!');
    } else {
      alert('Error');
    }
  } finally {
    window.open('https://codeit.kr', '_blank');
  }
}

showQuiz();

// then -> async , await

async function pick(menus) {
  console.log('Pick random menu!');
  const p = new Promise((resolve, reject) => {
    if (menus.length === 0) {
      reject(new Error('Need Candidates'));
    } else {
      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIdx];
        resolve(selectedMenu);
      }, 1000);
    }
  });

  return p;
}

async function getRandomMenu() {
  console.log('---Please wait!---');
  try {
    const response = await fetch('https://learn.codeit.kr/api/menus');
    const menus = await response.json();
    const menu = await pick(menus);
    console.log(`Today's lunch is ${menu.name}~`);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('Random Menu candidates change everyday');
  }
}