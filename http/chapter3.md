# HTTP 메시지

- 메시지의 흐름
- 시작줄, 헤더, 바디
- requeset, response 차이
- request의 메소드
- response의 statusCode
- 헤더의 역할

1. 흐름

    - 메시지가 서버로 향한다 = 인바운드로 이동
    - 메시지가 클라이언트/에이전트로 돌아온다 = 아웃바운드로 이동
    - 모든 메시지는 다운 스트림으로 흐름

2. 시작줄, 헤더, 바디

    - 시작줄 - 메시지의 종류
    - 헤더 - 속성
    - 본문 - 데이터 (optional)

        ```
        시작줄 : HTTP/1.0 200 OK
        Header : Contype-type : text/plain
            Content-length : 19
        Body : Hi! My Name is Sangyun
        ```

    2.1 문법

        - Request 형식

            <Method><URL><Version>

        - Response 형식

            <Version><StatusCode><Reason>
            <Header>
            <Body>

        - Version

            HTTP의 버전을 뜻함
        
        -  StatusCode

            요청에 따른 결과를 설명하는 숫자

        - Reason(reason-pharse)

            사람이 인식 할 수 있는 상태 코드의 의미를 이해할 수 있는 사유 구절
    
    2.2 시작줄

        - Request

        메소드, URL, 버전 등이 포함

        - Response

        상태 정보 및 사유 구절이 들어있음

        - 메소드

        서버에게 무엇을 해야할지 알려주는 부분

        GET : 문서를 가져옴
        HEAD : 헤더만 가져옴
        POST : 데이터를 보낸다 (Body : required)
        PUT : 메시지를 저장 (Body : required)
        TRACE : 메시지가 프록스 -> 서버의 과정을 추적
        OPTIONS : 서버의 가능 메소드를 반환
        DELETE : 서버에서 문서를 제거

        - 상태 코드

        숫자로 표기된 요청에 대한 정보

        100-101 : 정보
        200-206 : 성공 (200 : OK, 201 : CREATED)
        300-305 : 리다이렉션
        400-415 : 클라이언트 에러 (400 : BAD REQUEST, 403 : UNAUTHORIZED, 404 : NOT FOUND)

    2.3 헤더

        추가 정보에 해당하는 Key-Value 정보
        (ex.Content-length, Content-type)

        - 종류
        
        1. 일반 헤더
        2. 요청 헤더
        3. 응답 헤더 
        4. Entity 헤더 (본문 크기, 리소스 자체)
        5. 확장 헤더 (기타 헤더)

        - Date : 전송 시각
        - Content-length : 본문 길이
        - Content-type : 본문 종류
        - Accept : 받아들이는 본문 종류
        - Authorization : 인증 토큰 (확장 헤더)

    2.4 본문

        이미지, 비디오, HTML 문서, 데이터 등 많은 것들을 실어 나를 수 있음