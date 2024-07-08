# API Router 에서는 API 요청과 관련된 비즈니스 로직을 다룹니다.

# domain에는 www.naver.com 같이 일반적으로 우리가 "주소"라고 부르는 부분이 들어갑니다

### domain -> http://localhost:3000

아래와 같은 주소들이 현재 api 폴더 아래에 있는 posts router에 대해서 요청할 수 있는 URL들입니다.

여기 주소에서 `:postId`처럼 되어있는 부분은 동적 라우팅을 위한 segment이고 폴더구조에서는 대괄호로 표현되어 `[postId]`와 같은 형태로 표현됩니다.

### http://localhost:3000/api/posts

### http://localhost:3000/api/posts/:postId

### http://localhost:3000/api/posts/:postId/comments

### http://localhost:3000/api/posts/:postId/comments/:commentId

"http://localhost:3000/api/posts"경로에 대한 요청을 처리하기 위해서는 app/api/posts 경로에 들어있는 route.ts을 수정할 수 있습니다.
