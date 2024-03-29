# 5장 모놀리스 분해하기

- 기존 코드 베이스를 유지하면서 모놀리스를 분해하는 법은?

## 5.1 접합부가 중요

- 접합부
    - 코드베이스의 영향을 주지 않는 격리된 코드 부분
    - 서비스의 경계가 될 수 있는 경계
- 코드 내에서 접합부의 경계를 인식 할 수 있는 방법을 찾는 것이 중요
- '경계가 있는 콘텍스트'는 느슨히 결합된 경계를 잘 표현하기에 이를 인식 할 필요성이 있음

## 5.2 뮤직코퍼레이션분해

만약 4개의 콘텍스트가 있다고 가정
1. 제품목록
2. 재무
3. 창고
4. 추천

##### 분해 예시
```
1. 각각의 패키지 생성
2. 패키지로 이동하여 리팩토링(IDE가 자동으로 리팩토링 해줌 요새는)
3. 의존성을 분석할 수 있는 코드나 패키지를 통해서 의존성 확인

위 과정은 짧으면 반나절 수주 또는 수개월이 걸릴 수 있음
```

## 5.3 모놀리스를 분리하는 이유

- 점진적으로 분리 할 때 어디서 부터 시작해야 할까?
    - 분리했을 때 가장 큰 혜택이 있는 곳부터

### 5.3.1 변경의 속도

- 빠르게 변하는 시스템부터 시작
    - 위 예시의 창고

### 5.3.2 팀 구조

- 팀으로 나뉘어진 컨텍스트로 분리
    - 위 예시에서는 지역 기준으로 분리

### 5.3.3 보안

- 민감한 정보만 분리하여 보안 절차를 적용해야 할 경우 분리

### 5.3.4 기술

- 새로운 기술이나 다른 알고리즘을 적용하기 위해서 하나의 기능을 분리

## 5.4 뒤엉킨 의존성

- 종속성이 낮은 접합부를 찾으면 뒤엉킨 의존성의 출처를 찾을 수 있음 (대개 DB)

## 5.5 데이터베이스

- 데이터베이스는 분리하기 어려운 부분

## 5.6 문제에 대처하기

- DB에 접하는 부분의 코드를 확인하는 것이 제일 중요
    - Repository처럼 분리

- 각 DB마다 로그 구조나 행열 구조를 사용할 수 있기 때문에 매핑을 기입하는 것이 어려울 수 있음
    - 테이블 관계를 그래픽으로 표현한 도구를 사용하는 것을 권장

## 5.7 ex) 외부 키 관계 깨뜨리기

```
재무 테이블에서 제품을 파는 카테고리를 참조 -> 재무 개별 목록을 기입으로 바꿀 때
테이블에서 직접 외래키로 조회하는 경우가 있음
이를 api화하여 서비스 단에서 호출해서 부르는 방식으로 분리해야 한다 이를 통해서 속도는 저하 되지만, 관계는 느슨해짐
```

- 속도가 느려지거나, 삭제 트리거의 구현이 필요

## 5.8 ex) 공유 정적 데이터

- 여러 도메인이 하나의 DB 테이블에 저장되는 경우
    1. 테이블을 각각 만들어서 하나를 마스터로 나머지를 Replica로 만들어서 복제
    2. 공유 정적 데이터를 코드로 다룸 (일관성 문제는 여전함) - 메모리 상에서 데이터 관리하여 일괄 저장
    3. 정적 데이터를 각각 서비스에 삽입

## 5.9 ex) 공유 데이터

- 도메인에서 저장과 보여주기 위한 도메인을 DB상에서 분리
    - 예시에서는 창고와 재무 사이에 고객을 삽입

## 5.10 ex) 공유 테이블

- 테이블을 분리

## 5.11 데이터베이스 리팩토링

## 5.11.1 단계적 분리

1. 단일 스키마
2. 스키마를 분리
3. 어플리케이션을 서비스로 분리

- 메모리 상에서 조인을 수행할 필요성 존재
- 트랜잭션 일관성 깨짐

## 5.12 트랜잭션 경계

- 트랜잭션 유지는 매우 중요
- 그렇다면 실패한다면?

### 5.12.1 나중에 재시도

- 연산의 일부를 큐나 로그 파일에 큐잉해서 나중에 재시도

### 5.12.2 전체 작업을 중지

- 전체 연산 작업을 중지 후 이전 트랜잭션을 작성
    - 보상 트랜잭션을 만드는 것은 어려움

### 5.12.3 분산 트랜잭션

- 분산 트랜잭션 사용
    - 통상적으로 2단계 커밋 사용
        1. 투표 시작
        2. 로컬 트랜잭션의 가능 여부를 매니저에게 알림 (코호트라고 불림)
        3. 트랜잭션 매니저가 찬성을 모두 얻으면 커밋을 진행
        4. 1개라도 실패할 경우 롤백
    - 프로세스가 진행할 때까지 참여자가 모두 중지해야하는 단점
    - 실패 사례를 잡아내기 위한 노력이기에 완벽하지 않음
    - Lock을 관리하기가 어렵기 때문에 자체 알고리즘에 대한 사용 비추천

### 5.12.4 무엇을 해야하냐?

- 트랜잭션을 표현할 구체적인 개념을 만들어라? (저자를 한대 치고 싶은 소리하네요)

### 5.14 리포팅 데이터베이스

- 리포팅 (Read나 분석 전용)
    - 레플리카 서버에서 읽어서 메인 서버에 부하를 주지 않게 함

- 단점
    1. 사실상 공유 API로 쓰는 것
    2. DB 최적화 방법을 적용 하기 제한적
    3. 새로운 대안에 대한 탐구가 어려움

### 5.15 서비스 호출을 통한 데이터 호출

- 둘 이상의 데이터를 리포트 할 경우 호출을 여러 번 해야 함
- 외부 도구에 의존하기 때문에 문제가 발생
    - API가 리포팅 용도가 아닐 수 있음
    - 서비스의 부하를 줄 수 있음
    - 이를 배치 API를 통해 해결 가능
        - 클라이언트 요청 API 상에서는 폴링하거나 아직 갱신 되지 않았다는 표시를 보냄

### 5.16 데이터 펌프

- 데이터를 밀어 넣는 파이프라인을 만들어서 억지로 때려박기
- 스키마를 계층 구조로 만들어서 때려박는 구조로 만듬

### 5.16.1 대체 종착지

- JSON을 AWS로 저장하기 위해서 데이터 펌프를 사용

## 5.17 이벤트 데이터 펌프

1. 상태 변이 이벤트에 선 바인딩
2. 변경된 내용만 리포팅 매퍼에 보냄
3. DB에 반영

- 모든 정보를 이벤트로 확산이 분가능
- 데이터 갱신이 느림

## 5.18 백업 데이터 펌프

- 넷플릭스처럼 카산드라 -> S3에 저장

## 5.19 실시간을 향해

## 5.20 변경 비용

- 영향도 낮은 실수부터 분해를 시도
- 너무 많은 API를 서로 부를 경우 하나로 합쳐라
    - CRC 카드로 감을 잡을 수 있음

