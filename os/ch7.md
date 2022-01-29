# Ch7 Synchronization Examples

## 7.1 Classic Problems of Synchronization

### 동시성 제어 문제들
    
- Bounded-Buffer Problem
    - Producer-Consumer 문제에서 n개의 버퍼가 있다고 있고 하나씩 Holding 가능
    - Producer는 채우고 Consumer은 비움

    - Binary mutex
        - buffer pool에 동시에 접근 못하게 하기 위해서 1로 초기화
    - Counting Semaphore에서는 가용 버퍼가 0이면 더 이상 못쓰게 만들거나 full이면 더 쓸 수 있게 만듬

```
Producer는 wait을 주고 full이 되면 signal을 주고
반대로 Consumer 또한 wait을 주고 본인 기준으로 full이 되면 full을 준다
```

- Readers-Writers Problem
    - readers / wrtiers을 공유 데이터에서 진행
    - reader는 읽기만 하고 writer는 둘다 한다고 가정
        - 읽기는 다중 접속 가능
        - writer가 다중 접속을 한다고 하면 동시성이 깨짐
    - 우선 순위로 해결
        1. 어떠한 Reader도 writer가 사용 중이라고 대기하지는 않음
        2. writer가 더 우선순위가 높기 때문에 더 우선 순위를 주어 먼저 진입 하도록 함
    - 위의 두 케이스 모두 starvation 이슈는 발생
    - writer가 critical section에 진입하였으면 가지고 있으면 n개의 reader는 대기
    - reader는 rw_mutex를 대기
    - n-1개의 reader가 mutex에 queue 되어 있음
    - 스케줄러에 의해 조절 가능

```
rw_mutex 인스턴스와 mutex 인스턴스를 사용 - 1이 되면 꽉 차는 것
rw_mutex는 read와 write를 공유해서 쓰는 것
mutex는 mutal exclusion을 보장
read_count가 얼마나 현재 값을 읽고 있는지 확인

1. writers는 mutex값이 없으면 진입 가능
2. read_count가 0이 되는 순간 rw_mutex에 signal을 주어 critical section에 진입이 가능하도록 함
```

- Reader-Writer Locks
    - reader-writer는 lock으로 구현되어 있음

```
java 기준

Producer가 give를 호출하고 Consumer가 take를 호출
mutal exclusion은 synchronized를 통해 해결 가능

give() method
- notify를 통해 알려주기 가능 -> signal(full) 과 같음

take() method
signal(0)를 통해 notify()

readlock 획득 -> read -> readlock 해제
writelock 획득 -> write -> writelock 해제

readlock획득() = write 중이라면 대기 or readcount++
readlock해제() = readCount-- & readCount == 0이면 notify()

writelock획득() = write true 혹은 readCount > 0 이면 대기 or isWriting = 0
writelock해제() = isWriting = false 후 notifyAll()
```

- Dining-Philosophers Problem
    - 다섯 개의 철학자가 다섯 개의 젓가락을 동시에 잡으려고 하는 문제
    - 젓가락에 mutal exclusion을 적용해서 해결 하면 되지만, 여러 리소스에 대해서 여러 프로세스가 있는 경우는?
        - Deadlock이 발생 starvation이 발생
    - Semaphore를 사용해서 해결
        - mutal exclusion은 해결 가능
        - 젓가락 마다 semaphore을 할당

- deadlock & starvation
    - 다섯명의 철학자가 동시에 다섯개의 젓가락을 잡게 된다면?
        - Deadlock에 걸림

- Deadlock 해결 방법
    - 한 개는 강제로 제한
    - 양쪽 젓가락이 available할 때만 가능할 때만 사용
    - 조건을 주어 짝수 인원은 왼쪽 -> 오른쪽, 홀수 인원은 오른쪽 -> 왼쪽
    - 위 방법은 starvation은 해결이 불가능
        - starvation이 발생하면 탐지를 해서 제거하는 방식으로

- 양쪽의 젓가락이 available = Monitor Solution
    - 상태를 생각, 배고픔, 먹는 상태
    - 양쪽 철학자가 먹는 상태가 아닐때만 사용 가능
    - hungry할때 delay하고 다 먹으면 signal()

- Dining-Philosophers Problem 해결법
    - 젓가락 분배를 통해 해결
    - 모니터를 통해 조절
    - pickup(), putdown()을 통해서 해당 이슈를 조절
    -  mutual exclusion 및 deadlock은 방지
    - 그러나 starvation은 못막음

```
monitor DiningPhilosophers

pickup(), putdown(), test()을 선언
pickup() = 상태를 Hungry로 바꾸고 test를 호출 -> state가 Eating이면 대기
putdown() = 상태를 대기로 바꾸고 test 양 옆자리를 호출
test() = 양쪽이 eating이 아니면 나도 eating 가능을 signal

think() -> pickup(위치) -> eat() -> pickup(위치) 순서로 실행

```

- Thread-Safe Concurrent Applications
    - 경쟁 상태와 liveness hazards의 문제는 남아 있음
    - thread-safe 하도록 구현 해야함
        1. Transactional Memory = atomic operation
        2. OpenMP -> Parrellel하도록 진행하되 Critical Section을 막음
        3. 함수형 명령어를 쓰면 문제가 안 생김 - 기존에는 명령형 언어라 문제