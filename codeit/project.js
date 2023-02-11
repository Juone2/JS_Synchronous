// 실습 신입사원 기존사원에 추가하기

fetch('https://learn.codeit.kr/api/interviews/summer')
.then((response) => response.json())
.then((interviewResult) => {
  const { interviewees } = interviewResult;
  const newMembers = interviewees.filter((interviewee) => interviewee.result === 'pass');
  return newMembers;
})
.then((newMembers) => fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  body: JSON.stringify(newMembers),
}))
.then((response) => { 
  if (response.status === 200) {
    return fetch('https://learn.codeit.kr/api/members');
  } else {
    throw new Error('New members not added');
  }
})
.then((response) => response.json())
.then((members) => {
  console.log(`총 직원 수: ${members.length}`);
  console.log(members);
});

  // catch 예제
  // 비록 에러가 발생했다고 해도 만약 실패한 작업 대신 다른 방법을 통해서 작업을 정상적으로 끝마칠 수 있는 상황이라면 catch 메소드를 중간에 사용하기도 합니다.
  // catch 중간에 씀으로써 에러가 발생하더라도 다른 방식으로 복구 가능 할 때

  fetch('https://friendbook.com/my/newsfeeds')
  .then((response) => response.json()) // -- A
  .then((result) => { // -- B
    const feeds = result;
    // 피드 데이터 가공...
    return processedFeeds; 
  })
  .catch((error) => { // -- C
    // 미리 저장해둔 일반 뉴스를 보여주기  
    const storedGeneralNews = getStoredGeneralNews();
    return storedGeneralNews;
  })
  .then((result) => { /* 화면에 표시 */ }) // -- D
  .catch((error) => { /* 에러 로깅 */ }); // -- E

    // 코드 원상 복구 실습

  function removeUnnecessaryInfo(users) {
    const processedUserList = users.map((user) => {
      const keys = Object.keys(user);
      const processedUser = {};
      keys.forEach((key) => {
        if (key === 'name' || key === 'email') {
          processedUser[key] = user[key];
        }
      });
      return processedUser;
    });
    // promise 객체 직접 생성하는 코드
    const p = new Promise((resolve) => {
      setTimeout(() => { resolve(processedUserList); }, 1000); 
    });
    return p;
  }
  
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((result) => removeUnnecessaryInfo(result))
    .then((result) => {
      console.log(result);
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    })
      .finally(() => {
      console.log('This job will be done by server soon!');
    });

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