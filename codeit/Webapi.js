// fetch 함수 -> Ajax 통신 하는 함수
// parse method -> JSON 문자열을 js 객체로 반환
// stringify method -> js 객체를 JSON 문자열로 반환 
// fetch 함수와 then 함수는 모두 promise 객체를 리턴한다!!!

fetch( 'https://learn.codeit.kr/api/members')
  .then((response) => response.text())
  .then((result) => { console.log(result); }); 

// 아래와 같은 코드

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((result) => { const users = result; });

// POST 보내기  

const newMember = {
    name: 'jerry',
    email: 'jerry@codeitmall.kr',
    deqartment: 'engineering', 
  };

  fetch('https://learn.codeit.kr/api/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 추가됨
    },
    body: JSON.stringify(newMember),
  })
    .then((response) => response.text())
    .then((result) => {console.log(result) ;});

// 수정하기 PUT

  const newMember1 = {
      name: 'Alice',
      email: 'Alice@codeitmall.kr',
      deqartment: 'marketing', 
    };
    
  fetch('https://learn.codeit.kr/api/members/2', {
    method: 'PUT',
    body: JSON.stringify(newMember1),
  })
    .then((response) => response.text())
    .then((result) => {console.log(result) ;});

// 삭제하기 DELETE -> body 필요 없음 -> GET도 필요 없음
    
  fetch('https://learn.codeit.kr/api/members/2', {
    method: 'DELETE',
  })
  .then((response) => response.text())
  .then((result) => {console.log(result) ;});

// response 객체의 status 상태 코드 값

  fetch('https://www.google.com')
    .then((response) => {
      console.log(response.status);
    });


  // XMLHttpRequest() 객체를 통한 Ajax 통신

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://learn.codeit.kr/api/members');
  xhr.onload = function () {
    console.log(xhr.response);
  };
  xhr.onerror = function () {
    alert('Error!');
  };
  xhr.send();

  // fetch == promise -> return
  // promise : 실행중 -> pending -> 성공 -> fulfilled ( 실행될 콜백 )-> 실패 -> rejected
  // fulfilled -> 등록 했던 콜백 실행 그 결과가 콜백의 파라미터로 넘어옴

  console.log('start!');

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => { console.log(result); })

  console.log('end!');

  // 작업순서 start -> request 보내기 -> end -> response


// promice chaining -> 순차적으로 비동기처리를 해야 할 때

  console.log('start!');

  fetch('https://jsonplaceholder.typicode.com/users') //  promise
  .then((response) => response.text()) // pending
  .then((result) => {
    const users = JSON.parse(result);
    return users[0];
  })
  .then((user) => {
    console.log(user);
    const { address } = user;
    return address;
  })
  .then((address) => {
    console.log(address);
    const { geo } = address;
    return geo;
  })
  .then((geo) => {
    console.log(geo);
    const { lat } = gao;
    return lat;
  })
  .then((lat) => {
    console.log(lat);
  });

  console.log('end!');

  console.log('start!'); 
  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => {
    const users = JSON.parse(result);
    const { id } = users[0];
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`) // userId = query
    .then((response) => response.text())
    .then((posts) => {
      console.log(posts);
    });
  });

  console.log('end!');

  // rejected error가 났을 때 console.log(error) 실행

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json(), (error) => { console.log(error); })
  .then((result) => {console.log(result) ;})

  // catch method 활용

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text()) 
  .catch((error) => { console.log(error); }) //  same code .then(undefined, (error) => {console.log(error); }) 잘 안 씀 catch도 then임
  .then((result) => { console.log(result) ;});

  // catch -> then

  fetch('https://jsonplaceholder.typicode.com/users') // Promise-A
  .then((response) => response.text()) // Promise-B
  .then(undefined, (error) => { console.log(error); }) // Promise-C
  .then((result) => { console.log(result); }); // Promise-D

  // error 발생 

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text()) 
  .catch((error) => { console.log(error); }) 
  .then((result) => {
    console.log(result);
    throw new Error('test');
  }) 

  // 위 코드에서 catch 내리기 

  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text()) 
  .then((result) => {
    console.log(result);
    throw new Error('test');
  }) 
  .catch((error) => { console.log(error); }); // -> Error: test 출력

  // finally method 일부러 catch에서 finally 오류 항상 실행해야 할 때 쓴당 ( 보통 catch method 뒤에 씀 )
  // promise chaining에서 자원 정리나 로그 기록을 남겨야 할 때, 항상 특정 변수의 값을 변경해야 할 때
  fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text()) 
  .then((result) => { console.log(result) ;})
  .catch((error) => { 
    console.log(error); 
    throw new Error('from catch method')
  })
  .finally(() => { console.log('exit'); });

  // promise 객체 생성하기 파라미터는 promise 생성 될 때 자동으로 실행되는 함수 ( executor 함수 ) 
  // resolve는 생성될 프로미스 객최를 fulfilied로 만듦
  // reject는 생성될 프로미스 객체를 rejected로 만듦
  // new method를 써서 객체 생성 할 수 있음

  // fulfilied 만들기

  const p = new Promise((resolve, reject) => {
    setTimeout(() => { resolve('success'); }, 3000); // 실행 수 3초 뒤 success 출력 ( 작업 성공 결과 )
  });

  p.then((result) => { console.log(result); });

  // rejected 만들기

  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => { reject(new Error('fail')); }, 3000);
  });

  p1.catch((error) => { console.log(error); });

  // setTimeout 예시

  function wait(text, milliseconds) {
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => { resolve(text); }, 2000);
    });
    return p2;
  }
  
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.text())
    .then((result) => wait(`${result} by Codeit`, 2000)) // 2초 후에 리스폰스의 내용 뒤에 'by Codeit' 추가하고 리턴
    .then((result) => { console.log(result); });

// promisify 하면 안 되는 함수
//이렇게 콜백이 여러 번 실행되어야하는 비동기 실행 함수인 경우에는 Promisify를 하면 안 됨

  const box = document.getElementById('test');
    let count = 0;

  function addEventListener_promisified(obj, eventName) { // 이런 Promisify는 하지 마세요
    const p3 = new Promise((resolve, reject) => {
      obj.addEventListener(eventName, () => { // addEventListener 메소드
        count += 1;
        resolve(count);
      });
    });
    return p3;
  }

  addEventListener_promisified(box, 'click')
    .then((eventCount) => { console.log(eventCount); });

  //fulfilled 상태의 Promise 객체 만들기

  const p4 = Promise.resolve('success');

  //  rejected 상태의 Promise 객체 만들기

  const p5 = Promise.reject(new Error('fail'));

  // 응용 

  const p6 = Promise.resolve('success');
    p6.then((result) => { console.log(result); }, (error) => { console.log(error); }); // success

  const p7 = Promise.reject(new Error('fail'));
    p7.then((result) => { console.log(result); }, (error) => { console.log(error); }); // fail

  // 예제 코드

  function pick(menus) {
    console.log('Pick random menu!');
    const p = new Promise((resolve, reject) => {
      if (menus.length === 0) {
        reject(new Error('Need Candidates'));
      } else {
        setTimeout(() => {
          const randomIdx = Math.floor(Math.random() * menus.length);
          const selectedMenu = menus[randomIdx];
          resolve(selectedMenu);
        }, 1000); // 시간이 걸리는 걸 시뮬레이션하기 위한 1초입니다
      }
    });
    return p;
  }
  
  function getRandomMenu() {
    return fetch('https://learn.codeit.kr/api/menus')
      .then((response) => response.json())
      .then((result) => {
        const menus = result;
        return pick(menus); // ! random pick function
      });
  }
  
  getRandomMenu()
    .then((menu) => {
      console.log(`Today's lunch is ${menu.name} ~`);
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      console.log('Random Menu candidates change everyday');
    });

  // 여러개의 promise 객체 다루기
  // all 메소드는 하나의 Promise 객체라도 rejected 상태가 되면, 전체 작업이 실패한 것으로 간주해야 할 때 사용합니다. 

  // 1번 직원 정보
  const p8 = fetch('https://learn.codeit.kr/api/members/1').then((res) => res.json());
  // 2번 직원 정보
  const p9 = fetch('https://learn.codeit.kr/api/members/2').then((res) => res.json());
  // 3번 직원 정보
  const p10 = fetch('https://learn.codeit.kr/api/members/3').then((res) => res.json());

  Promise
    .all([p8, p9, p10])
    .then((results) => {
      console.log(results); // Array : [1번 직원 정보, 2번 직원 정보, 3번 직원 정보]
    })
    .catch((error) => { // promise 객체가 하나라도 rejected 상태가 되는 경우 대비
      console.log(error);
    });

    // race -> 출력 값 success race의 경쟁의 의미를 담아 먼저 출력되는 값을 promise로 가짐

    const p11 = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Success'), 1000);
    });
    const p12 = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('fail')), 2000);
    });
    const p13 = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('fail2')), 4000);
    });
    
    Promise
      .race([p11, p12, p13])
      .then((result) => {
        console.log(result); // hello 출력
      })
      .catch((value) => {
        console.log(value);
      });
    

  // axios 
  axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });