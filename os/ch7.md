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

