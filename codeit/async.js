// 동일한 코드 

/* fetch( 'https://learn.codeit.kr/api/members')
  .then((response) => response.text())
  .then((result) => { console.log(result); }); */

async function fetchAndPrint() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await response.text();
  console.log(result);
}

fetchAndPrint();

// try catch finally

async function fetchAndPrint() {
  try {
  const response = await fetch('https://jsonplaceholder.typicode.commm/users'); // error 만들기
  const result = await response.text();
  console.log(result);
  } catch (error) { 
    console.log(error);
  } finally {
    console.log('exit!');
  }
}

fetchAndPrint();

// async 붙이는 위치

  // 1) Function Declaration
  async function example1(a, b) {
    return a + b;
  }

  // 2-1) Function Expression(Named)
  const example2_1= async function add(a, b) {
    return a + b;
  };

  // 2-2) Function Expression(Anonymous)
  const example2_2 = async function(a, b) {
    return a + b;
  };

  // 3-1) Arrow Function
  const example3_1 = async (a, b) => {
    return a + b;
  };

  // 3-2) Arrow Function(shortened)
  const example3_2 = async (a, b) => a + b;