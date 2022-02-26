# Ch8 Deadlocks

## System Model

### Deadlock이란?

- 모든 프로세스들이 wait() 상태로 queue 에서 빠져나가지 못하는 것 
- waiting thread가 자기 상태를 바꾸지 못하는 것

- 리소스 타입은 identical instance가 여러 개 존재
    - 파일, CPU등, I/O device를 공유

- thread는 리소스가 필요함
    - Request - User - Release로 구성

### Deadlock은 어떻게 발생하는가?

1. A function에서 first mutex를 얻고 second mutex를 얻음 해제 순서는 역순
2. B function에서 second mutex를 얻고 first mutex를 얻음 해제 순서는 역순
3. 서로 간의 Mutex가 release되어 있어야 다음 스탭으로 진행이 가능한데, mutex를 얻은 상태에서 둘다 Release를 안해주어 Deadlock이 발생

### Deadlock 조건

1. 상호 배제 조건 (Mutal Exclusion)
    - 최소 한개의 리소스가 공유 하지 않은 상태로 홀딩하고 있음
2. Hold & Wait
    - 스레드가 최소 한개의 리소스를 잡고 다른 리소스를 요청을 해야 문제가 발생
3. 선점 불가 (No preemption)
    - 어떤 자원을 가지고 있던 간에 선점이 불가능하면 문제가 발생
4. Circular wait
    - 서로가 서로를 물고 있는 형태로 상호 대기를 하고 있는 상태

- 4개를 동시에 만족하지 않으면 Deadlock은 발생하지 않음

### Resource-Allocation Graph (자원 할당 그래프)

- vertices 집합 V 그리고 edges 모음 E가 존재

- 두 개의 다른 타입의 노드
    1. 쓰레드 집합을 T
    2. 리소스 타입 집합을 R이라고 정의

- T가 R을 요청하는 형태는 request edge라고 함
- R이 T를 요청하는 형태는 assignment edge라고 함

```
1. first_mutex가 thread_one을 할당
2. thread_one이 second_mutex를 wait
3. second_mutex가 thread_two를 할당
4. thread_two가 first_mutex를 Wait
```

### 중요 쟁점

- Cycle이 없으면 Deadlock이 절대 발생하지 않음

### Deadlock을 다루는 3가지 방법

- Deadlock을 무시
- Prevent or avoidance
    - Prevent
    - Avoidance : Bankers Algorithm
- Deadlock을 탐지해서 복구
    - Detection
    - Recovery

### Deadlock Prevent

- 4가지 조건 중 하나만 회피
- Mutual Exclusion
    - 모든 리소스를 공유 가능하게 만듬
    - Deadlock 자체가 발생하지 않음

- 점유 대기
    - 자원을 내려놓고 획득하겠지만 실용적이지 않음

- No Preemption
    - 다른 프로세스가 가지고 있을 떄 뺏는 방법
    - 뺏긴 리소스는 다시 시작하도록 진행

- Circular wait
    - 그나마 실용적
    - 내가 가지고 있는 순서보다 점수가 더 높은 것만 순서를 할 수 있도록 하는 방법 - 선형 요청

- 위 4가지를 완벽하게 회피 보증은 없음
    - Transaction이 교차하는 경우
    - GrandLock을 써서 전체를 막는 경우를 통해 막아야함

### Deadlock Avoidance

- Request가 왔을 때 Request를 받아주지 않고 future deadlock이 있으면 기다리라고 명령
- ex) 스레드 P가 R1을 쥐고 있는 상태에서 R2를 요청하고 R2가 Q에 할당되어 있으면서 R1을 요청하면 Deadlock
- 주어진 정보에 따라 Deadlock 상태에 절대 들어가지 못하게 하는 방법
    - 할당 가능한 / 할당 되어 있는 리소스의 숫자
    - 쓰레드 요구의 최대치

- Safe State
    - 스레드의 실행 순서를 찾으면 데드락 회피 가능
    - 따라서 스레드 시퀀스를 찾는 것이 중요
    - unsafe 상태에서 deadlock이 걸리는 건 맞지만 항상 그렇지는 않음
    - 항상 safe state에 머물게 하면 avoid 가능

- Resource-Allocation Graph
    - No-cycle이 없으면 승인을 해주면 되고, cycle이 존재하면 승인 안해주면 된다.

- Bankers Algorithm
    - RAG는 싱글 인스턴스일 때만 사용 가능 하기에 Banker's Algorithm을 사용해야 함

```
n : 스레드 개수
m : 리소스 타입

Available : 사용 가능한 리소스 타입
Max : 각 스레드가 요청할 인스턴스의 최대 개수
Allocation : 할당 된 스레드의 개수
Need : 앞으로 필요한 리소스의 개수

- Available[m]
    - 만약 available[j] == k 이면 k개의 인스턴스가 사용가능

- Max[n * m]
    - Max[i][j] = k개 이면 최대 K개의 인스턴스를 요청

- Allcation[n * m]
    - Allocation[i][j] == K 이면, k개의 인스턴스를 홀딩 하고 있다는 이야기

- Need[n * m]
    - Need[i][j] == K이면 k개 더 요청 예정

5개의 리소스 스레드가 있다고 가정
리소스는 3개가 존재 - A : 10 B : 5 C : 7

그래프에 조건에 따라 현재 사용가능한 리소스 확인
Need는 최대 개수 - 할당 개수

이 때, T1,T3,T4,T0,T2가 안전한 형태 

모든 스레드를 Finish = false로 전제
Needi <= Work 인 것에 대해서 
Work = Work + Alloc을 진행하고 finish를 true로 바꿈

Need Vector가 Work 인스턴스 모두 보다 같거나 커야 할당 가능
순차적으로 순회를 돌면서 T1, T3, T4는 할당

그 다음에 Work Vector가 충분히 늘어난 상태임으로 T0, T2를 할당
```

- 현재 상태에서 safe 한가?
    - Request가 Need 보다 작아야함
    - Request가 Available보다 작아야함
    - Request을 받아주었다 가정
        - available에 request를 더함
        - 현재 need에서 Request를 뺌
        - 현재 avilable에서 Request를 뺌

- Safety Algorithm
    1. Work= Available로 정의
    2. 인덱스 i에 대해서
        Finish[i] == false
        Need가 Work보다 작으면
    3. Work = Work + Allocation
    Finish[i] = true;
    4. Finish[i] == true면 시스템은 안전함

### Deadlock Detection

- 리소스 Request 할 때마다, 시스템에 부담을 줌 (avoidance)
- 허용해 주고 감시후 Recover
- single instance는 wait-for 그래프 사용 (의존성 그래프)
- mutiple instance에서는 request를 쓰는 것 / 최초 Finish 값만 조절

### Deadlock Recovery

- 매번 detection을 돌리면 Overhead가 큼
    - 프로세스 스레드를 하나만 죽여줘도 된다
- 희생양을 선정
    - Rollback 진행
    - 하나만 걸려서 Starvation 발생가능 - victim count로 조절
