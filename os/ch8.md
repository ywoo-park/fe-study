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


